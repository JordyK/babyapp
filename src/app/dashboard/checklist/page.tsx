import React from 'react';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { generateUserChecklist } from '@/lib/checklist/generate';
import { ChecklistView } from '@/components/checklist/ChecklistView';
import type { UserChecklistItem } from '@/lib/types/checklist';
import Link from 'next/link';

export default async function ChecklistPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/onboarding');
  }

  // Generate checklist if user doesn't have one yet
  await generateUserChecklist(user.id);

  // Fetch user's checklist
  const { data: items } = await supabase
    .from('user_checklist')
    .select('*')
    .eq('user_id', user.id)
    .order('category')
    .order('sort_order') as { data: UserChecklistItem[] | null; error: unknown };

  const checklistItems = items ?? [];

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-3xl mx-auto px-5 py-8 sm:py-12">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link
            href="/dashboard"
            className="text-neutral-400 hover:text-neutral-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div>
            <h1 className="text-2xl font-semibold text-neutral-900">Your Checklist</h1>
            <p className="text-sm text-neutral-400">
              Personalized for your situation. Check off, skip, or add your own items.
            </p>
          </div>
        </div>

        <ChecklistView items={checklistItems} />
      </div>
    </div>
  );
}
