-- Allow anon/public read of celestial messages (student flow uses anon + RPC auth pattern)
DROP POLICY IF EXISTS "Messages readable by all authenticated" ON public.celestial_messages;

CREATE POLICY "Celestial messages readable by everyone"
ON public.celestial_messages
FOR SELECT
USING (true);
