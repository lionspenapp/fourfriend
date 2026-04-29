import { supabase } from "@/integrations/supabase/client";

export interface QuestionEntry {
  id: string;
  week: number;
  day: number;
  prompt: string;
  gradeRange: "3-4" | "5-6" | "7-8";
}

export type QuestionCategory = "academic" | "emotion" | "character";

export function gradeToBand(grade: number): "3-4" | "5-6" | "7-8" {
  return grade <= 4 ? "3-4" : grade <= 6 ? "5-6" : "7-8";
}

export type FetchQuestionResult =
  | { status: "ok"; prompt: string }
  | { status: "error"; message: string }
  | { status: "empty" };

export async function fetchQuestion(
  category: QuestionCategory,
  grade: number,
  week: number,
  day: number,
): Promise<FetchQuestionResult> {
  const gradeBand = gradeToBand(grade);
  const { data, error } = await supabase
    .from("questions")
    .select("prompt")
    .eq("category", category)
    .eq("grade_band", gradeBand)
    .eq("week", week)
    .eq("day", day)
    .maybeSingle();

  if (error) {
    console.error("fetchQuestion", error.message);
    return { status: "error", message: error.message };
  }
  if (data?.prompt) return { status: "ok", prompt: data.prompt };

  return { status: "empty" };
}
