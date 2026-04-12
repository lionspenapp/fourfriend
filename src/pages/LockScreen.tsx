import { motion } from "framer-motion";

const LockScreen = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative">
      <div className="absolute top-0 left-0 right-0 h-2 bg-secondary" />
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-secondary" />
      <div className="absolute left-0 top-0 bottom-0 w-2 bg-secondary" />
      <div className="absolute right-0 top-0 bottom-0 w-2 bg-secondary" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-lg"
      >
        <div className="text-7xl mb-8">🔒</div>
        <h1 className="font-cinzel text-3xl font-bold text-secondary mb-6 leading-relaxed">
          The Scriptorium Doors Are Closed for Today
        </h1>
        <p className="text-foreground/70 text-lg leading-relaxed">
          You have already completed your sacred writing for today, young Scriber.
          Return tomorrow when the doors open once more.
        </p>
        <div className="mt-10 w-24 h-0.5 bg-secondary/40 mx-auto" />
        <p className="mt-4 text-foreground/60 font-cinzel text-sm tracking-widest">
          Until the next dawn…
        </p>
      </motion.div>
    </div>
  );
};

export default LockScreen;
