import React from 'react';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Card } from '@/components/ui';
import type { Profile } from '@/lib/types/profile';
import { SignOutButton } from '@/components/dashboard/SignOutButton';
import { ProfileSync } from '@/components/dashboard/ProfileSync';

const BUDGET_LABELS: Record<string, string> = {
  low: 'Budget-Friendly',
  medium: 'Balanced',
  high: 'Premium',
};

const HOME_LABELS: Record<string, string> = {
  apartment: 'Apartment',
  small_house: 'Small House',
  large_house: 'Large House',
};

const BABY_COUNT_LABELS: Record<string, string> = {
  '1': 'One baby',
  twins: 'Twins',
  triplets_plus: 'Triplets+',
};

function getDaysUntilDue(dueDate: string | null): number | null {
  if (!dueDate) return null;
  const now = new Date();
  const due = new Date(dueDate);
  const diff = due.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/onboarding');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single() as { data: Profile | null; error: unknown };

  const daysUntilDue = getDaysUntilDue(profile?.due_date ?? null);
  const firstName = profile?.full_name?.split(' ')[0] ?? 'there';

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Sync onboarding answers from localStorage after email verification */}
      <ProfileSync userId={user.id} />
      <div className="max-w-3xl mx-auto px-5 py-8 sm:py-12">
        {/* Welcome header */}
        <div className="flex items-start justify-between mb-10">
          <div>
            <h1 className="text-3xl font-semibold text-neutral-900 mb-1">
              Welcome, {firstName}!
            </h1>
            <p className="text-neutral-500">
              Your personalized baby plan is taking shape.
            </p>
          </div>
          <SignOutButton />
        </div>

        {/* Countdown card */}
        {daysUntilDue !== null && daysUntilDue > 0 && (
          <Card className="p-6 mb-6 bg-gradient-to-r from-primary-50 to-accent-50 border-0">
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-5xl font-bold text-primary-600">{daysUntilDue}</p>
                <p className="text-sm text-primary-700 font-medium">days to go</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-neutral-900 mb-1">
                  Your due date is approaching
                </h2>
                <p className="text-sm text-neutral-600">
                  {daysUntilDue > 90
                    ? "Plenty of time to get everything ready. No rush!"
                    : daysUntilDue > 30
                    ? "Getting closer! Let's make sure the essentials are covered."
                    : "Almost there! Time to finalize your preparations."}
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Your plan summary */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-neutral-900 mb-4">Your Plan Summary</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {profile?.budget_range && (
              <Card className="p-4">
                <p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">Budget</p>
                <p className="font-medium text-neutral-800">
                  {BUDGET_LABELS[profile.budget_range] ?? profile.budget_range}
                </p>
              </Card>
            )}
            {profile?.baby_count && (
              <Card className="p-4">
                <p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">Expecting</p>
                <p className="font-medium text-neutral-800">
                  {BABY_COUNT_LABELS[profile.baby_count] ?? profile.baby_count}
                </p>
              </Card>
            )}
            {profile?.home_type && (
              <Card className="p-4">
                <p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">Home</p>
                <p className="font-medium text-neutral-800">
                  {HOME_LABELS[profile.home_type] ?? profile.home_type}
                </p>
              </Card>
            )}
            {profile?.first_child !== null && profile?.first_child !== undefined && (
              <Card className="p-4">
                <p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">Experience</p>
                <p className="font-medium text-neutral-800">
                  {profile.first_child ? 'First baby' : 'Experienced parent'}
                </p>
              </Card>
            )}
            {profile?.second_hand_friendly !== null && profile?.second_hand_friendly !== undefined && (
              <Card className="p-4">
                <p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">Second-hand</p>
                <p className="font-medium text-neutral-800">
                  {profile.second_hand_friendly ? 'Open to it' : 'Prefer new'}
                </p>
              </Card>
            )}
            {profile?.style_preference && (
              <Card className="p-4">
                <p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">Style</p>
                <p className="font-medium text-neutral-800 capitalize">
                  {profile.style_preference}
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* What's next */}
        <Card className="p-6 bg-white">
          <h2 className="text-lg font-semibold text-neutral-900 mb-3">What&apos;s next?</h2>
          <p className="text-neutral-500 mb-6 leading-relaxed">
            We&apos;re building your personalized checklist based on your preferences. Soon you&apos;ll be able to track everything you need for your baby&apos;s arrival.
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-3.5 h-3.5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-neutral-600">Onboarding completed</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-medium text-neutral-400">2</span>
              </div>
              <span className="text-neutral-400">Personalized checklist (coming soon)</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-medium text-neutral-400">3</span>
              </div>
              <span className="text-neutral-400">Product recommendations (coming soon)</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
