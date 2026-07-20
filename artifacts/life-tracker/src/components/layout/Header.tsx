import { SidebarTrigger } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { format } from "date-fns";

export function Header() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex flex-col border-b border-border bg-background/80 backdrop-blur-md">
      {/* Top bar with clock */}
      <div className="flex h-14 items-center justify-between px-4 border-b border-border/50">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="md:hidden" />
          <div className="font-mono text-sm text-muted-foreground hidden sm:block">
            {format(time, "EEEE, MMMM do, yyyy")}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="font-mono text-primary glow-text text-sm sm:text-base font-bold tracking-wider">
            {format(time, "HH:mm:ss")}
          </div>
        </div>
      </div>
      
      {/* North Star Motivation Area */}
      <div className="px-4 py-6 md:px-8 bg-card/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 opacity-5 pointer-events-none animate-pulse duration-10000" />
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        
        <div className="max-w-4xl">
          <h1 className="text-xl md:text-2xl font-bold font-serif italic text-foreground mb-4">
            "The journey to becoming an AI Engineer isn't about learning everything overnight — it's about mastering one step at a time."
          </h1>
          
          <div className="flex flex-wrap gap-4 sm:gap-8 font-mono text-xs sm:text-sm">
            <div className="flex flex-col">
              <span className="text-muted-foreground uppercase tracking-widest text-[10px]">Trimesters Rem.</span>
              <span className="text-primary font-bold glow-text text-lg">7</span>
            </div>
            <div className="flex flex-col">
              <span className="text-muted-foreground uppercase tracking-widest text-[10px]">Credits Rem.</span>
              <span className="text-primary font-bold glow-text text-lg">87 / 138</span>
            </div>
            <div className="flex flex-col">
              <span className="text-muted-foreground uppercase tracking-widest text-[10px]">Months Rem.</span>
              <span className="text-primary font-bold glow-text text-lg">~26</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
