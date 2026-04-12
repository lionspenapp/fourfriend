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
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-2 bg-secondary" />
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-secondary" />
      <div className="absolute left-0 top-0 bottom-0 w-2 bg-secondary" />
      <div className="absolute right-0 top-0 bottom-0 w-2 bg-secondary" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <img src={lionsPenLogo} alt="Lion's Pen" className="w-72 h-auto mx-auto mb-4" />
          <h1 className="font-cinzel text-4xl font-bold text-primary tracking-wide">
            Lion's Pen
          </h1>
           <p className="text-foreground/70 mt-2 font-cinzel text-sm tracking-widest uppercase">
             The Celestial Scriptorium
           </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="bg-foreground/5 backdrop-blur-sm border-2 border-secondary/30 rounded-lg p-6 space-y-4">
            <div>
               <label className="block text-foreground/90 text-sm font-cinzel mb-1.5 tracking-wide">
                 Scriber Name
              </label>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your name"
                 className="bg-foreground/5 border-secondary/40 text-foreground placeholder:text-foreground/50 focus-visible:ring-secondary"
              />
            </div>
            <div>
               <label className="block text-foreground/90 text-sm font-cinzel mb-1.5 tracking-wide">
                 Secret Word
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="bg-foreground/5 border-secondary/40 text-foreground placeholder:text-foreground/50 focus-visible:ring-secondary"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground font-cinzel tracking-wide hover:bg-primary/90 text-base py-5"
            >
              Enter the Scriptorium
            </Button>
          </div>
        </form>

         <p className="text-center mt-6 text-foreground/60 text-sm">
           <button onClick={() => navigate("/")} className="cursor-pointer hover:text-foreground/80 transition-colors font-cinzel">
            Parent Login →
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default StudentLogin;