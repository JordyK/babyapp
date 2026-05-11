-- Migration: Add progressive profiling fields to profiles table
-- These optional fields improve personalization over time.
-- All columns are nullable — users can fill them in gradually.

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
