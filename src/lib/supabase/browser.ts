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
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dmtnjzmwkaprsuoscfrr.supabase.co';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_LPAX4IE_xWleRjXOBQQFOQ_NTDyS4fa';
  
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase environment variables');
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

