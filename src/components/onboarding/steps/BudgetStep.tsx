'use client';

import React from 'react';
import { StepWrapper } from '../StepWrapper';
import { OptionCard } from '../OptionCard';
import type { BudgetRange } from '@/lib/types/profile';

interface BudgetStepProps {
  readonly value: BudgetRange | null;
  readonly onChange: (value: BudgetRange) => void;
  readonly onNext: () => void;
}

const BUDGET_OPTIONS: Array<{
  value: BudgetRange;
  label: string;
  description: string;
  icon: string;
}> = [
  {
    value: 'low',
    label: 'Budget-Friendly',
    description: 'Focus on essentials. Approximately €500–€1,500 for a practical setup.',
    icon: '🌱',
  },
  {
    value: 'medium',
    label: 'Balanced',
    description: 'A mix of quality and value. Approximately €1,500–€4,000 for a well-rounded setup.',
    icon: '⚖️',
  },
  {
    value: 'high',
    label: 'Premium',
    description: 'Top-quality and luxury picks. Approximately €4,000–€10,000+ for a premium setup.',
    icon: '✨',
  },
];

export function BudgetStep({ value, onChange, onNext }: BudgetStepProps) {
  const handleSelect = (budgetValue: BudgetRange) => {
    onChange(budgetValue);
    setTimeout(onNext, 300);
  };

  return (
    <StepWrapper
      title="What's your budget comfort zone?"
      subtitle="No judgement here — every range gets great recommendations."
    >
      <div className="space-y-3">
        {BUDGET_OPTIONS.map((option) => (
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
