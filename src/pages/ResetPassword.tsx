import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import lionsPenLogo from "@/assets/lions_pen.png";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const PASSWORD_RULES = [
  { test: (p: string) => p.length >= 8, label: "At least 8 characters" },
  { test: (p: string) => /[A-Z]/.test(p), label: "1 uppercase letter" },
  { test: (p: string) => /[a-z]/.test(p), label: "1 lowercase letter" },
  { test: (p: string) => /[0-9]/.test(p), label: "1 number" },
  { test: (p: string) => /[^A-Za-z0-9]/.test(p), label: "1 special character" },
];

const isPasswordValid = (p: string) => PASSWORD_RULES.every((r) => r.test(p));

const ResetPassword = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isRecovery, setIsRecovery] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [linkError, setLinkError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const stripUrl = () => window.history.replaceState({}, "", "/reset-password");

    const enterRecovery = () => {
      if (cancelled) return;
      setIsRecovery(true);
      setVerifying(false);
      stripUrl();
    };

    const fail = (msg: string) => {
      if (cancelled) return;
      setLinkError(msg);
      setVerifying(false);
    };

    const run = async () => {
      const url = new URL(window.location.href);
      const hash = window.location.hash;
      const hashParams = new URLSearchParams(hash.startsWith("#") ? hash.slice(1) : hash);

      // 1. Explicit error in URL (expired, already used, etc.)
      const errDesc =
        url.searchParams.get("error_description") ||
        hashParams.get("error_description") ||
        url.searchParams.get("error") ||
        hashParams.get("error");
      if (errDesc) {
        fail(decodeURIComponent(errDesc).replace(/\+/g, " "));
        return;
      }

      // 2. Legacy hash flow: #type=recovery&access_token=...
      if (hash.includes("type=recovery")) {
        enterRecovery();
        return;
      }

      // 3. PKCE flow: ?code=...
      const code = url.searchParams.get("code");
      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (cancelled) return;
        if (!error) {
          enterRecovery();
          return;
        }
        // Exchange failed (commonly: missing PKCE verifier because the link
        // was opened in a different browser / Gmail in-app browser).
        // Supabase's /verify hop may still have established a session — check.
        await new Promise((r) => setTimeout(r, 200));
        const { data } = await supabase.auth.getSession();
        if (cancelled) return;
        if (data.session) {
          enterRecovery();
          return;
        }
        fail(
          "This reset link must be opened in the same browser where you requested it. Please request a new link from this device."
        );
        return;
      }

      // 4. No code/hash/error — but maybe the verify redirect already
      // signed us in. If so, treat as recovery.
      const { data } = await supabase.auth.getSession();
      if (cancelled) return;
      if (data.session) {
        enterRecovery();
        return;
      }

      setVerifying(false);
    };

    run();

    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setIsRecovery(true);
        setVerifying(false);
      }
    });
    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, []);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isPasswordValid(password)) {
      toast({
        title: "Weak password",
        description: "Password must be 8+ characters with uppercase, lowercase, number, and special character.",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please retype the same password in both fields.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;

      setPassword("");
      setConfirmPassword("");
      toast({ title: "Password updated!", description: "You can now sign in with your new password." });
      navigate("/");
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "bg-foreground/5 border-secondary/40 text-foreground placeholder:text-foreground/50 focus-visible:ring-secondary";

  if (verifying) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <p className="text-foreground/70 font-cinzel animate-pulse">Verifying reset link…</p>
      </div>
    );
  }

  if (!isRecovery) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center max-w-sm">
          <p className="text-foreground/70 font-cinzel">
            {linkError
              ? `This reset link is no longer valid: ${linkError}`
              : "Invalid or expired reset link."}
          </p>
          <p className="text-foreground/60 font-cinzel text-sm mt-2">
            Reset links can only be used once. Please request a new one.
          </p>
          <button onClick={() => navigate("/")} className="text-secondary font-cinzel mt-4 hover:text-secondary/80">
            Back to Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-2 bg-secondary" />
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-secondary" />
      <div className="absolute left-0 top-0 bottom-0 w-2 bg-secondary" />
      <div className="absolute right-0 top-0 bottom-0 w-2 bg-secondary" />

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src={lionsPenLogo} alt="Lion's Pen" className="w-72 h-auto mx-auto mb-4" />
          <h1 className="font-cinzel text-4xl font-bold text-primary tracking-wide">Lion's Pen</h1>
          <p className="text-foreground/70 mt-2 font-cinzel text-sm tracking-widest uppercase">Set New Password</p>
        </div>

        <form onSubmit={handleReset} className="space-y-4">
          <div className="bg-foreground/5 backdrop-blur-sm border-2 border-secondary/30 rounded-lg p-6 space-y-4">
            <div>
              <label className="block text-foreground/90 text-sm font-cinzel mb-1.5 tracking-wide">New Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={8}
                className={inputClass}
                style={{ color: "hsl(var(--foreground))" }}
              />
              {password.length > 0 && (
                <div className="mt-2 space-y-1">
                  {PASSWORD_RULES.map((rule) => (
                    <p key={rule.label} className={`text-xs font-cinzel ${rule.test(password) ? "text-green-600" : "text-foreground/60"}`}>
                      {rule.test(password) ? "✓" : "○"} {rule.label}
                    </p>
                  ))}
                </div>
              )}
            </div>

            <Button type="submit" disabled={loading} className="w-full bg-primary text-primary-foreground font-cinzel tracking-wide hover:bg-primary/90 text-base py-5">
              {loading ? "Updating..." : "Update Password"}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
