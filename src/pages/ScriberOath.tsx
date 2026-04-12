import { useState } from "react";
import { motion } from "framer-motion";
import { useLionsPen } from "@/context/LionsPenContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getOathForGrade } from "@/data/mockContent";

const ScriberOath = () => {
  const { student, setStep } = useLionsPen();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const grade = student?.grade ?? 6;
  const oath = getOathForGrade(grade);
  const canProceed = firstName.trim().length > 0 && lastName.trim().length > 0;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative">
      <div className="absolute top-0 left-0 right-0 h-2 bg-secondary" />
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-secondary" />
      <div className="absolute left-0 top-0 bottom-0 w-2 bg-secondary" />
      <div className="absolute right-0 top-0 bottom-0 w-2 bg-secondary" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl w-full text-center"
      >
        <h1 className="font-cinzel text-3xl font-bold text-secondary mb-2">
          The Scriber's Oath
        </h1>
        <p className="text-foreground/50 text-sm mb-8 font-cinzel tracking-wider">
          Grades {grade <= 4 ? "3–4" : grade <= 6 ? "5–6" : "7–8"}
        </p>

        <div className="bg-foreground/5 border border-secondary/20 rounded-lg p-8 mb-8">
          {oath.split("\n").map((line, i) => (
            <p key={i} className="text-foreground/90 text-lg leading-relaxed font-cinzel mb-1">
              {line}
            </p>
          ))}
        </div>

        <p className="text-foreground/60 text-sm mb-4 font-cinzel tracking-wide">
          Sign Your Name to Take the Oath
        </p>

        <div className="flex gap-3 max-w-sm mx-auto mb-6">
          <Input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            className="bg-foreground/5 border-secondary/30 text-foreground placeholder:text-foreground/30 focus-visible:ring-secondary"
          />
          <Input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            className="bg-foreground/5 border-secondary/30 text-foreground placeholder:text-foreground/30 focus-visible:ring-secondary"
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

export default ScriberOath;
