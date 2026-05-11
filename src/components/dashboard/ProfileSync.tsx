'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

/**
 * Syncs onboarding answers from localStorage to the profiles table.
 * Runs once on the dashboard after the user has a valid session
 * (i.e., after email verification).
 */
export function ProfileSync({ userId }: { readonly userId: string }) {
  const router = useRouter();

  useEffect(() => {
    const syncProfile = async () => {
      const raw = localStorage.getItem('onboarding-answers');
      if (!raw) return;

      try {
        const answers = JSON.parse(raw) as Record<string, unknown>;
        const supabase = createClient();

        // Upsert profile — insert if new, update if exists
        const { error } = await supabase.from('profiles').upsert(
          {
            id: userId,
            full_name: (answers.full_name as string) ?? '',
            due_date: (answers.due_date as string) ?? null,
            budget_range: (answers.budget_range as string) ?? null,
            first_child: (answers.first_child as boolean) ?? null,
            baby_count: (answers.baby_count as string) ?? null,
            home_type: (answers.home_type as string) ?? null,
            second_hand_friendly: (answers.second_hand_friendly as boolean) ?? null,
            style_preference: (answers.style_preference as string) ?? null,
            onboarding_completed: true,
          },
          { onConflict: 'id' }
        );

        if (!error) {
          localStorage.removeItem('onboarding-answers');
          // Refresh server components to show the newly saved data
          router.refresh();
        } else {
          console.error('Profile sync error:', error);
        }
      } catch (e) {
        console.error('Failed to parse onboarding answers:', e);
      }
    };

    syncProfile();
  }, [userId, router]);

  return null;
}
