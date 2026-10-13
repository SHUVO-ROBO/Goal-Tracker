import { useState, useEffect } from "react";
import { useAppStore } from "@/hooks/use-app-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { DistractionFirewall } from "./Dashboard";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

type BlockType = "spiritual" | "deep_work" | "academic" | "skill" | "review" | "buffer" | "sleep";

const TIME_BLOCKS: { id: string; start: string; end: string; label: string; type: BlockType; startHr: number; endHr: number; trackable: boolean }[] = [
  { id: "spiritual", start: "04:30", end: "06:30", label: "Spiritual & Vision Start (Quran Tafsir & Planning)", type: "spiritual", startHr: 4.5, endHr: 6.5, trackable: true },
  { id: "deep-work", start: "06:30", end: "08:30", label: "Deep Work (AI/ML Engineering & Code Push)", type: "deep_work", startHr: 6.5, endHr: 8.5, trackable: true },
  { id: "academic", start: "09:00", end: "16:00", label: "Academic Core (UIU Classes, Labs & Faculty Networking)", type: "academic", startHr: 9, endHr: 16, trackable: true },
  { id: "skill", start: "16:30", end: "18:30", label: "High-Paying Skill / Active Earning / Tuitions", type: "skill", startHr: 16.5, endHr: 18.5, trackable: true },
  { id: "review", start: "19:30", end: "21:30", label: "Academic Review & Assignments", type: "review", startHr: 19.5, endHr: 21.5, trackable: true },
  { id: "buffer", start: "21:30", end: "22:30", label: "Isolated Buffer Time (Debt & Family Anxiety)", type: "buffer", startHr: 21.5, endHr: 22.5, trackable: true },
  { id: "sleep", start: "22:30", end: "04:30", label: "Sleep / Rest", type: "sleep", startHr: 22.5, endHr: 28.5, trackable: false }, // 28.5 = 4.5 next day
];

const BLOCK_COLORS: Record<BlockType, string> = {
  spiritual: "hsl(43 100% 50%)", // Warning/Amber
  deep_work: "hsl(152 100% 50%)", // Primary/Neon Green
  academic: "hsl(195 100% 50%)", // Secondary/Electric Blue
  skill: "hsl(280 100% 60%)", // Purple
  review: "hsl(180 100% 40%)", // Teal
  buffer: "hsl(0 100% 63%)", // Destructive/Red
  sleep: "hsl(0 0% 30%)", // Dark Gray
};

function getLocalDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function TimeManagement() {
  const { distractionLog, setDistractionLog, dailyRoutineChecks, setDailyRoutineChecks } = useAppStore();
  const [currentHour, setCurrentHour] = useState<number>(0);
  const today = getLocalDateKey();
  const todayChecks = dailyRoutineChecks[today] ?? {};
  const routineCount = TIME_BLOCKS.filter(block => block.trackable).length;
  const routinesDone = TIME_BLOCKS.filter(block => block.trackable && todayChecks[block.id]).length;

  const toggleRoutine = (id: string, checked: boolean) => {
    setDailyRoutineChecks({
      ...dailyRoutineChecks,
      [today]: { ...todayChecks, [id]: checked },
    });
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hr = now.getHours() + now.getMinutes() / 60;
      if (hr < 4.5) hr += 24; // map 0-4.5 to 24-28.5 for logic
      setCurrentHour(hr);
    };
    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, []);

  const chartData = [
    { name: "Acad", value: distractionLog.academics, fill: BLOCK_COLORS.academic },
    { name: "AI/ML", value: distractionLog.ai, fill: BLOCK_COLORS.deep_work },
    { name: "Research", value: distractionLog.research, fill: BLOCK_COLORS.skill },
    { name: "Quran", value: distractionLog.quran, fill: BLOCK_COLORS.spiritual },
    { name: "IELTS", value: distractionLog.ielts, fill: BLOCK_COLORS.review },
    { name: "Buffer", value: distractionLog.familyBuffer, fill: BLOCK_COLORS.buffer },
    { name: "Waste", value: distractionLog.waste, fill: "hsl(0 0% 50%)" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Daily schedule and routine checklist */}
      <Card className="bg-card/50 border-border">
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <CardTitle className="font-mono text-sm uppercase tracking-widest text-muted-foreground">
                Daily Time-Blocking Schedule
              </CardTitle>
              <p className="mt-1 text-xs text-muted-foreground">04:30 AM – 10:30 PM · Check off each block as you complete it.</p>
            </div>
            <Badge variant="outline" className="border-primary/30 font-mono text-primary" data-testid="text-routine-progress">
              {routinesDone}/{routineCount} blocks complete today
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {TIME_BLOCKS.map((block) => {
              let isCurrent = false;
              if (block.type === 'sleep') {
                isCurrent = currentHour >= 22.5 && currentHour < 28.5;
              } else {
                isCurrent = currentHour >= block.startHr && currentHour < block.endHr;
              }
              const isDone = Boolean(todayChecks[block.id]);

              return (
                <div 
                  key={block.id}
                  className={`flex items-center gap-2 p-3 rounded-md border transition-all sm:gap-4 ${
                    isCurrent ? 'bg-card border-border shadow-lg' : 'bg-background/50 border-transparent'
                  }`}
                  style={{
                    boxShadow: isCurrent ? `0 0 15px ${BLOCK_COLORS[block.type]}40` : 'none',
                    borderColor: isCurrent ? BLOCK_COLORS[block.type] : undefined,
                    opacity: isDone ? 0.65 : undefined,
                  }}
                >
                  <div className="w-28 shrink-0 font-mono text-[11px] text-muted-foreground font-medium">
                    {block.start} - {block.end}
                  </div>
                  <div 
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: BLOCK_COLORS[block.type], boxShadow: isCurrent ? `0 0 8px ${BLOCK_COLORS[block.type]}` : 'none' }}
                  />
                  <div className={`min-w-0 flex-1 font-mono text-sm ${isDone ? "text-muted-foreground line-through" : isCurrent ? "text-foreground font-bold" : "text-muted-foreground"}`}>
                    {block.label}
                  </div>
                  {block.trackable && (
                    <label className="ml-auto flex shrink-0 cursor-pointer items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                      <span className="hidden sm:inline">{isDone ? "Done" : "Mark done"}</span>
                      <Checkbox
                        checked={isDone}
                        onCheckedChange={checked => toggleRoutine(block.id, checked === true)}
                        aria-label={`${isDone ? "Uncheck" : "Complete"} ${block.label}`}
                        data-testid={`checkbox-routine-${block.id}`}
                      />
                    </label>
                  )}
                  {isCurrent && (
                    <div className="hidden shrink-0 items-center gap-2 text-[10px] font-mono tracking-widest uppercase animate-pulse sm:flex" style={{ color: BLOCK_COLORS[block.type] }}>
                      Active
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <DistractionFirewall />

      {/* Weekly Time Log */}
      <Card className="bg-card/50 border-border">
        <CardHeader>
          <CardTitle className="font-mono text-sm uppercase tracking-widest text-muted-foreground">
            Weekly Time Audit (Hours)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              {(Object.keys(distractionLog) as Array<keyof typeof distractionLog>).map((key) => (
                <div key={key} className="flex items-center justify-between gap-4">
                  <label className="text-xs font-mono uppercase text-muted-foreground w-24">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  <Input 
                    type="number"
                    value={distractionLog[key]}
                    onChange={(e) => setDistractionLog({...distractionLog, [key]: parseFloat(e.target.value) || 0})}
                    className="w-20 h-8 font-mono text-right bg-background"
                  />
                </div>
              ))}
            </div>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 0, left: 30, bottom: 0 }}>
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} fontSize={10} fill="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    cursor={{ fill: 'hsl(var(--muted))' }} 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', fontSize: '12px' }} 
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
