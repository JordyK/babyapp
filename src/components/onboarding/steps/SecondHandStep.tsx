'use client';

import React from 'react';
import { StepWrapper } from '../StepWrapper';
import { OptionCard } from '../OptionCard';

interface SecondHandStepProps {
  readonly value: boolean | null;
  readonly onChange: (value: boolean) => void;
  readonly onNext: () => void;
}

export function SecondHandStep({ value, onChange, onNext }: SecondHandStepProps) {
  const handleSelect = (isOpen: boolean) => {
    onChange(isOpen);
    setTimeout(onNext, 300);
  };

  return (
    <StepWrapper
      title="Open to second-hand products?"
      subtitle="Pre-loved items can save money and help the planet."
    >
      <div className="space-y-3">
        <OptionCard
          label="Yes, absolutely!"
          description="Happy to consider quality pre-loved items where it makes sense."
          selected={value === true}
          onClick={() => handleSelect(true)}
          icon={<span>♻️</span>}
        />
        <OptionCard
          label="Prefer everything new"
          description="No problem — we'll focus on brand-new product recommendations."
          selected={value === false}
          onClick={() => handleSelect(false)}
          icon={<span>🛍️</span>}
        />
      </div>
    </StepWrapper>
  );
}
