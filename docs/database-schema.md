# Database Schema

## Overview

Simple, clean schema with a single `profiles` table linked to Supabase Auth users. Extended with progressive profiling fields for improved personalization.

---

## profiles

Stores user profile data, onboarding answers, and progressive profiling preferences.

### Core Fields (set during onboarding)

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

### Progressive Profiling Fields (optional, filled after onboarding)

| Column | Type | Nullable | Values | Purpose |
|--------|------|----------|--------|---------|
| feeding_preference | text | YES | 'breastfeeding', 'formula', 'combination', 'not_sure' | Feeding product recommendations |
| travel_frequency | text | YES | 'rarely', 'sometimes', 'frequently' | Travel gear recommendations |
| lifestyle_style | text | YES | 'minimalist', 'practical', 'premium', 'eco_conscious' | Style-based filtering |
| nursery_plan | text | YES | 'yes', 'no', 'not_sure' | Nursery product recommendations |
| storage_space | text | YES | 'very_limited', 'moderate', 'plenty' | Size-appropriate suggestions |
| support_network | text | YES | 'yes', 'occasionally', 'no' | Gear quantity recommendations |
| work_situation | text | YES | 'one_home', 'both_working', 'flexible', 'not_sure' | Routine-based suggestions |
| parenting_approach | text | YES | 'simple', 'research', 'premium_convenience', 'eco_conscious' | Content tone matching |
| sleeping_preference | text | YES | 'our_bedroom', 'separate_nursery', 'combination', 'not_sure' | Sleep product recommendations |
| shopping_preference | text | YES | 'lowest_price', 'best_value', 'premium_quality', 'sustainability' | Product ranking criteria |

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

## Migration: Progressive Profiling Fields

Run this after the initial setup to add progressive profiling columns:

```sql
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS feeding_preference TEXT
    CHECK (feeding_preference IN ('breastfeeding', 'formula', 'combination', 'not_sure')),
  ADD COLUMN IF NOT EXISTS travel_frequency TEXT
    CHECK (travel_frequency IN ('rarely', 'sometimes', 'frequently')),
  ADD COLUMN IF NOT EXISTS lifestyle_style TEXT
    CHECK (lifestyle_style IN ('minimalist', 'practical', 'premium', 'eco_conscious')),
  ADD COLUMN IF NOT EXISTS nursery_plan TEXT
    CHECK (nursery_plan IN ('yes', 'no', 'not_sure')),
  ADD COLUMN IF NOT EXISTS storage_space TEXT
    CHECK (storage_space IN ('very_limited', 'moderate', 'plenty')),
  ADD COLUMN IF NOT EXISTS support_network TEXT
    CHECK (support_network IN ('yes', 'occasionally', 'no')),
  ADD COLUMN IF NOT EXISTS work_situation TEXT
    CHECK (work_situation IN ('one_home', 'both_working', 'flexible', 'not_sure')),
  ADD COLUMN IF NOT EXISTS parenting_approach TEXT
    CHECK (parenting_approach IN ('simple', 'research', 'premium_convenience', 'eco_conscious')),
  ADD COLUMN IF NOT EXISTS sleeping_preference TEXT
    CHECK (sleeping_preference IN ('our_bedroom', 'separate_nursery', 'combination', 'not_sure')),
  ADD COLUMN IF NOT EXISTS shopping_preference TEXT
    CHECK (shopping_preference IN ('lowest_price', 'best_value', 'premium_quality', 'sustainability'));
```

---

## checklist_items

Master catalog of curated baby items with personalization conditions.

| Column | Type | Nullable | Description |
|--------|------|----------|-------------|
| id | uuid | NO | Primary key (auto-generated) |
| name | text | NO | Item display name |
| description | text | NO | Short helpful context |
| category | text | NO | nursery, feeding, diapering, clothing, bathing, health_safety, travel_gear, play_development |
| priority | text | NO | essential, recommended, nice_to_have |
| conditions | jsonb | YES | Personalization rules, e.g. `{"feeding_preference": ["breastfeeding"]}` |
| sort_order | int | NO | Ordering within category |
| explainer | text | YES | 2-3 sentence explanation of why this item is needed |
| tips | text | YES | Buying tips and what to look for |
| created_at | timestamptz | NO | Record creation |

**RLS**: Read-only for all authenticated users.

---

## user_checklist

Per-user checklist state — tracks status of each item for a specific user.

| Column | Type | Nullable | Description |
|--------|------|----------|-------------|
| id | uuid | NO | Primary key (auto-generated) |
| user_id | uuid | NO | FK → auth.users(id) |
| item_id | uuid | YES | FK → checklist_items(id), null for custom items |
| name | text | NO | Item name (denormalized or custom) |
| category | text | NO | Same categories as checklist_items |
| status | text | NO | pending, done, skipped |
| is_custom | boolean | NO | true if user-added |
| sort_order | int | NO | Ordering |
| created_at | timestamptz | NO | Record creation |
| updated_at | timestamptz | NO | Last update |

**RLS**: Users can only CRUD their own rows (`user_id = auth.uid()`). Collaborators also get SELECT/UPDATE/INSERT.

---

## gift_claims

Tracks which items friends/family have claimed as gifts via the public share link.

| Column | Type | Nullable | Description |
|--------|------|----------|-------------|
| id | uuid | NO | Primary key (auto-generated) |
| share_token | text | NO | Links to profile.share_token |
| item_id | uuid | NO | FK → user_checklist(id) |
| claimer_name | text | NO | Name of person claiming (no account needed) |
| claimed_at | timestamptz | NO | When the claim was made |

**RLS**: Public SELECT and INSERT (no auth required). Owner can DELETE.

---

## checklist_collaborators

Partner collaboration — invite someone by email to co-manage the checklist.

| Column | Type | Nullable | Description |
|--------|------|----------|-------------|
| id | uuid | NO | Primary key (auto-generated) |
| owner_id | uuid | NO | FK → auth.users(id), checklist owner |
| collaborator_id | uuid | YES | FK → auth.users(id), null until accepted |
| collaborator_email | text | NO | Email of invited partner |
| status | text | NO | pending, accepted |
| created_at | timestamptz | NO | When invite was created |

**RLS**: Owner can manage. Collaborator can see and accept their own invites.

---

## Row Level Security

### profiles

| Policy | Operation | Rule |
|--------|-----------|------|
| Users can view their own profile | SELECT | auth.uid() = id |
| Users can update their own profile | UPDATE | auth.uid() = id |
| Users can insert their own profile | INSERT | auth.uid() = id |

### checklist_items

| Policy | Operation | Rule |
|--------|-----------|------|
| Anyone can read checklist items | SELECT | authenticated |

### user_checklist

| Policy | Operation | Rule |
|--------|-----------|------|
| Users can view their own checklist | SELECT | auth.uid() = user_id |
| Users can insert their own items | INSERT | auth.uid() = user_id |
| Users can update their own items | UPDATE | auth.uid() = user_id |
| Users can delete their own items | DELETE | auth.uid() = user_id |
| Collaborators can view shared checklist | SELECT | user_id in accepted collaborations |
| Collaborators can update shared checklist | UPDATE | user_id in accepted collaborations |
| Collaborators can add to shared checklist | INSERT | user_id in accepted collaborations |

### gift_claims

| Policy | Operation | Rule |
|--------|-----------|------|
| Anyone can read gift claims | SELECT | public |
| Anyone can claim a gift | INSERT | public |
| Owner can delete claims | DELETE | share_token matches owner profile |

### checklist_collaborators

| Policy | Operation | Rule |
|--------|-----------|------|
| Owner can manage collaborators | ALL | auth.uid() = owner_id |
| Collaborator can see their invites | SELECT | auth.uid() = collaborator_id |
| Collaborator can accept invite | UPDATE | auth.uid() = collaborator_id |
