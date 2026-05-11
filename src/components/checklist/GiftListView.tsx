'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Card } from '@/components/ui';
import { cn } from '@/lib/utils';
import type { UserChecklistItem, GiftClaim, ChecklistCategory } from '@/lib/types/checklist';
import { CATEGORY_LABELS, CATEGORY_ICONS, CATEGORY_ORDER } from '@/lib/types/checklist';

interface GiftListViewProps {
  readonly items: UserChecklistItem[];
  readonly claims: GiftClaim[];
  readonly shareToken: string;
}

export function GiftListView({ items, claims, shareToken }: GiftListViewProps) {
  const claimedItemIds = new Set(claims.map((c) => c.item_id));
  const remainingItems = items.filter((i) => !claimedItemIds.has(i.id));
  const claimedItems = items.filter((i) => claimedItemIds.has(i.id));

  // Group remaining items by category
  const grouped = useMemo(() => {
    const map = new Map<ChecklistCategory, UserChecklistItem[]>();
    for (const item of remainingItems) {
      const cat = item.category as ChecklistCategory;
      if (!map.has(cat)) map.set(cat, []);
      map.get(cat)!.push(item);
    }
    return CATEGORY_ORDER
      .filter((cat) => map.has(cat))
      .map((cat) => ({ category: cat, items: map.get(cat)! }));
  }, [remainingItems]);

  return (
    <div>
      {/* Stats */}
      <div className="flex gap-4 mb-6 text-center">
        <Card className="flex-1 p-4">
          <p className="text-2xl font-bold text-neutral-900">{remainingItems.length}</p>
          <p className="text-xs text-neutral-400">Still needed</p>
        </Card>
        <Card className="flex-1 p-4">
          <p className="text-2xl font-bold text-primary-600">{claimedItems.length}</p>
          <p className="text-xs text-neutral-400">Claimed</p>
        </Card>
      </div>

      {/* Remaining items by category */}
      {grouped.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-lg font-medium text-neutral-600 mb-1">All items claimed!</p>
          <p className="text-sm text-neutral-400">Everyone has been so generous 🎉</p>
        </Card>
      ) : (
        <div className="space-y-6">
          {grouped.map(({ category, items: catItems }) => (
            <div key={category}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-base">{CATEGORY_ICONS[category]}</span>
                <h2 className="text-sm font-semibold text-neutral-700">{CATEGORY_LABELS[category]}</h2>
              </div>
              <div className="space-y-1.5">
                {catItems.map((item) => (
                  <GiftItemRow key={item.id} item={item} shareToken={shareToken} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Claimed items */}
      {claimedItems.length > 0 && (
        <div className="mt-8">
          <p className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-3">
            Already claimed
          </p>
          <div className="space-y-1.5">
            {claimedItems.map((item) => {
              const claim = claims.find((c) => c.item_id === item.id);
              return (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-primary-50/50 opacity-60"
                >
                  <div className="w-5 h-5 rounded-md bg-primary-500 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="flex-1 text-sm line-through text-neutral-400">
                    {item.name}
                  </span>
                  <span className="text-xs text-primary-500 font-medium flex-shrink-0">
                    {claim?.claimer_name ?? 'Claimed'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

interface GiftItemRowProps {
  readonly item: UserChecklistItem;
  readonly shareToken: string;
}

function GiftItemRow({ item, shareToken }: GiftItemRowProps) {
  const router = useRouter();
  const [claiming, setClaiming] = useState(false);
  const [showNameInput, setShowNameInput] = useState(false);
  const [name, setName] = useState('');

  const handleClaim = async () => {
    if (!name.trim()) return;
    setClaiming(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.from('gift_claims').insert({
        share_token: shareToken,
        item_id: item.id,
        claimer_name: name.trim(),
      });

      if (!error) {
        router.refresh();
      }
    } finally {
      setClaiming(false);
      setShowNameInput(false);
      setName('');
    }
  };

  return (
    <div className="p-3 rounded-xl bg-white border border-neutral-100">
      <div className="flex items-center gap-3">
        <span className="flex-1 text-sm text-neutral-700">{item.name}</span>
        {!showNameInput ? (
          <button
            type="button"
            onClick={() => setShowNameInput(true)}
            className="text-xs font-medium px-3 py-1.5 rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition-colors flex-shrink-0"
          >
            I&apos;ll get this
          </button>
        ) : null}
      </div>
      {showNameInput && (
        <div className="mt-3 flex gap-2">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="flex-1 px-3 py-2 rounded-lg border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400"
            onKeyDown={(e) => e.key === 'Enter' && handleClaim()}
            autoFocus
          />
          <button
            type="button"
            onClick={handleClaim}
            disabled={claiming || !name.trim()}
            className={cn(
              'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
              'bg-primary-500 text-white hover:bg-primary-600 disabled:opacity-50'
            )}
          >
            Claim
          </button>
          <button
            type="button"
            onClick={() => { setShowNameInput(false); setName(''); }}
            className="px-2 py-2 rounded-lg text-sm text-neutral-400 hover:bg-neutral-100"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
