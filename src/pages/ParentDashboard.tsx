import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import lionsPenLogo from "@/assets/lions_pen.png";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const PASSWORD_RULES = [
  { test: (p: string) => p.length >= 8, label: "At least 8 characters" },
  { test: (p: string) => /[A-Z]/.test(p), label: "1 uppercase letter" },
  { test: (p: string) => /[a-z]/.test(p), label: "1 lowercase letter" },
  { test: (p: string) => /[0-9]/.test(p), label: "1 number" },
  { test: (p: string) => /[^A-Za-z0-9]/.test(p), label: "1 special character" },
];

const isPasswordValid = (p: string) => PASSWORD_RULES.every((r) => r.test(p));

interface Student {
  id: string;
  first_name: string;
  last_name: string;
  grade: number;
  gender: string;
  username: string;
  email: string | null;
  created_at: string;
}

const ParentDashboard = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [students, setStudents] = useState<Student[]>([]);
  const [loadingStudents, setLoadingStudents] = useState(true);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [resetStudentId, setResetStudentId] = useState<string | null>(null);
  const [newSecretCode, setNewSecretCode] = useState("");
  const [resettingPassword, setResettingPassword] = useState(false);

  // Add child form state
  const [childFirstName, setChildFirstName] = useState("");
  const [childLastName, setChildLastName] = useState("");
  const [childGrade, setChildGrade] = useState("");
  const [childGender, setChildGender] = useState("male");
  const [childEmail, setChildEmail] = useState("");
  const [childUsername, setChildUsername] = useState("");
  const [childPassword, setChildPassword] = useState("");
  const [addingChild, setAddingChild] = useState(false);

  const fetchStudents = async () => {
    if (!user) return;
    setLoadingStudents(true);
    const { data, error } = await supabase
      .from("students")
      .select("id, first_name, last_name, grade, gender, username, email, created_at")
      .eq("parent_id", user.id)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching students:", error);
    } else {
      setStudents(data || []);
    }
    setLoadingStudents(false);
  };

  useEffect(() => {
    fetchStudents();
  }, [user]);

  const handleAddChild = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (!isPasswordValid(childPassword)) {
      toast({
        title: "Weak secret code",
        description: "Secret code must be 8+ characters with uppercase, lowercase, number, and special character.",
        variant: "destructive",
      });
      return;
    }

    setAddingChild(true);

    try {
      const { data: result, error } = await supabase.rpc("register_student", {
        p_parent_id: user.id,
        p_first_name: childFirstName,
        p_last_name: childLastName,
        p_grade: parseInt(childGrade),
        p_gender: childGender,
        p_email: childEmail || null,
        p_username: childUsername,
        p_password: childPassword,
      });
      if (error) throw error;
      if (result && !(result as any).success) throw new Error((result as any).error);

      toast({ title: "Student added!", description: `${childFirstName} has been registered.` });
      setChildFirstName("");
      setChildLastName("");
      setChildGrade("");
      setChildGender("male");
      setChildEmail("");
      setChildUsername("");
      setChildPassword("");
      setAddDialogOpen(false);
      fetchStudents();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setAddingChild(false);
    }
  };

  const inputClass =
    "bg-foreground/5 border-secondary/40 text-foreground placeholder:text-foreground/50 focus-visible:ring-secondary";

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-2 bg-secondary" />
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-secondary" />
      <div className="absolute left-0 top-0 bottom-0 w-2 bg-secondary" />
      <div className="absolute right-0 top-0 bottom-0 w-2 bg-secondary" />

      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-secondary/20">
        <div className="flex items-center gap-3">
          <img src={lionsPenLogo} alt="Lion's Pen" className="w-12 h-auto" />
          <div>
            <h1 className="font-cinzel text-xl font-bold text-primary">Lion's Pen</h1>
            <p className="text-foreground/60 text-xs font-cinzel tracking-widest uppercase">Parent Portal</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-foreground/70 text-sm">{user?.email}</span>
          <Button variant="outline" size="sm" onClick={signOut} className="font-cinzel border-secondary/40 text-foreground/80">
            Sign Out
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Tabs defaultValue="children" className="space-y-6">
            <TabsList className="bg-foreground/5 border border-secondary/20">
              <TabsTrigger value="children" className="font-cinzel data-[state=active]:bg-secondary/20 data-[state=active]:text-secondary">
                My Children
              </TabsTrigger>
              <TabsTrigger value="resources" className="font-cinzel data-[state=active]:bg-secondary/20 data-[state=active]:text-secondary">
                Parent Resources
              </TabsTrigger>
            </TabsList>

            {/* ─── Children Tab ─── */}
            <TabsContent value="children" className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-cinzel text-2xl font-bold text-foreground">Registered Students</h2>
                <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-primary text-primary-foreground font-cinzel hover:bg-primary/90">
                      + Add Child
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-background border-secondary/30 max-w-md">
                    <DialogHeader>
                      <DialogTitle className="font-cinzel text-xl text-foreground">Add a New Student</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleAddChild} className="space-y-4 mt-2">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-foreground/90 text-sm font-cinzel mb-1.5">First Name</label>
                          <Input value={childFirstName} onChange={(e) => setChildFirstName(e.target.value)} placeholder="First" required className={inputClass} />
                        </div>
                        <div>
                          <label className="block text-foreground/90 text-sm font-cinzel mb-1.5">Last Name</label>
                          <Input value={childLastName} onChange={(e) => setChildLastName(e.target.value)} placeholder="Last" required className={inputClass} />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-foreground/90 text-sm font-cinzel mb-1.5">Grade</label>
                          <Select value={childGrade} onValueChange={setChildGrade} required>
                            <SelectTrigger className={inputClass}><SelectValue placeholder="Grade" /></SelectTrigger>
                            <SelectContent>
                              {[3, 4, 5, 6, 7, 8].map((g) => (
                                <SelectItem key={g} value={String(g)}>Grade {g}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="block text-foreground/90 text-sm font-cinzel mb-1.5">Gender</label>
                          <RadioGroup value={childGender} onValueChange={setChildGender} className="flex gap-4 mt-2">
                            <div className="flex items-center gap-1.5">
                              <RadioGroupItem value="male" id="add-male" className="border-secondary/50 text-secondary" />
                              <Label htmlFor="add-male" className="text-foreground/80 text-sm font-cinzel">Male</Label>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <RadioGroupItem value="female" id="add-female" className="border-secondary/50 text-secondary" />
                              <Label htmlFor="add-female" className="text-foreground/80 text-sm font-cinzel">Female</Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </div>
                      <div>
                        <label className="block text-foreground/90 text-sm font-cinzel mb-1.5">
                          Student Email <span className="text-foreground/60">(optional)</span>
                        </label>
                        <Input type="email" value={childEmail} onChange={(e) => setChildEmail(e.target.value)} placeholder="child@example.com" className={inputClass} />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-foreground/90 text-sm font-cinzel mb-1.5">Username</label>
                          <Input value={childUsername} onChange={(e) => setChildUsername(e.target.value)} placeholder="scriber_name" required className={inputClass} />
                        </div>
                        <div>
                          <label className="block text-foreground/90 text-sm font-cinzel mb-1.5">Secret Code</label>
                          <Input type="password" value={childPassword} onChange={(e) => setChildPassword(e.target.value)} placeholder="••••••••" required minLength={8} className={inputClass} />
                          {childPassword.length > 0 && (
                            <div className="mt-2 space-y-1">
                              {PASSWORD_RULES.map((rule) => (
                                <p key={rule.label} className={`text-xs font-cinzel ${rule.test(childPassword) ? "text-green-600" : "text-foreground/60"}`}>
                                  {rule.test(childPassword) ? "✓" : "○"} {rule.label}
                                </p>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <Button type="submit" disabled={addingChild} className="w-full bg-primary text-primary-foreground font-cinzel hover:bg-primary/90 py-5">
                        {addingChild ? "Adding..." : "Register Student"}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              {loadingStudents ? (
                <p className="text-foreground/60 font-cinzel text-center py-8 animate-pulse">Loading students...</p>
              ) : students.length === 0 ? (
                <div className="text-center py-12 border border-secondary/20 rounded-lg bg-foreground/5">
                  <p className="text-foreground/60 font-cinzel">No students registered yet.</p>
                  <p className="text-foreground/40 text-sm mt-1">Click "Add Child" to register your first student.</p>
                </div>
              ) : (
                <div className="border border-secondary/20 rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-secondary/20 bg-foreground/5">
                        <TableHead className="font-cinzel text-secondary">Name</TableHead>
                        <TableHead className="font-cinzel text-secondary">Grade</TableHead>
                        <TableHead className="font-cinzel text-secondary">Username</TableHead>
                        <TableHead className="font-cinzel text-secondary">Gender</TableHead>
                        <TableHead className="font-cinzel text-secondary">Registered</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {students.map((s) => (
                        <TableRow key={s.id} className="border-secondary/10">
                          <TableCell className="font-cinzel text-foreground">{s.first_name} {s.last_name}</TableCell>
                          <TableCell className="text-foreground/80">Grade {s.grade}</TableCell>
                          <TableCell className="text-foreground/80 font-mono text-sm">{s.username}</TableCell>
                          <TableCell className="text-foreground/80 capitalize">{s.gender}</TableCell>
                          <TableCell className="text-foreground/60 text-sm">{new Date(s.created_at).toLocaleDateString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>

            {/* ─── Resources Tab ─── */}
            <TabsContent value="resources" className="space-y-6">
              <h2 className="font-cinzel text-2xl font-bold text-foreground">About Lion's Pen</h2>

              <div className="space-y-6">
                <section className="border border-secondary/20 rounded-lg p-6 bg-foreground/5">
                  <h3 className="font-cinzel text-lg font-semibold text-secondary mb-3">What is Lion's Pen?</h3>
                  <p className="text-foreground/80 leading-relaxed">
                    Lion's Pen is a daily reflective writing program designed for students in grades 3–8.
                    Inspired by the ancient scribes of Babylon, students enter a sacred "Scriptorium" each day
                    to reflect on their academics, emotions, and character through guided writing prompts.
                  </p>
                </section>

                <section className="border border-secondary/20 rounded-lg p-6 bg-foreground/5">
                  <h3 className="font-cinzel text-lg font-semibold text-secondary mb-3">How It Works</h3>
                  <ol className="text-foreground/80 leading-relaxed space-y-2 list-decimal list-inside">
                    <li><strong>Login</strong> — Your child enters their username and secret code.</li>
                    <li><strong>Breathing Exercise</strong> — A 60-second calming exercise to center the mind.</li>
                    <li><strong>Scriber's Oath</strong> — A pledge to write honestly and thoughtfully.</li>
                    <li><strong>Three Reflections</strong> — Your child answers one academic, one emotional, and one character question.</li>
                    <li><strong>Celestial Message</strong> — An inspiring closing message to end the session.</li>
                  </ol>
                </section>

                <section className="border border-secondary/20 rounded-lg p-6 bg-foreground/5">
                  <h3 className="font-cinzel text-lg font-semibold text-secondary mb-3">The 4-Week Cycle</h3>
                  <p className="text-foreground/80 leading-relaxed">
                    The program follows a 4-week rotating cycle, with 5 school days per week (Sunday–Thursday).
                    Each day presents unique, grade-appropriate prompts that encourage deeper self-awareness and growth.
                    After Week 4, the cycle resets, offering fresh prompts for continued reflection.
                  </p>
                </section>

                <section className="border border-secondary/20 rounded-lg p-6 bg-foreground/5">
                  <h3 className="font-cinzel text-lg font-semibold text-secondary mb-3">Tips for Parents</h3>
                  <ul className="text-foreground/80 leading-relaxed space-y-2 list-disc list-inside">
                    <li>Encourage your child to complete their reflection at the same time each day.</li>
                    <li>Ask them about what they wrote — it opens great conversations!</li>
                    <li>Remind them there are no wrong answers — honesty is the goal.</li>
                    <li>Celebrate consistency — the habit of reflection is the real reward.</li>
                  </ul>
                </section>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
    </div>
  );
};

export default ParentDashboard;
