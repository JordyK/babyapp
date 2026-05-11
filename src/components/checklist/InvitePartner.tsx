'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { cn } from '@/lib/utils';

export function InvitePartner() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInvite = async () => {
    if (!email.trim()) return;
    setSending(true);
    setError(null);

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error: insertError } = await supabase
        .from('checklist_collaborators')
        .insert({
          owner_id: user.id,
          collaborator_email: email.trim().toLowerCase(),
          status: 'pending',
        });

      if (insertError) {
        if (insertError.code === '23505') {
          setError('This person has already been invited.');
        } else {
          setError('Failed to send invite. Please try again.');
        }
      } else {
        setSent(true);
        setEmail('');
        router.refresh();
      }
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div className="flex items-center gap-2 text-sm text-primary-600">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        Invite sent! They will see your checklist after signing up and logging in.
      </div>
    );
  }

  return (
    <div>
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Partner's email"
          className="flex-1 px-3 py-2 rounded-lg border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400"
          onKeyDown={(e) => e.key === 'Enter' && handleInvite()}
        />
        <button
          type="button"
          onClick={handleInvite}
          disabled={sending || !email.trim()}
          className={cn(
            'px-4 py-2 rounded-lg text-sm font-medium transition-colors flex-shrink-0',
            'bg-neutral-900 text-white hover:bg-neutral-800 disabled:opacity-50'
          )}
        >
          {sending ? 'Inviting...' : 'Invite'}
        </button>
      </div>
      {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
      <p className="text-xs text-neutral-400 mt-2">
        Your partner can sign up and will see your shared checklist.
      </p>
    </div>
  );
}
