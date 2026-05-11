import React from 'react';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { GiftListView } from '@/components/checklist/GiftListView';
import type { UserChecklistItem, GiftClaim } from '@/lib/types/checklist';

interface GiftPageProps {
  params: Promise<{ token: string }>;
}

export default async function GiftPage({ params }: GiftPageProps) {
  const { token } = await params;
  const supabase = await createClient();

  // Find profile by share token
  const { data: profile } = await supabase
    .from('profiles')
    .select('id, full_name')
    .eq('share_token', token)
    .single();

  if (!profile) {
    notFound();
  }

  // Fetch their checklist — only pending items (not done/skipped)
  const { data: items } = await supabase
    .from('user_checklist')
    .select('*')
    .eq('user_id', profile.id)
    .eq('status', 'pending')
    .order('category')
    .order('sort_order') as { data: UserChecklistItem[] | null; error: unknown };

  // Fetch existing claims
  const { data: claims } = await supabase
    .from('gift_claims')
    .select('*')
    .eq('share_token', token) as { data: GiftClaim[] | null; error: unknown };

  const firstName = profile.full_name?.split(' ')[0] ?? 'Someone';

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-2xl mx-auto px-5 py-8 sm:py-12">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🎁</span>
          </div>
          <h1 className="text-2xl font-semibold text-neutral-900 mb-2">
            {firstName}&apos;s Baby Wishlist
          </h1>
          <p className="text-sm text-neutral-500 max-w-md mx-auto leading-relaxed">
            Help {firstName} prepare for their new arrival! Claim an item below to let others know you are getting it.
          </p>
        </div>

        <GiftListView
          items={items ?? []}
          claims={claims ?? []}
          shareToken={token}
        />
      </div>
    </div>
  );
}
