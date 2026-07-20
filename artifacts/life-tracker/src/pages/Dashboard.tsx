import { ShieldAlert, Crosshair, AlertTriangle, Target, Book, BrainCircuit } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useAppStore } from "@/hooks/use-app-store";
import { motion } from "framer-motion";

export function DistractionFirewall() {
  return (
    <Card className="border-destructive/50 bg-destructive/10 relative overflow-hidden glow-border-destructive">
      <div className="absolute top-0 left-0 w-full h-1 bg-destructive" />
      <CardHeader className="pb-2">
        <CardTitle className="text-destructive flex items-center gap-2 font-mono uppercase tracking-widest text-sm">
          <ShieldAlert className="size-4" />
          Distraction Firewall
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3 font-mono text-sm">
          {[
            "Visionless People & Aimless Conversations",
            "Dopamine Traps (Reels, YT Music, Movies)",
            "Emotional Distractions / Relationship Traps",
            "Laziness & Procrastination",
            "Multitasking (One Focus, One Time)"
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-destructive-foreground/90">
              <AlertTriangle className="size-4 text-destructive shrink-0 mt-0.5" />
              <span><strong className="text-destructive font-bold uppercase mr-1">BANNED:</strong> {item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export function Dashboard() {
  const { courses, pipeline } = useAppStore();
  
  const completedCredits = courses.filter(c => c.status === "completed").reduce((sum, c) => sum + c.credits, 0);
  const totalGpaPoints = courses.filter(c => c.status === "completed").reduce((sum, c) => sum + (c.credits * c.gpa), 0);
  const cgpa = completedCredits > 0 ? (totalGpaPoints / completedCredits).toFixed(2) : "0.00";

  const completedPipeline = pipeline.filter(p => p.status === "completed").length;
  const pipelinePercent = Math.round((completedPipeline / pipeline.length) * 100);

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500">
      
      {/* Vision & Mission */}
      <section>
        <Card className="bg-card/50 border-border border">
          <CardHeader>
            <CardTitle className="font-mono uppercase tracking-wider text-sm flex items-center gap-2 text-primary">
              <Target className="size-4" /> Mission & Vision
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-xs uppercase text-muted-foreground font-mono mb-2 tracking-widest">Vision</h3>
              <p className="text-foreground/90 leading-relaxed font-serif text-lg">
                "To build scalable AI systems focused on MLOps, Bangla NLP, and production-grade Islamic HCI research for Muslims worldwide."
              </p>
            </div>
            <div>
              <h3 className="text-xs uppercase text-muted-foreground font-mono mb-2 tracking-widest">Mission</h3>
              <p className="text-foreground/90 leading-relaxed font-medium">
                "Graduate with 3.99+ CGPA, publish 3-4 high-impact AI/ML papers, clear IELTS 7.5+, and secure a full-funded Master's/PhD in Europe/USA."
              </p>
            </div>

            <div>
              <h3 className="text-xs uppercase text-muted-foreground font-mono mb-3 tracking-widest">The 5-Layer Why Engine</h3>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="border-border/50">
                  <AccordionTrigger className="text-sm font-medium hover:text-primary">Why 1: Scale AI for Bangladesh</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Solve real-world socioeconomic problems of Bangladesh using scalable ML systems.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="border-border/50">
                  <AccordionTrigger className="text-sm font-medium hover:text-primary">Why 2: Maintain 3.99+ CGPA</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Become a University Lecturer and secure top-tier recommendations.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="border-border/50">
                  <AccordionTrigger className="text-sm font-medium hover:text-primary">Why 3: Full-funded Global Scholarship</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Eliminate the 30 Lakh BDT family debt without financial stress.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4" className="border-border/50">
                  <AccordionTrigger className="text-sm font-medium hover:text-primary">Why 4: 3-4 Research Publications</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Unlock gates to MIT, Stanford, ETH Zurich, or NUS.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5" className="border-border/50">
                  <AccordionTrigger className="text-sm font-medium hover:text-primary">Why 5: Master the Quran & Languages</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Protect Dunya & Akhirah and build the Quran-based LLM infrastructure.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Quick Stats Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-mono uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Book className="size-3" /> Current CGPA
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-mono font-bold text-primary glow-text">{cgpa}</div>
            <div className="text-xs text-muted-foreground mt-1">Based on {completedCredits} credits</div>
          </CardContent>
        </Card>
        
        <Card className="bg-card/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-mono uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <BrainCircuit className="size-3" /> AI Pipeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-mono font-bold text-secondary glow-text" style={{ textShadow: "0 0 10px hsl(var(--secondary)/0.5)" }}>
              {pipelinePercent}%
            </div>
            <div className="text-xs text-muted-foreground mt-1">{completedPipeline} of {pipeline.length} stages done</div>
          </CardContent>
        </Card>

        {/* Can add more summary cards here */}
      </section>

      <DistractionFirewall />
    </div>
  );
}
