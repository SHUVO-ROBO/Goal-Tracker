import { useState } from "react";
import { useAppStore } from "@/hooks/use-app-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Globe, GraduationCap, FileText, Briefcase, Plus } from "lucide-react";

export function MSAbroad() {
  const { documents, setDocuments, scholarships, setScholarships, internships, setInternships, vocab, setVocab } = useAppStore();
  const [newVocab, setNewVocab] = useState("");

  const handleDocStatusChange = (id: string, status: any) => {
    setDocuments(documents.map(d => d.id === id ? { ...d, status } : d));
  };

  const addVocabWord = () => {
    if (!newVocab.trim()) return;
    setVocab([{ word: newVocab.trim(), date: new Date().toISOString() }, ...vocab]);
    setNewVocab("");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      <Tabs defaultValue="documents" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8 bg-card border border-border">
          <TabsTrigger value="documents" className="font-mono text-xs uppercase data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
            <FileText className="size-3 mr-2" /> Docs
          </TabsTrigger>
          <TabsTrigger value="ielts" className="font-mono text-xs uppercase data-[state=active]:bg-secondary/20 data-[state=active]:text-secondary">
            <Globe className="size-3 mr-2" /> IELTS/GRE
          </TabsTrigger>
          <TabsTrigger value="scholarships" className="font-mono text-xs uppercase data-[state=active]:bg-[#b45309]/20 data-[state=active]:text-[#f59e0b]">
            <GraduationCap className="size-3 mr-2" /> Scholarships
          </TabsTrigger>
          <TabsTrigger value="internships" className="font-mono text-xs uppercase data-[state=active]:bg-[#6d28d9]/20 data-[state=active]:text-[#8b5cf6]">
            <Briefcase className="size-3 mr-2" /> ECA
          </TabsTrigger>
        </TabsList>

        {/* DOCUMENTS TAB */}
        <TabsContent value="documents" className="space-y-4 m-0">
          <Card className="bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="font-mono text-sm uppercase text-primary">Master Document Checklist</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {documents.map(doc => (
                  <div key={doc.id} className="flex items-center justify-between p-3 rounded border border-border/50 bg-background/50 hover:bg-card/50 transition-colors">
                    <div>
                      <div className={`text-sm font-medium ${doc.status === 'Done' ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                        {doc.task}
                      </div>
                      {doc.meta && <div className="text-xs text-muted-foreground font-mono mt-0.5">{doc.meta}</div>}
                    </div>
                    <Select value={doc.status} onValueChange={(v) => handleDocStatusChange(doc.id, v)}>
                      <SelectTrigger className={`w-[130px] h-8 text-xs font-mono border-border ${
                        doc.status === 'Done' ? 'text-primary border-primary/30 bg-primary/10' :
                        doc.status === 'In Progress' ? 'text-secondary border-secondary/30 bg-secondary/10' : ''
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

        {/* IELTS TAB */}
        <TabsContent value="ielts" className="space-y-4 m-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle className="font-mono text-sm uppercase text-secondary flex justify-between">
                  <span>IELTS Target</span>
                  <span>7.5+</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono text-muted-foreground">
                    <span>Current Est.</span>
                    <span>6.5</span>
                  </div>
                  <Progress value={(6.5 / 9) * 100} className="h-2 bg-muted">
                    <div className="h-full bg-secondary" style={{ width: `${(6.5 / 9) * 100}%` }} />
                  </Progress>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="text-xs uppercase text-muted-foreground font-mono mb-3">Daily Vocabulary Log</div>
                  <div className="flex gap-2 mb-4">
                    <Input 
                      placeholder="Enter new word..." 
                      value={newVocab}
                      onChange={(e) => setNewVocab(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && addVocabWord()}
                      className="bg-background h-9 font-mono text-sm"
                    />
                    <Button onClick={addVocabWord} size="sm" className="h-9 px-3 bg-secondary text-secondary-foreground hover:bg-secondary/90">
                      <Plus className="size-4" />
                    </Button>
                  </div>
                  <div className="h-40 overflow-y-auto space-y-2 pr-2">
                    {vocab.map((v, i) => (
                      <div key={i} className="flex justify-between items-center text-sm p-2 rounded bg-background/50 border border-border/50">
                        <span className="font-mono text-secondary">{v.word}</span>
                        <span className="text-[10px] text-muted-foreground">{new Date(v.date).toLocaleDateString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle className="font-mono text-sm uppercase text-secondary">Mock Test History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center text-sm text-muted-foreground font-mono py-8 bg-background/50 rounded border border-dashed border-border">
                  No mock tests logged yet.
                  <br/>
                  <Button variant="outline" size="sm" className="mt-4 border-secondary text-secondary hover:bg-secondary/10">Log First Test</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* SCHOLARSHIPS TAB */}
        <TabsContent value="scholarships" className="space-y-4 m-0">
          <Card className="bg-card/50 border-border">
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle className="font-mono text-sm uppercase text-[#f59e0b]">Target Scholarships</CardTitle>
              <Button size="sm" variant="outline" className="h-8 border-[#f59e0b]/30 text-[#f59e0b] hover:bg-[#f59e0b]/10">
                <Plus className="size-3 mr-2" /> Add
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border/50 text-xs font-mono text-muted-foreground uppercase">
                      <th className="py-2 px-2">Program</th>
                      <th className="py-2 px-2">Country</th>
                      <th className="py-2 px-2">Deadline</th>
                      <th className="py-2 px-2">Reqs Met</th>
                      <th className="py-2 px-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scholarships.map(schol => (
                      <tr key={schol.id} className="border-b border-border/30 hover:bg-card/40">
                        <td className="py-3 px-2 font-medium">{schol.name}</td>
                        <td className="py-3 px-2 text-muted-foreground">{schol.country}</td>
                        <td className="py-3 px-2 font-mono text-xs">{schol.deadline}</td>
                        <td className="py-3 px-2">
                          <Checkbox 
                            checked={schol.metRequirements}
                            onCheckedChange={(c) => setScholarships(scholarships.map(s => s.id === schol.id ? { ...s, metRequirements: !!c } : s))}
                          />
                        </td>
                        <td className="py-3 px-2">
                          <Select value={schol.status} onValueChange={(v) => setScholarships(scholarships.map(s => s.id === schol.id ? { ...s, status: v as any } : s))}>
                            <SelectTrigger className="w-[120px] h-7 text-[11px] font-mono bg-transparent border-border">
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
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* INTERNSHIPS TAB */}
        <TabsContent value="internships" className="space-y-4 m-0">
          <Card className="bg-card/50 border-border">
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle className="font-mono text-sm uppercase text-[#8b5cf6]">ECA & Internships</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {internships.map(int => (
                  <div key={int.id} className="p-4 rounded-lg border border-border bg-background/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="font-medium text-foreground">{int.name}</div>
                      <div className="text-xs font-mono text-muted-foreground mt-1">Deadline: {int.deadline}</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Select value={int.status} onValueChange={(v) => setInternships(internships.map(i => i.id === int.id ? { ...i, status: v as any } : i))}>
                        <SelectTrigger className={`w-[130px] h-8 text-xs font-mono border-border ${
                          int.status === 'Accepted' ? 'text-primary border-primary/30' :
                          int.status === 'Applied' ? 'text-secondary border-secondary/30' : ''
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
