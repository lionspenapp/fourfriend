import { useMemo, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PenLine } from "lucide-react";
import { useLionsPen, type FlowStep } from "@/context/LionsPenContext";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { getQuestion } from "@/data/questionDatabase";
import { useToast } from "@/hooks/use-toast";
import scrollBg from "@/assets/scroll-bg.png";
import babylonBg from "@/assets/babylon-bg.jpg";
import hangingGardenBg from "@/assets/hanging-garden-bg.jpg";
import danielBg from "@/assets/daniel-bg.jpg";
import papyrusBg from "@/assets/papyrus-bg.jpg";

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
      className="min-h-screen flex items-start justify-center p-6 pt-6 relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: type === "academic" ? `url(${babylonBg})` : type === "emotion" ? `url(${hangingGardenBg})` : type === "character" ? `url(${danielBg})` : undefined,
      }}
    >
      {type !== "academic" && type !== "emotion" && type !== "character" && <div className="absolute inset-0 bg-background" />}
      {(type === "academic" || type === "emotion" || type === "character") && <div className="absolute inset-0 bg-black/40" />}
      <div className="absolute top-0 left-0 right-0 h-2 bg-secondary z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-secondary z-10" />
      <div className="absolute left-0 top-0 bottom-0 w-2 bg-secondary z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-2 bg-secondary z-10" />

      {/* Progress dots */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
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
        className="max-w-3xl w-full relative z-10 mt-6"
      >
        {/* Scroll — question only */}
        <div
          className="relative w-full"
          style={{
            backgroundImage: `url(${scrollBg})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            aspectRatio: "2 / 1.6",
          }}
        >
          <div className="absolute inset-0 flex flex-col justify-center" style={{ padding: "6% 14%" }}>
            <p className="text-white drop-shadow-md text-xs font-cinzel tracking-widest uppercase mb-2">
              {CATEGORY_LABEL[type]} Reflection — Question {meta.num} of 3
            </p>
            <h2 className="font-cinzel text-lg font-bold text-white drop-shadow-lg leading-relaxed">
              {loading ? "Loading question…" : prompt}
            </h2>
          </div>
        </div>

        {/* Decorative divider */}
        <div className="flex items-center gap-3 my-3 px-4">
          <div className="flex-1 h-px bg-secondary/60" />
          <PenLine className="text-secondary rotate-90" size={20} />
          <div className="flex-1 h-px bg-secondary/60" />
        </div>

        {/* Papyrus response area */}
        <div
          className="w-full rounded-lg border border-[#C8A882] shadow-md p-6"
          style={{
            backgroundImage: `url(${papyrusBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="rounded-md bg-[#F5E6C8]/85 p-3">
            <Textarea
              value={value}
              onChange={(e) => setResponse(type, e.target.value)}
              placeholder="Write your reflection here…"
              className="min-h-[100px] w-full bg-transparent border-none text-[#2a1810] font-medium placeholder:text-[#2a1810]/50 focus-visible:ring-0 focus-visible:ring-offset-0 text-base leading-relaxed resize-none"
            />
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="text-sm">
            {showWarning ? (
              <span className="text-white drop-shadow-md">
                Try to write at least {MIN_SENTENCES} sentences ({sentences} so far)
              </span>
            ) : value.length > 0 ? (
              <span className="text-white/80 drop-shadow-md">{sentences} sentence{sentences !== 1 ? "s" : ""}</span>
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
                  markSubmitted(student.id);
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
