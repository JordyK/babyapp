'use client';

import { createClient } from '@supabase/supabase-js';
import { Database } from './types';

/**
 * Browser client for Supabase
 * 
 * This client is used in client components and browser environments.
 * It automatically handles authentication state and session management.
 */
export const createBrowserClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
  }

  return createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
};

/**
 * Singleton browser client instance
 * 
 * Use this for consistent client-side operations.
 * Re-initializes on each request to ensure fresh session state.
 */
export const supabase = createBrowserClient();
