-- Integrations table for Shopify/WooCommerce connections
-- Run this in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS integrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  platform TEXT NOT NULL CHECK (platform IN ('shopify', 'woocommerce')),
  shop_name TEXT,
  shop_url TEXT NOT NULL,
  credentials_encrypted TEXT NOT NULL, -- In production, use pgcrypto for encryption
  is_active BOOLEAN DEFAULT true,
  last_sync_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_integrations_user_id ON integrations(user_id);
CREATE INDEX IF NOT EXISTS idx_integrations_platform ON integrations(user_id, platform);

-- Add external tracking columns to products table
ALTER TABLE products ADD COLUMN IF NOT EXISTS external_id TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS external_platform TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS integration_id UUID REFERENCES integrations(id) ON DELETE SET NULL;

-- Index for external products
CREATE INDEX IF NOT EXISTS idx_products_external ON products(user_id, external_platform, external_id);

-- RLS policies for integrations
ALTER TABLE integrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own integrations" ON integrations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own integrations" ON integrations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own integrations" ON integrations
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own integrations" ON integrations
  FOR DELETE USING (auth.uid() = user_id);
