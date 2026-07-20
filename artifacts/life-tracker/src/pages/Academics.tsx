import { useAppStore } from "@/hooks/use-app-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from "recharts";

const GRADE_POINTS: Record<string, number> = {
  "A": 4.00,
  "A-": 3.67,
  "B+": 3.33,
  "B": 3.00,
  "B-": 2.67,
  "C+": 2.33,
  "C": 2.00,
  "D": 1.00,
  "F": 0.00
};

export function Academics() {
  const { courses, setCourses, reviews, setReviews } = useAppStore();

  const completed = courses.filter(c => c.status === "completed");
  const running = courses.filter(c => c.status === "running");

  const totalCredits = completed.reduce((s, c) => s + c.credits, 0);
  const totalPoints = completed.reduce((s, c) => s + (c.credits * c.gpa), 0);
  const currentCgpa = totalCredits > 0 ? totalPoints / totalCredits : 0;

  const handleRunningGradeChange = (id: string, grade: string) => {
    setCourses(courses.map(c => 
      c.id === id ? { ...c, grade, gpa: GRADE_POINTS[grade] } : c
    ));
  };

  const projectedCredits = totalCredits + running.reduce((s, c) => s + c.credits, 0);
  const projectedPoints = totalPoints + running.reduce((s, c) => s + (c.credits * (GRADE_POINTS[c.grade] || 4.0)), 0);
  const projectedCgpa = projectedCredits > 0 ? projectedPoints / projectedCredits : 0;

  // Semester history chart data
  const semesters = Array.from(new Set(completed.map(c => c.semester))).sort();
  const chartData = semesters.map(sem => {
    const semCourses = completed.filter(c => c.semester === sem);
    const sCreds = semCourses.reduce((s, c) => s + c.credits, 0);
    const sPts = semCourses.reduce((s, c) => s + (c.credits * c.gpa), 0);
    return {
      semester: sem,
      gpa: Number((sPts / sCreds).toFixed(2))
    };
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-card/50 border-border">
          <CardHeader>
            <CardTitle className="font-mono text-sm uppercase text-muted-foreground">Academic Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-between items-end">
              <div>
                <div className="text-sm text-muted-foreground">Current CGPA</div>
                <div className="text-4xl font-mono font-bold text-primary glow-text">{currentCgpa.toFixed(2)}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Projected (Running Sem)</div>
                <div className="text-2xl font-mono text-secondary">{projectedCgpa.toFixed(2)}</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm font-mono">
                <span className="text-muted-foreground">Degree Progress</span>
                <span className="text-primary">{totalCredits} / 138 Credits</span>
              </div>
              <Progress value={(totalCredits / 138) * 100} className="h-2 bg-muted">
                <div className="h-full bg-primary" style={{ width: `${(totalCredits / 138) * 100}%` }} />
              </Progress>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border">
          <CardHeader>
            <CardTitle className="font-mono text-sm uppercase text-muted-foreground">Semester GPA History</CardTitle>
          </CardHeader>
          <CardContent className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="semester" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis domain={[3.0, 4.0]} stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <RechartsTooltip cursor={{ fill: 'hsl(var(--muted))' }} contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                <Bar dataKey="gpa" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.gpa >= 3.9 ? 'hsl(var(--primary))' : 'hsl(var(--secondary))'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Running Semester */}
      <Card className="bg-card/50 border-border">
        <CardHeader>
          <CardTitle className="font-mono text-primary flex items-center gap-2 uppercase tracking-widest text-sm">
            <div className="size-2 rounded-full bg-primary animate-pulse" />
            Current Trimester 262
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border/50">
                <TableHead className="w-[100px]">Code</TableHead>
                <TableHead>Course Title</TableHead>
                <TableHead className="text-right">Credits</TableHead>
                <TableHead className="text-right w-[150px]">Target Grade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {running.map((course) => (
                <TableRow key={course.id} className="border-border/50">
                  <TableCell className="font-mono text-xs">{course.code}</TableCell>
                  <TableCell className="font-medium">{course.title}</TableCell>
                  <TableCell className="text-right">{course.credits}</TableCell>
                  <TableCell className="text-right">
                    <Select value={course.grade} onValueChange={(v) => handleRunningGradeChange(course.id, v)}>
                      <SelectTrigger className="w-[100px] h-8 ml-auto bg-transparent">
                        <SelectValue placeholder="Grade" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(GRADE_POINTS).map(g => (
                          <SelectItem key={g} value={g}>{g}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Weekend Self-Review */}
      <Card className="bg-card/50 border-border relative overflow-hidden">
        <div className="absolute left-0 top-0 w-1 h-full bg-secondary" />
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="font-mono text-sm uppercase tracking-widest text-secondary">
            Weekend Self-Review Checklist
          </CardTitle>
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 border-border"
            onClick={() => setReviews(reviews.map(r => ({ ...r, completed: false })))}
          >
            <RefreshCcw className="size-3 mr-2" />
            Reset Weekly
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {reviews.map(review => (
            <div key={review.id} className="flex items-start space-x-3 p-3 rounded-md border border-border/50 bg-card/20 hover:bg-card/40 transition-colors">
              <Checkbox 
                id={review.id} 
                checked={review.completed}
                onCheckedChange={(checked) => 
                  setReviews(reviews.map(r => r.id === review.id ? { ...r, completed: !!checked } : r))
                }
                className="mt-1 data-[state=checked]:bg-secondary data-[state=checked]:text-secondary-foreground"
              />
              <div className="flex-1 space-y-1">
                <label 
                  htmlFor={review.id}
                  className={`text-sm font-medium leading-none cursor-pointer ${review.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}
                >
                  {review.task} <span className="ml-2 text-xs font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded">{review.duration}</span>
                </label>
                <input 
                  type="text" 
                  value={review.notes}
                  onChange={(e) => setReviews(reviews.map(r => r.id === review.id ? { ...r, notes: e.target.value } : r))}
                  placeholder="Notes / Reflections..."
                  className="w-full bg-transparent border-b border-transparent hover:border-border focus:border-secondary focus:outline-none text-xs text-muted-foreground transition-colors mt-2 pb-1"
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

    </div>
  );
}
