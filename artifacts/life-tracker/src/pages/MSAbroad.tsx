import { Fragment, useState } from "react";
import { useAppStore } from "@/hooks/use-app-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Globe, GraduationCap, FileText, Briefcase, Plus, CalendarDays, Info } from "lucide-react";

// Days until deadline
function daysUntil(isoDate: string): number | null {
  if (!isoDate || isoDate === "TBA" || isoDate === "Rolling") return null;
  const diff = new Date(isoDate).getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function DeadlineBadge({ deadline }: { deadline: string }) {
  const days = daysUntil(deadline);
  if (days === null) return <span className="font-mono text-xs text-muted-foreground">{deadline}</span>;
  const color =
    days < 0   ? "text-muted-foreground line-through" :
    days < 60  ? "text-destructive font-bold" :
    days < 180 ? "text-warning font-semibold" :
    "text-secondary";
  return (
    <div className="flex flex-col">
      <span className={`font-mono text-xs ${color}`}>
        {new Date(deadline).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
      </span>
      <span className={`font-mono text-[10px] ${color}`}>
        {days < 0 ? "Passed" : `${days.toLocaleString()} days`}
      </span>
    </div>
  );
}

const statusColors: Record<string, string> = {
  Researching: "bg-muted text-muted-foreground",
  Applying:    "bg-primary/15 text-primary border-primary/30",
  Applied:     "bg-secondary/15 text-secondary border-secondary/30",
  Result:      "bg-warning/15 text-warning border-warning/30",
};

export function MSAbroad() {
  const { documents, setDocuments, scholarships, setScholarships, internships, setInternships, vocab, setVocab } = useAppStore();
  const [newVocab, setNewVocab] = useState("");
  const [expandedSchol, setExpandedSchol] = useState<string | null>(null);

  const handleDocStatusChange = (id: string, status: any) => {
    setDocuments(documents.map(d => d.id === id ? { ...d, status } : d));
  };

  const addVocabWord = () => {
    if (!newVocab.trim()) return;
    setVocab([{ word: newVocab.trim(), date: new Date().toISOString() }, ...vocab]);
    setNewVocab("");
  };

  const doneCount = documents.filter(d => d.status === "Done").length;
  const docProgress = Math.round((doneCount / documents.length) * 100);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">

      <Tabs defaultValue="scholarships" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8 bg-card border border-border h-auto p-1 gap-1">
          {[
            { value: "scholarships", icon: GraduationCap, label: "Scholarships", color: "data-[state=active]:bg-primary/15 data-[state=active]:text-primary" },
            { value: "documents",   icon: FileText,      label: "Documents",    color: "data-[state=active]:bg-primary/15 data-[state=active]:text-primary" },
            { value: "ielts",       icon: Globe,         label: "IELTS / GRE",  color: "data-[state=active]:bg-secondary/15 data-[state=active]:text-secondary" },
            { value: "internships", icon: Briefcase,     label: "ECA",          color: "data-[state=active]:bg-warning/15 data-[state=active]:text-warning" },
          ].map(t => (
            <TabsTrigger key={t.value} value={t.value}
              className={`font-mono text-[11px] uppercase py-2 ${t.color}`}>
              <t.icon className="size-3 mr-1.5" />{t.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* ── SCHOLARSHIPS ── */}
        <TabsContent value="scholarships" className="space-y-4 m-0">
          <Card className="bg-card/60 border-border islamic-card">
            <CardHeader className="flex flex-row justify-between items-center pb-3">
              <CardTitle className="font-mono text-sm uppercase text-primary flex items-center gap-2">
                <GraduationCap className="size-4" /> Target Scholarships — 2029 Intake
              </CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-[10px] font-mono text-muted-foreground">
                  {scholarships.filter(s => s.status !== "Researching").length}/{scholarships.length} Active
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border/50 text-[10px] font-mono text-muted-foreground uppercase">
                      <th className="py-3 px-4">Program</th>
                      <th className="py-3 px-3">Country</th>
                      <th className="py-3 px-3">Deadline</th>
                      <th className="py-3 px-3 hidden sm:table-cell">Reqs ✓</th>
                      <th className="py-3 px-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scholarships.map(schol => (
                      <Fragment key={schol.id}>
                        <tr
                          className="border-b border-border/25 hover:bg-primary/5 cursor-pointer transition-colors"
                          onClick={() => setExpandedSchol(expandedSchol === schol.id ? null : schol.id)}
                        >
                          <td className="py-3 px-4">
                            <div className="font-semibold text-foreground text-sm">{schol.name}</div>
                          </td>
                          <td className="py-3 px-3 text-sm whitespace-nowrap">{schol.country}</td>
                          <td className="py-3 px-3"><DeadlineBadge deadline={schol.deadline} /></td>
                          <td className="py-3 px-3 hidden sm:table-cell">
                            <Checkbox
                              checked={schol.metRequirements}
                              onCheckedChange={(c) =>
                                setScholarships(scholarships.map(s =>
                                  s.id === schol.id ? { ...s, metRequirements: !!c } : s
                                ))
                              }
                              className="data-[state=checked]:bg-secondary data-[state=checked]:border-secondary"
                            />
                          </td>
                          <td className="py-3 px-3">
                            <Select
                              value={schol.status}
                              onValueChange={(v) =>
                                setScholarships(scholarships.map(s =>
                                  s.id === schol.id ? { ...s, status: v as any } : s
                                ))
                              }
                            >
                              <SelectTrigger
                                className={`w-[120px] h-7 text-[11px] font-mono border ${statusColors[schol.status] || ""}`}
                                onClick={(e) => e.stopPropagation()}
                              >
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
                            <td colSpan={5} className="px-4 py-2">
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
                💡 Click any row to expand notes. All deadlines are for 2029 intake (applications open ~2028).
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── DOCUMENTS ── */}
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
                    <Select value={doc.status} onValueChange={(v) => handleDocStatusChange(doc.id, v)}>
                      <SelectTrigger className={`w-[130px] h-8 text-xs font-mono border ${
                        doc.status === "Done"        ? "text-secondary border-secondary/30 bg-secondary/10" :
                        doc.status === "In Progress" ? "text-primary border-primary/30 bg-primary/10" : "border-border"
                      }`}>
                        <SelectValue />
                      </SelectTrigger>
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

        {/* ── IELTS / GRE ── */}
        <TabsContent value="ielts" className="space-y-4 m-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-card/60 border-border islamic-card">
              <CardHeader>
                <CardTitle className="font-mono text-sm uppercase text-secondary flex justify-between">
                  <span>IELTS Target</span>
                  <span className="text-primary">7.5+</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono text-muted-foreground">
                    <span>Current Est.</span><span className="text-foreground">6.5 / 9.0</span>
                  </div>
                  <Progress value={(6.5 / 9) * 100} className="h-2 bg-muted" />
                  <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
                    <span>Target: 7.5+</span>
                    <span className="text-secondary">Gap: 1.0 band</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="text-[10px] uppercase text-muted-foreground font-mono mb-3">Daily Vocabulary Log</div>
                  <div className="flex gap-2 mb-4">
                    <Input
                      placeholder="Enter new word..."
                      value={newVocab}
                      onChange={(e) => setNewVocab(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addVocabWord()}
                      className="bg-background h-9 font-mono text-sm"
                    />
                    <Button onClick={addVocabWord} size="sm" className="h-9 px-3 bg-secondary text-secondary-foreground hover:bg-secondary/90">
                      <Plus className="size-4" />
                    </Button>
                  </div>
                  <div className="h-40 overflow-y-auto space-y-1.5 pr-1">
                    {vocab.length === 0 && (
                      <p className="text-xs text-muted-foreground font-mono text-center py-4">No words logged yet.</p>
                    )}
                    {vocab.map((v, i) => (
                      <div key={i} className="flex justify-between items-center text-sm p-2 rounded bg-background/50 border border-border/40">
                        <span className="font-mono text-secondary">{v.word}</span>
                        <span className="text-[10px] text-muted-foreground">{new Date(v.date).toLocaleDateString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/60 border-border islamic-card">
              <CardHeader>
                <CardTitle className="font-mono text-sm uppercase text-secondary">Mock Test History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center text-sm text-muted-foreground font-mono py-8 bg-background/40 rounded-lg border border-dashed border-border">
                  No mock tests logged yet.
                  <br />
                  <Button variant="outline" size="sm" className="mt-4 border-secondary/50 text-secondary hover:bg-secondary/10">
                    <Plus className="size-3 mr-2" /> Log First Test
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ── ECA / INTERNSHIPS ── */}
        <TabsContent value="internships" className="space-y-4 m-0">
          <Card className="bg-card/60 border-border islamic-card">
            <CardHeader>
              <CardTitle className="font-mono text-sm uppercase text-warning">ECA & Community Roles</CardTitle>
            </CardHeader>
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
                    <Select
                      value={int.status}
                      onValueChange={(v) => setInternships(internships.map(i => i.id === int.id ? { ...i, status: v as any } : i))}
                    >
                      <SelectTrigger className={`w-[140px] h-8 text-xs font-mono border ${
                        int.status === "Accepted" ? "text-secondary border-secondary/30 bg-secondary/10" :
                        int.status === "Applied"  ? "text-primary border-primary/30 bg-primary/10"    : "border-border"
                      }`}>
                        <SelectValue />
                      </SelectTrigger>
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
