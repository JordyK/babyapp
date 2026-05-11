-- Migration: Item explainers, gift sharing, and partner collaboration

-- =============================================
-- 1. Item detail pages — add explainer content
-- =============================================
ALTER TABLE public.checklist_items
  ADD COLUMN IF NOT EXISTS explainer TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS tips TEXT DEFAULT '';

-- =============================================
-- 2. Gift sharing — share token on profiles + claims table
-- =============================================
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS share_token TEXT UNIQUE;

CREATE TABLE public.gift_claims (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  share_token TEXT NOT NULL,
  item_id UUID NOT NULL REFERENCES public.user_checklist(id) ON DELETE CASCADE,
  claimer_name TEXT NOT NULL,
  claimed_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RLS for gift_claims
ALTER TABLE public.gift_claims ENABLE ROW LEVEL SECURITY;

-- Anyone can read claims for a given share token (public page)
CREATE POLICY "Anyone can read gift claims"
  ON public.gift_claims FOR SELECT
  USING (true);

-- Anyone can insert a claim (no login required)
CREATE POLICY "Anyone can claim a gift"
  ON public.gift_claims FOR INSERT
  WITH CHECK (true);

-- Owner can delete claims on their items
CREATE POLICY "Owner can delete claims"
  ON public.gift_claims FOR DELETE
  USING (
    share_token IN (
      SELECT p.share_token FROM public.profiles p WHERE p.id = auth.uid()
    )
  );

CREATE INDEX idx_gift_claims_token ON public.gift_claims(share_token);
CREATE INDEX idx_gift_claims_item ON public.gift_claims(item_id);

-- =============================================
-- 3. Partner collaboration
-- =============================================
CREATE TABLE public.checklist_collaborators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  collaborator_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  collaborator_email TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(owner_id, collaborator_email)
);

ALTER TABLE public.checklist_collaborators ENABLE ROW LEVEL SECURITY;

-- Owner can manage their collaborators
CREATE POLICY "Owner can manage collaborators"
  ON public.checklist_collaborators FOR ALL
  USING (auth.uid() = owner_id);

-- Collaborator can see invites for them
CREATE POLICY "Collaborator can see their invites"
  ON public.checklist_collaborators FOR SELECT
  USING (auth.uid() = collaborator_id);

-- Collaborator can accept invite (update status)
CREATE POLICY "Collaborator can accept invite"
  ON public.checklist_collaborators FOR UPDATE
  USING (auth.uid() = collaborator_id)
  WITH CHECK (auth.uid() = collaborator_id);

CREATE INDEX idx_collab_owner ON public.checklist_collaborators(owner_id);
CREATE INDEX idx_collab_collaborator ON public.checklist_collaborators(collaborator_id);
CREATE INDEX idx_collab_email ON public.checklist_collaborators(collaborator_email);

-- Expand user_checklist access for collaborators
CREATE POLICY "Collaborators can view shared checklist"
  ON public.user_checklist FOR SELECT
  USING (
    user_id IN (
      SELECT owner_id FROM public.checklist_collaborators
      WHERE collaborator_id = auth.uid() AND status = 'accepted'
    )
  );

CREATE POLICY "Collaborators can update shared checklist"
  ON public.user_checklist FOR UPDATE
  USING (
    user_id IN (
      SELECT owner_id FROM public.checklist_collaborators
      WHERE collaborator_id = auth.uid() AND status = 'accepted'
    )
  );

CREATE POLICY "Collaborators can add to shared checklist"
  ON public.user_checklist FOR INSERT
  WITH CHECK (
    user_id IN (
      SELECT owner_id FROM public.checklist_collaborators
      WHERE collaborator_id = auth.uid() AND status = 'accepted'
    )
  );
