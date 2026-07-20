import { useState } from "react";
import { useAppStore, PipelineStage, HCIPaperStage, Certificate, CertProvider } from "@/hooks/use-app-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, ArrowRight, BookOpen, Award, Plus, ExternalLink, Cpu } from "lucide-react";

// ── Provider color config ────────────────────────────────────────────────────
const providerStyle: Record<CertProvider, { badge: string; dot: string }> = {
  IBM:       { badge: "bg-blue-500/15 text-blue-400 border-blue-500/30",       dot: "bg-blue-400" },
  Coursera:  { badge: "bg-primary/15 text-primary border-primary/30",           dot: "bg-primary" },
  Microsoft: { badge: "bg-sky-400/15 text-sky-300 border-sky-400/30",           dot: "bg-sky-400" },
  Google:    { badge: "bg-secondary/15 text-secondary border-secondary/30",     dot: "bg-secondary" },
  Other:     { badge: "bg-muted text-muted-foreground border-border",           dot: "bg-muted-foreground" },
};

const statusStyle: Record<Certificate["status"], string> = {
  "Not Started": "border-border text-muted-foreground",
  "In Progress": "border-primary/40 text-primary bg-primary/10",
  "Completed":   "border-secondary/40 text-secondary bg-secondary/10",
};

// ── Certificate Card ─────────────────────────────────────────────────────────
function CertCard({ cert, onUpdate }: { cert: Certificate; onUpdate: (updated: Certificate) => void }) {
  const [expanded, setExpanded] = useState(false);
  const ps = providerStyle[cert.provider];

  return (
    <div className={`rounded-lg border transition-all ${
      cert.status === "Completed" ? "border-secondary/30 bg-secondary/5" :
      cert.status === "In Progress" ? "border-primary/30 bg-primary/5" :
      "border-border/40 bg-background/40"
    }`}>
      <div
        className="flex items-start justify-between p-4 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${ps.badge}`}>
              {cert.provider}
            </span>
            <span className="text-[10px] font-mono text-muted-foreground">{cert.category}</span>
          </div>
          <div className="font-medium text-sm text-foreground leading-snug">{cert.title}</div>
          <div className="text-[11px] text-muted-foreground font-mono mt-0.5">{cert.platform}</div>
        </div>
        <Select
          value={cert.status}
          onValueChange={(v) => onUpdate({ ...cert, status: v as Certificate["status"] })}
        >
          <SelectTrigger
            className={`w-[130px] h-7 text-[11px] font-mono ml-3 shrink-0 border ${statusStyle[cert.status]}`}
            onClick={(e) => e.stopPropagation()}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Not Started">Not Started</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {expanded && (
        <div className="px-4 pb-4 pt-0 border-t border-border/30 space-y-3 mt-1">
          {cert.notes && (
            <p className="text-xs text-muted-foreground font-mono">{cert.notes}</p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-mono uppercase text-muted-foreground tracking-widest">Completion Date</label>
              <Input
                type="date"
                value={cert.completionDate}
                onChange={(e) => onUpdate({ ...cert, completionDate: e.target.value })}
                className="h-8 text-xs font-mono bg-background border-border"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-mono uppercase text-muted-foreground tracking-widest">Credential ID</label>
              <Input
                placeholder="Badge/credential ID"
                value={cert.credentialId}
                onChange={(e) => onUpdate({ ...cert, credentialId: e.target.value })}
                className="h-8 text-xs font-mono bg-background border-border"
              />
            </div>
            <div className="space-y-1 sm:col-span-2">
              <label className="text-[10px] font-mono uppercase text-muted-foreground tracking-widest">Certificate URL</label>
              <div className="flex gap-2">
                <Input
                  placeholder="https://coursera.org/verify/..."
                  value={cert.certificateUrl}
                  onChange={(e) => onUpdate({ ...cert, certificateUrl: e.target.value })}
                  className="h-8 text-xs font-mono bg-background border-border flex-1"
                />
                {cert.certificateUrl && (
                  <a href={cert.certificateUrl} target="_blank" rel="noreferrer">
                    <Button size="sm" variant="outline" className="h-8 px-2 border-primary/30 text-primary hover:bg-primary/10">
                      <ExternalLink className="size-3.5" />
                    </Button>
                  </a>
                )}
              </div>
            </div>
            <div className="space-y-1 sm:col-span-2">
              <label className="text-[10px] font-mono uppercase text-muted-foreground tracking-widest">Notes</label>
              <Input
                placeholder="Add notes..."
                value={cert.notes}
                onChange={(e) => onUpdate({ ...cert, notes: e.target.value })}
                className="h-8 text-xs font-mono bg-background border-border"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────
export function AIPipeline() {
  const { pipeline, setPipeline, hci, setHci, certificates, setCertificates } = useAppStore();

  const handleStageClick = (id: number) => {
    setPipeline(pipeline.map(stage => {
      if (stage.id !== id) return stage;
      const next = stage.status === "not_started" ? "in_progress"
                 : stage.status === "in_progress"  ? "completed"
                 : "not_started";
      return { ...stage, status: next };
    }));
  };

  const completedCount = pipeline.filter(p => p.status === "completed").length;
  const progressPercent = (completedCount / pipeline.length) * 100;

  const hciStages: HCIPaperStage[] = ["Literature Review", "Data Collection", "Experimentation", "Paper Drafting", "Conference Submission"];

  // Cert stats
  const certsByProvider = (["IBM", "Microsoft", "Coursera"] as CertProvider[]).map(p => ({
    provider: p,
    done: certificates.filter(c => c.provider === p && c.status === "Completed").length,
    total: certificates.filter(c => c.provider === p).length,
    style: providerStyle[p],
  }));
  const certsDone = certificates.filter(c => c.status === "Completed").length;

  const updateCert = (updated: Certificate) => {
    setCertificates(certificates.map(c => c.id === updated.id ? updated : c));
  };

  // Group certs by provider for display
  const providers: CertProvider[] = ["IBM", "Coursera", "Microsoft"];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">

      <Tabs defaultValue="pipeline" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8 bg-card border border-border h-auto p-1 gap-1">
          <TabsTrigger value="pipeline" className="font-mono text-[11px] uppercase py-2 data-[state=active]:bg-primary/15 data-[state=active]:text-primary">
            <Cpu className="size-3 mr-1.5" /> ML/AI Pipeline
          </TabsTrigger>
          <TabsTrigger value="certifications" className="font-mono text-[11px] uppercase py-2 data-[state=active]:bg-secondary/15 data-[state=active]:text-secondary">
            <Award className="size-3 mr-1.5" /> Certifications
          </TabsTrigger>
          <TabsTrigger value="research" className="font-mono text-[11px] uppercase py-2 data-[state=active]:bg-warning/15 data-[state=active]:text-warning">
            <BookOpen className="size-3 mr-1.5" /> Research Hub
          </TabsTrigger>
        </TabsList>

        {/* ── ML/AI PIPELINE TAB ── */}
        <TabsContent value="pipeline" className="m-0">
          <Card className="bg-card/60 border-border islamic-card relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary via-secondary to-primary/40" />
            <CardHeader>
              <div className="flex items-center justify-between mb-3">
                <CardTitle className="font-mono text-sm uppercase tracking-widest text-primary">Core ML/AI Roadmap</CardTitle>
                <div className="text-right">
                  <span className="font-mono text-2xl font-bold text-primary glow-text">{Math.round(progressPercent)}%</span>
                  <div className="text-[10px] font-mono text-muted-foreground">{completedCount}/{pipeline.length} stages</div>
                </div>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="text-[10px] font-mono text-muted-foreground mt-2">Click a stage to cycle: Not Started → In Progress → Completed</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pipeline.map((stage) => (
                  <div
                    key={stage.id}
                    onClick={() => handleStageClick(stage.id)}
                    className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all select-none ${
                      stage.status === "completed"  ? "border-secondary/40 bg-secondary/8 hover:bg-secondary/12" :
                      stage.status === "in_progress"? "border-primary/40 bg-primary/8 glow-border hover:bg-primary/12" :
                      "border-border/40 bg-background/30 hover:bg-card/50"
                    }`}
                  >
                    <div className={`shrink-0 size-9 rounded-full border-2 flex items-center justify-center font-mono text-sm font-bold ${
                      stage.status === "completed"  ? "border-secondary text-secondary bg-secondary/15" :
                      stage.status === "in_progress"? "border-primary text-primary bg-primary/15" :
                      "border-muted-foreground/40 text-muted-foreground"
                    }`}>
                      {stage.status === "completed" ? <CheckCircle2 className="size-4" /> : stage.id}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`text-sm font-medium ${
                        stage.status === "completed"   ? "text-secondary" :
                        stage.status === "in_progress" ? "text-primary" :
                        "text-muted-foreground"
                      }`}>
                        {stage.title}
                      </div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/70 mt-0.5">
                        {stage.status.replace("_", " ")}
                      </div>
                    </div>
                    {stage.status === "in_progress" && (
                      <div className="shrink-0 size-2 rounded-full bg-primary animate-pulse" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── CERTIFICATIONS TAB ── */}
        <TabsContent value="certifications" className="m-0 space-y-6">

          {/* Summary row */}
          <div className="grid grid-cols-3 gap-4">
            {certsByProvider.map(({ provider, done, total, style }) => (
              <Card key={provider} className="bg-card/60 border-border islamic-card text-center py-4">
                <div className={`text-[10px] font-mono uppercase tracking-widest mb-1 ${style.badge.split(" ")[1]}`}>{provider}</div>
                <div className="font-mono font-bold text-2xl text-foreground">{done}<span className="text-muted-foreground text-sm">/{total}</span></div>
                <div className="text-[10px] text-muted-foreground font-mono">completed</div>
              </Card>
            ))}
          </div>

          {/* Certs grouped by provider */}
          {providers.map(provider => {
            const provCerts = certificates.filter(c => c.provider === provider);
            if (provCerts.length === 0) return null;
            return (
              <div key={provider}>
                <div className="flex items-center gap-2 mb-3">
                  <div className={`size-2 rounded-full ${providerStyle[provider].dot}`} />
                  <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{provider} Courses</h3>
                  <div className="flex-1 h-px bg-border/40" />
                  <span className="font-mono text-[10px] text-muted-foreground">
                    {provCerts.filter(c => c.status === "Completed").length}/{provCerts.length} done
                  </span>
                </div>
                <div className="space-y-2">
                  {provCerts.map(cert => (
                    <CertCard key={cert.id} cert={cert} onUpdate={updateCert} />
                  ))}
                </div>
              </div>
            );
          })}

          {/* Total completed summary */}
          <div className="p-4 rounded-lg border border-secondary/30 bg-secondary/8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Award className="size-5 text-secondary" />
              <div>
                <div className="font-mono text-sm font-bold text-secondary">{certsDone} Certificates Earned</div>
                <div className="text-[11px] text-muted-foreground font-mono">{certificates.length - certsDone} remaining in plan</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-mono text-2xl font-bold text-secondary glow-text-green">
                {Math.round((certsDone / certificates.length) * 100)}%
              </div>
              <div className="text-[10px] text-muted-foreground font-mono">complete</div>
            </div>
          </div>
        </TabsContent>

        {/* ── RESEARCH HUB TAB ── */}
        <TabsContent value="research" className="m-0">
          <Card className="bg-card/60 border-border islamic-card">
            <CardHeader>
              <CardTitle className="font-mono text-sm uppercase tracking-widest text-warning flex items-center gap-2">
                <BookOpen className="size-4" /> Islamic HCI Research Hub
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-warning/10 border border-warning/25 rounded-xl p-4 text-center">
                  <div className="text-[10px] uppercase text-muted-foreground font-mono mb-1">Target</div>
                  <div className="text-2xl font-mono font-bold text-warning">3–4</div>
                  <div className="text-[11px] font-mono text-muted-foreground">Papers</div>
                </div>
                <div className="bg-warning/10 border border-warning/25 rounded-xl p-4 text-center">
                  <div className="text-[10px] uppercase text-muted-foreground font-mono mb-1">Published / Submitted</div>
                  <div className="flex items-center justify-center gap-2">
                    <Input
                      type="number"
                      min={0} max={10}
                      value={hci.papersPublished}
                      onChange={(e) => setHci({ ...hci, papersPublished: parseInt(e.target.value) || 0 })}
                      className="w-16 h-10 bg-background font-mono text-xl text-warning border-warning/40 text-center"
                    />
                    <span className="font-mono text-xl text-warning">/ 4</span>
                  </div>
                </div>
              </div>

              {/* Pipeline stages */}
              <div className="space-y-2">
                <div className="text-[10px] uppercase text-muted-foreground font-mono tracking-widest">Current Paper Stage</div>
                <div className="flex flex-col sm:flex-row gap-2">
                  {hciStages.map((stage, idx) => (
                    <div key={stage} className="flex-1 flex flex-col sm:flex-row items-center gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        className={`w-full text-[11px] h-10 font-mono ${
                          hci.stage === stage
                            ? "border-warning bg-warning/15 text-warning hover:bg-warning/20 hover:text-warning"
                            : "border-border text-muted-foreground hover:text-foreground"
                        }`}
                        onClick={() => setHci({ ...hci, stage })}
                      >
                        {stage}
                      </Button>
                      {idx < hciStages.length - 1 && (
                        <ArrowRight className="size-3 text-muted-foreground/50 hidden sm:block shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <div className="text-[10px] uppercase text-muted-foreground font-mono tracking-widest">Active Paper Notes</div>
                <textarea
                  value={hci.notes}
                  onChange={(e) => setHci({ ...hci, notes: e.target.value })}
                  className="w-full h-32 bg-background border border-border rounded-lg p-3 text-sm focus:outline-none focus:border-warning resize-none text-foreground/90 font-mono transition-colors"
                  placeholder="e.g., Corpus extraction logic from Quran.com API in progress, targeting ACL 2028..."
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
