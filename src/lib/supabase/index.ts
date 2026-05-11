/**
 * Supabase Module Index
 * 
 * This file exports all Supabase-related utilities and configurations
 * for easy importing throughout the application.
 */

// Client configurations
export { createBrowserClient } from './browser';
export { createServerClient, createAdminClient } from './server';

// Types
export type { Database, Json } from './types';

// Helper utilities
export { SupabaseQueryBuilder, SupabaseAuthHelpers } from './helpers';
export type { SupabaseResult } from './helpers';
