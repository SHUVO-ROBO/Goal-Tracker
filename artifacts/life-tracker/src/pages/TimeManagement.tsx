import { useState, useEffect } from "react";
import { useAppStore } from "@/hooks/use-app-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { DistractionFirewall } from "./Dashboard";
import { Input } from "@/components/ui/input";

type BlockType = "spiritual" | "deep_work" | "academic" | "skill" | "review" | "buffer" | "sleep";

const TIME_BLOCKS: { start: string; end: string; label: string; type: BlockType; startHr: number; endHr: number }[] = [
  { start: "04:30", end: "06:30", label: "Spiritual & Vision Start (Quran & Planning)", type: "spiritual", startHr: 4.5, endHr: 6.5 },
  { start: "06:30", end: "08:30", label: "Deep Work (AI/ML & GitHub)", type: "deep_work", startHr: 6.5, endHr: 8.5 },
  { start: "09:00", end: "16:00", label: "Academic Core (UIU Classes, Labs)", type: "academic", startHr: 9, endHr: 16 },
  { start: "16:30", end: "18:30", label: "High-Paying Skill / Active Earning", type: "skill", startHr: 16.5, endHr: 18.5 },
  { start: "19:30", end: "21:30", label: "Academic Review & Assignments", type: "review", startHr: 19.5, endHr: 21.5 },
  { start: "21:30", end: "22:30", label: "Isolated Buffer (Family concerns - banned outside)", type: "buffer", startHr: 21.5, endHr: 22.5 },
  { start: "22:30", end: "04:30", label: "Sleep / Rest", type: "sleep", startHr: 22.5, endHr: 28.5 }, // 28.5 = 4.5 next day
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

export function TimeManagement() {
  const { distractionLog, setDistractionLog } = useAppStore();
  const [currentHour, setCurrentHour] = useState<number>(0);

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
      
      {/* 24-Hour Time Block Widget */}
      <Card className="bg-card/50 border-border">
        <CardHeader>
          <CardTitle className="font-mono text-sm uppercase tracking-widest text-muted-foreground">
            24-Hour Operations Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {TIME_BLOCKS.map((block, idx) => {
              let isCurrent = false;
              if (block.type === 'sleep') {
                isCurrent = currentHour >= 22.5 && currentHour < 28.5;
              } else {
                isCurrent = currentHour >= block.startHr && currentHour < block.endHr;
              }

              return (
                <div 
                  key={idx} 
                  className={`flex items-center gap-4 p-3 rounded-md border transition-all ${
                    isCurrent ? 'bg-card border-border shadow-lg scale-[1.02]' : 'bg-background/50 border-transparent opacity-60'
                  }`}
                  style={{
                    boxShadow: isCurrent ? `0 0 15px ${BLOCK_COLORS[block.type]}40` : 'none',
                    borderColor: isCurrent ? BLOCK_COLORS[block.type] : 'transparent'
                  }}
                >
                  <div className="w-24 shrink-0 font-mono text-xs text-muted-foreground font-medium">
                    {block.start} - {block.end}
                  </div>
                  <div 
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: BLOCK_COLORS[block.type], boxShadow: isCurrent ? `0 0 8px ${BLOCK_COLORS[block.type]}` : 'none' }}
                  />
                  <div className={`font-mono text-sm truncate ${isCurrent ? 'text-foreground font-bold' : 'text-muted-foreground'}`}>
                    {block.label}
                  </div>
                  {isCurrent && (
                    <div className="ml-auto flex items-center gap-2 text-xs font-mono tracking-widest uppercase animate-pulse" style={{ color: BLOCK_COLORS[block.type] }}>
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
