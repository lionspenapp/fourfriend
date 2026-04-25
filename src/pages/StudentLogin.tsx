import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useLionsPen } from "@/context/LionsPenContext";
import { supabase } from "@/integrations/supabase/client";
import lionsPenLogo from "@/assets/lions_pen_v4.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";

const StudentLogin = () => {
  const { setStudent, setStep, week } = useLionsPen();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      toast({ title: "Please enter both username and secret word", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.rpc("verify_student_login", {
        p_username: username.trim(),
        p_password: password,
      });

      if (error) throw error;

      const result = data as { success: boolean; error?: string; student?: { id: string; firstName: string; lastName: string; grade: number; username: string } };

      if (!result.success) {
        toast({ title: "Login failed", description: result.error || "Invalid credentials", variant: "destructive" });
        return;
      }

      const s = result.student!;
      setStudent({
        id: s.id,
        firstName: s.firstName,
        lastName: s.lastName,
        grade: s.grade,
        username: s.username,
      });

      // Check this week's status to decide where to route
      const { data: statusData } = await supabase.rpc("get_student_week_status", {
        p_student_id: s.id,
        p_week: week,
      });
      const status = (statusData as { today_done: boolean; week_full: boolean }) ?? { today_done: false, week_full: false };

      if (status.week_full) {
        toast({ title: "You've finished all 5 weekly sessions", description: "Visit your portal to review your week." });
        navigate("/student/portal");
      } else if (status.today_done) {
        toast({ title: "You've already reflected today", description: "Come back tomorrow, Scriber." });
        navigate("/student/portal");
      } else {
        setStep("breathing");
      }
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

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
          <img src={lionsPenLogo} alt="Lion's Pen" className="w-[13.5rem] h-auto mx-auto mb-4" />
          <div className="font-cinzel font-bold uppercase text-center leading-tight tracking-wide mb-6">
            <p className="text-primary text-base md:text-lg">Daily Reflection</p>
            <p className="text-primary text-base md:text-lg">That Builds Leaders</p>
            <p className="text-secondary text-sm md:text-base mt-1">Who Direct and Command AI Era!</p>
          </div>
          <h1 className="font-cinzel text-4xl font-bold text-primary tracking-wide">
            Lion's Pen
          </h1>
           <p className="text-secondary mt-2 font-cinzel text-sm tracking-widest uppercase">
             The Inner Scriptorium
           </p>
           <p className="text-secondary/80 mt-1 font-cinzel italic text-xs tracking-wide">
             where you become who you were meant to be
           </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="bg-foreground/5 backdrop-blur-sm border-2 border-secondary/30 rounded-lg p-6 space-y-4">
            <div>
               <label className="block text-secondary text-sm font-cinzel mb-1.5 tracking-wide">
                 Scriber Name
              </label>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your name"
                 className="bg-foreground/5 border-secondary/40 text-foreground placeholder:text-foreground/50 focus-visible:ring-secondary"
              />
            </div>
            <div>
               <label className="block text-secondary text-sm font-cinzel mb-1.5 tracking-wide">
                 Secret Word
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="bg-foreground/5 border-secondary/40 text-foreground placeholder:text-foreground/50 focus-visible:ring-secondary pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/50 hover:text-foreground/80 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-secondary text-secondary-foreground font-cinzel tracking-wide hover:bg-secondary/90 text-base py-5"
            >
              {loading ? "Verifying..." : "Enter the Scriptorium"}
            </Button>
          </div>
        </form>

         <div className="text-center mt-6 text-secondary/80 text-sm font-cinzel space-y-1">
           <p>
             <button onClick={() => navigate("/parent")} className="cursor-pointer hover:text-secondary transition-colors">
               Parent Login →
             </button>
           </p>
           <p className="text-secondary/70 text-xs">
             New parent?{" "}
             <button onClick={() => navigate("/parent?signup=1")} className="cursor-pointer underline hover:text-secondary transition-colors">
               Create an account
             </button>
           </p>
         </div>
      </motion.div>
    </div>
  );
};

export default StudentLogin;