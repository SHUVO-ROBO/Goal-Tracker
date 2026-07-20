import { useAppStore, PipelineStage, HCIPaperStage } from "@/hooks/use-app-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, Circle, ArrowRight, BookOpen, PenTool } from "lucide-react";

export function AIPipeline() {
  const { pipeline, setPipeline, hci, setHci } = useAppStore();

  const handleStageClick = (id: number) => {
    setPipeline(pipeline.map(stage => {
      if (stage.id === id) {
        const nextStatus = stage.status === "not_started" ? "in_progress" 
                        : stage.status === "in_progress" ? "completed" 
                        : "not_started";
        return { ...stage, status: nextStatus };
      }
      return stage;
    }));
  };

  const completedCount = pipeline.filter(p => p.status === "completed").length;
  const progressPercent = (completedCount / pipeline.length) * 100;

  const hciStages: HCIPaperStage[] = ["Literature Review", "Data Collection", "Experimentation", "Paper Drafting", "Conference Submission"];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* 7-Stage Core Pipeline */}
      <Card className="bg-card/50 border-border relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary" />
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <CardTitle className="font-mono text-sm uppercase tracking-widest text-primary">Core ML/AI Pipeline</CardTitle>
            <span className="font-mono text-xl font-bold text-primary">{Math.round(progressPercent)}%</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${progressPercent}%` }} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
            {pipeline.map((stage, i) => (
              <div 
                key={stage.id} 
                onClick={() => handleStageClick(stage.id)}
                className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active cursor-pointer p-3 rounded-lg border transition-all ${
                  stage.status === 'completed' ? 'border-primary/50 bg-primary/5' : 
                  stage.status === 'in_progress' ? 'border-secondary/50 bg-secondary/10 glow-border' : 
                  'border-border bg-card/20 hover:bg-card/40'
                }`}
              >
                <div className="flex items-center gap-4 w-full">
                  <div className={`flex-shrink-0 size-8 rounded-full border-2 flex items-center justify-center font-mono text-xs ${
                    stage.status === 'completed' ? 'border-primary text-primary bg-primary/10' :
                    stage.status === 'in_progress' ? 'border-secondary text-secondary bg-secondary/10' :
                    'border-muted-foreground text-muted-foreground'
                  }`}>
                    {stage.status === 'completed' ? <CheckCircle2 className="size-4" /> : stage.id}
                  </div>
                  <div className="flex-1">
                    <h4 className={`text-sm font-medium ${
                      stage.status === 'completed' ? 'text-primary' :
                      stage.status === 'in_progress' ? 'text-secondary' :
                      'text-muted-foreground'
                    }`}>
                      {stage.title}
                    </h4>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                      {stage.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Islamic HCI Research Hub */}
      <Card className="bg-card/50 border-border">
        <CardHeader>
          <CardTitle className="font-mono text-sm uppercase tracking-widest text-secondary flex items-center gap-2">
            <BookOpen className="size-4" />
            Islamic HCI Research Hub
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="bg-secondary/10 border border-secondary/30 rounded-lg p-4 flex-1">
              <div className="text-xs uppercase text-muted-foreground font-mono mb-1">Target</div>
              <div className="text-xl font-mono text-secondary">3-4 Papers</div>
            </div>
            <div className="bg-secondary/10 border border-secondary/30 rounded-lg p-4 flex-1">
              <div className="text-xs uppercase text-muted-foreground font-mono mb-1">Published/Submitted</div>
              <div className="flex items-center gap-2">
                <Input 
                  type="number" 
                  value={hci.papersPublished}
                  onChange={(e) => setHci({...hci, papersPublished: parseInt(e.target.value) || 0})}
                  className="w-16 h-8 bg-background font-mono text-lg text-secondary border-secondary/50"
                />
                <span className="font-mono text-lg text-secondary">/ 4</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-xs uppercase text-muted-foreground font-mono mb-2">Current Paper Pipeline</div>
            <div className="flex flex-col sm:flex-row gap-2">
              {hciStages.map((stage, idx) => (
                <div key={stage} className="flex-1 flex flex-col sm:flex-row items-center gap-2">
                  <Button
                    variant="outline"
                    className={`w-full justify-start sm:justify-center text-xs h-10 ${
                      hci.stage === stage 
                        ? 'border-secondary bg-secondary/10 text-secondary hover:bg-secondary/20 hover:text-secondary' 
                        : 'border-border text-muted-foreground'
                    }`}
                    onClick={() => setHci({...hci, stage})}
                  >
                    {stage}
                  </Button>
                  {idx < hciStages.length - 1 && <ArrowRight className="size-4 text-muted-foreground hidden sm:block shrink-0" />}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-xs uppercase text-muted-foreground font-mono">Active Paper Notes</div>
            <textarea 
              value={hci.notes}
              onChange={(e) => setHci({...hci, notes: e.target.value})}
              className="w-full h-32 bg-background border border-border rounded-md p-3 text-sm focus:outline-none focus:border-secondary resize-none text-foreground/90 font-mono"
              placeholder="e.g., Corpus extraction logic from Quran.com API in progress..."
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
