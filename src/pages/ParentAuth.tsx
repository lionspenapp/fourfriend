import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import lionsPenLogo from "@/assets/lions_pen.png";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
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
          const { error: studentError } = await supabase.from("students").insert({
            parent_id: data.user.id,
            first_name: childFirstName,
            last_name: childLastName,
            grade: parseInt(childGrade),
            gender: childGender,
            email: childEmail || null,
            username: childUsername,
            password_hash: childPassword,
          });
          if (studentError) throw studentError;
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

  const handleGoogleLogin = async () => {
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      toast({
        title: "Error",
        description: result.error.message,
        variant: "destructive",
      });
    }
  };

  const inputClass =
    "bg-foreground/5 border-secondary/40 text-foreground placeholder:text-foreground/40 focus-visible:ring-secondary";

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
          <img src={lionsPenLogo} alt="Lion's Pen" className="w-56 h-56 mx-auto mb-4" />
          <h1 className="font-cinzel text-4xl font-bold text-primary tracking-wide">
            Lion's Pen
          </h1>
          <p className="text-foreground/50 mt-2 font-cinzel text-sm tracking-widest uppercase">
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
                  <label className="block text-foreground/70 text-sm font-cinzel mb-1.5 tracking-wide">
                    Full Name
                  </label>
                  <Input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Your name" required className={inputClass} />
                </div>
              </>
            )}

            <div>
              <label className="block text-foreground/70 text-sm font-cinzel mb-1.5 tracking-wide">
                Email
              </label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="parent@example.com" required className={inputClass} />
            </div>
            <div>
              <label className="block text-foreground/70 text-sm font-cinzel mb-1.5 tracking-wide">
                Password
              </label>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required minLength={6} className={inputClass} />
            </div>

            {isSignUp && (
              <>
                <p className="text-secondary font-cinzel text-xs tracking-widest uppercase border-b border-secondary/30 pb-2 mt-6">
                  Student Information
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-foreground/70 text-sm font-cinzel mb-1.5 tracking-wide">
                      First Name
                    </label>
                    <Input value={childFirstName} onChange={(e) => setChildFirstName(e.target.value)} placeholder="First" required className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-foreground/70 text-sm font-cinzel mb-1.5 tracking-wide">
                      Last Name
                    </label>
                    <Input value={childLastName} onChange={(e) => setChildLastName(e.target.value)} placeholder="Last" required className={inputClass} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-foreground/70 text-sm font-cinzel mb-1.5 tracking-wide">
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
                    <label className="block text-foreground/70 text-sm font-cinzel mb-1.5 tracking-wide">
                      Gender
                    </label>
                    <RadioGroup value={childGender} onValueChange={setChildGender} className="flex gap-4 mt-2">
                      <div className="flex items-center gap-1.5">
                        <RadioGroupItem value="male" id="male" className="border-secondary/50 text-secondary" />
                        <Label htmlFor="male" className="text-foreground/60 text-sm font-cinzel">Male</Label>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <RadioGroupItem value="female" id="female" className="border-secondary/50 text-secondary" />
                        <Label htmlFor="female" className="text-foreground/60 text-sm font-cinzel">Female</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div>
                  <label className="block text-foreground/70 text-sm font-cinzel mb-1.5 tracking-wide">
                    Student Email <span className="text-foreground/40">(optional)</span>
                  </label>
                  <Input type="email" value={childEmail} onChange={(e) => setChildEmail(e.target.value)} placeholder="child@example.com" className={inputClass} />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-foreground/70 text-sm font-cinzel mb-1.5 tracking-wide">
                      Username
                    </label>
                    <Input value={childUsername} onChange={(e) => setChildUsername(e.target.value)} placeholder="scriber_name" required className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-foreground/70 text-sm font-cinzel mb-1.5 tracking-wide">
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

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-secondary/30" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-foreground/40 font-cinzel">or</span>
              </div>
            </div>

            <Button
              type="button"
              onClick={handleGoogleLogin}
              variant="outline"
              className="w-full border-secondary/40 text-foreground hover:bg-foreground/5 font-cinzel tracking-wide py-5"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continue with Google
            </Button>
          </div>
        </form>

        <p className="text-center mt-6 text-foreground/50 text-sm">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-secondary hover:text-secondary/80 transition-colors font-cinzel"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>
        <p className="text-center mt-3 text-foreground/35 text-sm">
          <button onClick={() => navigate("/student")} className="hover:text-foreground/50 transition-colors font-cinzel">
            Student Login →
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default ParentAuth;