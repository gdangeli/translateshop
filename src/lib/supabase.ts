import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database
export interface User {
  id: string
  email: string
  company_name?: string
  plan: 'free' | 'starter' | 'business' | 'pro'
  products_limit: number
  created_at: string
}

export interface Product {
  id: string
  user_id: string
  original_language: string
  original_title: string
  original_description: string
  translations: Translation[]
  created_at: string
  updated_at: string
}

export interface Translation {
  language: string
  title: string
  description: string
  translated_at: string
}
