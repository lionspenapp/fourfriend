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

/** Derive week (1-4) and day (1-5) from the current date.
 *  Epoch: Sunday April 12 2026 = Week 1 Day 1.
 *  Each week runs Sun-Thu (5 school days), cycling 1-4. */
function getWeekAndDay(): { week: number; day: number } {
  const now = new Date();
  // Epoch: April 12 2026 (Sunday)
  const epoch = new Date(2026, 3, 12); // month is 0-indexed
  const diffDays = Math.floor((now.getTime() - epoch.getTime()) / 86400000);
  if (diffDays < 0) return { week: 1, day: 1 }; // before epoch fallback
  // 7-day weeks, but only days 0-4 (Sun-Thu) are school days; 5-6 (Fri-Sat) map to day 5
  const weekIndex = Math.floor(diffDays / 7);
  const dayInWeek = diffDays % 7;
  const day = Math.min(dayInWeek + 1, 5); // cap at 5
  const week = (weekIndex % 4) + 1;
  return { week, day };
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
