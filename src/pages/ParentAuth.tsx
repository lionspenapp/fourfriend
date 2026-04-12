import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import lionsPenLogo from "@/assets/lions_pen.png";
import { supabase } from "@/integrations/supabase/client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PASSWORD_RULES = [
  { test: (p: string) => p.length >= 8, label: "At least 8 characters" },
  { test: (p: string) => /[A-Z]/.test(p), label: "1 uppercase letter" },
  { test: (p: string) => /[a-z]/.test(p), label: "1 lowercase letter" },
  { test: (p: string) => /[0-9]/.test(p), label: "1 number" },
  { test: (p: string) => /[^A-Za-z0-9]/.test(p), label: "1 special character" },
];

const isPasswordValid = (p: string) => PASSWORD_RULES.every((r) => r.test(p));

const ParentAuth = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [childFirstName, setChildFirstName] = useState("");
  const [childLastName, setChildLastName] = useState("");
  const [childGrade, setChildGrade] = useState("");
  const [childGender, setChildGender] = useState("male");
  const [childEmail, setChildEmail] = useState("");
  const [childUsername, setChildUsername] = useState("");
  const [childPassword, setChildPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSignUp && !isPasswordValid(password)) {
      toast({
        title: "Weak password",
        description: "Password must be 8+ characters with uppercase, lowercase, number, and special character.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName },
            emailRedirectTo: window.location.origin,
          },
        });
        if (error) throw error;

        if (data.user) {
          const { data: result, error: rpcError } = await supabase.rpc("register_student", {
            p_parent_id: data.user.id,
            p_first_name: childFirstName,
            p_last_name: childLastName,
            p_grade: parseInt(childGrade),
            p_gender: childGender,
            p_email: childEmail || null,
            p_username: childUsername,
            p_password: childPassword,
          });
          if (rpcError) throw rpcError;
          if (result && !(result as any).success) throw new Error((result as any).error);
        }

        toast({
          title: "Check your email",
          description: "We sent you a confirmation link to verify your account.",
        });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };


  const inputClass =
    "bg-foreground/5 border-secondary/40 text-foreground placeholder:text-foreground/50 focus-visible:ring-secondary";

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-2 bg-secondary" />
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-secondary" />
      <div className="absolute left-0 top-0 bottom-0 w-2 bg-secondary" />
      <div className="absolute right-0 top-0 bottom-0 w-2 bg-secondary" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <img src={lionsPenLogo} alt="Lion's Pen" className="w-72 h-auto mx-auto mb-4" />
          <h1 className="font-cinzel text-4xl font-bold text-primary tracking-wide">
            Lion's Pen
          </h1>
          <p className="text-foreground/70 mt-2 font-cinzel text-sm tracking-widest uppercase">
            Parent Portal
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-foreground/5 backdrop-blur-sm border-2 border-secondary/30 rounded-lg p-6 space-y-4 max-h-[60vh] overflow-y-auto">
            {isSignUp && (
              <>
                <p className="text-secondary font-cinzel text-xs tracking-widest uppercase border-b border-secondary/30 pb-2">
                  Parent Information
                </p>
                <div>
                  <label className="block text-foreground/90 text-sm font-cinzel mb-1.5 tracking-wide">
                    Full Name
                  </label>
                  <Input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Your name" required className={inputClass} />
                </div>
              </>
            )}

            <div>
              <label className="block text-foreground/90 text-sm font-cinzel mb-1.5 tracking-wide">
                Email
              </label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="parent@example.com" required className={inputClass} />
            </div>
            <div>
              <label className="block text-foreground/90 text-sm font-cinzel mb-1.5 tracking-wide">
                Password
              </label>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required minLength={8} className={inputClass} style={{color: 'hsl(var(--foreground))'}} />
              {isSignUp && password.length > 0 && (
                <div className="mt-2 space-y-1">
                  {PASSWORD_RULES.map((rule) => (
                    <p key={rule.label} className={`text-xs font-cinzel ${rule.test(password) ? "text-green-600" : "text-foreground/60"}`}>
                      {rule.test(password) ? "✓" : "○"} {rule.label}
                    </p>
                  ))}
                </div>
              )}
            </div>

            {isSignUp && (
              <>
                <p className="text-secondary font-cinzel text-xs tracking-widest uppercase border-b border-secondary/30 pb-2 mt-6">
                  Student Information
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-foreground/90 text-sm font-cinzel mb-1.5 tracking-wide">
                      First Name
                    </label>
                    <Input value={childFirstName} onChange={(e) => setChildFirstName(e.target.value)} placeholder="First" required className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-foreground/90 text-sm font-cinzel mb-1.5 tracking-wide">
                      Last Name
                    </label>
                    <Input value={childLastName} onChange={(e) => setChildLastName(e.target.value)} placeholder="Last" required className={inputClass} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-foreground/90 text-sm font-cinzel mb-1.5 tracking-wide">
                      Grade
                    </label>
                    <Select value={childGrade} onValueChange={setChildGrade} required>
                      <SelectTrigger className={inputClass}>
                        <SelectValue placeholder="Grade" />
                      </SelectTrigger>
                      <SelectContent>
                        {[3, 4, 5, 6, 7, 8].map((g) => (
                          <SelectItem key={g} value={String(g)}>
                            Grade {g}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-foreground/90 text-sm font-cinzel mb-1.5 tracking-wide">
                      Gender
                    </label>
                    <RadioGroup value={childGender} onValueChange={setChildGender} className="flex gap-4 mt-2">
                      <div className="flex items-center gap-1.5">
                        <RadioGroupItem value="male" id="male" className="border-secondary/50 text-secondary" />
                        <Label htmlFor="male" className="text-foreground/80 text-sm font-cinzel">Male</Label>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <RadioGroupItem value="female" id="female" className="border-secondary/50 text-secondary" />
                        <Label htmlFor="female" className="text-foreground/80 text-sm font-cinzel">Female</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div>
                    <label className="block text-foreground/90 text-sm font-cinzel mb-1.5 tracking-wide">
                    Student Email <span className="text-foreground/60">(optional)</span>
                  </label>
                  <Input type="email" value={childEmail} onChange={(e) => setChildEmail(e.target.value)} placeholder="child@example.com" className={inputClass} />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-foreground/90 text-sm font-cinzel mb-1.5 tracking-wide">
                      Username
                    </label>
                    <Input value={childUsername} onChange={(e) => setChildUsername(e.target.value)} placeholder="scriber_name" required className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-foreground/90 text-sm font-cinzel mb-1.5 tracking-wide">
                      Secret Code
                    </label>
                    <Input type="password" value={childPassword} onChange={(e) => setChildPassword(e.target.value)} placeholder="••••••" required minLength={4} className={inputClass} />
                  </div>
                </div>
              </>
            )}

            <Button type="submit" disabled={loading} className="w-full bg-primary text-primary-foreground font-cinzel tracking-wide hover:bg-primary/90 text-base py-5">
              {loading ? "Please wait..." : isSignUp ? "Create Account" : "Sign In"}
            </Button>

          </div>
        </form>

        <p className="text-center mt-6 text-foreground/70 text-sm">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-secondary hover:text-secondary/80 transition-colors font-cinzel"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>
        <p className="text-center mt-3 text-foreground/60 text-sm">
          <button onClick={() => navigate("/student")} className="hover:text-foreground/80 transition-colors font-cinzel">
            Student Login →
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default ParentAuth;