export const BREATHING_SOUNDS = [
  "Ocean Waves",
  "Bird Singing",
  "Water Dropping",
  "Harp",
  "Flute",
  "Wind",
  "Bubble Popping",
  "No Sound",
] as const;

export const OATHS: Record<string, string> = {
  "3-4": `I promise to try my best today.\nI will write with honesty and kindness.\nI will respect my own thoughts and the thoughts of others.\nI am a Scriber of the Celestial Scriptorium,\nand my words have power.`,
  "5-6": `I solemnly pledge to write with truth and courage today.\nI will honor the ancient tradition of the Scribers\nby putting forth my genuine thoughts and reflections.\nI will respect the sanctity of this Scriptorium\nand the words of all who write within its walls.\nI am a Scriber, and my voice matters.`,
  "7-8": `I hereby take the Scriber's Oath, binding myself to the sacred duty of honest reflection.\nI pledge to write with integrity, vulnerability, and intellectual courage.\nI understand that the Celestial Scriptorium is a place of growth,\nwhere every word carries weight and every thought deserves expression.\nI will honor this tradition as countless Scribers have before me.\nI am a Scriber of the Celestial Scriptorium, and my words shape the world.`,
};

export function getOathForGrade(grade: number): string {
  if (grade <= 4) return OATHS["3-4"];
  if (grade <= 6) return OATHS["5-6"];
  return OATHS["7-8"];
}

export const SAMPLE_QUESTIONS = {
  academic: {
    category: "Academic",
    prompt:
      "If you could teach any subject to someone younger than you, what would it be and why? What makes you feel confident about that topic?",
    minSentences: 3,
  },
  emotion: {
    category: "Emotion",
    prompt:
      "Describe a moment this week when you felt a strong emotion. What caused it, and how did you handle it? Looking back, would you respond differently?",
    minSentences: 3,
  },
  character: {
    category: "Character",
    prompt:
      "Think about someone you admire — it could be someone you know or a historical figure. What quality do they have that you would like to develop in yourself?",
    minSentences: 3,
  },
};

export const SAMPLE_CELESTIAL_MESSAGE = {
  author: "Marcus Aurelius",
  quote: "The happiness of your life depends upon the quality of your thoughts.",
  message: `Young Scriber, today you have shown courage by sharing your thoughts honestly. Marcus Aurelius, a Roman Emperor and philosopher, believed that we have the power to shape our own happiness through the way we think.

He wrote in his private journal every day — much like you do here in the Scriptorium. He believed that by reflecting on our actions and our character, we become stronger and wiser.

Remember: every time you pick up your pen and write truthfully, you are following in the footsteps of the greatest thinkers in history. Your words today are seeds that will grow into the wisdom of tomorrow.

Keep writing. Keep reflecting. The Celestial Scriptorium honors your courage.`,
};
