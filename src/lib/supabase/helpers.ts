import { Database } from './types';
import { PostgrestError } from '@supabase/supabase-js';

/**
 * Supabase Helper Utilities
 * 
 * These utilities provide common patterns and error handling for Supabase operations.
 * They help maintain consistency across the application and reduce boilerplate.
 */

export type SupabaseResult<T> = {
  data: T | null;
  error: PostgrestError | null;
  success: boolean;
};

/**
 * Create a standardized result object from Supabase response
 */
export const createResult = <T>(
  data: T | null,
  error: PostgrestError | null
): SupabaseResult<T> => ({
  data,
  error,
  success: !error,
});

/**
 * Handle Supabase errors consistently
 */
export const handleSupabaseError = (error: PostgrestError): never => {
  console.error('Supabase error:', error);
  throw new Error(error.message || 'An unexpected error occurred');
};

/**
 * Database query helpers
 */
export class SupabaseQueryBuilder {
  constructor(private supabase: any) {}

  /**
   * Get a single record by ID
   */
  async getById<T extends keyof Database['public']['Tables']>(
    table: T,
    id: string
  ): Promise<SupabaseResult<Database['public']['Tables'][T]['Row']>> {
    try {
      const { data, error } = await this.supabase
        .from(table)
        .select('*')
        .eq('id', id)
        .single();

      return createResult(data, error);
    } catch (error) {
      return createResult(null, error as PostgrestError);
    }
  }

  /**
   * Get multiple records with optional filtering
   */
  async getMany<T extends keyof Database['public']['Tables']>(
    table: T,
    options: {
      select?: string;
      filter?: Record<string, any>;
      orderBy?: string;
      limit?: number;
      offset?: number;
    } = {}
  ): Promise<SupabaseResult<Database['public']['Tables'][T]['Row'][]>> {
    try {
      let query = this.supabase
        .from(table)
        .select(options.select || '*');

      // Apply filters
      if (options.filter) {
        Object.entries(options.filter).forEach(([key, value]) => {
          query = query.eq(key, value);
        });
      }

      // Apply ordering
      if (options.orderBy) {
        query = query.order(options.orderBy);
      }

      // Apply pagination
      if (options.limit) {
        query = query.limit(options.limit);
      }

      if (options.offset) {
        query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
      }

      const { data, error } = await query;
      return createResult(data, error);
    } catch (error) {
      return createResult(null, error as PostgrestError);
    }
  }

  /**
   * Create a new record
   */
  async create<T extends keyof Database['public']['Tables']>(
    table: T,
    data: Database['public']['Tables'][T]['Insert']
  ): Promise<SupabaseResult<Database['public']['Tables'][T]['Row']>> {
    try {
      const { data: result, error } = await this.supabase
        .from(table)
        .insert(data)
        .select()
        .single();

      return createResult(result, error);
    } catch (error) {
      return createResult(null, error as PostgrestError);
    }
  }

  /**
   * Update an existing record
   */
  async update<T extends keyof Database['public']['Tables']>(
    table: T,
    id: string,
    data: Database['public']['Tables'][T]['Update']
  ): Promise<SupabaseResult<Database['public']['Tables'][T]['Row']>> {
    try {
      const { data: result, error } = await this.supabase
        .from(table)
        .update(data)
        .eq('id', id)
        .select()
        .single();

      return createResult(result, error);
    } catch (error) {
      return createResult(null, error as PostgrestError);
    }
  }

  /**
   * Delete a record
   */
  async delete<T extends keyof Database['public']['Tables']>(
    table: T,
    id: string
  ): Promise<SupabaseResult<null>> {
    try {
      const { error } = await this.supabase
        .from(table)
        .delete()
        .eq('id', id);

      return createResult(null, error);
    } catch (error) {
      return createResult(null, error as PostgrestError);
    }
  }
}

/**
 * Authentication helpers
 */
export class SupabaseAuthHelpers {
  constructor(private supabase: any) {}

  /**
   * Get current user
   */
  async getCurrentUser() {
    try {
      const { data: { user }, error } = await this.supabase.auth.getUser();
      return createResult(user, error);
    } catch (error) {
      return createResult(null, error as PostgrestError);
    }
  }

  /**
   * Get current session
   */
  async getSession() {
    try {
      const { data: { session }, error } = await this.supabase.auth.getSession();
      return createResult(session, error);
    } catch (error) {
      return createResult(null, error as PostgrestError);
    }
  }

  /**
   * Sign up with email and password
   */
  async signUp(email: string, password: string, options?: {
    redirectTo?: string;
    data?: Record<string, any>;
  }) {
    try {
      const { data, error } = await this.supabase.auth.signUp({
        email,
        password,
        options: {
          redirectTo: options?.redirectTo,
          data: options?.data,
        },
      });

      return createResult(data, error);
    } catch (error) {
      return createResult(null, error as PostgrestError);
    }
  }

  /**
   * Sign in with email and password
   */
  async signIn(email: string, password: string, options?: {
    redirectTo?: string;
  }) {
    try {
      const { data, error } = await this.supabase.auth.signInWithPassword({
        email,
        password,
        options: {
          redirectTo: options?.redirectTo,
        },
      });

      return createResult(data, error);
    } catch (error) {
      return createResult(null, error as PostgrestError);
    }
  }

  /**
   * Sign out
   */
  async signOut() {
    try {
      const { error } = await this.supabase.auth.signOut();
      return createResult(null, error);
    } catch (error) {
      return createResult(null, error as PostgrestError);
    }
  }

  /**
   * Reset password
   */
  async resetPassword(email: string, redirectTo?: string) {
    try {
      const { data, error } = await this.supabase.auth.resetPasswordForEmail(email, {
        redirectTo,
      });

      return createResult(data, error);
    } catch (error) {
      return createResult(null, error as PostgrestError);
    }
  }
}
