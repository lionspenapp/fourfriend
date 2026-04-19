CREATE OR REPLACE FUNCTION public.get_student_week_submissions(p_student_id uuid, p_week integer)
RETURNS TABLE (
  id uuid,
  day integer,
  academic_response text,
  emotion_response text,
  character_response text,
  submitted_at timestamptz,
  completed_at timestamptz
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id, day, academic_response, emotion_response, character_response, submitted_at, completed_at
  FROM public.submissions
  WHERE student_id = p_student_id
    AND week = p_week
    AND completed_at IS NOT NULL
  ORDER BY day ASC;
$$;