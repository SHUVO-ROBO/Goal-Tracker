import { useState } from "react";
import { useAppStore, NoteLink, NoteLinkCategory, NOTE_CATEGORY_COLORS } from "@/hooks/use-app-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  RefreshCcw, Plus, Trash2, Pencil, Check, X,
  ExternalLink, BookOpen, Link2, GraduationCap, CheckSquare,
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from "recharts";

const GRADE_POINTS: Record<string, number> = {
  "A": 4.00, "A-": 3.67, "B+": 3.33, "B": 3.00,
  "B-": 2.67, "C+": 2.33, "C": 2.00, "D": 1.00, "F": 0.00,
};

const NOTE_CATEGORIES: NoteLinkCategory[] = [
  "Lecture Notes", "Assignment", "Reference", "Lab", "Project", "Tutorial", "Other",
];

// ── small helpers ─────────────────────────────────────────────────────────────
function hostname(url: string) {
  try { return new URL(url).hostname.replace(/^www\./, ""); } catch { return url; }
}

// ── Add-course mini-form ──────────────────────────────────────────────────────
function AddCourseRow({ trimester, onAdd }: { trimester: string; onAdd: (c: any) => void }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ code: "", title: "", credits: "3", grade: "A" });

  if (!open) {
    return (
      <Button size="sm" variant="outline" className="border-primary/40 text-primary hover:bg-primary/10 h-8"
        onClick={() => setOpen(true)}>
        <Plus className="size-3 mr-1.5" /> Add Course
      </Button>
    );
  }

  const save = () => {
    if (!form.title.trim()) return;
    onAdd({
      id: crypto.randomUUID(),
      code: form.code.trim() || "—",
      title: form.title.trim(),
      credits: Number(form.credits) || 3,
      grade: form.grade,
      gpa: GRADE_POINTS[form.grade] ?? 4.00,
      semester: trimester,
      status: "running",
    });
    setForm({ code: "", title: "", credits: "3", grade: "A" });
    setOpen(false);
  };

  return (
    <div className="flex flex-wrap gap-2 items-center p-3 rounded-lg border border-primary/30 bg-primary/5">
      <Input placeholder="Code (e.g. CSE401)" value={form.code}
        onChange={e => setForm({ ...form, code: e.target.value })}
        className="h-8 w-32 text-xs font-mono bg-background border-border" />
      <Input placeholder="Course title *" value={form.title}
        onChange={e => setForm({ ...form, title: e.target.value })}
        className="h-8 flex-1 min-w-32 text-xs bg-background border-border" />
      <Input placeholder="Cr" type="number" min={1} max={4} value={form.credits}
        onChange={e => setForm({ ...form, credits: e.target.value })}
        className="h-8 w-14 text-xs font-mono bg-background border-border text-center" />
      <Select value={form.grade} onValueChange={v => setForm({ ...form, grade: v })}>
        <SelectTrigger className="h-8 w-20 text-xs font-mono bg-background border-border">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(GRADE_POINTS).map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
        </SelectContent>
      </Select>
      <Button size="sm" className="h-8 bg-primary text-primary-foreground hover:bg-primary/90" onClick={save}>
        <Check className="size-3" />
      </Button>
      <Button size="sm" variant="ghost" className="h-8 text-muted-foreground" onClick={() => setOpen(false)}>
        <X className="size-3" />
      </Button>
    </div>
  );
}

// ── Add-note mini-form ────────────────────────────────────────────────────────
function AddNoteForm({ onAdd }: { onAdd: (n: NoteLink) => void }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Omit<NoteLink, "id" | "date">>({
    title: "", url: "", category: "Lecture Notes", subject: "",
  });

  if (!open) {
    return (
      <Button size="sm" variant="outline" className="border-secondary/40 text-secondary hover:bg-secondary/10 h-8"
        onClick={() => setOpen(true)}>
        <Plus className="size-3 mr-1.5" /> Add Link
      </Button>
    );
  }

  const save = () => {
    if (!form.title.trim() || !form.url.trim()) return;
    const url = form.url.startsWith("http") ? form.url : "https://" + form.url;
    onAdd({ id: crypto.randomUUID(), date: new Date().toISOString(), ...form, url });
    setForm({ title: "", url: "", category: "Lecture Notes", subject: "" });
    setOpen(false);
  };

  return (
    <div className="p-4 rounded-xl border border-secondary/30 bg-secondary/5 space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <Input placeholder="Title *" value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          className="h-8 text-sm bg-background border-border" />
        <Input placeholder="URL / Link *" value={form.url}
          onChange={e => setForm({ ...form, url: e.target.value })}
          className="h-8 text-sm font-mono bg-background border-border" />
        <Input placeholder="Subject / Course name" value={form.subject}
          onChange={e => setForm({ ...form, subject: e.target.value })}
          className="h-8 text-sm bg-background border-border" />
        <Select value={form.category} onValueChange={v => setForm({ ...form, category: v as NoteLinkCategory })}>
          <SelectTrigger className="h-8 text-xs font-mono bg-background border-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {NOTE_CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div className="flex gap-2">
        <Button size="sm" className="h-8 bg-secondary text-secondary-foreground hover:bg-secondary/90" onClick={save}>
          <Check className="size-3 mr-1.5" /> Save
        </Button>
        <Button size="sm" variant="ghost" className="h-8 text-muted-foreground" onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export function Academics() {
  const {
    courses, setCourses,
    currentTrimester, setCurrentTrimester,
    reviews, setReviews,
    noteLinks, setNoteLinks,
  } = useAppStore();

  const [editingTrimester, setEditingTrimester] = useState(false);
  const [trimesterDraft, setTrimesterDraft]     = useState(currentTrimester);
  const [filterCategory, setFilterCategory]     = useState<NoteLinkCategory | "All">("All");

  const completed = courses.filter(c => c.status === "completed");
  const running   = courses.filter(c => c.status === "running");

  const totalCredits  = completed.reduce((s, c) => s + c.credits, 0);
  const totalPoints   = completed.reduce((s, c) => s + c.credits * c.gpa, 0);
  const currentCgpa   = totalCredits > 0 ? totalPoints / totalCredits : 0;

  const projectedCredits = totalCredits + running.reduce((s, c) => s + c.credits, 0);
  const projectedPoints  = totalPoints  + running.reduce((s, c) => s + c.credits * (GRADE_POINTS[c.grade] ?? 4.0), 0);
  const projectedCgpa    = projectedCredits > 0 ? projectedPoints / projectedCredits : 0;

  const semesters   = Array.from(new Set(completed.map(c => c.semester))).sort();
  const chartData   = semesters.map(sem => {
    const s = completed.filter(c => c.semester === sem);
    const cr = s.reduce((a, c) => a + c.credits, 0);
    const pt = s.reduce((a, c) => a + c.credits * c.gpa, 0);
    return { semester: sem, gpa: Number((pt / cr).toFixed(2)) };
  });

  // ── trimester actions ──
  const handleGradeChange = (id: string, grade: string) =>
    setCourses(courses.map(c => c.id === id ? { ...c, grade, gpa: GRADE_POINTS[grade] ?? 4.0 } : c));

  const addRunningCourse = (c: any) => setCourses([...courses, c]);

  const deleteRunning = (id: string) => setCourses(courses.filter(c => c.id !== id));

  const closeTrimester = () => {
    // Mark all running as completed, keep the trimester label
    setCourses(courses.map(c =>
      c.status === "running" ? { ...c, status: "completed", semester: currentTrimester } : c
    ));
  };

  const saveTrimesterLabel = () => {
    const label = trimesterDraft.trim();
    if (!label) return;
    // update running courses' semester too
    setCourses(courses.map(c => c.status === "running" ? { ...c, semester: label } : c));
    setCurrentTrimester(label);
    setEditingTrimester(false);
  };

  // ── notes ──
  const addNote = (n: NoteLink) => setNoteLinks([n, ...noteLinks]);
  const deleteNote = (id: string) => setNoteLinks(noteLinks.filter(n => n.id !== id));
  const filteredNotes = filterCategory === "All"
    ? noteLinks
    : noteLinks.filter(n => n.category === filterCategory);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">

      <Tabs defaultValue="grades" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8 bg-card border border-border h-auto p-1 gap-1">
          <TabsTrigger value="grades"  className="font-mono text-[11px] uppercase py-2 data-[state=active]:bg-primary/15 data-[state=active]:text-primary">
            <GraduationCap className="size-3 mr-1.5" /> Grades & CGPA
          </TabsTrigger>
          <TabsTrigger value="trimester" className="font-mono text-[11px] uppercase py-2 data-[state=active]:bg-primary/15 data-[state=active]:text-primary">
            <BookOpen className="size-3 mr-1.5" /> Current Trimester
          </TabsTrigger>
          <TabsTrigger value="notes"   className="font-mono text-[11px] uppercase py-2 data-[state=active]:bg-secondary/15 data-[state=active]:text-secondary">
            <Link2 className="size-3 mr-1.5" /> Notes & Links
          </TabsTrigger>
        </TabsList>

        {/* ══ GRADES & CGPA ══════════════════════════════════════════════════ */}
        <TabsContent value="grades" className="m-0 space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* CGPA card */}
            <Card className="bg-card/60 border-border islamic-card">
              <CardHeader>
                <CardTitle className="font-mono text-sm uppercase text-muted-foreground">Academic Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest mb-1">Current CGPA</div>
                    <div className="text-5xl font-mono font-bold text-primary glow-text">{currentCgpa.toFixed(2)}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest mb-1">Projected (this sem)</div>
                    <div className="text-3xl font-mono font-bold text-secondary glow-text-green">{projectedCgpa.toFixed(2)}</div>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono text-muted-foreground">
                    <span>Degree Progress</span>
                    <span className="text-primary">{totalCredits} / 138 credits</span>
                  </div>
                  <Progress value={(totalCredits / 138) * 100} className="h-2 bg-muted" />
                  <div className="text-[10px] text-muted-foreground font-mono text-right">
                    {138 - totalCredits} credits remaining
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* GPA chart */}
            <Card className="bg-card/60 border-border islamic-card">
              <CardHeader>
                <CardTitle className="font-mono text-sm uppercase text-muted-foreground">Semester GPA History</CardTitle>
              </CardHeader>
              <CardContent className="h-44">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                    <XAxis dataKey="semester" stroke="hsl(var(--muted-foreground))" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis domain={[3.0, 4.0]} stroke="hsl(var(--muted-foreground))" fontSize={10} tickLine={false} axisLine={false} />
                    <RechartsTooltip
                      cursor={{ fill: "hsl(var(--muted))" }}
                      contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: 12 }}
                    />
                    <Bar dataKey="gpa" radius={[4, 4, 0, 0]}>
                      {chartData.map((entry, i) => (
                        <Cell key={i} fill={entry.gpa >= 3.9 ? "hsl(var(--primary))" : "hsl(var(--secondary))"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Completed courses table */}
          <Card className="bg-card/60 border-border islamic-card">
            <CardHeader>
              <CardTitle className="font-mono text-sm uppercase text-muted-foreground">All Completed Courses</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border/40">
                      <TableHead className="text-[10px] font-mono uppercase tracking-widest">Sem</TableHead>
                      <TableHead className="text-[10px] font-mono uppercase tracking-widest">Code</TableHead>
                      <TableHead className="text-[10px] font-mono uppercase tracking-widest">Title</TableHead>
                      <TableHead className="text-right text-[10px] font-mono uppercase tracking-widest">Cr</TableHead>
                      <TableHead className="text-right text-[10px] font-mono uppercase tracking-widest">Grade</TableHead>
                      <TableHead className="text-right text-[10px] font-mono uppercase tracking-widest">GPA</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {semesters.map(sem => {
                      const semCourses = completed.filter(c => c.semester === sem);
                      const avg = semCourses.reduce((a, c) => a + c.credits * c.gpa, 0) /
                                  semCourses.reduce((a, c) => a + c.credits, 0);
                      return [
                        ...semCourses.map((course, i) => (
                          <TableRow key={course.id} className="border-border/25 hover:bg-primary/5">
                            {i === 0 && (
                              <TableCell rowSpan={semCourses.length}
                                className="font-mono text-xs text-muted-foreground align-top pt-3">
                                {sem}
                              </TableCell>
                            )}
                            <TableCell className="font-mono text-xs text-muted-foreground">{course.code}</TableCell>
                            <TableCell className="text-sm">{course.title}</TableCell>
                            <TableCell className="text-right font-mono text-xs">{course.credits}</TableCell>
                            <TableCell className="text-right font-mono text-xs text-primary">{course.grade}</TableCell>
                            <TableCell className="text-right font-mono text-xs">{course.gpa.toFixed(2)}</TableCell>
                          </TableRow>
                        )),
                        <TableRow key={`${sem}-avg`} className="border-b-2 border-border/50 bg-muted/20">
                          <TableCell />
                          <TableCell colSpan={3} className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest py-1.5">
                            Semester Average
                          </TableCell>
                          <TableCell className="text-right font-mono text-xs text-primary font-bold py-1.5"
                            colSpan={2}>
                            {avg.toFixed(2)}
                          </TableCell>
                        </TableRow>,
                      ];
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ══ CURRENT TRIMESTER ════════════════════════════════════════════════ */}
        <TabsContent value="trimester" className="m-0 space-y-6">

          {/* Trimester header + actions */}
          <Card className="bg-card/60 border-border islamic-card">
            <CardHeader className="pb-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="size-2 rounded-full bg-primary animate-pulse" />
                  {editingTrimester ? (
                    <div className="flex items-center gap-2">
                      <Input
                        value={trimesterDraft}
                        onChange={e => setTrimesterDraft(e.target.value)}
                        className="h-8 w-28 font-mono text-sm bg-background border-primary/50"
                        autoFocus
                      />
                      <Button size="sm" className="h-8 bg-primary text-primary-foreground" onClick={saveTrimesterLabel}>
                        <Check className="size-3" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8" onClick={() => setEditingTrimester(false)}>
                        <X className="size-3" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-primary uppercase tracking-widest text-sm">
                        Trimester {currentTrimester}
                      </span>
                      <button
                        onClick={() => { setTrimesterDraft(currentTrimester); setEditingTrimester(true); }}
                        className="text-muted-foreground hover:text-primary transition-colors"
                        title="Rename trimester"
                      >
                        <Pencil className="size-3" />
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <AddCourseRow trimester={currentTrimester} onAdd={addRunningCourse} />
                  <Button
                    size="sm" variant="outline"
                    className="border-secondary/40 text-secondary hover:bg-secondary/10 h-8"
                    onClick={closeTrimester}
                    disabled={running.length === 0}
                    title="Mark all running courses as completed and start fresh"
                  >
                    <CheckSquare className="size-3 mr-1.5" /> Close Trimester
                  </Button>
                </div>
              </div>

              {/* Projected CGPA for this trimester */}
              <div className="mt-3 flex items-center gap-6">
                <div>
                  <div className="text-[10px] font-mono uppercase text-muted-foreground tracking-widest">Running courses</div>
                  <div className="font-mono font-bold text-foreground text-lg">{running.length}</div>
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase text-muted-foreground tracking-widest">Running credits</div>
                  <div className="font-mono font-bold text-foreground text-lg">{running.reduce((s, c) => s + c.credits, 0)}</div>
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase text-muted-foreground tracking-widest">Projected CGPA</div>
                  <div className="font-mono font-bold text-secondary text-lg glow-text-green">{projectedCgpa.toFixed(2)}</div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-2 pt-0">
              {running.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground text-sm font-mono border border-dashed border-border/40 rounded-xl">
                  No running courses. Add courses above or close trimester to start fresh.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border/40">
                        <TableHead className="text-[10px] font-mono uppercase tracking-widest">Code</TableHead>
                        <TableHead className="text-[10px] font-mono uppercase tracking-widest">Title</TableHead>
                        <TableHead className="text-right text-[10px] font-mono uppercase tracking-widest">Cr</TableHead>
                        <TableHead className="text-right text-[10px] font-mono uppercase tracking-widest w-36">Target Grade</TableHead>
                        <TableHead className="text-right text-[10px] font-mono uppercase tracking-widest w-10" />
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {running.map(course => (
                        <TableRow key={course.id} className="border-border/25 hover:bg-primary/5">
                          <TableCell className="font-mono text-xs text-muted-foreground">{course.code}</TableCell>
                          <TableCell className="font-medium text-sm">{course.title}</TableCell>
                          <TableCell className="text-right font-mono text-xs">{course.credits}</TableCell>
                          <TableCell className="text-right">
                            <Select value={course.grade} onValueChange={v => handleGradeChange(course.id, v)}>
                              <SelectTrigger className="w-[90px] h-8 ml-auto text-xs font-mono bg-transparent border-border text-primary">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {Object.keys(GRADE_POINTS).map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell className="text-right">
                            <button onClick={() => deleteRunning(course.id)}
                              className="text-muted-foreground/40 hover:text-destructive transition-colors p-1">
                              <Trash2 className="size-3" />
                            </button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Weekend self-review */}
          <Card className="bg-card/60 border-border islamic-card relative overflow-hidden">
            <div className="absolute left-0 top-0 w-[3px] h-full bg-secondary" />
            <CardHeader className="flex flex-row items-center justify-between pl-6">
              <CardTitle className="font-mono text-sm uppercase tracking-widest text-secondary">
                Weekend Self-Review
              </CardTitle>
              <Button variant="outline" size="sm" className="h-8 border-border"
                onClick={() => setReviews(reviews.map(r => ({ ...r, completed: false })))}>
                <RefreshCcw className="size-3 mr-2" /> Reset
              </Button>
            </CardHeader>
            <CardContent className="pl-6 space-y-3">
              {reviews.map(review => (
                <div key={review.id} className="flex items-start gap-3 p-3 rounded-lg border border-border/40 bg-background/30 hover:bg-card/40 transition-colors">
                  <Checkbox id={review.id} checked={review.completed}
                    onCheckedChange={c => setReviews(reviews.map(r => r.id === review.id ? { ...r, completed: !!c } : r))}
                    className="mt-0.5 data-[state=checked]:bg-secondary data-[state=checked]:border-secondary" />
                  <div className="flex-1">
                    <label htmlFor={review.id}
                      className={`text-sm font-medium cursor-pointer ${review.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>
                      {review.task}
                      <span className="ml-2 text-[10px] font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded">{review.duration}</span>
                    </label>
                    <input type="text" value={review.notes}
                      onChange={e => setReviews(reviews.map(r => r.id === review.id ? { ...r, notes: e.target.value } : r))}
                      placeholder="Notes / reflections..."
                      className="w-full bg-transparent border-b border-transparent hover:border-border focus:border-secondary focus:outline-none text-xs text-muted-foreground transition-colors mt-2 pb-1" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ══ NOTES & LINKS ═════════════════════════════════════════════════════ */}
        <TabsContent value="notes" className="m-0 space-y-4">

          <Card className="bg-card/60 border-border islamic-card">
            <CardHeader className="pb-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <CardTitle className="font-mono text-sm uppercase text-secondary flex items-center gap-2">
                  <Link2 className="size-4" /> Notes, Slides & Resource Links
                </CardTitle>
                <AddNoteForm onAdd={addNote} />
              </div>

              {/* Category filter pills */}
              <div className="flex flex-wrap gap-2 mt-3">
                {(["All", ...NOTE_CATEGORIES] as const).map(cat => (
                  <button key={cat}
                    onClick={() => setFilterCategory(cat as any)}
                    className={`text-[10px] font-mono px-2.5 py-1 rounded-full border transition-colors ${
                      filterCategory === cat
                        ? cat === "All"
                          ? "bg-foreground/10 border-border text-foreground"
                          : NOTE_CATEGORY_COLORS[cat as NoteLinkCategory]
                        : "bg-transparent border-border/40 text-muted-foreground hover:border-border"
                    }`}>
                    {cat}
                    {cat !== "All" && (
                      <span className="ml-1 opacity-60">
                        ({noteLinks.filter(n => n.category === cat).length})
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </CardHeader>

            <CardContent>
              {filteredNotes.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground text-sm font-mono border border-dashed border-border/40 rounded-xl">
                  No links saved yet.{" "}
                  {filterCategory !== "All" ? `Try switching the filter.` : `Click "Add Link" to save your first resource.`}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {filteredNotes.map(note => (
                    <div key={note.id}
                      className="group p-4 rounded-xl border border-border/40 bg-background/40 hover:border-secondary/40 hover:bg-secondary/5 transition-all flex flex-col gap-2">
                      {/* Category + date */}
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${NOTE_CATEGORY_COLORS[note.category]}`}>
                          {note.category}
                        </span>
                        <span className="text-[10px] text-muted-foreground font-mono">
                          {new Date(note.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })}
                        </span>
                      </div>

                      {/* Title */}
                      <div className="font-medium text-sm text-foreground leading-snug">{note.title}</div>

                      {/* Subject */}
                      {note.subject && (
                        <div className="text-[11px] text-muted-foreground font-mono">{note.subject}</div>
                      )}

                      {/* URL row */}
                      <div className="flex items-center justify-between mt-auto pt-2 border-t border-border/30">
                        <span className="text-[10px] text-muted-foreground font-mono truncate max-w-[120px]">
                          {hostname(note.url)}
                        </span>
                        <div className="flex items-center gap-2">
                          <a href={note.url} target="_blank" rel="noreferrer"
                            className="text-secondary hover:text-secondary/80 transition-colors">
                            <ExternalLink className="size-3.5" />
                          </a>
                          <button onClick={() => deleteNote(note.id)}
                            className="text-muted-foreground/30 hover:text-destructive transition-colors opacity-0 group-hover:opacity-100">
                            <Trash2 className="size-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
}
