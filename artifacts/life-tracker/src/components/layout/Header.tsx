import { SidebarTrigger } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { format } from "date-fns";

const QUOTE = "Building scalable AI systems — one focused day at a time. لَا تَيْأَسُوا مِنْ رَوْحِ اللَّهِ";

// Days until graduation (approx 26 months → Aug 2028)
const GRAD_DATE = new Date("2028-08-01");

function getDaysUntil(target: Date): number {
  return Math.max(0, Math.ceil((target.getTime() - Date.now()) / (1000 * 60 * 60 * 24)));
}

export function Header() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const daysLeft = getDaysUntil(GRAD_DATE);
  const prayerTimes = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/90 backdrop-blur-md">
      
      {/* ── Top bar ── */}
      <div className="flex h-12 items-center justify-between px-4 md:px-6 border-b border-border/30">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="hidden md:flex" />
          <div className="font-mono text-xs text-muted-foreground hidden sm:block tracking-wide">
            {format(time, "EEEE, MMMM do, yyyy")}
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Prayer labels — decorative quick ref */}
          <div className="hidden lg:flex items-center gap-2">
            {prayerTimes.map(p => (
              <span key={p} className="text-[10px] font-mono text-muted-foreground/50 uppercase tracking-widest">{p}</span>
            ))}
          </div>
          <div className="w-px h-4 bg-border hidden lg:block" />
          <div className="font-mono text-primary glow-text text-sm font-bold tracking-widest tabular-nums">
            {format(time, "HH:mm:ss")}
          </div>
        </div>
      </div>

      {/* ── North Star Banner ── */}
      <div className="relative px-4 py-5 md:px-8 overflow-hidden">
        {/* Geometric accent lines */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-border to-transparent" />

        {/* Islamic star motif — top right */}
        <div className="absolute right-6 top-3 opacity-10 hidden md:block">
          <svg viewBox="0 0 48 48" className="size-16 text-primary fill-current">
            <polygon points="24,2 29,18 44,18 32,28 37,44 24,34 11,44 16,28 4,18 19,18"/>
          </svg>
        </div>

        <div className="max-w-4xl relative">
          {/* Motivational quote */}
          <p className="font-amiri text-lg md:text-xl text-foreground/90 italic leading-snug mb-4">
            "{QUOTE}"
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap gap-4 sm:gap-8">
            {[
              { label: "Trimesters Left", value: "7" },
              { label: "Credits Done / Total", value: "51 / 138" },
              { label: "Days to Graduation", value: daysLeft.toLocaleString() },
              { label: "Target CGPA", value: "3.99+" },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col">
                <span className="text-muted-foreground uppercase tracking-widest text-[10px] font-mono">{label}</span>
                <span className="text-primary font-mono font-bold glow-text text-lg leading-none mt-0.5">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
