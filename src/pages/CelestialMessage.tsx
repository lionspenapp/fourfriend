import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useLionsPen } from "@/context/LionsPenContext";
import { Button } from "@/components/ui/button";
import { SAMPLE_CELESTIAL_MESSAGE } from "@/data/mockContent";

const CelestialMessage = () => {
  const { markSubmitted, resetSession } = useLionsPen();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const msg = SAMPLE_CELESTIAL_MESSAGE;

  const handleReadToMe = useCallback(() => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(
      `${msg.quote}. By ${msg.author}. ${msg.message}`
    );
    utterance.rate = 0.9;
    utterance.onend = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  }, [isSpeaking, msg]);

  const handleClose = useCallback(() => {
    window.speechSynthesis.cancel();
    markSubmitted();
    resetSession();
  }, [markSubmitted, resetSession]);

  return (
    <div className="min-h-screen bg-lapis flex items-center justify-center p-6 relative">
      <div className="absolute top-0 left-0 right-0 h-2 bg-ochre/60" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl w-full text-center"
      >
        <p className="text-ochre/60 text-xs font-cinzel tracking-widest uppercase mb-4">
          A Message from the Celestial Scriptorium
        </p>

        <div className="text-5xl mb-6">✨</div>

        {/* Quote */}
        <blockquote className="border-l-4 border-ochre/40 pl-6 mb-6 text-left">
          <p className="text-sand text-xl font-cinzel italic leading-relaxed">
            "{msg.quote}"
          </p>
          <p className="text-ochre/70 font-cinzel mt-2 text-sm">
            — {msg.author}
          </p>
        </blockquote>

        {/* Message body */}
        <div className="bg-sand/5 border border-ochre/15 rounded-lg p-6 mb-8 text-left">
          {msg.message.split("\n\n").map((para, i) => (
            <p key={i} className="text-sand/85 leading-relaxed mb-3 last:mb-0">
              {para}
            </p>
          ))}
        </div>

        <div className="flex justify-center gap-3">
          <Button
            onClick={handleReadToMe}
            variant="outline"
            className="border-ochre/40 text-sand font-cinzel hover:bg-ochre/10"
          >
            {isSpeaking ? "Stop Reading" : "🔊 Read to Me"}
          </Button>
          <Button
            onClick={handleClose}
            className="bg-ochre text-primary font-cinzel tracking-wide hover:bg-ochre/90 px-8"
          >
            Close
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default CelestialMessage;
