import { motion } from "framer-motion";

const LockScreen = () => {
  return (
    <div className="min-h-screen bg-lapis flex items-center justify-center p-6 relative">
      <div className="absolute top-0 left-0 right-0 h-3 bg-ochre" />
      <div className="absolute bottom-0 left-0 right-0 h-3 bg-ochre" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-lg"
      >
        <div className="text-7xl mb-8">🔒</div>
        <h1 className="font-cinzel text-3xl font-bold text-ochre mb-6 leading-relaxed">
          The Scriptorium Doors Are Closed for Today
        </h1>
        <p className="text-sand/70 text-lg leading-relaxed">
          You have already completed your sacred writing for today, young Scriber.
          Return tomorrow when the doors open once more.
        </p>
        <div className="mt-10 w-24 h-0.5 bg-ochre/40 mx-auto" />
        <p className="mt-4 text-sand/40 font-cinzel text-sm tracking-widest">
          Until the next dawn…
        </p>
      </motion.div>
    </div>
  );
};

export default LockScreen;
