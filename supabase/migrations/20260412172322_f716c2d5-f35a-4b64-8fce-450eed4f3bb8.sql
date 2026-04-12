-- Drop the old authenticated-only policy
DROP POLICY IF EXISTS "Questions readable by all authenticated" ON public.questions;

-- Allow public read access to questions
CREATE POLICY "Questions readable by everyone"
ON public.questions
FOR SELECT
USING (true);