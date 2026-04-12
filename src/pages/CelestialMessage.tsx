import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useLionsPen } from "@/context/LionsPenContext";
import celestialBg from "@/assets/celestial-bg.png";
import { Button } from "@/components/ui/button";
import { getCelestialMessage } from "@/data/messageDatabase";

const CelestialMessage = () => {
  const { markSubmitted, resetSession, student, week, day } = useLionsPen();
  const [isSpeaking, setIsSpeaking] = useState(false);

  const grade = student?.grade ?? 5;
  const msg = getCelestialMessage(grade, week, day);

  const author = msg?.author ?? "The Celestial Scriptorium";
  const quote = msg?.quote ?? "Your words today carry the weight of your courage.";
  const message = msg?.message ?? "Young Scriber, today you have shown courage by sharing your thoughts honestly. Keep writing. Keep reflecting. The Celestial Scriptorium honors your courage.";

  const handleReadToMe = useCallback(() => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(
      `${quote}. By ${author}. ${message}`
    );
    utterance.rate = 0.9;
    utterance.onend = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  }, [isSpeaking, quote, author, message]);

  const handleClose = useCallback(() => {
    window.speechSynthesis.cancel();
    markSubmitted();
    resetSession();
  }, [markSubmitted, resetSession]);

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
        <p className="text-secondary/60 text-xs font-cinzel tracking-widest uppercase mb-4">
          A Message from the Celestial Scriptorium
        </p>

        <div className="text-5xl mb-6">✨</div>

        {/* Quote */}
        <blockquote className="border-l-4 border-secondary/40 pl-6 mb-6 text-left">
          <p className="text-foreground text-xl font-cinzel italic leading-relaxed">
            &ldquo;{quote}&rdquo;
          </p>
          <p className="text-secondary/70 font-cinzel mt-2 text-sm">
            — {author}
          </p>
        </blockquote>

        {/* Message body */}
        <div className="bg-foreground/5 border border-secondary/15 rounded-lg p-6 mb-8 text-left">
          {message.split("\n\n").map((para, i) => (
            <p key={i} className="text-foreground/85 leading-relaxed mb-3 last:mb-0">
              {para}
            </p>
          ))}
        </div>

        <div className="flex justify-center gap-3">
          <Button
            onClick={handleReadToMe}
            variant="outline"
            className="border-secondary/40 text-foreground font-cinzel hover:bg-secondary/10"
          >
            {isSpeaking ? "Stop Reading" : "🔊 Read to Me"}
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
