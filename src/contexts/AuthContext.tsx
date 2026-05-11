'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { createBrowserClient } from '@/lib/supabase/browser';

/**
 * Authentication context interface
 */
interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, options?: {
    firstName?: string;
    lastName?: string;
  }) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: string | null }>;
  updateProfile: (data: {
    firstName?: string;
    lastName?: string;
    dueDate?: string;
  }) => Promise<{ error: string | null }>;
}

/**
 * Authentication context
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Authentication provider component
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createBrowserClient();

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
        } else {
          setSession(session);
          setUser(session?.user ?? null);
        }
      } catch (error) {
        console.error('Unexpected error getting session:', error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event: any, session: any) => {
        console.log('Auth state changed:', event, session);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  /**
   * Sign up with email and password
   */
  const signUp = async (
    email: string, 
    password: string, 
    options?: {
      firstName?: string;
      lastName?: string;
    }
  ) => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: options?.firstName,
            last_name: options?.lastName,
          },
        },
      });

      if (error) {
        return { error: error.message };
      }

      // Create user profile in database
      // Profile is created automatically by database trigger

      return { error: null };
    } catch (error) {
      console.error('Unexpected error during sign up:', error);
      return { error: 'An unexpected error occurred during sign up' };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Sign in with email and password
   */
  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { error: error.message };
      }

      return { error: null };
    } catch (error) {
      console.error('Unexpected error during sign in:', error);
      return { error: 'An unexpected error occurred during sign in' };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Sign out
   */
  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  };

  /**
   * Reset password
   */
  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) {
        return { error: error.message };
      }

      return { error: null };
    } catch (error) {
      console.error('Unexpected error during password reset:', error);
      return { error: 'An unexpected error occurred' };
    }
  };

  /**
   * Update user profile
   */
  const updateProfile = async (data: {
    firstName?: string;
    lastName?: string;
    dueDate?: string;
  }) => {
    try {
      if (!user) {
        return { error: 'User not authenticated' };
      }

      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: data.firstName,
          last_name: data.lastName,
          due_date: data.dueDate,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (error) {
        return { error: error.message };
      }

      return { error: null };
    } catch (error) {
      console.error('Unexpected error updating profile:', error);
      return { error: 'An unexpected error occurred' };
    }
  };

  const value: AuthContextType = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook to use authentication context
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
