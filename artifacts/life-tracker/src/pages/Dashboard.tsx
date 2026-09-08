import {
  Activity,
  ArrowUpRight,
  Award,
  BookOpen,
  BrainCircuit,
  Check,
  CheckCircle2,
  Circle,
  Clock3,
  Coins,
  ExternalLink,
  Flame,
  Globe2,
  GraduationCap,
  HeartHandshake,
  Lightbulb,
  ListChecks,
  Pause,
  Play,
  Plus,
  RotateCcw,
  ScrollText,
  ShieldAlert,
  Sparkles,
  Target,
  TimerReset,
  TrendingUp,
  UsersRound,
} from "lucide-react";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useAppStore, type FinancialMilestone, type TodoItem } from "@/hooks/use-app-store";

const PORTFOLIO_URL = "https://shuvo-robo.github.io/portfolio/";

function getToday() {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  return new Date(now.getTime() - offset * 60_000).toISOString().slice(0, 10);
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(date);
}

function formatTime(seconds: number) {
  return `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
}

function ProgressBar({ value, tone = "primary" }: { value: number; tone?: "primary" | "secondary" | "warning" }) {
  const toneClass = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    warning: "bg-warning",
  }[tone];

  return (
    <div className="h-1.5 overflow-hidden rounded-full bg-muted/80" aria-label={`${Math.round(value)} percent complete`}>
      <div className={`h-full rounded-full ${toneClass} transition-[width] duration-500`} style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  );
}

function SegmentCard({
  icon: Icon,
  label,
  eyebrow,
  value,
  detail,
  progress,
  tone,
}: {
  icon: typeof BookOpen;
  label: string;
  eyebrow: string;
  value: string;
  detail: string;
  progress: number;
  tone: "primary" | "secondary" | "warning";
}) {
  return (
    <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.18 }}>
      <Card className="islamic-card h-full border-border/70 bg-card/65 transition-colors hover:border-primary/35" data-testid={`card-segment-${label.toLowerCase().replaceAll(" ", "-")}`}>
        <CardContent className="p-4">
          <div className="mb-5 flex items-start justify-between gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg border border-primary/20 bg-primary/8 text-primary">
              <Icon className="size-4" />
            </div>
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">{eyebrow}</span>
          </div>
          <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">{label}</h3>
          <div className="mt-2 flex items-end justify-between gap-3">
            <span className="font-mono text-2xl font-bold text-primary" data-testid={`text-segment-value-${label.toLowerCase().replaceAll(" ", "-")}`}>{value}</span>
            <span className="text-right text-[10px] leading-tight text-muted-foreground">{detail}</span>
          </div>
          <div className="mt-4">
            <ProgressBar value={progress} tone={tone} />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ── Distraction Firewall ─────────────────────────────────────────────────────
export function DistractionFirewall() {
  const blockedItems = [
    "Visionless people and aimless conversations",
    "Dopamine traps: short-form video and endless feeds",
    "Emotional distractions and relationship traps",
    "Laziness and procrastination",
    "Multitasking: one focus, one time block",
  ];

  return (
    <Card className="relative overflow-hidden border-destructive/40 bg-destructive/8 glow-border-destructive">
      <div className="absolute left-0 top-0 h-[3px] w-full bg-gradient-to-r from-destructive/60 via-destructive to-destructive/60" />
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-destructive">
          <ShieldAlert className="size-4" /> Distraction Firewall
          <span className="ml-auto text-[10px] tracking-wider text-destructive/70">ACTIVE 24/7</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2 sm:grid-cols-2">
          {blockedItems.map((item, index) => (
            <div key={item} className="flex items-start gap-2 rounded border border-destructive/20 bg-destructive/8 p-2.5">
              <AlertIcon />
              <span className="text-xs text-destructive-foreground/85">
                <strong className="mr-1 font-mono text-[10px] uppercase text-destructive">Blocked:</strong>
                {item}
              </span>
              {index === blockedItems.length - 1 ? null : null}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function AlertIcon() {
  return <ShieldAlert className="mt-0.5 size-3.5 shrink-0 text-destructive" />;
}

function TodoPanel({
  todos,
  onToggle,
  onAdd,
}: {
  todos: TodoItem[];
  onToggle: (id: string) => void;
  onAdd: (title: string, category: TodoItem["category"]) => void;
}) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<TodoItem["category"]>("Academic");

  const submitTodo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;
    onAdd(trimmedTitle, category);
    setTitle("");
  };

  const incompleteTodos = todos.filter((todo) => !todo.completed);
  const visibleTodos = todos.slice(0, 5);

  return (
    <Card className="islamic-card border-border/70 bg-card/65" data-testid="card-daily-todos">
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-3">
        <div>
          <CardTitle className="flex items-center gap-2 font-mono text-sm uppercase tracking-wider text-primary">
            <ListChecks className="size-4" /> Today&apos;s command list
          </CardTitle>
          <p className="mt-1 text-xs text-muted-foreground">{incompleteTodos.length} open {incompleteTodos.length === 1 ? "task" : "tasks"} in your local plan</p>
        </div>
        <span className="font-mono text-xs text-secondary" data-testid="text-todo-completion">{todos.filter((todo) => todo.completed).length}/{todos.length}</span>
      </CardHeader>
      <CardContent className="space-y-4">
        <form className="flex gap-2" onSubmit={submitTodo}>
          <Input
            aria-label="New todo"
            data-testid="input-new-todo"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Add a focused task..."
            className="h-9 bg-background/40"
          />
          <select
            aria-label="Todo category"
            data-testid="select-todo-category"
            value={category}
            onChange={(event) => setCategory(event.target.value as TodoItem["category"])}
            className="hidden h-9 rounded-md border border-input bg-background/40 px-2 text-xs text-foreground sm:block"
          >
            {["Academic", "AI/ML", "IELTS", "Spiritual", "Personal"].map((item) => <option key={item}>{item}</option>)}
          </select>
          <Button type="submit" size="icon" aria-label="Add todo" data-testid="button-add-todo">
            <Plus />
          </Button>
        </form>
        <div className="space-y-1.5">
          {visibleTodos.length ? visibleTodos.map((todo) => (
            <label key={todo.id} className="flex cursor-pointer items-center gap-3 rounded-lg border border-transparent px-2 py-2 transition-colors hover:border-primary/20 hover:bg-primary/5" data-testid={`row-todo-${todo.id}`}>
              <Checkbox
                checked={todo.completed}
                onCheckedChange={() => onToggle(todo.id)}
                aria-label={`Mark ${todo.title} complete`}
                data-testid={`checkbox-todo-${todo.id}`}
              />
              <span className={`min-w-0 flex-1 text-sm ${todo.completed ? "text-muted-foreground line-through" : "text-foreground"}`}>{todo.title}</span>
              <span className="rounded border border-border/70 px-1.5 py-0.5 font-mono text-[9px] uppercase text-muted-foreground">{todo.category}</span>
            </label>
          )) : (
            <div className="rounded-lg border border-dashed border-primary/25 bg-primary/5 p-4 text-center text-xs text-muted-foreground">Your command list is clear. Add the next meaningful step.</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function FocusPanel({ focusTitle }: { focusTitle: string }) {
  const [remaining, setRemaining] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;
    const timer = window.setInterval(() => {
      setRemaining((current) => {
        if (current <= 1) {
          setIsRunning(false);
          return 0;
        }
        return current - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [isRunning]);

  const resetTimer = () => {
    setIsRunning(false);
    setRemaining(25 * 60);
  };

  return (
    <Card className="relative overflow-hidden border-primary/30 bg-primary/8" data-testid="card-focus-timer">
      <div className="absolute -right-8 -top-8 size-32 rounded-full border border-primary/20" />
      <div className="absolute -right-1 -top-1 size-20 rounded-full border border-secondary/20" />
      <CardHeader className="relative pb-2">
        <CardTitle className="flex items-center gap-2 font-mono text-sm uppercase tracking-wider text-primary">
          <TimerReset className="size-4" /> Focus countdown
          <span className={`ml-auto flex items-center gap-1.5 text-[10px] tracking-wider ${isRunning ? "text-secondary" : "text-muted-foreground"}`}>
            <span className={`size-1.5 rounded-full ${isRunning ? "animate-pulse bg-secondary" : "bg-muted-foreground"}`} />
            {isRunning ? "RUNNING" : "READY"}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="relative">
        <div className="flex items-center gap-5">
          <div className="font-mono text-4xl font-bold tracking-tight text-foreground" data-testid="text-focus-countdown">{formatTime(remaining)}</div>
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Current focus</p>
            <p className="mt-1 truncate text-sm font-medium text-foreground" data-testid="text-focus-task">{focusTitle}</p>
          </div>
        </div>
        <div className="mt-5 flex gap-2">
          <Button size="sm" onClick={() => setIsRunning((running) => !running)} data-testid="button-focus-toggle">
            {isRunning ? <Pause /> : <Play />}
            {isRunning ? "Pause" : "Start session"}
          </Button>
          <Button variant="outline" size="sm" onClick={resetTimer} data-testid="button-focus-reset">
            <RotateCcw /> Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// ── Dashboard ────────────────────────────────────────────────────────────────
export function Dashboard() {
  const {
    courses,
    pipeline,
    certificates,
    scholarships,
    todos,
    setTodos,
    ielts,
    researchTopics,
    hci,
    spiritualLogs,
    financialMilestones,
    setFinancialMilestones,
    internships,
  } = useAppStore();
  const today = getToday();

  const completedCredits = courses.filter((course) => course.status === "completed").reduce((sum, course) => sum + course.credits, 0);
  const totalGpaPoints = courses.filter((course) => course.status === "completed").reduce((sum, course) => sum + course.credits * course.gpa, 0);
  const cgpa = completedCredits > 0 ? (totalGpaPoints / completedCredits).toFixed(2) : "0.00";
  const completedPipeline = pipeline.filter((stage) => stage.status === "completed").length;
  const pipelinePercent = pipeline.length ? Math.round((completedPipeline / pipeline.length) * 100) : 0;
  const certsDone = certificates.filter((certificate) => certificate.status === "Completed").length;
  const certsInProgress = certificates.filter((certificate) => certificate.status === "In Progress").length;
  const scholarshipsActive = scholarships.filter((scholarship) => scholarship.status === "Applied" || scholarship.status === "Applying").length;
  const scholarshipPercent = scholarships.length ? Math.round((scholarshipsActive / scholarships.length) * 100) : 0;
  const researchPapers = researchTopics.reduce((sum, topic) => sum + topic.papers, 0) + hci.papersPublished;
  const ieltsSegments = [ielts.listening, ielts.reading, ielts.writing, ielts.speaking];
  const ieltsProgress = Math.round((ieltsSegments.reduce((sum, segment) => sum + segment.cambridgeCompleted, 0) / 80) * 100);
  const todayRecord = spiritualLogs[today];
  const prayersCompleted = todayRecord ? Object.values(todayRecord.prayers).filter(Boolean).length : 0;
  const ecaActive = internships.filter((internship) => internship.status !== "Not Applied" && internship.status !== "Rejected").length;
  const completedToday = todos.filter((todo) => todo.completed && (!todo.date || todo.date === today)).length;
  const openTodos = todos.filter((todo) => !todo.completed);
  const focusTitle = openTodos[0]?.title ?? "Deep work on the next priority";
  const [showFinancialForm, setShowFinancialForm] = useState(false);
  const [newMilestone, setNewMilestone] = useState({
    title: "",
    target: "",
    status: "Planned" as FinancialMilestone["status"],
    notes: "",
  });

  const financialCounts = useMemo(() => ({
    done: financialMilestones.filter((milestone) => milestone.status === "Done").length,
    active: financialMilestones.filter((milestone) => milestone.status === "In Progress").length,
    planned: financialMilestones.filter((milestone) => milestone.status === "Planned").length,
  }), [financialMilestones]);

  const toggleTodo = (id: string) => {
    setTodos(todos.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  };

  const addTodo = (title: string, category: TodoItem["category"]) => {
    setTodos([...todos, { id: `todo-${Date.now()}`, title, completed: false, date: today, category }]);
  };

  const addFinancialMilestone = () => {
    if (!newMilestone.title.trim()) return;
    setFinancialMilestones([
      { ...newMilestone, id: crypto.randomUUID(), title: newMilestone.title.trim(), target: newMilestone.target.trim() || "TBD" },
      ...financialMilestones,
    ]);
    setNewMilestone({ title: "", target: "", status: "Planned", notes: "" });
    setShowFinancialForm(false);
  };

  const updateFinancialMilestone = (id: string, patch: Partial<FinancialMilestone>) => {
    setFinancialMilestones(financialMilestones.map(milestone => milestone.id === id ? { ...milestone, ...patch } : milestone));
  };

  const segments = [
    { icon: GraduationCap, label: "Academics", eyebrow: "CGPA / credits", value: cgpa, detail: `${completedCredits} credits completed`, progress: (completedCredits / Math.max(1, courses.reduce((sum, course) => sum + course.credits, 0))) * 100, tone: "primary" as const },
    { icon: BrainCircuit, label: "AI / ML", eyebrow: "learning path", value: `${pipelinePercent}%`, detail: `${completedPipeline} of ${pipeline.length} stages`, progress: pipelinePercent, tone: "secondary" as const },
    { icon: Globe2, label: "Study Abroad", eyebrow: "funding radar", value: `${scholarshipsActive}`, detail: `${scholarships.length} programs tracked`, progress: scholarshipPercent, tone: "primary" as const },
    { icon: BookOpen, label: "IELTS", eyebrow: "practice bank", value: ielts.overallBand ? `${ielts.overallBand}` : "—", detail: `${ieltsProgress}% Cambridge practice`, progress: ieltsProgress, tone: "warning" as const },
    { icon: ScrollText, label: "Research", eyebrow: "publication engine", value: `${researchPapers}`, detail: `${researchTopics.length} topic${researchTopics.length === 1 ? "" : "s"} active`, progress: researchTopics.length ? Math.min(100, researchPapers * 25) : 0, tone: "secondary" as const },
    { icon: HeartHandshake, label: "Spiritual + ECA", eyebrow: "character ledger", value: `${prayersCompleted}/5`, detail: `${ecaActive} ECA track${ecaActive === 1 ? "" : "s"} active`, progress: (prayersCompleted / 5) * 100, tone: "primary" as const },
  ];

  return (
    <div className="space-y-8 pb-8 animate-in fade-in duration-500">
      <section className="relative overflow-hidden rounded-2xl border border-primary/25 bg-card/55 p-5 shadow-[0_0_28px_hsl(var(--primary)/0.08)] md:p-7">
        <div className="pointer-events-none absolute -right-20 -top-24 size-64 rounded-full border border-primary/10" />
        <div className="pointer-events-none absolute -right-8 -top-12 size-40 rounded-full border border-secondary/10" />
        <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
              <Sparkles className="size-3.5" /> Personal operating system
            </div>
            <h1 className="font-amiri text-4xl leading-none text-foreground md:text-5xl">Assalamu Alaikum, Shuvo.</h1>
            <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">
              One clear day at a time: protect the foundation, deepen the craft, and keep the path to a fully-funded future visible.
            </p>
          </div>
          <div className="flex items-end justify-between gap-5 lg:flex-col lg:items-end">
            <div className="text-right">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Today</p>
              <p className="mt-1 font-mono text-sm text-foreground" data-testid="text-current-date">{formatDate(new Date())}</p>
            </div>
            <a
              href={PORTFOLIO_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-primary/35 bg-primary/10 px-3 py-2 font-mono text-xs text-primary transition-colors hover:bg-primary/20"
              data-testid="link-global-portfolio"
            >
              Global portfolio <ExternalLink className="size-3.5" />
            </a>
          </div>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" aria-label="Life segments">
        {segments.map((segment) => <SegmentCard key={segment.label} {...segment} />)}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <TodoPanel todos={todos} onToggle={toggleTodo} onAdd={addTodo} />
        <FocusPanel focusTitle={focusTitle} />
      </section>

      <section className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="islamic-card border-border/70 bg-card/65" data-testid="card-activity-summary">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 font-mono text-sm uppercase tracking-wider text-primary">
              <Activity className="size-4" /> Today&apos;s activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { icon: CheckCircle2, label: "Tasks completed", value: `${completedToday}`, detail: "from today’s command list", tone: "text-secondary" },
              { icon: Flame, label: "Prayer rhythm", value: `${prayersCompleted}/5`, detail: todayRecord ? "logged for today" : "no record logged yet", tone: "text-primary" },
              { icon: Clock3, label: "Review blocks", value: `${courses.filter((course) => course.status === "running").length}`, detail: "running courses in rotation", tone: "text-warning" },
            ].map(({ icon: Icon, label, value, detail, tone }) => (
              <div key={label} className="flex items-center gap-3 rounded-lg border border-border/50 bg-background/25 p-3" data-testid={`activity-${label.toLowerCase().replaceAll(" ", "-")}`}>
                <Icon className={`size-4 ${tone}`} />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-foreground">{label}</p>
                  <p className="truncate text-[10px] text-muted-foreground">{detail}</p>
                </div>
                <span className={`font-mono text-lg font-bold ${tone}`}>{value}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="islamic-card border-border/70 bg-card/65" data-testid="card-financial-plan">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 font-mono text-sm uppercase tracking-wider text-primary">
              <Coins className="size-4" /> Financial plan
              <Button size="sm" variant="outline" className="ml-auto h-7 border-primary/40 text-primary" onClick={() => setShowFinancialForm(!showFinancialForm)}>
                <Plus className="size-3 mr-1" /> Add
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {showFinancialForm && (
              <div className="mb-4 space-y-2 rounded-lg border border-primary/30 bg-primary/5 p-3">
                <div className="grid gap-2 sm:grid-cols-[1fr_130px_120px]">
                  <Input placeholder="Milestone title *" value={newMilestone.title} onChange={event => setNewMilestone({ ...newMilestone, title: event.target.value })} className="h-8 text-xs bg-background" />
                  <Input placeholder="Target" value={newMilestone.target} onChange={event => setNewMilestone({ ...newMilestone, target: event.target.value })} className="h-8 text-xs bg-background" />
                  <select value={newMilestone.status} onChange={event => setNewMilestone({ ...newMilestone, status: event.target.value as FinancialMilestone["status"] })} className="h-8 rounded-md border border-border bg-background px-2 text-xs">
                    <option>Planned</option><option>In Progress</option><option>Done</option>
                  </select>
                </div>
                <Input placeholder="Notes (optional)" value={newMilestone.notes} onChange={event => setNewMilestone({ ...newMilestone, notes: event.target.value })} className="h-8 text-xs bg-background" />
                <div className="flex gap-2">
                  <Button size="sm" className="h-8 bg-primary text-primary-foreground" onClick={addFinancialMilestone}><Check className="size-3 mr-1" /> Save</Button>
                  <Button size="sm" variant="ghost" className="h-8" onClick={() => setShowFinancialForm(false)}>Cancel</Button>
                </div>
              </div>
            )}
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <p className="font-amiri text-2xl text-foreground">Fund the next chapter</p>
                <p className="mt-1 text-xs text-muted-foreground">Keep application costs visible before they become pressure.</p>
              </div>
              <div className="text-right font-mono text-xs text-secondary" data-testid="text-financial-count">
                {financialCounts.done} done
              </div>
            </div>
            <div className="mb-4 grid grid-cols-3 gap-2">
              {[
                { label: "Done", value: financialCounts.done, tone: "text-secondary" },
                { label: "Active", value: financialCounts.active, tone: "text-primary" },
                { label: "Planned", value: financialCounts.planned, tone: "text-warning" },
              ].map((item) => (
                <div key={item.label} className="rounded-lg border border-border/50 bg-background/25 p-2.5">
                  <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">{item.label}</p>
                  <p className={`mt-1 font-mono text-xl font-bold ${item.tone}`}>{item.value}</p>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              {financialMilestones.map((milestone) => (
                <div key={milestone.id} className="space-y-1.5 border-t border-border/40 pt-2.5" data-testid={`financial-milestone-${milestone.id}`}>
                  <div className="flex items-center gap-2">
                    {milestone.status === "Done" ? <Check className="size-3.5 text-secondary" /> : <Circle className="size-3.5 text-primary" />}
                    <Input value={milestone.title} onChange={event => updateFinancialMilestone(milestone.id, { title: event.target.value })} className="h-7 min-w-0 flex-1 border-transparent bg-transparent px-1 text-xs font-medium focus:border-border" aria-label="Milestone title" />
                    <Input value={milestone.target} onChange={event => updateFinancialMilestone(milestone.id, { target: event.target.value })} className="h-7 w-28 border-transparent bg-transparent px-1 text-right font-mono text-[9px] uppercase focus:border-border" aria-label="Milestone target" />
                    <select value={milestone.status} onChange={event => updateFinancialMilestone(milestone.id, { status: event.target.value as FinancialMilestone["status"] })} className="h-7 rounded-md border border-border/50 bg-background px-1 text-[9px]">
                      <option>Planned</option><option>In Progress</option><option>Done</option>
                    </select>
                  </div>
                  <Input value={milestone.notes} onChange={event => updateFinancialMilestone(milestone.id, { notes: event.target.value })} placeholder="Add notes..." className="ml-6 h-6 w-[calc(100%-1.5rem)] border-transparent bg-transparent px-1 text-[10px] text-muted-foreground focus:border-border" aria-label="Milestone notes" />
                </div>
              ))}
              {!financialMilestones.length && <p className="text-xs text-muted-foreground">No financial milestones saved yet.</p>}
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <Card className="islamic-card border-border/70 bg-card/65" data-testid="card-vision-mission">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 font-mono text-sm uppercase tracking-wider text-primary">
              <Target className="size-4" /> Vision · mission · why
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                <div className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-primary"><Lightbulb className="size-3.5" /> Vision</div>
                <p className="font-amiri text-lg leading-relaxed text-foreground/95">
                  Build scalable AI systems focused on MLOps, retrieval pipelines, and production-grade machine learning.
                </p>
              </div>
              <div className="rounded-lg border border-secondary/20 bg-secondary/5 p-4">
                <div className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-secondary"><TrendingUp className="size-3.5" /> Mission</div>
                <p className="text-sm font-medium leading-6 text-foreground/90">
                  Graduate with a 3.99+ CGPA, publish high-impact AI/ML research, clear IELTS 7.5+, and secure a fully-funded place at a world-class lab.
                </p>
              </div>
            </div>
            <Accordion type="single" collapsible className="w-full space-y-1">
              {[
                { trigger: "Why 1 — Scale AI for Bangladesh", body: "Solve real-world socioeconomic problems of Bangladesh with scalable ML and LLM systems built for Bangla." },
                { trigger: "Why 2 — Maintain a 3.99+ CGPA", body: "Become a credible university lecturer and secure strong recommendation letters from professors." },
                { trigger: "Why 3 — Full-funded global scholarship", body: "Eliminate the 30 Lakh BDT family debt and study at a world-class lab without financial burden." },
                { trigger: "Why 4 — Publish meaningful research", body: "Open the gates to MIT, Stanford, ETH Zurich, and NUS through evidence of original work." },
                { trigger: "Why 5 — Master the Quran and Arabic", body: "Protect Dunya and Akhirah while building Quran-based LLM infrastructure for Muslims worldwide." },
              ].map((item, index) => (
                <AccordionItem key={item.trigger} value={`item-${index}`} className="overflow-hidden rounded-lg border border-border/40 bg-card/30 px-3">
                  <AccordionTrigger className="py-3 text-sm font-medium hover:text-primary [&>svg]:text-primary">{item.trigger}</AccordionTrigger>
                  <AccordionContent className="pb-3 text-sm text-muted-foreground">{item.body}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </section>

      <DistractionFirewall />

      <section className="grid gap-3 sm:grid-cols-3">
        {[
          { icon: Award, label: "Certifications", value: `${certsDone}/${certificates.length}`, detail: `${certsInProgress} in progress` },
          { icon: UsersRound, label: "ECA tracks", value: `${ecaActive}/${internships.length}`, detail: "active / tracked" },
          { icon: Globe2, label: "Scholarship radar", value: `${scholarships.length}`, detail: `${scholarships.filter((scholarship) => scholarship.status === "Researching").length} researching` },
        ].map(({ icon: Icon, label, value, detail }) => (
          <Card key={label} className="border-border/60 bg-card/45" data-testid={`summary-${label.toLowerCase().replaceAll(" ", "-")}`}>
            <CardContent className="flex items-center gap-3 p-4">
              <Icon className="size-4 text-primary" />
              <div className="min-w-0 flex-1">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
                <p className="mt-1 text-xs text-muted-foreground">{detail}</p>
              </div>
              <span className="font-mono text-lg font-bold text-foreground">{value}</span>
              <ArrowUpRight className="size-3.5 text-muted-foreground" />
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}