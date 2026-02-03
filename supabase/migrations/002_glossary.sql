-- Glossary table for custom term translations
-- Run this in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS glossary (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  source_term TEXT NOT NULL,
  target_term TEXT NOT NULL,
  source_language TEXT, -- Optional: specific source language (de, fr, it, en)
  target_language TEXT, -- Optional: specific target language
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_glossary_user_id ON glossary(user_id);
CREATE INDEX IF NOT EXISTS idx_glossary_source_term ON glossary(user_id, source_term);

-- RLS policies
ALTER TABLE glossary ENABLE ROW LEVEL SECURITY;

-- Users can only see their own glossary entries
CREATE POLICY "Users can view own glossary" ON glossary
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own glossary entries
CREATE POLICY "Users can insert own glossary" ON glossary
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own glossary entries
CREATE POLICY "Users can update own glossary" ON glossary
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own glossary entries
CREATE POLICY "Users can delete own glossary" ON glossary
  FOR DELETE USING (auth.uid() = user_id);
