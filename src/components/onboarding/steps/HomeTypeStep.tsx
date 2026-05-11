'use client';

import React from 'react';
import { StepWrapper } from '../StepWrapper';
import { OptionCard } from '../OptionCard';
import type { HomeType } from '@/lib/types/profile';

interface HomeTypeStepProps {
  readonly value: HomeType | null;
  readonly onChange: (value: HomeType) => void;
  readonly onNext: () => void;
}

const HOME_TYPE_OPTIONS: Array<{
  value: HomeType;
  label: string;
  description: string;
  icon: string;
}> = [
  {
    value: 'apartment',
    label: 'Apartment',
    description: 'We\'ll suggest space-saving solutions and compact essentials.',
    icon: '🏢',
  },
  {
    value: 'small_house',
    label: 'Small house',
    description: 'A cozy home with room to grow. Balanced recommendations.',
    icon: '🏡',
  },
  {
    value: 'large_house',
    label: 'Large house',
    description: 'Plenty of space! We can recommend full-size setups.',
    icon: '🏠',
  },
];

export function HomeTypeStep({ value, onChange, onNext }: HomeTypeStepProps) {
  const handleSelect = (homeValue: HomeType) => {
    onChange(homeValue);
    setTimeout(onNext, 300);
  };

  return (
    <StepWrapper
      title="What's your living space like?"
      subtitle="We'll recommend products that fit your home perfectly."
    >
      <div className="space-y-3">
        {HOME_TYPE_OPTIONS.map((option) => (
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
