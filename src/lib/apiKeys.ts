// API Key management utilities
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import crypto from 'crypto';

// Generate a secure API key
export function generateApiKey(): string {
  const prefix = 'ts_'; // TranslateShop prefix
  const key = crypto.randomBytes(24).toString('base64url');
  return `${prefix}${key}`;
}

// Hash API key for storage (never store plaintext keys)
export function hashApiKey(key: string): string {
  return crypto.createHash('sha256').update(key).digest('hex');
}

// Validate API key and return user info
export async function validateApiKey(
  supabase: SupabaseClient,
  apiKey: string
): Promise<{ valid: boolean; userId?: string; email?: string; error?: string }> {
  try {
    const keyHash = hashApiKey(apiKey);
    
    // First get the API key
    const { data: keyData, error: keyError } = await supabase
      .from('api_keys')
      .select('user_id, is_active')
      .eq('key_hash', keyHash)
      .eq('is_active', true)
      .single();

    if (keyError || !keyData) {
      return { valid: false, error: 'Invalid API key' };
    }

    // Then get the profile (separate query since FK is on auth.users, not profiles)
    const { data: profileData } = await supabase
      .from('profiles')
      .select('email')
      .eq('id', keyData.user_id)
      .single();

    // Update last_used_at
    await supabase
      .from('api_keys')
      .update({ last_used_at: new Date().toISOString() })
      .eq('key_hash', keyHash);

    return {
      valid: true,
      userId: keyData.user_id,
      email: profileData?.email,
    };
  } catch (error) {
    return { valid: false, error: 'Validation failed' };
  }
}

// Extract API key from request headers
export function extractApiKey(request: Request): string | null {
  const authHeader = request.headers.get('authorization');
  
  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    if (token.startsWith('ts_')) {
      return token;
    }
  }
  
  // Also check X-API-Key header
  const apiKeyHeader = request.headers.get('x-api-key');
  if (apiKeyHeader?.startsWith('ts_')) {
    return apiKeyHeader;
  }
  
  return null;
}
