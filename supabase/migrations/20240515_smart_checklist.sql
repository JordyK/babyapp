-- Migration: Smart checklist logic — second-hand indicator, price tier, priority

-- =============================================
-- 1. Second-hand indicator
-- =============================================
ALTER TABLE public.checklist_items
  ADD COLUMN IF NOT EXISTS good_second_hand BOOLEAN DEFAULT FALSE;

ALTER TABLE public.user_checklist
  ADD COLUMN IF NOT EXISTS good_second_hand BOOLEAN DEFAULT FALSE;

-- =============================================
-- 2. Price tier
-- =============================================
ALTER TABLE public.checklist_items
  ADD COLUMN IF NOT EXISTS price_tier TEXT DEFAULT 'mid'
  CHECK (price_tier IN ('budget', 'mid', 'premium'));

ALTER TABLE public.user_checklist
  ADD COLUMN IF NOT EXISTS price_tier TEXT DEFAULT 'mid'
  CHECK (price_tier IN ('budget', 'mid', 'premium'));

-- =============================================
-- 3. Priority (denormalized for progress tracking)
-- =============================================
ALTER TABLE public.user_checklist
  ADD COLUMN IF NOT EXISTS priority TEXT DEFAULT 'recommended'
  CHECK (priority IN ('essential', 'recommended', 'nice_to_have'));
