DROP POLICY IF EXISTS "Parents read own student quotes"   ON public.saved_quotations;
DROP POLICY IF EXISTS "Parents insert own student quotes" ON public.saved_quotations;
DROP POLICY IF EXISTS "Parents delete own student quotes" ON public.saved_quotations;

CREATE OR REPLACE FUNCTION public.get_saved_quotations(p_student_id uuid)
RETURNS TABLE(id uuid, quote text, author text, week integer, day integer, created_at timestamptz)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id, quote, author, week, day, created_at
    FROM public.saved_quotations
   WHERE student_id = p_student_id
   ORDER BY created_at DESC;
$$;

CREATE OR REPLACE FUNCTION public.delete_saved_quotation(p_student_id uuid, p_id uuid)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.saved_quotations
   WHERE id = p_id AND student_id = p_student_id;
  RETURN json_build_object('success', true);
EXCEPTION WHEN OTHERS THEN
  RETURN json_build_object('success', false, 'error', SQLERRM);
END;
$$;