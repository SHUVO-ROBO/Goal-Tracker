import { useState } from "react";
import { format } from "date-fns";
import { useAppStore } from "@/hooks/use-app-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Heart, Flame, Shield, Moon } from "lucide-react";

export function SpiritualCore() {
  const { spiritualLogs, setSpiritualLogs } = useAppStore();
  
  const today = format(new Date(), 'yyyy-MM-dd');
  const todayLog = spiritualLogs[today] || {
    date: today,
    implemented: false,
    ayah: "",
    meaning: "",
    reflection: "",
    prayers: { fajr: false, dhuhr: false, asr: false, maghrib: false, isha: false }
  };

  const updateTodayLog = (updates: Partial<typeof todayLog>) => {
    setSpiritualLogs({
      ...spiritualLogs,
      [today]: { ...todayLog, ...updates }
    });
  };

  const prayerNames = ["fajr", "dhuhr", "asr", "maghrib", "isha"] as const;

  // Calculate streak
  let streak = 0;
  const sortedDates = Object.keys(spiritualLogs).sort().reverse();
  const currentDateStr = new Date().toISOString().split('T')[0];
  let checkDate = new Date(currentDateStr);
  
  for (let i = 0; i < 30; i++) {
    const dStr = format(checkDate, 'yyyy-MM-dd');
    if (spiritualLogs[dStr]?.implemented) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else if (i === 0) {
      // If today is missing, check yesterday to keep streak alive visually
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-card/50 border-warning/30 glow-border md:col-span-2">
          <CardHeader>
            <CardTitle className="font-mono text-sm uppercase tracking-widest text-warning flex items-center gap-2">
              <Shield className="size-4" /> Daily Principle Check-in
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div>
              <p className="text-lg font-medium">"Did I implement Quranic principles today?"</p>
              <p className="text-sm text-muted-foreground font-mono mt-1">Honesty is the only metric.</p>
            </div>
            <div className="flex items-center gap-3">
              <Label htmlFor="implemented" className="text-xs font-mono uppercase text-muted-foreground">
                {todayLog.implemented ? "Yes" : "No"}
              </Label>
              <Switch 
                id="implemented" 
                checked={todayLog.implemented} 
                onCheckedChange={(c) => updateTodayLog({ implemented: c })}
                className="data-[state=checked]:bg-warning"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border flex flex-col justify-center items-center p-6">
          <Flame className={`size-8 mb-2 ${streak > 0 ? 'text-warning animate-pulse' : 'text-muted-foreground'}`} />
          <div className="text-3xl font-mono font-bold text-foreground">{streak}</div>
          <div className="text-xs uppercase font-mono tracking-widest text-muted-foreground mt-1">Day Streak</div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Ayah Log */}
        <Card className="bg-card/50 border-border">
          <CardHeader>
            <CardTitle className="font-mono text-sm uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Moon className="size-4" /> Daily Ayah & Reflection
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs font-mono uppercase text-muted-foreground">Ayah Reference / Arabic</Label>
              <Input 
                value={todayLog.ayah} 
                onChange={(e) => updateTodayLog({ ayah: e.target.value })} 
                placeholder="e.g., Surah Al-Asr 103:1-3"
                className="bg-background border-border"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-mono uppercase text-muted-foreground">Meaning</Label>
              <Textarea 
                value={todayLog.meaning} 
                onChange={(e) => updateTodayLog({ meaning: e.target.value })} 
                placeholder="By time, indeed, mankind is in loss..."
                className="bg-background border-border resize-none h-20"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-mono uppercase text-muted-foreground">Connection to Life / AI / HCI</Label>
              <Textarea 
                value={todayLog.reflection} 
                onChange={(e) => updateTodayLog({ reflection: e.target.value })} 
                placeholder="How does this apply to my mission?"
                className="bg-background border-border resize-none h-32 focus:border-warning"
              />
            </div>
          </CardContent>
        </Card>

        {/* Prayer Tracker */}
        <Card className="bg-card/50 border-border">
          <CardHeader>
            <CardTitle className="font-mono text-sm uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Heart className="size-4" /> Daily Prayer Log
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {prayerNames.map((prayer) => (
                <div key={prayer} className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border/50">
                  <span className="font-mono uppercase tracking-widest text-sm text-foreground/80">{prayer}</span>
                  <Checkbox 
                    checked={todayLog.prayers[prayer]}
                    onCheckedChange={(c) => updateTodayLog({ 
                      prayers: { ...todayLog.prayers, [prayer]: !!c } 
                    })}
                    className="size-5 data-[state=checked]:bg-warning data-[state=checked]:border-warning data-[state=checked]:text-warning-foreground"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
