import React, { createContext, useContext, useState, useCallback } from "react";

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
      value={{ step, setStep, student, setStudent, responses, setResponse, hasSubmittedToday, markSubmitted, resetSession }}
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
