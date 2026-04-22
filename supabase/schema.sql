-- Run this in your Supabase SQL editor to set up the analyses table.

CREATE TABLE IF NOT EXISTS analyses (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  input_text text NOT NULL,
  output_text text NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Enable Row Level Security
ALTER TABLE analyses ENABLE ROW LEVEL SECURITY;

-- Allow anyone (anon or authenticated) to insert
CREATE POLICY "Anyone can insert analyses"
  ON analyses FOR INSERT
  WITH CHECK (true);

-- Users can read their own analyses
CREATE POLICY "Users can read own analyses"
  ON analyses FOR SELECT
  USING (auth.uid() = user_id);
