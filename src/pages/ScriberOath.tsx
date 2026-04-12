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
    <div className="min-h-screen bg-lapis flex items-center justify-center p-6 relative">
      <div className="absolute top-0 left-0 right-0 h-2 bg-ochre/60" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl w-full text-center"
      >
        <h1 className="font-cinzel text-3xl font-bold text-ochre mb-2">
          The Scriber's Oath
        </h1>
        <p className="text-sand/50 text-sm mb-8 font-cinzel tracking-wider">
          Grades {grade <= 4 ? "3–4" : grade <= 6 ? "5–6" : "7–8"}
        </p>

        <div className="bg-sand/5 border border-ochre/20 rounded-lg p-8 mb-8">
          {oath.split("\n").map((line, i) => (
            <p key={i} className="text-sand/90 text-lg leading-relaxed font-cinzel mb-1">
              {line}
            </p>
          ))}
        </div>

        <p className="text-sand/60 text-sm mb-4 font-cinzel tracking-wide">
          Sign Your Name to Take the Oath
        </p>

        <div className="flex gap-3 max-w-sm mx-auto mb-6">
          <Input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            className="bg-sand/10 border-ochre/30 text-sand placeholder:text-sand/30 focus-visible:ring-ochre"
          />
          <Input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            className="bg-sand/10 border-ochre/30 text-sand placeholder:text-sand/30 focus-visible:ring-ochre"
          />
        </div>

        <Button
          onClick={() => setStep("academic")}
          disabled={!canProceed}
          className="bg-ochre text-primary font-cinzel tracking-wide hover:bg-ochre/90 px-10 py-5 text-base disabled:opacity-30"
        >
          Enter the Scriptorium
        </Button>
      </motion.div>
    </div>
  );
};

export default ScriberOath;
