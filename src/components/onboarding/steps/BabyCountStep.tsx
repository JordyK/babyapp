'use client';

import React from 'react';
import { StepWrapper } from '../StepWrapper';
import { OptionCard } from '../OptionCard';
import type { BabyCount } from '@/lib/types/profile';

interface BabyCountStepProps {
  readonly value: BabyCount | null;
  readonly onChange: (value: BabyCount) => void;
  readonly onNext: () => void;
}

const BABY_COUNT_OPTIONS: Array<{
  value: BabyCount;
  label: string;
  description: string;
  icon: string;
}> = [
  {
    value: '1',
    label: 'One baby',
    description: 'A single bundle of joy.',
    icon: '👶',
  },
  {
    value: 'twins',
    label: 'Twins',
    description: 'Double the love! We\'ll adjust quantities accordingly.',
    icon: '👶👶',
  },
  {
    value: 'triplets_plus',
    label: 'Triplets or more',
    description: 'A full house! We\'ll make sure you\'re extra prepared.',
    icon: '👶👶👶',
  },
];

export function BabyCountStep({ value, onChange, onNext }: BabyCountStepProps) {
  const handleSelect = (countValue: BabyCount) => {
    onChange(countValue);
    setTimeout(onNext, 300);
  };

  return (
    <StepWrapper
      title="How many babies are you expecting?"
      subtitle="This helps us recommend the right quantities."
    >
      <div className="space-y-3">
        {BABY_COUNT_OPTIONS.map((option) => (
          <OptionCard
            key={option.value}
            label={option.label}
            description={option.description}
            selected={value === option.value}
            onClick={() => handleSelect(option.value)}
            icon={<span>{option.icon}</span>}
          />
        ))}
      </div>
    </StepWrapper>
  );
}
