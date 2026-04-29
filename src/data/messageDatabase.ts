import { supabase } from "@/integrations/supabase/client";

export interface CelestialMessageEntry {
  id: string;
  week: number;
  day: number;
  author: string;
  quote: string;
  message: string;
  gradeRange: "3-4" | "5-6" | "7-8";
}

export type FetchCelestialResult =
  | { status: "ok"; quote: string; author: string; message: string }
  | { status: "error"; message: string }
  | { status: "empty" };

/** Celestial copy from `message_database` (quotation + explanation). Grade band column may be added later. */
export async function fetchCelestialMessage(
  _grade: number,
  week: number,
  day: number,
): Promise<FetchCelestialResult> {
  const { data, error } = await supabase
    .from("message_database")
    .select("author, quotation, explanation")
    .eq("week", week)
    .eq("day", day)
    .maybeSingle();

  if (error) {
    console.error("fetchCelestialMessage", error.message);
    return { status: "error", message: error.message };
  }

  if (data) {
    return {
      status: "ok",
      quote: data.quotation ?? "",
      author: data.author ?? "",
      message: data.explanation ?? "",
    };
  }

  return { status: "empty" };
}
