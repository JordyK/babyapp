'use client';

import React from 'react';
import { StepWrapper } from '../StepWrapper';
import { OptionCard } from '../OptionCard';
import { Button } from '@/components/ui';
import type { StylePreference } from '@/lib/types/profile';

interface StyleStepProps {
  readonly value: StylePreference;
  readonly onChange: (value: StylePreference) => void;
  readonly onNext: () => void;
}

export function StyleStep({ value, onChange, onNext }: StyleStepProps) {
  const handleSelect = (style: StylePreference) => {
    onChange(style);
    setTimeout(onNext, 300);
  };

  return (
    <StepWrapper
      title="What's your style?"
      subtitle="Optional — helps us fine-tune your recommendations."
    >
      <div className="space-y-3">
        <OptionCard
          label="Minimalist"
          description="Clean, simple, and only what you truly need. Less is more."
          selected={value === 'minimalist'}
          onClick={() => handleSelect('minimalist')}
          icon={<span>🍃</span>}
        />
        <OptionCard
          label="Premium"
          description="The best of the best. Top-rated products and luxury picks."
          selected={value === 'premium'}
          onClick={() => handleSelect('premium')}
          icon={<span>💎</span>}
        />
      </div>

      <div className="mt-4">
        <Button
          variant="ghost"
          className="w-full"
          onClick={() => {
            onChange(null);
            onNext();
          }}
        >
          Skip this one
        </Button>
      </div>
    </StepWrapper>
  );
}
