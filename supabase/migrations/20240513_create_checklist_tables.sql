-- Migration: Create checklist tables for personalized baby item tracking
-- checklist_items: curated master catalog with personalization conditions
-- user_checklist: per-user state (done/pending/skipped + custom items)

-- Master catalog of curated checklist items
CREATE TABLE public.checklist_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL CHECK (category IN (
    'nursery', 'feeding', 'diapering', 'clothing',
    'bathing', 'health_safety', 'travel_gear', 'play_development'
  )),
  priority TEXT NOT NULL DEFAULT 'recommended' CHECK (priority IN (
    'essential', 'recommended', 'nice_to_have'
  )),
  conditions JSONB DEFAULT '{}'::jsonb,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Per-user checklist state
CREATE TABLE public.user_checklist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  item_id UUID REFERENCES public.checklist_items(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN (
    'nursery', 'feeding', 'diapering', 'clothing',
    'bathing', 'health_safety', 'travel_gear', 'play_development'
  )),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'done', 'skipped')),
  is_custom BOOLEAN NOT NULL DEFAULT false,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.checklist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_checklist ENABLE ROW LEVEL SECURITY;

-- checklist_items is read-only for all authenticated users
CREATE POLICY "Anyone can read checklist items"
  ON public.checklist_items FOR SELECT
  TO authenticated
  USING (true);

-- user_checklist: users can only access their own rows
CREATE POLICY "Users can view their own checklist"
  ON public.user_checklist FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own checklist items"
  ON public.user_checklist FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own checklist items"
  ON public.user_checklist FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own checklist items"
  ON public.user_checklist FOR DELETE
  USING (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX idx_user_checklist_user_id ON public.user_checklist(user_id);
CREATE INDEX idx_user_checklist_status ON public.user_checklist(user_id, status);
CREATE INDEX idx_checklist_items_category ON public.checklist_items(category, sort_order);

-- Auto-update updated_at on user_checklist
CREATE TRIGGER on_user_checklist_updated
  BEFORE UPDATE ON public.user_checklist
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();
