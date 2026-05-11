'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { cn } from '@/lib/utils';
import type { ChecklistStatus } from '@/lib/types/checklist';

interface ItemStatusControlsProps {
  readonly itemId: string;
  readonly currentStatus: ChecklistStatus;
}

export function ItemStatusControls({ itemId, currentStatus }: ItemStatusControlsProps) {
  const router = useRouter();
  const [status, setStatus] = useState<ChecklistStatus>(currentStatus);
  const [saving, setSaving] = useState(false);

  const updateStatus = async (newStatus: ChecklistStatus) => {
    if (saving) return;
    const previous = status;
    setStatus(newStatus);
    setSaving(true);

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('user_checklist')
        .update({ status: newStatus })
        .eq('id', itemId);

      if (error) {
        setStatus(previous);
        console.error('Failed to update status:', error);
      } else {
        router.refresh();
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <p className="text-xs text-neutral-400 uppercase tracking-wider mb-3">Status</p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => updateStatus('pending')}
          disabled={saving}
          className={cn(
            'flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-150',
            status === 'pending'
              ? 'bg-neutral-900 text-white'
              : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200'
          )}
        >
          To do
        </button>
        <button
          type="button"
          onClick={() => updateStatus('done')}
          disabled={saving}
          className={cn(
            'flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-150',
            status === 'done'
              ? 'bg-primary-500 text-white'
              : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200'
          )}
        >
          Done ✓
        </button>
        <button
          type="button"
          onClick={() => updateStatus('skipped')}
          disabled={saving}
          className={cn(
            'flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-150',
            status === 'skipped'
              ? 'bg-neutral-500 text-white'
              : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200'
          )}
        >
          Skip
        </button>
      </div>
    </div>
  );
}
