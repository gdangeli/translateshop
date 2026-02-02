import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Credit packages mapping
export const CREDIT_PACKAGES: Record<string, { credits: number; name: string }> = {
  'price_starter': { credits: 500, name: 'Starter' },
  'price_pro': { credits: 2000, name: 'Pro' },
  'price_business': { credits: 6000, name: 'Business' },
  // Unlimited is handled separately via is_unlimited flag
};

// Payment Links (direct Stripe links)
export const PAYMENT_LINKS = {
  starter: 'https://buy.stripe.com/6oU5kFaWJeHJ7CL2Td7Vm01',
  pro: 'https://buy.stripe.com/cNi6oJaWJ1UX9KT1P97Vm02',
  business: 'https://buy.stripe.com/aFacN73uhbvx2ir0L57Vm03',
  unlimited: 'https://buy.stripe.com/fZu00l4yl6bd4qzfFZ7Vm04',
};

export interface UserCredits {
  credits: number;
  is_unlimited: boolean;
}

/**
 * Get user's current credits
 */
export async function getUserCredits(
  supabase: SupabaseClient,
  userEmail: string
): Promise<UserCredits> {
  const { data, error } = await supabase
    .from('user_credits')
    .select('credits, is_unlimited')
    .eq('user_email', userEmail)
    .single();

  if (error || !data) {
    // Create default entry with 50 free credits
    const { data: newData } = await supabase
      .from('user_credits')
      .insert({ user_email: userEmail, credits: 50, is_unlimited: false })
      .select('credits, is_unlimited')
      .single();
    
    return newData || { credits: 50, is_unlimited: false };
  }

  return { credits: data.credits, is_unlimited: data.is_unlimited };
}

/**
 * Check if user has enough credits
 */
export async function hasEnoughCredits(
  supabase: SupabaseClient,
  userEmail: string,
  required: number
): Promise<{ hasEnough: boolean; current: number; is_unlimited: boolean }> {
  const { credits, is_unlimited } = await getUserCredits(supabase, userEmail);
  return {
    hasEnough: is_unlimited || credits >= required,
    current: credits,
    is_unlimited,
  };
}

/**
 * Deduct credits from user (returns false if not enough)
 */
export async function deductCredits(
  supabase: SupabaseClient,
  userEmail: string,
  amount: number
): Promise<{ success: boolean; remaining: number }> {
  const { credits, is_unlimited } = await getUserCredits(supabase, userEmail);

  // Unlimited users don't get deducted
  if (is_unlimited) {
    return { success: true, remaining: credits };
  }

  if (credits < amount) {
    return { success: false, remaining: credits };
  }

  const newCredits = credits - amount;
  
  const { error } = await supabase
    .from('user_credits')
    .update({ credits: newCredits, updated_at: new Date().toISOString() })
    .eq('user_email', userEmail);

  if (error) {
    console.error('Failed to deduct credits:', error);
    return { success: false, remaining: credits };
  }

  return { success: true, remaining: newCredits };
}

/**
 * Add credits to user (used by webhook)
 */
export async function addCredits(
  supabase: SupabaseClient,
  userEmail: string,
  amount: number,
  metadata?: { stripe_session_id?: string; package_name?: string; amount_paid?: number }
): Promise<{ success: boolean; newTotal: number }> {
  const { credits } = await getUserCredits(supabase, userEmail);
  const newCredits = credits + amount;

  const { error } = await supabase
    .from('user_credits')
    .update({ credits: newCredits, updated_at: new Date().toISOString() })
    .eq('user_email', userEmail);

  if (error) {
    console.error('Failed to add credits:', error);
    return { success: false, newTotal: credits };
  }

  // Log the purchase
  if (metadata) {
    await supabase.from('credit_purchases').insert({
      user_email: userEmail,
      credits_added: amount,
      stripe_session_id: metadata.stripe_session_id,
      package_name: metadata.package_name,
      amount_paid: metadata.amount_paid,
    });
  }

  return { success: true, newTotal: newCredits };
}

/**
 * Set unlimited status (used by webhook for subscription)
 */
export async function setUnlimited(
  supabase: SupabaseClient,
  userEmail: string,
  isUnlimited: boolean
): Promise<boolean> {
  // Ensure user exists first
  await getUserCredits(supabase, userEmail);

  const { error } = await supabase
    .from('user_credits')
    .update({ is_unlimited: isUnlimited, updated_at: new Date().toISOString() })
    .eq('user_email', userEmail);

  return !error;
}
