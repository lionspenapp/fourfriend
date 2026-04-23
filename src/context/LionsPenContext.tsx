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
  id: string;
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

/** Derive the current week (1-4) from a 4-week cycle anchored to Sunday April 12 2026.
 *  Day numbering is now sequence-based (1st entry of week = Day 1, etc.) and assigned by the server. */
function getCurrentWeek(): number {
  const now = new Date();
  const epoch = new Date(2026, 3, 12); // April 12 2026 (Sunday)
  const diffDays = Math.floor((now.getTime() - epoch.getTime()) / 86400000);
  if (diffDays < 0) return 1;
  const weekIndex = Math.floor(diffDays / 7);
  return (weekIndex % 4) + 1;
}

interface LionsPenContextType {
  step: FlowStep;
  setStep: (step: FlowStep) => void;
  student: StudentProfile | null;
  setStudent: (s: StudentProfile) => void;
  responses: SessionResponses;
  setResponse: (key: keyof SessionResponses, value: string) => void;
  hasSubmittedToday: (studentId: string) => boolean;
  markSubmitted: (studentId: string) => void;
  resetSession: () => void;
  week: number;
  currentDay: number | null;
  setCurrentDay: (d: number | null) => void;
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
  const [currentDay, setCurrentDay] = useState<number | null>(null);

  const week = useMemo(() => getCurrentWeek(), []);

  const setResponse = useCallback((key: keyof SessionResponses, value: string) => {
    setResponses((prev) => ({ ...prev, [key]: value }));
  }, []);

  const hasSubmittedToday = useCallback((studentId: string) => {
    const last = localStorage.getItem(`${STORAGE_KEY}_${studentId}`);
    if (!last) return false;
    const today = new Date().toDateString();
    return last === today;
  }, []);

  const markSubmitted = useCallback((studentId: string) => {
    localStorage.setItem(`${STORAGE_KEY}_${studentId}`, new Date().toDateString());
  }, []);

  const resetSession = useCallback(() => {
    setStep("login");
    setStudent(null);
    setResponses({ academic: "", emotion: "", character: "" });
    setCurrentDay(null);
  }, []);

  return (
    <LionsPenContext.Provider
      value={{ step, setStep, student, setStudent, responses, setResponse, hasSubmittedToday, markSubmitted, resetSession, week, currentDay, setCurrentDay }}
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
