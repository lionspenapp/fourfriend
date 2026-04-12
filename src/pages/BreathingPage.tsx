import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLionsPen } from "@/context/LionsPenContext";
import { Button } from "@/components/ui/button";
import { BREATHING_SOUNDS } from "@/data/mockContent";

const TOTAL_SECONDS = 60;
const BREATH_CYCLE = 8; // 4s in, 4s out

// Free ambient sound URLs (royalty-free)
const SOUND_URLS: Record<string, string> = {
  "Ocean Waves": "https://cdn.freesound.org/previews/527/527888_2827503-lq.mp3",
  "Bird Singing": "https://cdn.freesound.org/previews/531/531015_10965920-lq.mp3",
  "Water Dropping": "https://cdn.freesound.org/previews/215/215645_2927752-lq.mp3",
  "Harp": "https://cdn.freesound.org/previews/610/610075_5674468-lq.mp3",
  "Flute": "https://cdn.freesound.org/previews/476/476178_6891523-lq.mp3",
  "Wind": "https://cdn.freesound.org/previews/171/171415_2584026-lq.mp3",
  "Bubble Popping": "https://cdn.freesound.org/previews/369/369921_6261983-lq.mp3",
};

const BreathingPage = () => {
  const { setStep } = useLionsPen();
  const [isRunning, setIsRunning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(TOTAL_SECONDS);
  const [completed, setCompleted] = useState(false);
  const [selectedSound, setSelectedSound] = useState<string>("No Sound");
  const [phase, setPhase] = useState<"in" | "out">("in");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const elapsed = TOTAL_SECONDS - secondsLeft;

  // Manage ambient audio
  useEffect(() => {
    // Stop previous audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    if (isRunning && selectedSound !== "No Sound" && SOUND_URLS[selectedSound]) {
      const audio = new Audio(SOUND_URLS[selectedSound]);
      audio.loop = true;
      audio.volume = 0.4;
      audio.play().catch(() => {});
      audioRef.current = audio;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [isRunning, selectedSound]);

  useEffect(() => {
    if (!isRunning || secondsLeft <= 0) return;
    const timer = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          setIsRunning(false);
          setCompleted(true);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isRunning, secondsLeft]);

  // Breathing phase
  useEffect(() => {
    if (!isRunning) return;
    const cyclePos = elapsed % BREATH_CYCLE;
    setPhase(cyclePos < 4 ? "in" : "out");
  }, [elapsed, isRunning]);

  const handleStart = useCallback(() => {
    setIsRunning(true);
  }, []);

  const handleRepeat = useCallback(() => {
    setSecondsLeft(TOTAL_SECONDS);
    setCompleted(false);
    setIsRunning(true);
  }, []);

  return (
    <div className="min-h-screen bg-lapis flex flex-col items-center justify-center p-6 relative">
      <div className="absolute top-0 left-0 right-0 h-2 bg-ochre/60" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center max-w-lg w-full"
      >
        <h1 className="font-cinzel text-2xl font-bold text-sand mb-2">
          Prepare Your Mind
        </h1>
        <p className="text-sand/60 text-sm mb-8">
          Breathe deeply before entering the Scriptorium
        </p>

        {/* Breathing circle */}
        <div className="flex items-center justify-center mb-8">
          <motion.div
            animate={
              isRunning
                ? {
                    scale: phase === "in" ? [0.6, 1] : [1, 0.6],
                    opacity: phase === "in" ? [0.4, 1] : [1, 0.4],
                  }
                : { scale: 0.6, opacity: 0.4 }
            }
            transition={{ duration: 4, ease: "easeInOut" }}
            className="w-48 h-48 rounded-full border-4 border-ochre/60 flex items-center justify-center"
            style={{
              background: "radial-gradient(circle, hsl(var(--ochre) / 0.2), hsl(var(--lapis) / 0.5))",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={phase + (isRunning ? "on" : "off")}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-cinzel text-sand text-lg"
              >
                {!isRunning && !completed
                  ? "Ready"
                  : isRunning
                  ? phase === "in"
                    ? "Breathe in…"
                    : "Breathe out…"
                  : "Complete"}
              </motion.span>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Timer */}
        <p className="font-cinzel text-sand/80 text-3xl tabular-nums mb-6">
          {Math.floor(secondsLeft / 60)}:{String(secondsLeft % 60).padStart(2, "0")}
        </p>

        {/* Sound selector */}
        <div className="mb-8">
          <p className="text-sand/50 text-xs font-cinzel mb-2 tracking-wider uppercase">
            Ambient Sound
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {BREATHING_SOUNDS.map((sound) => (
              <button
                key={sound}
                onClick={() => setSelectedSound(sound)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-colors font-cinzel ${
                  selectedSound === sound
                    ? "bg-ochre/20 border-ochre text-ochre"
                    : "border-sand/20 text-sand/50 hover:border-sand/40"
                }`}
              >
                {sound}
              </button>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-3">
          {!isRunning && !completed && (
            <Button
              onClick={handleStart}
              className="bg-ochre text-primary font-cinzel tracking-wide hover:bg-ochre/90 px-8"
            >
              Start
            </Button>
          )}
          {completed && (
            <>
              <Button
                onClick={handleRepeat}
                variant="outline"
                className="border-ochre/40 text-sand font-cinzel hover:bg-ochre/10"
              >
                Repeat
              </Button>
              <Button
                onClick={() => setStep("oath")}
                className="bg-ochre text-primary font-cinzel tracking-wide hover:bg-ochre/90 px-8"
              >
                Enter the Scriptorium
              </Button>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default BreathingPage;
