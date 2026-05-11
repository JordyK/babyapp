# Database Schema

## Overview

Simple, clean schema with a single `profiles` table linked to Supabase Auth users.

---

## profiles

Stores user profile data and onboarding answers.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | uuid | NO | — | Primary key, references auth.users(id) |
| full_name | text | NO | — | User's full name |
| due_date | date | YES | null | Expected due date |
| budget_range | text | YES | null | 'low', 'medium', or 'high' |
| first_child | boolean | YES | null | Whether this is their first child |
| baby_count | text | YES | null | '1', 'twins', or 'triplets_plus' |
| home_type | text | YES | null | 'apartment', 'small_house', or 'large_house' |
| second_hand_friendly | boolean | YES | null | Open to second-hand products |
| style_preference | text | YES | null | 'minimalist' or 'premium' |
| onboarding_completed | boolean | NO | false | Whether onboarding is complete |
| created_at | timestamptz | NO | now() | Record creation timestamp |
| updated_at | timestamptz | NO | now() | Last update timestamp |

---

## SQL Setup

Run this in the Supabase SQL editor:

```sql
-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  due_date DATE,
  budget_range TEXT CHECK (budget_range IN ('low', 'medium', 'high')),
  first_child BOOLEAN,
  baby_count TEXT CHECK (baby_count IN ('1', 'twins', 'triplets_plus')),
  home_type TEXT CHECK (home_type IN ('apartment', 'small_house', 'large_house')),
  second_hand_friendly BOOLEAN,
  style_preference TEXT CHECK (style_preference IN ('minimalist', 'premium')),
  onboarding_completed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Users can only access their own profile
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_profiles_updated
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Index for faster lookups
CREATE INDEX idx_profiles_onboarding ON public.profiles(onboarding_completed);
```

---

## Row Level Security

| Policy | Operation | Rule |
|--------|-----------|------|
| Users can view their own profile | SELECT | auth.uid() = id |
| Users can update their own profile | UPDATE | auth.uid() = id |
| Users can insert their own profile | INSERT | auth.uid() = id |
