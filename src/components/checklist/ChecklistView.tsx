'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Card } from '@/components/ui';
import { cn } from '@/lib/utils';
import type { UserChecklistItem, ChecklistCategory, ChecklistStatus } from '@/lib/types/checklist';
import { CATEGORY_LABELS, CATEGORY_ICONS, CATEGORY_ORDER } from '@/lib/types/checklist';

type FilterMode = 'all' | 'remaining' | 'completed';

interface ChecklistViewProps {
  readonly items: UserChecklistItem[];
  readonly claimedMap?: Record<string, string>;
  readonly secondHandFriendly?: boolean;
}

export function ChecklistView({ items, claimedMap = {}, secondHandFriendly = false }: ChecklistViewProps) {
  const [filter, setFilter] = useState<FilterMode>('remaining');

  // Stats
  const totalItems = items.length;
  const doneItems = items.filter((i) => i.status === 'done').length;
  const skippedItems = items.filter((i) => i.status === 'skipped').length;
  const remainingItems = totalItems - doneItems - skippedItems;
  const progressPercent = totalItems > 0 ? Math.round((doneItems / totalItems) * 100) : 0;

  // Filter items
  const filteredItems = useMemo(() => {
    switch (filter) {
      case 'remaining':
        return items.filter((i) => i.status === 'pending');
      case 'completed':
        return items.filter((i) => i.status === 'done' || i.status === 'skipped');
      default:
        return items;
    }
  }, [items, filter]);

  // Group by category
  const grouped = useMemo(() => {
    const map = new Map<ChecklistCategory, UserChecklistItem[]>();
    for (const item of filteredItems) {
      const cat = item.category as ChecklistCategory;
      if (!map.has(cat)) map.set(cat, []);
      map.get(cat)!.push(item);
    }
    // Sort categories
    return CATEGORY_ORDER
      .filter((cat) => map.has(cat))
      .map((cat) => ({ category: cat, items: map.get(cat)! }));
  }, [filteredItems]);

  return (
    <div>
      {/* Progress header */}
      <Card className="p-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-2xl font-bold text-neutral-900">{progressPercent}%</p>
            <p className="text-xs text-neutral-400">
              {doneItems} done · {remainingItems} remaining · {skippedItems} skipped
            </p>
          </div>
        </div>
        <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </Card>

      {/* Filter tabs */}
      <div className="flex gap-1 mb-6 bg-neutral-100 rounded-lg p-1">
        {(['remaining', 'all', 'completed'] as FilterMode[]).map((mode) => (
          <button
            key={mode}
            type="button"
            onClick={() => setFilter(mode)}
            className={cn(
              'flex-1 py-2 px-3 text-xs font-medium rounded-md transition-all duration-150',
              filter === mode
                ? 'bg-white text-neutral-900 shadow-sm'
                : 'text-neutral-500 hover:text-neutral-700'
            )}
          >
            {mode === 'remaining' ? `Remaining (${remainingItems})` :
             mode === 'completed' ? `Done (${doneItems + skippedItems})` :
             `All (${totalItems})`}
          </button>
        ))}
      </div>

      {/* Category groups */}
      {grouped.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-neutral-400">
            {filter === 'remaining' ? 'All done! Nothing remaining.' : 'No items to show.'}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {grouped.map(({ category, items: catItems }) => (
            <CategoryGroup
              key={category}
              category={category}
              items={catItems}
              allCategoryItems={items.filter((i) => i.category === category)}
              claimedMap={claimedMap}
              secondHandFriendly={secondHandFriendly}
            />
          ))}
        </div>
      )}

      {/* Add custom item */}
      <AddItemSection />
    </div>
  );
}

interface CategoryGroupProps {
  readonly category: ChecklistCategory;
  readonly items: UserChecklistItem[];
  readonly allCategoryItems: UserChecklistItem[];
  readonly claimedMap: Record<string, string>;
  readonly secondHandFriendly: boolean;
}

function CategoryGroup({ category, items, allCategoryItems, claimedMap, secondHandFriendly }: CategoryGroupProps) {
  const doneCount = allCategoryItems.filter((i) => i.status === 'done').length;
  const totalCount = allCategoryItems.length;

  // Essentials progress
  const essentialItems = allCategoryItems.filter((i) => i.priority === 'essential');
  const essentialDone = essentialItems.filter((i) => i.status === 'done').length;
  const essentialTotal = essentialItems.length;

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-base">{CATEGORY_ICONS[category]}</span>
        <h2 className="text-sm font-semibold text-neutral-700">{CATEGORY_LABELS[category]}</h2>
        <span className="text-xs text-neutral-400 ml-auto">
          {essentialTotal > 0 ? `${essentialDone}/${essentialTotal} essentials` : `${doneCount}/${totalCount}`}
        </span>
      </div>
      <div className="space-y-1.5">
        {items.map((item) => (
          <ChecklistItemRow 
            key={item.id} 
            item={item} 
            claimedBy={claimedMap[item.id] ?? null}
            secondHandFriendly={secondHandFriendly}
          />
        ))}
      </div>
    </div>
  );
}

interface ChecklistItemRowProps {
  readonly item: UserChecklistItem;
  readonly claimedBy: string | null;
  readonly secondHandFriendly: boolean;
}

function ChecklistItemRow({ item, claimedBy, secondHandFriendly }: ChecklistItemRowProps) {
  const router = useRouter();
  const [status, setStatus] = useState<ChecklistStatus>(item.status);
  const [saving, setSaving] = useState(false);

  const updateStatus = async (newStatus: ChecklistStatus) => {
    const previousStatus = status;
    setStatus(newStatus);
    setSaving(true);

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('user_checklist')
        .update({ status: newStatus })
        .eq('id', item.id);

      if (error) {
        setStatus(previousStatus);
        console.error('Failed to update item:', error);
      } else {
        router.refresh();
      }
    } finally {
      setSaving(false);
    }
  };

  const handleCheck = () => {
    updateStatus(status === 'done' ? 'pending' : 'done');
  };

  const handleSkip = () => {
    updateStatus(status === 'skipped' ? 'pending' : 'skipped');
  };

  return (
    <div
      className={cn(
        'flex items-center gap-3 p-3 rounded-xl transition-all duration-150',
        status === 'done' && 'bg-primary-50/50',
        status === 'skipped' && 'bg-neutral-50 opacity-60',
        status === 'pending' && 'bg-white border border-neutral-100',
        saving && 'opacity-70'
      )}
    >
      {/* Checkbox */}
      <button
        type="button"
        onClick={handleCheck}
        disabled={saving}
        className={cn(
          'w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all duration-150',
          status === 'done'
            ? 'bg-primary-500 border-primary-500'
            : 'border-neutral-300 hover:border-primary-400'
        )}
      >
        {status === 'done' && (
          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      {/* Name — links to detail page */}
      <Link
        href={`/dashboard/checklist/${item.id}`}
        className={cn(
          'flex-1 text-sm hover:underline',
          status === 'done' && 'line-through text-neutral-400',
          status === 'skipped' && 'line-through text-neutral-400',
          status === 'pending' && 'text-neutral-700'
        )}
      >
        {item.name}
        {item.is_custom && (
          <span className="ml-2 text-[10px] uppercase tracking-wider text-neutral-300 font-medium">
            Custom
          </span>
        )}
      </Link>

      {/* Claimed badge */}
      {claimedBy && (
        <span className="text-[10px] font-medium text-primary-500 bg-primary-50 px-2 py-0.5 rounded-full flex-shrink-0">
          🎁 {claimedBy}
        </span>
      )}

      {/* Second-hand indicator */}
      {secondHandFriendly && item.good_second_hand && !item.is_custom && (
        <span className="text-[10px] flex-shrink-0" title="Great to buy second-hand">
          ♻️
        </span>
      )}

      {/* Skip button */}
      <button
        type="button"
        onClick={handleSkip}
        disabled={saving}
        className={cn(
          'text-xs px-2 py-1 rounded-md transition-colors flex-shrink-0',
          status === 'skipped'
            ? 'text-neutral-500 bg-neutral-200'
            : 'text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100'
        )}
      >
        {status === 'skipped' ? 'Undo' : 'Skip'}
      </button>
    </div>
  );
}

function AddItemSection() {
  const router = useRouter();
  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ChecklistCategory>('nursery');
  const [saving, setSaving] = useState(false);

  const handleAdd = async () => {
    if (!name.trim()) return;
    setSaving(true);

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase.from('user_checklist').insert({
        user_id: user.id,
        name: name.trim(),
        category,
        status: 'pending',
        is_custom: true,
        sort_order: 999,
      });

      if (!error) {
        setName('');
        setIsAdding(false);
        router.refresh();
      }
    } finally {
      setSaving(false);
    }
  };

  if (!isAdding) {
    return (
      <button
        type="button"
        onClick={() => setIsAdding(true)}
        className="w-full mt-6 p-4 rounded-xl border-2 border-dashed border-neutral-200 text-sm text-neutral-400 hover:border-primary-300 hover:text-primary-500 transition-colors"
      >
        + Add custom item
      </button>
    );
  }

  return (
    <Card className="mt-6 p-4">
      <p className="text-sm font-medium text-neutral-700 mb-3">Add a custom item</p>
      <div className="space-y-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Item name"
          className="w-full px-3 py-2 rounded-lg border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400"
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          autoFocus
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as ChecklistCategory)}
          className="w-full px-3 py-2 rounded-lg border border-neutral-200 text-sm text-neutral-600 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
        >
          {CATEGORY_ORDER.map((cat) => (
            <option key={cat} value={cat}>
              {CATEGORY_ICONS[cat]} {CATEGORY_LABELS[cat]}
            </option>
          ))}
        </select>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleAdd}
            disabled={saving || !name.trim()}
            className="flex-1 py-2 px-4 rounded-lg bg-primary-500 text-white text-sm font-medium disabled:opacity-50 hover:bg-primary-600 transition-colors"
          >
            Add
          </button>
          <button
            type="button"
            onClick={() => { setIsAdding(false); setName(''); }}
            className="py-2 px-4 rounded-lg text-sm text-neutral-500 hover:bg-neutral-100 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </Card>
  );
}
