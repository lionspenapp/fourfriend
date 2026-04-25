CREATE TABLE public.saved_quotations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  quote text NOT NULL,
  author text NOT NULL,
  week integer,
  day integer,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_saved_quotations_student_created
  ON public.saved_quotations (student_id, created_at DESC);

ALTER TABLE public.saved_quotations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Parents read own student quotes"
  ON public.saved_quotations FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.students s
                  WHERE s.id = saved_quotations.student_id AND s.parent_id = auth.uid()));

CREATE POLICY "Parents insert own student quotes"
  ON public.saved_quotations FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM public.students s
                       WHERE s.id = saved_quotations.student_id AND s.parent_id = auth.uid()));

CREATE POLICY "Parents delete own student quotes"
  ON public.saved_quotations FOR DELETE TO authenticated
  USING (EXISTS (SELECT 1 FROM public.students s
                  WHERE s.id = saved_quotations.student_id AND s.parent_id = auth.uid()));

CREATE OR REPLACE FUNCTION public.save_quotation(
  p_student_id uuid,
  p_quote text,
  p_author text,
  p_week integer,
  p_day integer
) RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_id uuid;
  v_existing uuid;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.students WHERE id = p_student_id) THEN
    RETURN json_build_object('success', false, 'error', 'Student not found');
  END IF;

  -- Avoid duplicate of the exact same quote+author for this student
  SELECT id INTO v_existing
    FROM public.saved_quotations
   WHERE student_id = p_student_id
     AND quote = p_quote
     AND author = p_author
   LIMIT 1;

  IF v_existing IS NOT NULL THEN
    RETURN json_build_object('success', false, 'error', 'already_saved');
  END IF;

  INSERT INTO public.saved_quotations(student_id, quote, author, week, day)
  VALUES (p_student_id, p_quote, p_author, p_week, p_day)
  RETURNING id INTO v_id;

  -- Keep only the newest 24 for this student
  DELETE FROM public.saved_quotations
   WHERE student_id = p_student_id
     AND id NOT IN (
       SELECT id FROM public.saved_quotations
        WHERE student_id = p_student_id
        ORDER BY created_at DESC
        LIMIT 24
     );

  RETURN json_build_object('success', true, 'id', v_id);
EXCEPTION WHEN OTHERS THEN
  RETURN json_build_object('success', false, 'error', SQLERRM);
END;
$$;