import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useLionsPen } from "@/context/LionsPenContext";
import { supabase } from "@/integrations/supabase/client";
import celestialBg from "@/assets/celestial-bg.png";
import { Button } from "@/components/ui/button";
import { fetchCelestialMessage } from "@/data/messageDatabase";
import { useToast } from "@/hooks/use-toast";
import { Star } from "lucide-react";

const CelestialMessage = () => {
  const { markSubmitted, student, week, setStep, currentDay, setCurrentDay } = useLionsPen();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [resolvedDay, setResolvedDay] = useState<number | null>(currentDay);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [msg, setMsg] = useState<{ quote: string; author: string; message: string } | null>(null);
  const [loadingMessage, setLoadingMessage] = useState(true);
  const [messageLoadError, setMessageLoadError] = useState<string | null>(null);

  // Load available speech synthesis voices (async in Chrome)
  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    const load = () => setVoices(window.speechSynthesis.getVoices());
    load();
    window.speechSynthesis.addEventListener("voiceschanged", load);
    return () => window.speechSynthesis.removeEventListener("voiceschanged", load);
  }, []);

  const pickBestVoice = useCallback((): SpeechSynthesisVoice | null => {
    if (!voices.length) return null;
    const preferredNames = [
      "Google UK English Female",
      "Google US English",
      "Microsoft Aria Online (Natural) - English (United States)",
      "Microsoft Jenny Online (Natural) - English (United States)",
      "Microsoft Aria Online (Natural)",
      "Microsoft Jenny Online (Natural)",
      "Samantha",
      "Karen",
      "Daniel",
    ];
    for (const name of preferredNames) {
      const v = voices.find((vc) => vc.name === name);
      if (v) return v;
    }
    const natural = voices.find(
      (v) => /natural|online|neural/i.test(v.name) && v.lang.startsWith("en")
    );
    if (natural) return natural;
    const enGB = voices.find((v) => v.lang === "en-GB");
    if (enGB) return enGB;
    const enAny = voices.find((v) => v.lang.startsWith("en"));
    if (enAny) return enAny;
    return voices[0] ?? null;
  }, [voices]);

  // Fallback: if we landed here without a known day (e.g. page refresh),
  // ask the server which day was just completed.
  useEffect(() => {
    if (resolvedDay != null || !student?.id) return;
    let cancelled = false;
    (async () => {
      const { data } = await supabase.rpc("get_student_week_status", {
        p_student_id: student.id,
        p_week: week,
      });
      const status = data as { completed_count?: number } | null;
      const day = status?.completed_count ?? 1;
      if (!cancelled) {
        setResolvedDay(day);
        setCurrentDay(day);
      }
    })();
    return () => { cancelled = true; };
  }, [resolvedDay, student?.id, week, setCurrentDay]);

  const grade = student?.grade ?? 5;

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoadingMessage(true);
      setMessageLoadError(null);
      const result = await fetchCelestialMessage(grade, week, resolvedDay ?? 1);
      if (cancelled) return;
      if (result.status === "ok") {
        setMsg({ quote: result.quote, author: result.author, message: result.message });
      } else if (result.status === "error") {
        setMsg(null);
        setMessageLoadError(result.message);
        toast({ title: "Could not load message", description: result.message, variant: "destructive" });
      } else {
        setMsg(null);
        setMessageLoadError("No celestial message is configured for this week and day in the database.");
        toast({
          title: "No message found",
          description: "Add a row to celestial_messages for this week and day.",
          variant: "destructive",
        });
      }
      setLoadingMessage(false);
    })();
    return () => { cancelled = true; };
  }, [grade, week, resolvedDay, toast]);

  const author = msg?.author ?? "";
  const quote = msg?.quote ?? "";
  const message = msg?.message ?? "";

  const handleReadToMe = useCallback(() => {
    if (!window.speechSynthesis) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    const clean = (s: string) =>
      s.replace(/[*_`#>~]/g, "").replace(/\s+/g, " ").trim();
    const spoken = `${clean(quote)} … by ${clean(author)}. … ${clean(message)}`;
    const utterance = new SpeechSynthesisUtterance(spoken);
    const voice = pickBestVoice();
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    }
    utterance.rate = 0.8;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  }, [isSpeaking, quote, author, message, pickBestVoice]);

  const handleSaveQuotation = useCallback(async () => {
    if (!student?.id || saving || saved || !msg) return;
    setSaving(true);
    const { data, error } = await supabase.rpc("save_quotation", {
      p_student_id: student.id,
      p_quote: quote,
      p_author: author,
      p_week: week,
      p_day: resolvedDay ?? null,
    });
    setSaving(false);
    const result = data as { success: boolean; error?: string } | null;
    if (error || !result?.success) {
      if (result?.error === "already_saved") {
        setSaved(true);
        toast({ title: "Already saved", description: "This quotation is already in your collection." });
      } else {
        toast({ title: "Could not save", description: error?.message ?? result?.error ?? "Try again.", variant: "destructive" });
      }
      return;
    }
    setSaved(true);
    toast({ title: "Quotation saved", description: "Added to your collection (max 24)." });
  }, [student?.id, saving, saved, msg, quote, author, week, resolvedDay, toast]);

  const handleClose = useCallback(async () => {
    window.speechSynthesis.cancel();
    if (student) {
      await supabase.rpc("mark_submission_complete", {
        p_student_id: student.id,
        p_week: week,
      });
      markSubmitted(student.id);
    }
    setStep("login");
    navigate("/student/portal");
  }, [markSubmitted, student, week, setStep, navigate]);

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${celestialBg})` }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute top-0 left-0 right-0 h-2 bg-secondary z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-secondary z-10" />
      <div className="absolute left-0 top-0 bottom-0 w-2 bg-secondary z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-2 bg-secondary z-10" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl w-full text-center relative z-10"
      >
        <p className="text-secondary text-lg sm:text-xl md:text-2xl font-cinzel tracking-widest uppercase mb-6">
          A Message from the Celestial Scriptorium
        </p>

        <div className="text-5xl mb-6">✨</div>

        {loadingMessage ? (
          <p className="text-white/90 mb-6 font-cinzel">Loading message…</p>
        ) : messageLoadError ? (
          <p className="text-destructive-foreground bg-destructive/90 rounded-lg p-4 mb-6 text-left text-sm">
            {messageLoadError}
          </p>
        ) : (
          <>
            {/* Quote */}
            <blockquote className="border-l-4 border-amber-400/60 pl-6 mb-6 text-left">
              <p className="text-white text-xl font-cinzel italic leading-relaxed">
                &ldquo;{quote}&rdquo;
              </p>
              <p className="text-secondary font-cinzel mt-2 text-sm">
                — {author}
              </p>
            </blockquote>

            {/* Message body */}
            <div className="bg-black/40 backdrop-blur-sm border border-amber-400/20 rounded-lg p-6 mb-8 text-left">
              {message.split("\n\n").map((para, i) => (
                <p key={i} className="text-white/90 leading-relaxed mb-3 last:mb-0">
                  {para}
                </p>
              ))}
            </div>
          </>
        )}

        <div className="flex flex-wrap justify-center gap-3">
          <Button
            onClick={handleReadToMe}
            variant="outline"
            className="border-secondary/40 text-foreground font-cinzel hover:bg-secondary/10"
            disabled={loadingMessage || Boolean(messageLoadError) || !msg}
          >
            {isSpeaking ? "Stop Reading" : "🔊 Read to Me"}
          </Button>
          <Button
            onClick={handleSaveQuotation}
            disabled={saving || saved || loadingMessage || Boolean(messageLoadError) || !msg}
            variant="outline"
            className="border-2 border-primary bg-white text-primary font-cinzel font-semibold hover:bg-primary hover:text-primary-foreground"
          >
            <Star className={`mr-2 h-4 w-4 ${saved ? "fill-primary" : ""}`} />
            {saved ? "Saved ✓" : saving ? "Saving…" : "Save Quotation"}
          </Button>
          <Button
            onClick={handleClose}
            className="bg-secondary text-secondary-foreground font-cinzel tracking-wide hover:bg-secondary/90 px-8"
          >
            Close
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default CelestialMessage;
