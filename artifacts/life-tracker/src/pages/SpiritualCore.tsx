import { useState } from "react";
import { format } from "date-fns";
import { useAppStore } from "@/hooks/use-app-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

// Prayer Arabic names + times (approximate — user adjusts daily)
const PRAYERS = [
  { key: "fajr",    arabic: "الفجر",    label: "Fajr",    time: "Dawn",    icon: "🌙" },
  { key: "dhuhr",   arabic: "الظهر",    label: "Dhuhr",   time: "Midday",  icon: "☀️" },
  { key: "asr",     arabic: "العصر",    label: "Asr",     time: "Afternoon",icon: "🌤️" },
  { key: "maghrib", arabic: "المغرب",   label: "Maghrib", time: "Sunset",  icon: "🌅" },
  { key: "isha",    arabic: "العشاء",   label: "Isha",    time: "Night",   icon: "🌟" },
] as const;

type PrayerKey = typeof PRAYERS[number]["key"];

// Daily Quranic principles to implement
const DAILY_PRINCIPLES = [
  "Honesty in every word (Al-Ahzab 33:70)",
  "Patience under pressure (Az-Zumar 39:10)",
  "Gratitude for every blessing (Ibrahim 14:7)",
  "Purposeful use of time (Al-Asr 103:1-3)",
  "Tawakkul — trust after effort (At-Talaq 65:3)",
];

export function SpiritualCore() {
  const { spiritualLogs, setSpiritualLogs } = useAppStore();
  const [activeTab, setActiveTab] = useState<"today" | "history">("today");

  const today = format(new Date(), "yyyy-MM-dd");
  const defaultLog = {
    date: today,
    implemented: false,
    ayah: "",
    meaning: "",
    reflection: "",
    prayers: { fajr: false, dhuhr: false, asr: false, maghrib: false, isha: false },
  };
  const todayLog = spiritualLogs[today] || defaultLog;

  const updateTodayLog = (updates: Partial<typeof todayLog>) => {
    setSpiritualLogs({ ...spiritualLogs, [today]: { ...todayLog, ...updates } });
  };

  // Streak calculation
  let streak = 0;
  let checkDate = new Date(today);
  for (let i = 0; i < 90; i++) {
    const dStr = format(checkDate, "yyyy-MM-dd");
    if (spiritualLogs[dStr]?.implemented) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else if (i === 0) {
      checkDate.setDate(checkDate.getDate() - 1);
    } else break;
  }

  // Today prayer count
  const prayersDone = PRAYERS.filter(p => todayLog.prayers[p.key]).length;

  // Last 7 days history
  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const key = format(d, "yyyy-MM-dd");
    const log = spiritualLogs[key];
    return {
      key,
      dayLabel: format(d, "EEE"),
      implemented: !!log?.implemented,
      prayers: log ? Object.values(log.prayers).filter(Boolean).length : 0,
    };
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">

      {/* ── Bismillah Banner ── */}
      <div className="text-center py-4 border border-primary/20 rounded-xl bg-primary/5 islamic-card">
        <p className="font-amiri text-2xl text-primary glow-text tracking-wider">
          بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
        </p>
        <p className="text-xs font-mono text-muted-foreground mt-1 tracking-widest uppercase">
          In the Name of Allah, the Most Gracious, the Most Merciful
        </p>
      </div>

      {/* ── Stats Row ── */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-card/60 border-border islamic-card text-center py-5">
          <div className="text-3xl mb-1">{streak > 0 ? "🔥" : "💤"}</div>
          <div className="font-mono font-bold text-2xl text-warning glow-text">{streak}</div>
          <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mt-1">Day Streak</div>
        </Card>
        <Card className="bg-card/60 border-border islamic-card text-center py-5">
          <div className="text-3xl mb-1">🕌</div>
          <div className="font-mono font-bold text-2xl text-primary glow-text">{prayersDone}/5</div>
          <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mt-1">Today's Salah</div>
        </Card>
        <Card className="bg-card/60 border-border islamic-card text-center py-5">
          <div className="text-3xl mb-1">📖</div>
          <div className="font-mono font-bold text-2xl text-secondary glow-text-green">
            {Object.keys(spiritualLogs).length}
          </div>
          <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mt-1">Days Logged</div>
        </Card>
      </div>

      {/* ── 7-Day Prayer Heatmap ── */}
      <Card className="bg-card/60 border-border islamic-card">
        <CardHeader className="pb-3">
          <CardTitle className="font-mono text-sm uppercase tracking-widest text-muted-foreground">7-Day Consistency</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 justify-between">
            {last7.map(day => (
              <div key={day.key} className="flex-1 flex flex-col items-center gap-2">
                <div className="text-[10px] font-mono text-muted-foreground">{day.dayLabel}</div>
                <div className={`w-full aspect-square rounded-lg flex items-center justify-center text-xs font-bold font-mono transition-colors ${
                  day.prayers === 5 ? "bg-secondary/25 border border-secondary/50 text-secondary" :
                  day.prayers >= 3 ? "bg-primary/20 border border-primary/40 text-primary" :
                  day.prayers >= 1 ? "bg-warning/15 border border-warning/30 text-warning" :
                  "bg-muted/40 border border-border/30 text-muted-foreground/40"
                }`}>
                  {day.prayers}
                </div>
                <div className={`size-2 rounded-full ${day.implemented ? "bg-primary" : "bg-muted/50"}`} title={day.implemented ? "Principles implemented" : ""} />
              </div>
            ))}
          </div>
          <div className="flex items-center gap-3 mt-3 text-[10px] font-mono text-muted-foreground">
            <span className="flex items-center gap-1"><span className="size-2 rounded bg-secondary/50 inline-block" /> All 5</span>
            <span className="flex items-center gap-1"><span className="size-2 rounded bg-primary/50 inline-block" /> 3-4</span>
            <span className="flex items-center gap-1"><span className="size-2 rounded bg-warning/40 inline-block" /> 1-2</span>
            <span className="flex items-center gap-1"><span className="size-2 rounded bg-muted/50 inline-block" /> None</span>
            <span className="ml-auto flex items-center gap-1"><span className="size-2 rounded-full bg-primary inline-block" /> Principles</span>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* ── Daily Prayer Log ── */}
        <Card className="bg-card/60 border-border islamic-card">
          <CardHeader className="pb-4">
            <CardTitle className="font-mono text-sm uppercase tracking-widest text-primary flex items-center justify-between">
              <span>🕌 Daily Salah — {format(new Date(), "dd MMM")}</span>
              <Badge variant="outline" className={`text-[11px] font-mono ${prayersDone === 5 ? "border-secondary/50 text-secondary" : "border-primary/30 text-primary"}`}>
                {prayersDone}/5 Prayed
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {PRAYERS.map(({ key, arabic, label, time, icon }) => (
                <label
                  key={key}
                  htmlFor={`prayer-${key}`}
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all select-none ${
                    todayLog.prayers[key]
                      ? "border-secondary/40 bg-secondary/8"
                      : "border-border/40 bg-background/30 hover:bg-card/40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{icon}</span>
                    <div>
                      <div className="font-medium text-sm text-foreground">{label}</div>
                      <div className="text-[11px] text-muted-foreground font-mono">{time}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-amiri text-base text-primary/70 hidden sm:block">{arabic}</span>
                    <Checkbox
                      id={`prayer-${key}`}
                      checked={todayLog.prayers[key]}
                      onCheckedChange={(c) =>
                        updateTodayLog({ prayers: { ...todayLog.prayers, [key]: !!c } })
                      }
                      className="size-5 data-[state=checked]:bg-secondary data-[state=checked]:border-secondary"
                    />
                  </div>
                </label>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* ── Ayah Log + Principle Check ── */}
        <div className="space-y-6">

          {/* Daily Principle Check-in */}
          <Card className="bg-card/60 border-warning/25 islamic-card">
            <CardHeader className="pb-3">
              <CardTitle className="font-mono text-sm uppercase tracking-widest text-warning flex items-center justify-between">
                <span>⚡ Daily Principle</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-muted-foreground">{todayLog.implemented ? "✓ Implemented" : "Pending"}</span>
                  <Switch
                    checked={todayLog.implemented}
                    onCheckedChange={(c) => updateTodayLog({ implemented: c })}
                    className="data-[state=checked]:bg-warning"
                  />
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {DAILY_PRINCIPLES.map((p, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground font-mono p-2 rounded bg-background/30 border border-border/30">
                    <span className="text-warning/60 shrink-0">›</span>
                    <span>{p}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Ayah / Reflection Log */}
          <Card className="bg-card/60 border-border islamic-card">
            <CardHeader className="pb-3">
              <CardTitle className="font-mono text-sm uppercase tracking-widest text-muted-foreground">📖 Today's Ayah & Reflection</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-[10px] font-mono uppercase text-muted-foreground tracking-widest">Ayah Reference</Label>
                <Input
                  value={todayLog.ayah}
                  onChange={(e) => updateTodayLog({ ayah: e.target.value })}
                  placeholder="e.g., Surah Al-Asr 103:1-3"
                  className="bg-background border-border h-9 font-mono text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-mono uppercase text-muted-foreground tracking-widest">Meaning / Translation</Label>
                <Textarea
                  value={todayLog.meaning}
                  onChange={(e) => updateTodayLog({ meaning: e.target.value })}
                  placeholder="By time, indeed, mankind is in loss..."
                  className="bg-background border-border resize-none h-20 text-sm font-amiri"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-mono uppercase text-muted-foreground tracking-widest">Connection to Mission / AI / Life</Label>
                <Textarea
                  value={todayLog.reflection}
                  onChange={(e) => updateTodayLog({ reflection: e.target.value })}
                  placeholder="How does this ayah connect to your mission today?"
                  className="bg-background border-border resize-none h-28 text-sm focus:border-warning transition-colors"
                />
              </div>
            </CardContent>
          </Card>

        </div>
      </div>

      {/* ── Footer Dua ── */}
      <div className="text-center py-3">
        <p className="font-amiri text-base text-muted-foreground/60 italic">
          "رَبِّ زِدْنِي عِلْمًا — My Lord, increase me in knowledge." (Ta-Ha 20:114)
        </p>
      </div>

    </div>
  );
}
