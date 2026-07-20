import { ShieldAlert, AlertTriangle, Target, Book, BrainCircuit, Star, Rocket, Award, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useAppStore } from "@/hooks/use-app-store";
import { motion } from "framer-motion";

// ── Distraction Firewall ─────────────────────────────────────────────────────
export function DistractionFirewall() {
  return (
    <Card className="border-destructive/40 bg-destructive/8 relative overflow-hidden glow-border-destructive">
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-destructive/60 via-destructive to-destructive/60" />
      <CardHeader className="pb-3">
        <CardTitle className="text-destructive flex items-center gap-2 font-mono uppercase tracking-widest text-sm">
          <ShieldAlert className="size-4" /> Distraction Firewall — Active 24/7
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid sm:grid-cols-2 gap-2">
          {[
            "Visionless People & Aimless Conversations",
            "Dopamine Traps — Reels, YT Shorts, Movies",
            "Emotional Distractions / Relationship Traps",
            "Laziness & Procrastination (Zero Tolerance)",
            "Multitasking — One Focus, One Time Block",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-2 rounded bg-destructive/8 border border-destructive/20">
              <AlertTriangle className="size-3.5 text-destructive shrink-0 mt-0.5" />
              <span className="text-xs text-destructive-foreground/85 font-mono">
                <strong className="text-destructive uppercase mr-1">BLOCKED:</strong>{item}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// ── Dashboard ────────────────────────────────────────────────────────────────
export function Dashboard() {
  const { courses, pipeline, certificates, scholarships } = useAppStore();

  const completedCredits = courses.filter(c => c.status === "completed").reduce((sum, c) => sum + c.credits, 0);
  const totalGpaPoints  = courses.filter(c => c.status === "completed").reduce((sum, c) => sum + (c.credits * c.gpa), 0);
  const cgpa = completedCredits > 0 ? (totalGpaPoints / completedCredits).toFixed(2) : "0.00";

  const completedPipeline = pipeline.filter(p => p.status === "completed").length;
  const pipelinePercent   = Math.round((completedPipeline / pipeline.length) * 100);

  const certsDone   = certificates.filter(c => c.status === "Completed").length;
  const certsInProg = certificates.filter(c => c.status === "In Progress").length;

  const scholsApplied = scholarships.filter(s => s.status === "Applied" || s.status === "Applying").length;

  const stats = [
    { icon: Book,        label: "Current CGPA",      value: cgpa,                  sub: `${completedCredits} credits`,      color: "text-primary",   glow: "glow-text" },
    { icon: BrainCircuit,label: "ML/AI Pipeline",    value: `${pipelinePercent}%`, sub: `${completedPipeline}/${pipeline.length} stages`, color: "text-secondary", glow: "glow-text-green" },
    { icon: Award,       label: "Certifications",    value: `${certsDone}/${certificates.length}`, sub: `${certsInProg} in progress`, color: "text-warning", glow: "" },
    { icon: Globe,       label: "Scholarships",      value: `${scholsApplied}/${scholarships.length}`, sub: "applied / tracked",  color: "text-primary",   glow: "glow-text" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">

      {/* ── Vision & Mission ── */}
      <section>
        <Card className="bg-card/60 border-border islamic-card relative overflow-hidden">
          {/* Subtle star pattern in corner */}
          <div className="absolute right-4 top-4 opacity-[0.06] pointer-events-none hidden md:block">
            <svg viewBox="0 0 80 80" className="size-24 fill-primary">
              <polygon points="40,4 46,28 68,28 50,42 57,66 40,52 23,66 30,42 12,28 34,28"/>
            </svg>
          </div>

          <CardHeader className="pb-2">
            <CardTitle className="font-mono uppercase tracking-wider text-sm flex items-center gap-2 text-primary">
              <Target className="size-4" /> Vision · Mission · Why
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">

            {/* Vision */}
            <div className="p-4 rounded-lg border border-primary/20 bg-primary/5">
              <div className="text-[10px] uppercase text-muted-foreground font-mono mb-2 tracking-widest">🎯 Vision</div>
              <p className="font-amiri text-lg md:text-xl text-foreground/95 leading-relaxed">
                "Building scalable AI systems focused on MLOps, Bangla NLP, and production-grade machine learning.
                Focused on LLM systems, retrieval pipelines, and AI infrastructure engineering."
              </p>
            </div>

            {/* Mission */}
            <div className="p-4 rounded-lg border border-secondary/20 bg-secondary/5">
              <div className="text-[10px] uppercase text-muted-foreground font-mono mb-2 tracking-widest">🚀 Mission</div>
              <p className="text-foreground/90 leading-relaxed font-medium">
                Graduate with 3.99+ CGPA · Publish 3–4 high-impact AI/ML papers · Clear IELTS 7.5+ ·
                Secure a full-funded Master's / PhD at MIT, Stanford, or ETH Zurich.
              </p>
            </div>

            {/* 5-Layer WHY */}
            <div>
              <div className="text-[10px] uppercase text-muted-foreground font-mono mb-3 tracking-widest">⚡ The 5-Layer Why Engine</div>
              <Accordion type="single" collapsible className="w-full space-y-1">
                {[
                  { trigger: "Why 1 — Scale AI for Bangladesh",        body: "Solve real-world socioeconomic problems of Bangladesh with scalable ML + LLM systems built for Bangla." },
                  { trigger: "Why 2 — Maintain 3.99+ CGPA",           body: "Become a credible University Lecturer & secure top-tier recommendation letters from professors." },
                  { trigger: "Why 3 — Full-funded Global Scholarship", body: "Eliminate the 30 Lakh BDT family debt. Study at a world-class lab without financial burden." },
                  { trigger: "Why 4 — 3–4 Research Publications",     body: "Unlock gates to MIT, Stanford, ETH Zurich, NUS. Papers are the passport to elite PhD programs." },
                  { trigger: "Why 5 — Master the Quran & Arabic",     body: "Protect Dunya & Akhirah. Build the Quran-based LLM infrastructure for Muslims worldwide." },
                ].map((item, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="border border-border/40 rounded-lg px-3 overflow-hidden bg-card/30">
                    <AccordionTrigger className="text-sm font-medium hover:text-primary py-3 [&>svg]:text-primary">
                      {item.trigger}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm pb-3">
                      {item.body}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

          </CardContent>
        </Card>
      </section>

      {/* ── Quick Stats ── */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ icon: Icon, label, value, sub, color, glow }) => (
          <motion.div key={label} whileHover={{ scale: 1.02 }} transition={{ duration: 0.15 }}>
            <Card className="bg-card/60 border-border hover:border-primary/30 transition-colors islamic-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                  <Icon className={`size-3 ${color}`} /> {label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-3xl font-mono font-bold ${color} ${glow}`}>{value}</div>
                <div className="text-xs text-muted-foreground mt-1 font-mono">{sub}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>

      {/* ── Target Universities ── */}
      <section>
        <Card className="bg-card/60 border-border islamic-card">
          <CardHeader className="pb-3">
            <CardTitle className="font-mono uppercase tracking-wider text-sm flex items-center gap-2 text-primary">
              <Rocket className="size-4" /> Target Universities · 2029 Entry
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {[
                { name: "MIT",           field: "CSAIL / AI Lab",            flag: "🇺🇸" },
                { name: "Stanford",      field: "HAI / ML Group",             flag: "🇺🇸" },
                { name: "ETH Zurich",    field: "AI Center / MLOps",          flag: "🇨🇭" },
                { name: "NUS",           field: "AI Research / NLP",          flag: "🇸🇬" },
                { name: "TU Munich",     field: "ML / Robotics",              flag: "🇩🇪" },
              ].map(u => (
                <div key={u.name} className="p-3 rounded-lg border border-border/50 bg-background/40 hover:border-primary/40 transition-colors text-center">
                  <div className="text-xl mb-1">{u.flag}</div>
                  <div className="font-mono font-bold text-sm text-foreground">{u.name}</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">{u.field}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ── Distraction Firewall ── */}
      <DistractionFirewall />
    </div>
  );
}
