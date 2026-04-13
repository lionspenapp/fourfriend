import { useMemo, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLionsPen, type FlowStep } from "@/context/LionsPenContext";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { getQuestion } from "@/data/questionDatabase";
import { useToast } from "@/hooks/use-toast";
import scrollBg from "@/assets/scroll-bg.png";
import babylonBg from "@/assets/babylon-bg.jpg";

interface QuestionPageProps {
  type: "academic" | "emotion" | "character";
}

const STEP_MAP: Record<string, { num: number; next: FlowStep; btnLabel: string }> = {
  academic: { num: 1, next: "emotion", btnLabel: "Next" },
  emotion: { num: 2, next: "character", btnLabel: "Next" },
  character: { num: 3, next: "celestial", btnLabel: "Submit to the Celestial Scriptorium" },
};

const CATEGORY_LABEL: Record<string, string> = {
  academic: "Academic",
  emotion: "Emotion",
  character: "Character",
};

function countSentences(text: string): number {
  if (!text.trim()) return 0;
  return text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length;
}

const MIN_SENTENCES = 3;

const QuestionPage = ({ type }: QuestionPageProps) => {
  const { responses, setResponse, setStep, student, week, day, markSubmitted } = useLionsPen();
  const { toast } = useToast();
  const meta = STEP_MAP[type];
  const value = responses[type];
  const sentences = useMemo(() => countSentences(value), [value]);
  const showWarning = value.length > 0 && sentences < MIN_SENTENCES;
  const [submitting, setSubmitting] = useState(false);

  const grade = student?.grade ?? 5;
  const gradeBand = grade <= 4 ? "3-4" : grade <= 6 ? "5-6" : "7-8";

  // Fetch question from database, fall back to local mock
  const [prompt, setPrompt] = useState("Reflect on your day and share your thoughts.");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function fetchQuestion() {
      setLoading(true);
      const { data, error } = await supabase
        .from("questions")
        .select("prompt")
        .eq("category", type)
        .eq("grade_band", gradeBand)
        .eq("week", week)
        .eq("day", day)
        .maybeSingle();

      if (!cancelled) {
        if (data?.prompt) {
          setPrompt(data.prompt);
        } else {
          // Fallback to local mock
          const local = getQuestion(type, grade, week, day);
          setPrompt(local?.prompt ?? "Reflect on your day and share your thoughts.");
        }
        setLoading(false);
      }
    }
    fetchQuestion();
    return () => { cancelled = true; };
  }, [type, gradeBand, week, day, grade]);

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 relative bg-cover bg-center bg-no-repeat"
      style={type === "academic" ? { backgroundImage: `url(${babylonBg})` } : undefined}
    >
      {type === "academic" && <div className="absolute inset-0 bg-black/40" />}
      {type !== "academic" && <div className="absolute inset-0 bg-background" />}
      <div className="absolute top-0 left-0 right-0 h-2 bg-secondary z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-secondary z-10" />
      <div className="absolute left-0 top-0 bottom-0 w-2 bg-secondary z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-2 bg-secondary z-10" />

      {/* Progress dots */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-2">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              n <= meta.num ? "bg-secondary" : "bg-foreground/20"
            }`}
          />
        ))}
      </div>

      <motion.div
        key={type}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full relative z-10"
      >
        {/* Scroll background container */}
        <div
          className="relative w-full"
          style={{
            backgroundImage: `url(${scrollBg})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            aspectRatio: "2 / 1.8",
          }}
        >
          {/* Content positioned over the parchment area */}
          <div className="absolute inset-0 flex flex-col justify-center" style={{ padding: "8% 15%" }}>
            <p className="text-secondary text-xs font-cinzel tracking-widest uppercase mb-2">
              {CATEGORY_LABEL[type]} Reflection — Question {meta.num} of 3
            </p>
            <h2 className="font-cinzel text-xl font-bold text-primary mb-4 leading-relaxed">
              {loading ? "Loading question…" : prompt}
            </h2>

            <Textarea
              value={value}
              onChange={(e) => setResponse(type, e.target.value)}
              placeholder="Write your reflection here…"
              className="min-h-[120px] flex-1 bg-transparent border-secondary/20 text-foreground placeholder:text-foreground/40 focus-visible:ring-secondary text-base leading-relaxed resize-none"
            />
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="text-sm">
            {showWarning ? (
              <span className="text-secondary/70">
                Try to write at least {MIN_SENTENCES} sentences ({sentences} so far)
              </span>
            ) : value.length > 0 ? (
              <span className="text-foreground/60">{sentences} sentence{sentences !== 1 ? "s" : ""}</span>
            ) : null}
          </div>

          <Button
            disabled={submitting}
            onClick={async () => {
              if (type === "character" && student?.id) {
                setSubmitting(true);
                try {
                  const { data, error } = await supabase.rpc("submit_student_response", {
                    p_student_id: student.id,
                    p_academic: responses.academic,
                    p_emotion: responses.emotion,
                    p_character: responses.character,
                    p_week: week,
                    p_day: day,
                  });
                  if (error) throw error;
                  const result = data as any;
                  if (!result.success) {
                    toast({ title: "Submission failed", description: result.error, variant: "destructive" });
                    setSubmitting(false);
                    return;
                  }
                  markSubmitted();
                } catch (err: any) {
                  toast({ title: "Error saving", description: err.message, variant: "destructive" });
                  setSubmitting(false);
                  return;
                }
                setSubmitting(false);
              }
              setStep(meta.next);
            }}
            className="bg-secondary text-secondary-foreground font-cinzel tracking-wide hover:bg-secondary/90 px-8"
          >
            {submitting ? "Saving..." : meta.btnLabel}
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default QuestionPage;
