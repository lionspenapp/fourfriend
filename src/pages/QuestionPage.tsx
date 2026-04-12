import { useMemo } from "react";
import { motion } from "framer-motion";
import { useLionsPen, type FlowStep } from "@/context/LionsPenContext";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { getQuestion } from "@/data/questionDatabase";

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
  const { responses, setResponse, setStep, student, week, day } = useLionsPen();
  const meta = STEP_MAP[type];
  const value = responses[type];
  const sentences = useMemo(() => countSentences(value), [value]);
  const showWarning = value.length > 0 && sentences < MIN_SENTENCES;

  const grade = student?.grade ?? 5;
  const question = getQuestion(type, grade, week, day);
  const prompt = question?.prompt ?? "Reflect on your day and share your thoughts.";

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative">
      <div className="absolute top-0 left-0 right-0 h-2 bg-secondary" />
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-secondary" />
      <div className="absolute left-0 top-0 bottom-0 w-2 bg-secondary" />
      <div className="absolute right-0 top-0 bottom-0 w-2 bg-secondary" />

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
        className="max-w-2xl w-full"
      >
        <p className="text-secondary/70 text-xs font-cinzel tracking-widest uppercase mb-2">
          {CATEGORY_LABEL[type]} Reflection — Question {meta.num} of 3
        </p>
        <h2 className="font-cinzel text-2xl font-bold text-foreground mb-6 leading-relaxed">
          {prompt}
        </h2>

        <Textarea
          value={value}
          onChange={(e) => setResponse(type, e.target.value)}
          placeholder="Write your reflection here…"
          className="min-h-[200px] bg-foreground/5 border-secondary/20 text-foreground placeholder:text-foreground/30 focus-visible:ring-secondary text-base leading-relaxed resize-none"
        />

        <div className="flex items-center justify-between mt-4">
          <div className="text-sm">
            {showWarning ? (
              <span className="text-secondary/70">
                Try to write at least {MIN_SENTENCES} sentences ({sentences} so far)
              </span>
            ) : value.length > 0 ? (
              <span className="text-foreground/40">{sentences} sentence{sentences !== 1 ? "s" : ""}</span>
            ) : null}
          </div>

          <Button
            onClick={() => setStep(meta.next)}
            className="bg-secondary text-secondary-foreground font-cinzel tracking-wide hover:bg-secondary/90 px-8"
          >
            {meta.btnLabel}
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default QuestionPage;
