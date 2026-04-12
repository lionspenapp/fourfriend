import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useLionsPen } from "@/context/LionsPenContext";
import lionsPenLogo from "@/assets/lions_pen.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const StudentLogin = () => {
  const { setStudent, setStep, hasSubmittedToday } = useLionsPen();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login — accept anything, set hardcoded student
    setStudent({
      firstName: "Young",
      lastName: "Scriber",
      grade: 6,
      username: username || "student",
    });

    if (hasSubmittedToday()) {
      setStep("lock");
    } else {
      setStep("breathing");
    }
  };

  return (
    <div className="min-h-screen bg-lapis flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative border pattern */}
      <div className="absolute top-0 left-0 right-0 h-3 bg-ochre" />
      <div className="absolute bottom-0 left-0 right-0 h-3 bg-ochre" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md"
      >
        {/* Lion emblem area */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🦁</div>
          <h1 className="font-cinzel text-4xl font-bold text-sand tracking-wide">
            Lion's Pen
          </h1>
          <p className="text-sand/70 mt-2 font-cinzel text-sm tracking-widest uppercase">
            The Celestial Scriptorium
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="bg-sand/10 backdrop-blur-sm border border-ochre/30 rounded-lg p-6 space-y-4">
            <div>
              <label className="block text-sand/80 text-sm font-cinzel mb-1.5 tracking-wide">
                Scriber Name
              </label>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your name"
                className="bg-sand/10 border-ochre/30 text-sand placeholder:text-sand/40 focus-visible:ring-ochre"
              />
            </div>
            <div>
              <label className="block text-sand/80 text-sm font-cinzel mb-1.5 tracking-wide">
                Secret Word
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="bg-sand/10 border-ochre/30 text-sand placeholder:text-sand/40 focus-visible:ring-ochre"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-ochre text-primary font-cinzel tracking-wide hover:bg-ochre/90 text-base py-5"
            >
              Enter the Scriptorium
            </Button>
          </div>
        </form>

        <p className="text-center mt-6 text-sand/40 text-sm">
          <button onClick={() => navigate("/")} className="cursor-pointer hover:text-sand/60 transition-colors">
            Parent Login →
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default StudentLogin;
