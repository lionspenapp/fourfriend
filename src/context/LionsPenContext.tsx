import React, { createContext, useContext, useState, useCallback, useMemo } from "react";
import { getCalendarDateKeyInTimeZone, getCurriculumWeekNumber } from "@/lib/utils";

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

  const week = useMemo(() => getCurriculumWeekNumber(), []);

  const setResponse = useCallback((key: keyof SessionResponses, value: string) => {
    setResponses((prev) => ({ ...prev, [key]: value }));
  }, []);

  const hasSubmittedToday = useCallback((studentId: string) => {
    const last = localStorage.getItem(`${STORAGE_KEY}_${studentId}`);
    if (!last) return false;
    const today = getCalendarDateKeyInTimeZone(new Date());
    return last === today;
  }, []);

  const markSubmitted = useCallback((studentId: string) => {
    localStorage.setItem(`${STORAGE_KEY}_${studentId}`, getCalendarDateKeyInTimeZone(new Date()));
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
