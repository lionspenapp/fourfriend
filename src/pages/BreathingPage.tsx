import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLionsPen } from "@/context/LionsPenContext";
import { Button } from "@/components/ui/button";
import { BREATHING_SOUNDS } from "@/data/mockContent";

const TOTAL_SECONDS = 60;
const BREATH_CYCLE = 8; // 4s in, 4s out

// Procedural ambient sound generators using Web Audio API
function createAmbientSound(ctx: AudioContext, type: string): { start: () => void; stop: () => void } {
  const gain = ctx.createGain();
  gain.gain.value = 0.15;
  gain.connect(ctx.destination);

  const nodes: AudioNode[] = [];

  const makeNoise = () => {
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    nodes.push(source);
    return source;
  };

  const setupChain = () => {
    switch (type) {
      case "Ocean Waves": {
        const noise = makeNoise();
        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.value = 500;
        const lfo = ctx.createOscillator();
        lfo.frequency.value = 0.12;
        const lfoGain = ctx.createGain();
        lfoGain.gain.value = 300;
        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);
        noise.connect(filter);
        filter.connect(gain);
        lfo.start();
        noise.start();
        nodes.push(lfo);
        break;
      }
      case "Bird Singing": {
        const osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.value = 2000;
        const lfo = ctx.createOscillator();
        lfo.frequency.value = 6;
        const lfoGain = ctx.createGain();
        lfoGain.gain.value = 400;
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        const envGain = ctx.createGain();
        envGain.gain.value = 0.08;
        osc.connect(envGain);
        envGain.connect(gain);
        osc.start();
        lfo.start();
        nodes.push(osc, lfo);
        break;
      }
      case "Water Dropping": {
        const noise = makeNoise();
        const filter = ctx.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.value = 1200;
        filter.Q.value = 5;
        noise.connect(filter);
        filter.connect(gain);
        noise.start();
        break;
      }
      case "Wind": {
        const noise = makeNoise();
        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.value = 800;
        const lfo = ctx.createOscillator();
        lfo.frequency.value = 0.05;
        const lfoGain = ctx.createGain();
        lfoGain.gain.value = 400;
        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);
        noise.connect(filter);
        filter.connect(gain);
        lfo.start();
        noise.start();
        nodes.push(lfo);
        break;
      }
      case "Harp": {
        const osc = ctx.createOscillator();
        osc.type = "triangle";
        osc.frequency.value = 440;
        const lfo = ctx.createOscillator();
        lfo.frequency.value = 0.3;
        const lfoGain = ctx.createGain();
        lfoGain.gain.value = 50;
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        osc.connect(gain);
        osc.start();
        lfo.start();
        nodes.push(osc, lfo);
        break;
      }
      case "Flute": {
        const osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.value = 700;
        const vibrato = ctx.createOscillator();
        vibrato.frequency.value = 5;
        const vibratoGain = ctx.createGain();
        vibratoGain.gain.value = 10;
        vibrato.connect(vibratoGain);
        vibratoGain.connect(osc.frequency);
        osc.connect(gain);
        osc.start();
        vibrato.start();
        nodes.push(osc, vibrato);
        break;
      }
      case "Bubble Popping": {
        const noise = makeNoise();
        const filter = ctx.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.value = 600;
        filter.Q.value = 10;
        const lfo = ctx.createOscillator();
        lfo.frequency.value = 3;
        const lfoGain = ctx.createGain();
        lfoGain.gain.value = 400;
        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);
        noise.connect(filter);
        filter.connect(gain);
        lfo.start();
        noise.start();
        nodes.push(lfo);
        break;
      }
      default:
        break;
    }
  };

  return {
    start: () => setupChain(),
    stop: () => {
      nodes.forEach((n) => { try { (n as AudioScheduledSourceNode).stop(); } catch {} });
      nodes.length = 0;
      gain.disconnect();
    },
  };
}

const BreathingPage = () => {
  const { setStep } = useLionsPen();
  const [isRunning, setIsRunning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(TOTAL_SECONDS);
  const [completed, setCompleted] = useState(false);
  const [selectedSound, setSelectedSound] = useState<string>("No Sound");
  const [phase, setPhase] = useState<"in" | "out">("in");
  const audioCtxRef = useRef<AudioContext | null>(null);
  const ambientRef = useRef<{ start: () => void; stop: () => void } | null>(null);

  const elapsed = TOTAL_SECONDS - secondsLeft;

  // Manage ambient audio
  useEffect(() => {
    // Stop previous
    if (ambientRef.current) {
      ambientRef.current.stop();
      ambientRef.current = null;
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }

    if (isRunning && selectedSound !== "No Sound") {
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;
      const ambient = createAmbientSound(ctx, selectedSound);
      ambientRef.current = ambient;
      ambient.start();
    }

    return () => {
      if (ambientRef.current) {
        ambientRef.current.stop();
        ambientRef.current = null;
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
        audioCtxRef.current = null;
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
