'use client';

import React from 'react';
import { StepWrapper } from '../StepWrapper';
import { OptionCard } from '../OptionCard';

interface FirstChildStepProps {
  readonly value: boolean | null;
  readonly onChange: (value: boolean) => void;
  readonly onNext: () => void;
}

export function FirstChildStep({ value, onChange, onNext }: FirstChildStepProps) {
  const handleSelect = (isFirstChild: boolean) => {
    onChange(isFirstChild);
    setTimeout(onNext, 300);
  };

  return (
    <StepWrapper
      title="Is this your first baby?"
      subtitle="First-time parents get extra guidance and tips along the way."
    >
      <div className="space-y-3">
        <OptionCard
          label="Yes, this is my first!"
          description="We'll make sure you have everything covered from scratch."
          selected={value === true}
          onClick={() => handleSelect(true)}
          icon={<span>🌟</span>}
        />
        <OptionCard
          label="No, I've done this before"
          description="We'll focus on what's new and skip the basics you already know."
          selected={value === false}
          onClick={() => handleSelect(false)}
          icon={<span>👶</span>}
        />
      </div>
    </StepWrapper>
  );
}
