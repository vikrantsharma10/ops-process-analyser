-- Run this in your Supabase SQL editor.
-- If you already ran an earlier version, use the ALTER statements at the bottom instead.

-- ── analyses table ──────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS analyses (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  input_text text NOT NULL,
  output_text text NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  analysis_type text NOT NULL DEFAULT 'trial' CHECK (analysis_type IN ('trial', 'detailed'))
);

ALTER TABLE analyses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert analyses"
  ON analyses FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can read own analyses"
  ON analyses FOR SELECT
  USING (auth.uid() = user_id);

-- If the table already exists, run this instead of the CREATE above:
-- ALTER TABLE analyses ADD COLUMN IF NOT EXISTS analysis_type text NOT NULL DEFAULT 'trial'
--   CHECK (analysis_type IN ('trial', 'detailed'));


-- ── events table ─────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS events (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type text NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert events (anon or authenticated)
CREATE POLICY "Anyone can insert events"
  ON events FOR INSERT
  WITH CHECK (true);
