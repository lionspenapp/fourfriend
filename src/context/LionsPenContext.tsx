import React, { createContext, useContext, useState, useCallback, useMemo } from "react";

export type FlowStep =
  | "login"
  | "lock"
  | "breathing"
  | "oath"
  | "academic"
  | "emotion"
  | "character"
  | "celestial";

export interface StudentProfile {
  firstName: string;
  lastName: string;
  grade: number; // 3-8
  username: string;
}

export interface SessionResponses {
  academic: string;
  emotion: string;
  character: string;
}

/** Derive week (1-4) and day (1-5) from the current date for the 4-week rotation. */
function getWeekAndDay(): { week: number; day: number } {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const dayOfYear = Math.floor((now.getTime() - startOfYear.getTime()) / 86400000);
  // Map to week 1-4 and day 1-5 (Mon-Fri cycle)
  const dayOfWeek = now.getDay(); // 0=Sun ... 6=Sat
  const day = dayOfWeek >= 1 && dayOfWeek <= 5 ? dayOfWeek : 1; // fallback weekends to Mon
  const weekNumber = Math.floor(dayOfYear / 7) % 4 + 1;
  return { week: weekNumber, day };
}

interface LionsPenContextType {
  step: FlowStep;
  setStep: (step: FlowStep) => void;
  student: StudentProfile | null;
  setStudent: (s: StudentProfile) => void;
  responses: SessionResponses;
  setResponse: (key: keyof SessionResponses, value: string) => void;
  hasSubmittedToday: () => boolean;
  markSubmitted: () => void;
  resetSession: () => void;
  week: number;
  day: number;
}

const LionsPenContext = createContext<LionsPenContextType | null>(null);

const STORAGE_KEY = "lions_pen_last_submission";

export const LionsPenProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [step, setStep] = useState<FlowStep>("login");
  const [student, setStudent] = useState<StudentProfile | null>(null);
  const [responses, setResponses] = useState<SessionResponses>({
    academic: "",
    emotion: "",
    character: "",
  });

  const { week, day } = useMemo(() => getWeekAndDay(), []);

  const setResponse = useCallback((key: keyof SessionResponses, value: string) => {
    setResponses((prev) => ({ ...prev, [key]: value }));
  }, []);

  const hasSubmittedToday = useCallback(() => {
    const last = localStorage.getItem(STORAGE_KEY);
    if (!last) return false;
    const today = new Date().toDateString();
    return last === today;
  }, []);

  const markSubmitted = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, new Date().toDateString());
  }, []);

  const resetSession = useCallback(() => {
    setStep("login");
    setStudent(null);
    setResponses({ academic: "", emotion: "", character: "" });
  }, []);

  return (
    <LionsPenContext.Provider
      value={{ step, setStep, student, setStudent, responses, setResponse, hasSubmittedToday, markSubmitted, resetSession, week, day }}
    >
      {children}
    </LionsPenContext.Provider>
  );
};

export const useLionsPen = () => {
  const ctx = useContext(LionsPenContext);
  if (!ctx) throw new Error("useLionsPen must be used within LionsPenProvider");
  return ctx;
};
