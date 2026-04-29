import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useLionsPen } from "@/context/LionsPenContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import lionsPenLogo from "@/assets/lions_pen_v4.png";
import { BookOpen, Compass, MessageCircle, LogOut, Trash2, Star, Check } from "lucide-react";
import {
  APP_CALENDAR_TIME_ZONE,
  dateFromCalendarKey,
  getCalendarDateKeyInTimeZone,
  getEasternWeekdayStripKeys,
} from "@/lib/utils";

interface WeekSubmission {
  id: string;
  day: number;
  entry_date: string;
  academic_response: string;
  emotion_response: string;
  character_response: string;
  submitted_at: string;
  completed_at: string;
}

interface SavedQuotation {
  id: string;
  quote: string;
  author: string;
  created_at: string;
}

const StudentPortal = () => {
  const { student, week, setStep, resetSession } = useLionsPen();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [submissions, setSubmissions] = useState<WeekSubmission[]>([]);
  const [quotations, setQuotations] = useState<SavedQuotation[]>([]);
  const [loading, setLoading] = useState(true);
  const [todayDone, setTodayDone] = useState(false);

  const loadQuotations = useCallback(async (studentId: string) => {
    const { data, error } = await supabase.rpc("get_saved_quotations", {
      p_student_id: studentId,
    });
    if (!error && data) setQuotations(data as SavedQuotation[]);
  }, []);

  useEffect(() => {
    if (!student) {
      navigate("/student");
      return;
    }
    (async () => {
      const [subsRes, statusRes] = await Promise.all([
        supabase.rpc("get_student_week_submissions", { p_student_id: student.id, p_week: week }),
        supabase.rpc("get_student_week_status", { p_student_id: student.id, p_week: week }),
      ]);
      if (subsRes.error) {
        toast({ title: "Could not load entries", description: subsRes.error.message, variant: "destructive" });
      } else {
        setSubmissions((subsRes.data as WeekSubmission[]) ?? []);
      }
      const status = statusRes.data as { today_done: boolean } | null;
      setTodayDone(!!status?.today_done);
      await loadQuotations(student.id);
      setLoading(false);
    })();
  }, [student, week, navigate, toast, loadQuotations]);

  const completedDays = new Set(submissions.map((s) => s.day));
  const weekFull = submissions.length >= 5;
  const canEnter = !todayDone && !weekFull;

  const handleEnter = useCallback(() => {
    if (weekFull) {
      toast({ title: "You've finished all 5 weekly sessions", description: "Come back next week, Scribe." });
      return;
    }
    if (todayDone) {
      toast({ title: "You've already completed today's reflection" });
      return;
    }
    setStep("breathing");
    navigate("/student");
  }, [weekFull, todayDone, setStep, navigate, toast]);

  const handleSignOut = useCallback(() => {
    resetSession();
    navigate("/student");
  }, [resetSession, navigate]);

  const handleDeleteQuote = useCallback(
    async (id: string) => {
      if (!student?.id) return;
      const { data, error } = await supabase.rpc("delete_saved_quotation", {
        p_student_id: student.id,
        p_id: id,
      });
      const result = data as { success: boolean; error?: string } | null;
      if (error || !result?.success) {
        toast({
          title: "Could not delete",
          description: error?.message ?? result?.error ?? "Try again.",
          variant: "destructive",
        });
        return;
      }
      setQuotations((prev) => prev.filter((q) => q.id !== id));
    },
    [student?.id, toast]
  );

  if (!student) return null;

  return (
    <div className="min-h-screen bg-background relative">
      <div className="absolute top-0 left-0 right-0 h-2 bg-secondary" />
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-secondary" />
      <div className="absolute left-0 top-0 bottom-0 w-2 bg-secondary" />
      <div className="absolute right-0 top-0 bottom-0 w-2 bg-secondary" />

      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <img src={lionsPenLogo} alt="Lion's Pen" className="w-24 h-auto" />
            <div>
              <h1 className="font-cinzel text-2xl font-bold text-primary tracking-wide">
                Welcome, {student.firstName}
              </h1>
              <p className="text-secondary font-cinzel text-xs tracking-widest uppercase">
                Scribe's Portal · Week {week}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            onClick={handleSignOut}
            className="text-secondary hover:bg-secondary/10 font-cinzel"
          >
            <LogOut className="mr-2 h-4 w-4" /> Sign Out
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Weekly Activity */}
          <Card className="p-6 border-secondary/30">
            <div className="flex items-baseline justify-between mb-6">
              <h2 className="font-cinzel text-lg text-primary tracking-wide">Weekly Activity</h2>
              <span className="font-cinzel text-xs text-secondary">{submissions.length} / 5</span>
            </div>

            {/* Stacked horizontal timeline */}
            {(() => {
              const stripKeys = getEasternWeekdayStripKeys();
              const todayKey = getCalendarDateKeyInTimeZone(new Date());

              const subByDay = new Map(submissions.map((s) => [s.day, s]));

              const dateFmt = new Intl.DateTimeFormat("en-US", {
                timeZone: APP_CALENDAR_TIME_ZONE,
                month: "short",
                day: "numeric",
              });
              const dayFmt = new Intl.DateTimeFormat("en-US", {
                timeZone: APP_CALENDAR_TIME_ZONE,
                weekday: "short",
              });

              return (
                <div className="relative max-w-2xl mx-auto px-2">
                  <div className="pointer-events-none absolute left-[10%] right-[10%] top-1/2 h-px bg-lapis/30" />
                  <div className="relative flex items-center justify-between">
                    {[1, 2, 3, 4, 5].map((d) => {
                      const sub = subByDay.get(d);
                      const stripKey = stripKeys[d - 1];
                      const date = sub ? new Date(sub.entry_date + "T12:00:00") : dateFromCalendarKey(stripKey);
                      const completed = !!sub;
                      const isToday = stripKey === todayKey;
                      return (
                        <div key={d} className="flex flex-col items-center gap-1.5 min-w-0">
                          <span className="font-cinzel text-[11px] sm:text-xs text-lapis tracking-wide min-h-[1rem]">
                            {completed ? dateFmt.format(date) : ""}
                          </span>
                          <div
                            className={`relative z-10 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all ${
                              completed
                                ? "bg-ochre border-2 border-ochre text-white shadow-[0_0_10px_hsl(var(--ochre)/0.45)]"
                                : `bg-background border-2 border-lapis ${
                                    isToday
                                      ? "ring-2 ring-lapis/30 ring-offset-2 ring-offset-background animate-pulse"
                                      : ""
                                  }`
                            }`}
                          >
                            {completed && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                          </div>
                          <span className="font-cinzel text-[10px] sm:text-[11px] text-lapis/80 uppercase tracking-widest">
                            {completed ? dayFmt.format(date) : `Day ${d}`}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  {loading && (
                    <p className="text-foreground/60 text-xs text-center mt-4">Loading…</p>
                  )}
                </div>
              );
            })()}
          </Card>

          {/* Saved Quotations */}
          <Card className="p-6 border-secondary/30">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-cinzel text-lg text-primary tracking-wide flex items-center gap-2">
                <Star className="h-5 w-5 text-amber-400" />
                My Saved Quotations
              </h2>
              <span className="text-xs font-cinzel text-secondary">{quotations.length} / 24</span>
            </div>
            {loading ? (
              <p className="text-foreground/60 text-sm">Loading…</p>
            ) : quotations.length === 0 ? (
              <p className="text-foreground/60 text-sm italic">
                No quotations saved yet. Tap “Save Quotation” after a reflection to keep your favorites here.
              </p>
            ) : (
              <ul className="space-y-3">
                {quotations.map((q) => (
                  <li
                    key={q.id}
                    className="p-4 rounded-md bg-foreground/5 border border-secondary/20 flex items-start gap-3"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-foreground italic leading-relaxed">“{q.quote}”</p>
                      <p className="text-secondary font-cinzel text-xs mt-2">
                        — {q.author}
                        <span className="text-foreground/40 ml-3">
                          {new Date(q.created_at).toLocaleDateString("en-US", {
                            timeZone: APP_CALENDAR_TIME_ZONE,
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteQuote(q.id)}
                      className="text-foreground/50 hover:text-destructive hover:bg-destructive/10 shrink-0"
                      aria-label="Delete quotation"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </Card>

          {/* Resources */}
          <Card className="p-6 border-secondary/30">
            <h2 className="font-cinzel text-lg text-primary mb-4 tracking-wide">Resources</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { icon: BookOpen, title: "Reading List", desc: "Curated wisdom" },
                { icon: Compass, title: "Reflection Guides", desc: "Deepen your practice" },
                { icon: MessageCircle, title: "Ask a Mentor", desc: "Coming soon" },
              ].map((r) => (
                <button
                  key={r.title}
                  className="text-left p-4 rounded-lg border border-secondary/30 bg-foreground/5 hover:bg-foreground/10 transition-colors"
                >
                  <r.icon className="h-5 w-5 text-secondary mb-2" />
                  <p className="font-cinzel text-primary text-sm tracking-wide">{r.title}</p>
                  <p className="text-foreground/60 text-xs mt-1">{r.desc}</p>
                </button>
              ))}
            </div>
          </Card>

          {/* Enter the Scriptorium */}
          <div className="flex justify-center pt-2">
            <Button
              onClick={handleEnter}
              disabled={!canEnter}
              className="bg-secondary text-secondary-foreground font-cinzel tracking-wide hover:bg-secondary/90 px-10 py-6 text-base disabled:opacity-40"
            >
              {weekFull
                ? "Weekly Sessions Complete"
                : todayDone
                ? "Today's Reflection Complete"
                : "Enter the Scriptorium"}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StudentPortal;
