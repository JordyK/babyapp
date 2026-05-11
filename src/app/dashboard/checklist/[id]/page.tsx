import React from 'react';
import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Card } from '@/components/ui';
import { ItemStatusControls } from '@/components/checklist/ItemStatusControls';
import type { UserChecklistItem, ChecklistItem } from '@/lib/types/checklist';
import { CATEGORY_LABELS, CATEGORY_ICONS, PRIORITY_LABELS } from '@/lib/types/checklist';

interface ItemDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ItemDetailPage({ params }: ItemDetailPageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/onboarding');
  }

  // Fetch the user's checklist item
  const { data: userItem } = await supabase
    .from('user_checklist')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single() as { data: UserChecklistItem | null; error: unknown };

  if (!userItem) {
    notFound();
  }

  // Fetch the catalog item for explainer content (if not a custom item)
  let catalogItem: ChecklistItem | null = null;
  if (userItem.item_id) {
    const { data } = await supabase
      .from('checklist_items')
      .select('*')
      .eq('id', userItem.item_id)
      .single() as { data: ChecklistItem | null; error: unknown };
    catalogItem = data;
  }

  const category = userItem.category as keyof typeof CATEGORY_LABELS;
  const hasExplainer = catalogItem?.explainer && catalogItem.explainer.length > 0;
  const hasTips = catalogItem?.tips && catalogItem.tips.length > 0;

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-2xl mx-auto px-5 py-8 sm:py-12">
        {/* Back link */}
        <Link
          href="/dashboard/checklist"
          className="inline-flex items-center gap-1.5 text-sm text-neutral-400 hover:text-neutral-600 transition-colors mb-8"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to checklist
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">{CATEGORY_ICONS[category]}</span>
            <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider">
              {CATEGORY_LABELS[category]}
            </span>
            {catalogItem?.priority && (
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ml-auto ${
                catalogItem.priority === 'essential'
                  ? 'bg-primary-100 text-primary-700'
                  : catalogItem.priority === 'recommended'
                  ? 'bg-blue-50 text-blue-600'
                  : 'bg-neutral-100 text-neutral-500'
              }`}>
                {PRIORITY_LABELS[catalogItem.priority]}
              </span>
            )}
          </div>
          <h1 className="text-2xl font-semibold text-neutral-900 mb-2">
            {userItem.name}
          </h1>
          {catalogItem?.description && (
            <p className="text-neutral-500 leading-relaxed">
              {catalogItem.description}
            </p>
          )}
          {userItem.is_custom && (
            <p className="text-xs text-neutral-400 mt-2 uppercase tracking-wider">Custom item</p>
          )}
        </div>

        {/* Status controls */}
        <Card className="p-5 mb-6">
          <ItemStatusControls itemId={userItem.id} currentStatus={userItem.status} />
        </Card>

        {/* Explainer */}
        {hasExplainer && (
          <Card className="p-6 mb-4">
            <h2 className="text-sm font-semibold text-neutral-800 mb-3 flex items-center gap-2">
              <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Why you need this
            </h2>
            <p className="text-sm text-neutral-600 leading-relaxed">
              {catalogItem!.explainer}
            </p>
          </Card>
        )}

        {/* Tips */}
        {hasTips && (
          <Card className="p-6 mb-4">
            <h2 className="text-sm font-semibold text-neutral-800 mb-3 flex items-center gap-2">
              <svg className="w-4 h-4 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              What to look for
            </h2>
            <p className="text-sm text-neutral-600 leading-relaxed">
              {catalogItem!.tips}
            </p>
          </Card>
        )}

        {/* Future: Product recommendations placeholder */}
        <Card className="p-6 bg-neutral-50 border-dashed border-neutral-200">
          <p className="text-xs text-neutral-400 text-center">
            Product recommendations coming soon
          </p>
        </Card>
      </div>
    </div>
  );
}
