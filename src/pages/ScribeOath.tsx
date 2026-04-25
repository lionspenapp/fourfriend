import { useState } from "react";
import { motion } from "framer-motion";
import { useLionsPen } from "@/context/LionsPenContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import palaceSchoolBg from "@/assets/palace-school-bg.jpg";
import oathTablet from "@/assets/oath-tablet-young-scribe.png";

const ScribeOath = () => {
  const { student, setStep } = useLionsPen();
  const [fullName, setFullName] = useState("");

  const grade = student?.grade ?? 6;
  const canProceed = fullName.trim().length > 0;

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${palaceSchoolBg})` }}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute top-0 left-0 right-0 h-2 bg-secondary z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-secondary z-10" />
      <div className="absolute left-0 top-0 bottom-0 w-2 bg-secondary z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-2 bg-secondary z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl w-full text-center relative z-10"
      >
        <h1 className="font-cinzel text-3xl font-bold text-white drop-shadow-lg mb-2">
          The Scribe's Oath
        </h1>
        <p className="text-white/80 drop-shadow-md text-sm mb-8 font-cinzel tracking-wider">
          Grades {grade <= 4 ? "3–4" : grade <= 6 ? "5–6" : "7–8"}
        </p>

        <img
          src={oathTablet}
          alt="The Scribe's Oath on a clay tablet"
          className="max-w-md w-full mx-auto rounded-lg shadow-2xl mb-8"
        />

        <p className="text-white drop-shadow-md text-sm mb-4 font-cinzel tracking-wide">
          Sign Your Name to Take the Oath
        </p>

        <div className="max-w-sm mx-auto mb-6">
          <Input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="First, Last Name"
            style={{ fontSize: "3.5rem", lineHeight: "0.85" }}
            className="bg-foreground/5 border-secondary/30 text-white placeholder:text-white/50 placeholder:font-sans placeholder:text-base focus-visible:ring-secondary text-center font-signature h-36 py-0"
          />
        </div>

        <Button
          onClick={() => setStep("academic")}
          disabled={!canProceed}
          className="bg-secondary text-secondary-foreground font-cinzel tracking-wide hover:bg-secondary/90 px-10 py-5 text-base disabled:opacity-30"
        >
          Enter the Scriptorium
        </Button>
      </motion.div>
    </div>
  );
};

export default ScribeOath;
