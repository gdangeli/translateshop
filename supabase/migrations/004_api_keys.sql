-- API Keys table for Developer API
-- Run this in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS api_keys (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT 'API Key',
  key_hash TEXT NOT NULL UNIQUE, -- SHA256 hash of the actual key
  key_prefix TEXT NOT NULL, -- First 10 chars for identification (e.g., "ts_abc123...")
  is_active BOOLEAN DEFAULT true,
  last_used_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_api_keys_user_id ON api_keys(user_id);
CREATE INDEX IF NOT EXISTS idx_api_keys_hash ON api_keys(key_hash) WHERE is_active = true;

-- RLS policies
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;

-- Users can view their own API keys
CREATE POLICY "Users can view own api_keys" ON api_keys
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own API keys
CREATE POLICY "Users can insert own api_keys" ON api_keys
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own API keys (e.g., deactivate)
CREATE POLICY "Users can update own api_keys" ON api_keys
  FOR UPDATE USING (auth.uid() = user_id);

-- Service role can read all for validation (needed for API auth)
-- Note: This requires service_role key for API validation
