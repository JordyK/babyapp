'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export function RegenerateButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleRegenerate = async () => {
    if (!confirm('This will delete your current checklist and regenerate it with the new smart sorting. Continue?')) {
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/regenerate-checklist', { method: 'POST' });
      const data = await res.json();

      if (data.error) {
        alert('Failed to regenerate: ' + data.error);
      } else {
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleRegenerate}
      disabled={loading}
      className="text-xs text-neutral-400 hover:text-neutral-600 underline"
    >
      {loading ? 'Regenerating...' : 'Regenerate checklist (temp)'}
    </button>
  );
}
