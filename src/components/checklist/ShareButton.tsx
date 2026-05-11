'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

export function ShareButton() {
  const [loading, setLoading] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/share', { method: 'POST' });
      const data = await res.json();
      if (data.token) {
        const url = `${window.location.origin}/gift/${data.token}`;
        setShareUrl(url);
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      }
    } finally {
      setLoading(false);
    }
  };

  if (shareUrl) {
    return (
      <div className="flex items-center gap-2">
        <input
          type="text"
          readOnly
          value={shareUrl}
          className="flex-1 px-3 py-2 rounded-lg border border-neutral-200 text-xs text-neutral-600 bg-neutral-50"
          onClick={(e) => (e.target as HTMLInputElement).select()}
        />
        <button
          type="button"
          onClick={async () => {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 3000);
          }}
          className={cn(
            'px-3 py-2 rounded-lg text-xs font-medium transition-colors flex-shrink-0',
            copied ? 'bg-primary-100 text-primary-600' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
          )}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      disabled={loading}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-500 text-white text-sm font-medium hover:bg-primary-600 transition-colors disabled:opacity-50"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
      </svg>
      {loading ? 'Generating...' : 'Share as gift list'}
    </button>
  );
}
