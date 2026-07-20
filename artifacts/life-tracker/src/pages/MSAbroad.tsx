import { Fragment, useState } from "react";
import { useAppStore, IELTSSegmentKey, IELTSSegmentData, MockTestEntry } from "@/hooks/use-app-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Globe, GraduationCap, FileText, Briefcase, Plus,
  CalendarDays, Info, Pencil, Check, X, ChevronDown, ChevronUp,
  BookOpen, Mic, PenLine, Headphones,
} from "lucide-react";

// ── helpers ───────────────────────────────────────────────────────────────────
function daysUntil(isoDate: string): number | null {
  if (!isoDate || isoDate === "TBA" || isoDate === "Rolling") return null;
  return Math.ceil((new Date(isoDate).getTime() - Date.now()) / 86400000);
}

function DeadlineBadge({ deadline, small }: { deadline: string; small?: boolean }) {
  const days = daysUntil(deadline);
  if (days === null) return <span className={`font-mono text-muted-foreground ${small ? "text-[10px]" : "text-xs"}`}>{deadline}</span>;
  const color = days < 0 ? "text-muted-foreground line-through" : days < 60 ? "text-destructive font-bold" : days < 180 ? "text-warning font-semibold" : "text-secondary";
  const label = new Date(deadline).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "2-digit" });
  return (
    <div className="flex flex-col leading-tight">
      <span className={`font-mono ${small ? "text-[10px]" : "text-xs"} ${color}`}>{label}</span>
      <span className={`font-mono ${small ? "text-[9px]" : "text-[10px]"} ${color}`}>
        {days < 0 ? "Passed" : `${days.toLocaleString()}d`}
      </span>
    </div>
  );
}

const STATUS_COLORS: Record<string, string> = {
  Researching: "bg-muted text-muted-foreground border-border",
  Applying:    "bg-primary/15 text-primary border-primary/30",
  Applied:     "bg-secondary/15 text-secondary border-secondary/30",
  Result:      "bg-warning/15 text-warning border-warning/30",
};

// ── IELTS segment config ──────────────────────────────────────────────────────
const SEGMENT_META: Record<IELTSSegmentKey, {
  label: string; icon: typeof Headphones; color: string; accent: string;
  tips: string[]; resource: string;
}> = {
  listening: {
    label: "Listening", icon: Headphones, color: "text-sky-400", accent: "border-sky-400/40 bg-sky-400/5",
    resource: "Cambridge IELTS 16–20 · IELTS Premium Portal (10 tests)",
    tips: [
      "Do ALL 20 Cambridge tests (books 16–20, 4 tests each) timed under real exam conditions.",
      "Cambridge materials closely match the real test. Premium portal tests are harder & dated.",
      "Simulate exam day: no pausing, headphones, answer sheet transfer in 10 min.",
      "After each test review every wrong answer — understand why, not just what.",
    ],
  },
  reading: {
    label: "Reading", icon: BookOpen, color: "text-emerald-400", accent: "border-emerald-400/40 bg-emerald-400/5",
    resource: "Cambridge IELTS 16–20 · YouTube tips (matching headings)",
    tips: [
      "Do Cambridge 16–20 reading tests timed (60 min strict). Then 10 more on Premium portal.",
      "Answers appear mostly in order — exceptions: matching headings, global meaning questions.",
      "Tackle Matching Headings FIRST — most difficult; finishing it gives peace of mind.",
      "Practice skimming (main idea) + scanning (specific info) — timing is everything.",
      "10 min left at end? Double-check all answers, especially fill-in-the-blank spelling.",
    ],
  },
  writing: {
    label: "Writing", icon: PenLine, color: "text-amber-400", accent: "border-amber-400/40 bg-amber-400/5",
    resource: "BBC / CNN articles · ChatGPT band-9 essays · IELTS Advantage",
    tips: [
      "Do Task 2 FIRST (30 min) → Task 1 (15 min) → 15 min review & grammar fix.",
      "Spend 5 min planning bullet points before writing — don't skip this!",
      "Band 8–9 writing reads like a newspaper: clear, succinct, no bombastic vocab, no errors.",
      "Read BBC & CNN articles daily — that tone, that clarity is exactly what examiners want.",
      "Use ChatGPT to generate band-9 model essays for 100+ IELTS topics, then find patterns.",
      "Spell-check mentally while writing. One careless error drags your score down.",
    ],
  },
  speaking: {
    label: "Speaking", icon: Mic, color: "text-rose-400", accent: "border-rose-400/40 bg-rose-400/5",
    resource: "IELTS Advantage YouTube (Chris) · Daily English conversation",
    tips: [
      "Be natural & spontaneous — imagine talking to a friend about important topics.",
      "If examiner throws an unexpected 'Why?' — say 'That's a tough one, give me a moment.' It's okay.",
      "Unexpected follow-ups mean the examiner is considering a HIGHER band for you.",
      "Watch IELTS Advantage channel (Chris) for all 4 modules — excellent free resource.",
      "Keep your calm. Nerves lose you 0.5 bands. Practice staying composed under pressure.",
      "Record yourself on phone and listen back — identify filler words, pauses, grammar slips.",
    ],
  },
};

const BAND_OPTIONS = [0, 4.0, 4.5, 5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0];

// ── IELTS segment card ────────────────────────────────────────────────────────
function SegmentCard({
  segKey, data, onChange,
}: {
  segKey: IELTSSegmentKey;
  data: IELTSSegmentData;
  onChange: (d: Partial<IELTSSegmentData>) => void;
}) {
  const [showTips, setShowTips] = useState(false);
  const meta = SEGMENT_META[segKey];
  const Icon = meta.icon;
  const progress = data.targetBand > 0 ? Math.min((data.currentBand / data.targetBand) * 100, 100) : 0;
  const cambPct = Math.round((data.cambridgeCompleted / 20) * 100);

  return (
    <Card className={`border ${meta.accent} islamic-card`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon className={`size-4 ${meta.color}`} />
            <span className={`font-mono text-sm uppercase tracking-widest font-bold ${meta.color}`}>{meta.label}</span>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              checked={data.completed}
              onCheckedChange={c => onChange({ completed: !!c })}
              className="data-[state=checked]:bg-secondary data-[state=checked]:border-secondary"
            />
            <span className="text-[10px] text-muted-foreground font-mono">Mastered</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Band scores */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest mb-1">Current Band</div>
            <Select value={String(data.currentBand)} onValueChange={v => onChange({ currentBand: Number(v) })}>
              <SelectTrigger className={`h-9 font-mono font-bold text-base border-border bg-background ${meta.color}`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {BAND_OPTIONS.map(b => <SelectItem key={b} value={String(b)}>{b === 0 ? "— Not set" : b.toFixed(1)}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <div className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest mb-1">Target Band</div>
            <Select value={String(data.targetBand)} onValueChange={v => onChange({ targetBand: Number(v) })}>
              <SelectTrigger className="h-9 font-mono font-bold text-base border-border bg-background text-primary">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {BAND_OPTIONS.filter(b => b > 0).map(b => <SelectItem key={b} value={String(b)}>{b.toFixed(1)}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Band progress */}
        {data.currentBand > 0 && (
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
              <span>{data.currentBand.toFixed(1)} → {data.targetBand.toFixed(1)}</span>
              <span className={progress >= 100 ? "text-secondary" : meta.color}>{progress.toFixed(0)}%</span>
            </div>
            <Progress value={progress} className="h-1.5 bg-muted" />
          </div>
        )}

        {/* Cambridge progress: 20 slots (books 16–20, 4 each) */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">
              Cambridge Tests ({data.cambridgeCompleted}/20)
            </div>
            <span className="text-[10px] font-mono text-muted-foreground">{cambPct}%</span>
          </div>
          <div className="grid grid-cols-10 gap-1">
            {Array.from({ length: 20 }, (_, i) => {
              const done = i < data.cambridgeCompleted;
              const book = Math.floor(i / 4) + 16; // 16, 17, 18, 19, 20
              const testN = (i % 4) + 1;
              return (
                <button
                  key={i}
                  onClick={() => onChange({ cambridgeCompleted: done ? i : i + 1 })}
                  title={`Cambridge ${book} — Test ${testN}`}
                  className={`h-5 rounded-sm border text-[8px] font-mono transition-all ${
                    done
                      ? `border-transparent text-white ${meta.color.replace("text-", "bg-").replace("400", "500")}`
                      : "border-border/40 text-muted-foreground hover:border-border"
                  }`}
                >
                  {testN}
                </button>
              );
            })}
          </div>
          <div className="flex justify-between text-[9px] font-mono text-muted-foreground mt-1 px-0.5">
            {[16,17,18,19,20].map(b => <span key={b}>Bk{b}</span>)}
          </div>
        </div>

        {/* Resource */}
        <div className="text-[10px] font-mono text-muted-foreground border border-border/30 rounded-lg px-3 py-2 bg-background/30">
          📚 {meta.resource}
        </div>

        {/* Tips toggle */}
        <button
          onClick={() => setShowTips(!showTips)}
          className={`w-full flex items-center justify-between text-[10px] font-mono uppercase tracking-widest py-1.5 px-2 rounded-lg transition-colors ${
            showTips ? `${meta.accent} ${meta.color}` : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <span>Strategy Tips ({meta.tips.length})</span>
          {showTips ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />}
        </button>

        {showTips && (
          <div className="space-y-2">
            {meta.tips.map((tip, i) => (
              <div key={i} className="flex gap-2 text-xs text-muted-foreground">
                <span className={`shrink-0 font-mono font-bold ${meta.color}`}>{i + 1}.</span>
                <span>{tip}</span>
              </div>
            ))}
          </div>
        )}

        {/* Notes */}
        <input
          type="text"
          value={data.notes}
          onChange={e => onChange({ notes: e.target.value })}
          placeholder={`Personal notes for ${meta.label.toLowerCase()}...`}
          className="w-full bg-transparent border-b border-border/30 hover:border-border focus:border-primary/60 focus:outline-none text-xs text-muted-foreground transition-colors pb-1"
        />
      </CardContent>
    </Card>
  );
}

// ── Add mock test form ────────────────────────────────────────────────────────
function AddMockTestForm({ onAdd }: { onAdd: (t: MockTestEntry) => void }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    date: new Date().toISOString().split("T")[0],
    source: "Cambridge 16",
    listening: "", reading: "", writing: "", speaking: "", notes: "",
  });

  if (!open) {
    return (
      <Button size="sm" variant="outline" className="border-secondary/40 text-secondary hover:bg-secondary/10 h-8"
        onClick={() => setOpen(true)}>
        <Plus className="size-3 mr-1.5" /> Log Mock Test
      </Button>
    );
  }

  const save = () => {
    const l = Number(form.listening); const r = Number(form.reading);
    const w = Number(form.writing);   const s = Number(form.speaking);
    if (!l && !r && !w && !s) return;
    const overall = Number(((l + r + w + s) / 4).toFixed(1));
    onAdd({ id: crypto.randomUUID(), date: form.date, source: form.source, listening: l, reading: r, writing: w, speaking: s, overall, notes: form.notes });
    setOpen(false);
    setForm({ date: new Date().toISOString().split("T")[0], source: "Cambridge 16", listening: "", reading: "", writing: "", speaking: "", notes: "" });
  };

  const bandField = (key: string, label: string) => (
    <div>
      <div className="text-[10px] font-mono text-muted-foreground mb-1">{label}</div>
      <Select value={form[key as keyof typeof form]} onValueChange={v => setForm({ ...form, [key]: v })}>
        <SelectTrigger className="h-8 text-xs font-mono bg-background border-border">
          <SelectValue placeholder="—" />
        </SelectTrigger>
        <SelectContent>
          {BAND_OPTIONS.filter(b => b > 0).map(b => <SelectItem key={b} value={String(b)}>{b.toFixed(1)}</SelectItem>)}
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <div className="p-4 rounded-xl border border-secondary/30 bg-secondary/5 space-y-3">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div>
          <div className="text-[10px] font-mono text-muted-foreground mb-1">Date</div>
          <Input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })}
            className="h-8 text-xs font-mono bg-background border-border" />
        </div>
        <div>
          <div className="text-[10px] font-mono text-muted-foreground mb-1">Source</div>
          <Select value={form.source} onValueChange={v => setForm({ ...form, source: v })}>
            <SelectTrigger className="h-8 text-xs font-mono bg-background border-border"><SelectValue /></SelectTrigger>
            <SelectContent>
              {["Cambridge 16","Cambridge 17","Cambridge 18","Cambridge 19","Cambridge 20","IELTS Premium Portal","British Council","IDP Mock","Other"].map(s => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {bandField("listening", "Listening")}
        {bandField("reading",   "Reading")}
        {bandField("writing",   "Writing")}
        {bandField("speaking",  "Speaking")}
      </div>
      <Input placeholder="Notes (optional)" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })}
        className="h-8 text-xs bg-background border-border" />
      <div className="flex gap-2">
        <Button size="sm" className="h-8 bg-secondary text-secondary-foreground" onClick={save}><Check className="size-3 mr-1.5" /> Save</Button>
        <Button size="sm" variant="ghost" className="h-8" onClick={() => setOpen(false)}>Cancel</Button>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export function MSAbroad() {
  const {
    documents, setDocuments, scholarships, setScholarships,
    internships, setInternships, vocab, setVocab,
    ielts, setIelts, mockTests, setMockTests,
  } = useAppStore();

  const [newVocab, setNewVocab]         = useState("");
  const [expandedSchol, setExpandedSchol] = useState<string | null>(null);
  const [editingDeadline, setEditingDeadline] = useState<string | null>(null);
  const [deadlineDraft, setDeadlineDraft]     = useState("");
  const [scholSearch, setScholSearch]   = useState("");
  const [scholFilter, setScholFilter]   = useState<string>("All");

  const doneCount  = documents.filter(d => d.status === "Done").length;
  const docProgress = Math.round((doneCount / documents.length) * 100);

  const updateSegment = (key: IELTSSegmentKey, patch: Partial<typeof ielts[typeof key]>) => {
    setIelts({ ...ielts, [key]: { ...ielts[key], ...patch } });
  };

  const addMockTest = (t: MockTestEntry) => {
    setMockTests([t, ...mockTests]);
    // auto-update current bands from latest mock
    setIelts({
      ...ielts,
      overallBand: t.overall,
      listening: { ...ielts.listening, currentBand: t.listening },
      reading:   { ...ielts.reading,   currentBand: t.reading   },
      writing:   { ...ielts.writing,   currentBand: t.writing   },
      speaking:  { ...ielts.speaking,  currentBand: t.speaking  },
    });
  };

  const saveDeadline = (id: string) => {
    setScholarships(scholarships.map(s => s.id === id ? { ...s, deadline: deadlineDraft } : s));
    setEditingDeadline(null);
  };

  const allCountries = ["All", ...Array.from(new Set(scholarships.map(s => s.country)))];
  const filteredScholars = scholarships.filter(s => {
    const matchCountry = scholFilter === "All" || s.country === scholFilter;
    const matchSearch  = !scholSearch || s.name.toLowerCase().includes(scholSearch.toLowerCase());
    return matchCountry && matchSearch;
  });

  const overallAvg = (["listening","reading","writing","speaking"] as IELTSSegmentKey[])
    .reduce((a, k) => a + ielts[k].currentBand, 0) / 4;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <Tabs defaultValue="scholarships" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8 bg-card border border-border h-auto p-1 gap-1">
          {[
            { value:"scholarships", icon:GraduationCap, label:"Scholarships (50)", color:"data-[state=active]:bg-primary/15 data-[state=active]:text-primary" },
            { value:"documents",    icon:FileText,      label:"Documents",         color:"data-[state=active]:bg-primary/15 data-[state=active]:text-primary" },
            { value:"ielts",        icon:Globe,         label:"IELTS Tracker",     color:"data-[state=active]:bg-secondary/15 data-[state=active]:text-secondary" },
            { value:"internships",  icon:Briefcase,     label:"ECA",               color:"data-[state=active]:bg-warning/15 data-[state=active]:text-warning" },
          ].map(t => (
            <TabsTrigger key={t.value} value={t.value} className={`font-mono text-[11px] uppercase py-2 ${t.color}`}>
              <t.icon className="size-3 mr-1.5" />{t.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* ══ SCHOLARSHIPS (50) ══════════════════════════════════════════════ */}
        <TabsContent value="scholarships" className="space-y-4 m-0">
          <Card className="bg-card/60 border-border islamic-card">
            <CardHeader className="pb-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <CardTitle className="font-mono text-sm uppercase text-primary flex items-center gap-2">
                  <GraduationCap className="size-4" /> 50 Scholarships — 2029 Intake
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-[10px] font-mono text-secondary border-secondary/40">
                    {scholarships.filter(s => s.status !== "Researching").length} Active
                  </Badge>
                  <Badge variant="outline" className="text-[10px] font-mono text-muted-foreground">
                    {scholarships.length} Total
                  </Badge>
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-2 mt-3">
                <Input
                  placeholder="Search scholarships..."
                  value={scholSearch}
                  onChange={e => setScholSearch(e.target.value)}
                  className="h-8 text-xs bg-background border-border w-48"
                />
                <Select value={scholFilter} onValueChange={setScholFilter}>
                  <SelectTrigger className="h-8 text-xs font-mono bg-background border-border w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {allCountries.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border/50 text-[10px] font-mono text-muted-foreground uppercase">
                      <th className="py-3 px-4">#</th>
                      <th className="py-3 px-2">Program</th>
                      <th className="py-3 px-2">Country</th>
                      <th className="py-3 px-2">Deadline ✎</th>
                      <th className="py-3 px-2 hidden sm:table-cell">Reqs</th>
                      <th className="py-3 px-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredScholars.map((schol, idx) => (
                      <Fragment key={schol.id}>
                        <tr
                          className="border-b border-border/20 hover:bg-primary/5 cursor-pointer transition-colors"
                          onClick={() => setExpandedSchol(expandedSchol === schol.id ? null : schol.id)}
                        >
                          <td className="py-2.5 px-4 font-mono text-[10px] text-muted-foreground">{idx + 1}</td>
                          <td className="py-2.5 px-2">
                            <div className="font-semibold text-foreground text-sm leading-tight">{schol.name}</div>
                          </td>
                          <td className="py-2.5 px-2 text-xs whitespace-nowrap">{schol.country}</td>
                          <td className="py-2.5 px-2" onClick={e => e.stopPropagation()}>
                            {editingDeadline === schol.id ? (
                              <div className="flex items-center gap-1">
                                <Input
                                  type="date"
                                  value={deadlineDraft}
                                  onChange={e => setDeadlineDraft(e.target.value)}
                                  className="h-7 text-[10px] font-mono bg-background border-primary/50 w-32"
                                  autoFocus
                                />
                                <button onClick={() => saveDeadline(schol.id)}
                                  className="text-secondary hover:text-secondary/80 p-0.5"><Check className="size-3" /></button>
                                <button onClick={() => setEditingDeadline(null)}
                                  className="text-muted-foreground hover:text-foreground p-0.5"><X className="size-3" /></button>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1 group">
                                <DeadlineBadge deadline={schol.deadline} small />
                                <button
                                  onClick={() => { setDeadlineDraft(schol.deadline); setEditingDeadline(schol.id); }}
                                  className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-primary transition-all p-0.5"
                                >
                                  <Pencil className="size-2.5" />
                                </button>
                              </div>
                            )}
                          </td>
                          <td className="py-2.5 px-2 hidden sm:table-cell" onClick={e => e.stopPropagation()}>
                            <Checkbox checked={schol.metRequirements}
                              onCheckedChange={c => setScholarships(scholarships.map(s => s.id === schol.id ? { ...s, metRequirements: !!c } : s))}
                              className="data-[state=checked]:bg-secondary data-[state=checked]:border-secondary" />
                          </td>
                          <td className="py-2.5 px-2" onClick={e => e.stopPropagation()}>
                            <Select value={schol.status}
                              onValueChange={v => setScholarships(scholarships.map(s => s.id === schol.id ? { ...s, status: v as any } : s))}>
                              <SelectTrigger className={`w-[110px] h-7 text-[10px] font-mono border ${STATUS_COLORS[schol.status] || ""}`}>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Researching">Researching</SelectItem>
                                <SelectItem value="Applying">Applying</SelectItem>
                                <SelectItem value="Applied">Applied</SelectItem>
                                <SelectItem value="Result">Result</SelectItem>
                              </SelectContent>
                            </Select>
                          </td>
                        </tr>
                        {expandedSchol === schol.id && schol.notes && (
                          <tr className="border-b border-border/20 bg-primary/5">
                            <td colSpan={6} className="px-4 py-2.5">
                              <div className="flex items-start gap-2 text-xs text-muted-foreground font-mono">
                                <Info className="size-3 mt-0.5 text-primary shrink-0" />
                                {schol.notes}
                              </div>
                            </td>
                          </tr>
                        )}
                      </Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[10px] text-muted-foreground font-mono px-4 py-2">
                💡 Click row to expand notes · Hover deadline to edit · All for 2029 intake (apps open ~2028)
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ══ DOCUMENTS ══════════════════════════════════════════════════════ */}
        <TabsContent value="documents" className="space-y-4 m-0">
          <Card className="bg-card/60 border-border islamic-card">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="font-mono text-sm uppercase text-primary">Master Document Checklist</CardTitle>
                <span className="font-mono text-xs text-muted-foreground">{doneCount}/{documents.length} Done</span>
              </div>
              <Progress value={docProgress} className="h-1.5 mt-2 bg-muted" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {documents.map(doc => (
                  <div key={doc.id} className="flex items-center justify-between p-3 rounded-lg border border-border/40 bg-background/40 hover:bg-card/50 transition-colors">
                    <div>
                      <div className={`text-sm font-medium ${doc.status === "Done" ? "text-muted-foreground line-through" : "text-foreground"}`}>
                        {doc.task}
                      </div>
                      {doc.meta && <div className="text-[11px] text-muted-foreground font-mono mt-0.5">{doc.meta}</div>}
                    </div>
                    <Select value={doc.status} onValueChange={v => setDocuments(documents.map(d => d.id === doc.id ? { ...d, status: v as any } : d))}>
                      <SelectTrigger className={`w-[130px] h-8 text-xs font-mono border ${
                        doc.status === "Done"        ? "text-secondary border-secondary/30 bg-secondary/10" :
                        doc.status === "In Progress" ? "text-primary border-primary/30 bg-primary/10" : "border-border"
                      }`}><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Not Started">Not Started</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Done">Done</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ══ IELTS TRACKER ══════════════════════════════════════════════════ */}
        <TabsContent value="ielts" className="space-y-6 m-0">

          {/* Overall summary */}
          <Card className="bg-card/60 border-border islamic-card">
            <CardContent className="pt-5">
              <div className="flex flex-wrap items-center gap-6 justify-between">
                <div>
                  <div className="text-[10px] font-mono uppercase text-muted-foreground tracking-widest mb-1">Overall Target</div>
                  <div className="text-4xl font-mono font-bold text-primary glow-text">7.5+</div>
                </div>
                {overallAvg > 0 && (
                  <div>
                    <div className="text-[10px] font-mono uppercase text-muted-foreground tracking-widest mb-1">Current Avg</div>
                    <div className="text-4xl font-mono font-bold text-secondary glow-text-green">{overallAvg.toFixed(1)}</div>
                  </div>
                )}
                <div>
                  <div className="text-[10px] font-mono uppercase text-muted-foreground tracking-widest mb-1">Planned Test Date</div>
                  <Input
                    type="date"
                    value={ielts.testDate}
                    onChange={e => setIelts({ ...ielts, testDate: e.target.value })}
                    className="h-9 font-mono text-sm bg-background border-border w-40"
                  />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase text-muted-foreground tracking-widest mb-1">Cambridge Done</div>
                  <div className="text-xl font-mono font-bold text-foreground">
                    {(["listening","reading","writing","speaking"] as IELTSSegmentKey[])
                      .reduce((a, k) => a + ielts[k].cambridgeCompleted, 0)}
                    <span className="text-sm text-muted-foreground">/80 tests</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  {(["listening","reading","writing","speaking"] as IELTSSegmentKey[]).map(k => (
                    <div key={k} className="text-center">
                      <div className={`text-lg font-mono font-bold ${ielts[k].currentBand >= ielts[k].targetBand ? "text-secondary" : SEGMENT_META[k].color}`}>
                        {ielts[k].currentBand > 0 ? ielts[k].currentBand.toFixed(1) : "—"}
                      </div>
                      <div className="text-[9px] font-mono text-muted-foreground uppercase">{k.slice(0,3)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 4 segment cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {(["listening","reading","writing","speaking"] as IELTSSegmentKey[]).map(key => (
              <SegmentCard key={key} segKey={key} data={ielts[key]} onChange={p => updateSegment(key, p)} />
            ))}
          </div>

          {/* Mock test log */}
          <Card className="bg-card/60 border-border islamic-card">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="font-mono text-sm uppercase text-secondary">Mock Test History</CardTitle>
              <AddMockTestForm onAdd={addMockTest} />
            </CardHeader>
            <CardContent>
              {mockTests.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground text-sm font-mono border border-dashed border-border/40 rounded-xl">
                  No mock tests logged yet. Use Cambridge 16–20 books (4 tests each = 20 total).
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-border/40 text-[10px] font-mono text-muted-foreground uppercase">
                        <th className="py-2 px-3 text-left">Date</th>
                        <th className="py-2 px-3 text-left">Source</th>
                        <th className="py-2 px-3 text-right text-sky-400">Listen</th>
                        <th className="py-2 px-3 text-right text-emerald-400">Read</th>
                        <th className="py-2 px-3 text-right text-amber-400">Write</th>
                        <th className="py-2 px-3 text-right text-rose-400">Speak</th>
                        <th className="py-2 px-3 text-right text-primary">Overall</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockTests.map(t => (
                        <tr key={t.id} className="border-b border-border/20 hover:bg-card/50">
                          <td className="py-2 px-3 font-mono text-xs text-muted-foreground">
                            {new Date(t.date).toLocaleDateString("en-GB", { day:"2-digit", month:"short", year:"2-digit" })}
                          </td>
                          <td className="py-2 px-3 text-xs">{t.source}</td>
                          <td className="py-2 px-3 text-right font-mono font-bold text-sky-400">{t.listening.toFixed(1)}</td>
                          <td className="py-2 px-3 text-right font-mono font-bold text-emerald-400">{t.reading.toFixed(1)}</td>
                          <td className="py-2 px-3 text-right font-mono font-bold text-amber-400">{t.writing.toFixed(1)}</td>
                          <td className="py-2 px-3 text-right font-mono font-bold text-rose-400">{t.speaking.toFixed(1)}</td>
                          <td className="py-2 px-3 text-right font-mono font-bold text-primary">{t.overall.toFixed(1)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Vocabulary log */}
          <Card className="bg-card/60 border-border islamic-card">
            <CardHeader className="pb-3">
              <CardTitle className="font-mono text-sm uppercase text-muted-foreground">Daily Vocabulary Log</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-4">
                <Input placeholder="New word or phrase..." value={newVocab}
                  onChange={e => setNewVocab(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter" && newVocab.trim()) { setVocab([{ word: newVocab.trim(), date: new Date().toISOString() }, ...vocab]); setNewVocab(""); }}}
                  className="h-9 font-mono text-sm bg-background border-border" />
                <Button onClick={() => { if (newVocab.trim()) { setVocab([{ word: newVocab.trim(), date: new Date().toISOString() }, ...vocab]); setNewVocab(""); }}}
                  size="sm" className="h-9 px-3 bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  <Plus className="size-4" />
                </Button>
              </div>
              <div className="h-40 overflow-y-auto space-y-1.5 pr-1">
                {vocab.length === 0 && <p className="text-xs text-muted-foreground font-mono text-center py-4">No words logged yet.</p>}
                {vocab.map((v, i) => (
                  <div key={i} className="flex justify-between items-center text-sm p-2 rounded bg-background/50 border border-border/40">
                    <span className="font-mono text-secondary">{v.word}</span>
                    <span className="text-[10px] text-muted-foreground">{new Date(v.date).toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ══ ECA ══════════════════════════════════════════════════════════ */}
        <TabsContent value="internships" className="space-y-4 m-0">
          <Card className="bg-card/60 border-border islamic-card">
            <CardHeader><CardTitle className="font-mono text-sm uppercase text-warning">ECA & Community Roles</CardTitle></CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {internships.map(int => (
                  <div key={int.id} className="p-4 rounded-lg border border-border/40 bg-background/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="font-medium text-foreground text-sm">{int.name}</div>
                      <div className="flex items-center gap-1 mt-1">
                        <CalendarDays className="size-3 text-muted-foreground" />
                        <span className="text-[11px] font-mono text-muted-foreground">Deadline: {int.deadline}</span>
                      </div>
                    </div>
                    <Select value={int.status}
                      onValueChange={v => setInternships(internships.map(i => i.id === int.id ? { ...i, status: v as any } : i))}>
                      <SelectTrigger className={`w-[140px] h-8 text-xs font-mono border ${
                        int.status === "Accepted" ? "text-secondary border-secondary/30 bg-secondary/10" :
                        int.status === "Applied"  ? "text-primary border-primary/30 bg-primary/10" : "border-border"
                      }`}><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Not Applied">Not Applied</SelectItem>
                        <SelectItem value="Applied">Applied</SelectItem>
                        <SelectItem value="Interview">Interview</SelectItem>
                        <SelectItem value="Accepted">Accepted</SelectItem>
                        <SelectItem value="Rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
