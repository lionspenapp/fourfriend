// Re-exports and backward-compatible helpers
export { ACADEMIC_QUESTIONS, EMOTION_QUESTIONS, CHARACTER_QUESTIONS, getQuestion, getQuestionsForGrade } from "./questionDatabase";
export type { QuestionEntry, QuestionCategory } from "./questionDatabase";
export { CELESTIAL_MESSAGES, getCelestialMessage, getMessagesForGrade } from "./messageDatabase";
export type { CelestialMessageEntry } from "./messageDatabase";

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

// Legacy compat — used by QuestionPage and CelestialMessage
export const SAMPLE_QUESTIONS = {
  academic: { category: "Academic", prompt: "", minSentences: 3 },
  emotion: { category: "Emotion", prompt: "", minSentences: 3 },
  character: { category: "Character", prompt: "", minSentences: 3 },
};

export const SAMPLE_CELESTIAL_MESSAGE = {
  author: "Marcus Aurelius",
  quote: "The happiness of your life depends upon the quality of your thoughts.",
  message: `Young Scriber, today you have shown courage by sharing your thoughts honestly.`,
};
