/**
 * Supabase Database Types
 * 
 * This file contains TypeScript type definitions for the Supabase database schema.
 * These types are used throughout the application for type safety and autocompletion.
 * 
 * To regenerate these types from your Supabase project:
 * npx supabase gen types typescript --project-id <PROJECT_ID> --schema public > src/lib/supabase/types.ts
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      // Users table - extends auth.users with additional profile information
      users: {
        Row: {
          id: string
          email: string
          first_name: string | null
          last_name: string | null
          avatar_url: string | null
          due_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          first_name?: string | null
          last_name?: string | null
          avatar_url?: string | null
          due_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          first_name?: string | null
          last_name?: string | null
          avatar_url?: string | null
          due_date?: string | null
          updated_at?: string
        }
      }
      
      // Checklists table - main checklist entities
      checklists: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          due_date: string | null
          is_template: boolean
          is_public: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          due_date?: string | null
          is_template?: boolean
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          due_date?: string | null
          is_template?: boolean
          is_public?: boolean
          updated_at?: string
        }
      }
      
      // Checklist items table - individual items within checklists
      checklist_items: {
        Row: {
          id: string
          checklist_id: string
          name: string
          description: string | null
          category: string | null
          priority: 'low' | 'medium' | 'high'
          quantity: number | null
          notes: string | null
          is_completed: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          checklist_id: string
          name: string
          description?: string | null
          category?: string | null
          priority?: 'low' | 'medium' | 'high'
          quantity?: number | null
          notes?: string | null
          is_completed?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          checklist_id?: string
          name?: string
          description?: string | null
          category?: string | null
          priority?: 'low' | 'medium' | 'high'
          quantity?: number | null
          notes?: string | null
          is_completed?: boolean
          sort_order?: number
          updated_at?: string
        }
      }
      
      // Categories table - for organizing checklist items
      categories: {
        Row: {
          id: string
          name: string
          description: string | null
          icon: string | null
          color: string | null
          sort_order: number
          is_default: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          icon?: string | null
          color?: string | null
          sort_order?: number
          is_default?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          icon?: string | null
          color?: string | null
          sort_order?: number
          is_default?: boolean
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
