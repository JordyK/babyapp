'use client';

import React from 'react';
import { StepWrapper } from '../StepWrapper';
import { Button } from '@/components/ui';

interface DueDateStepProps {
  readonly value: string | null;
  readonly onChange: (value: string | null) => void;
  readonly onNext: () => void;
}

export function DueDateStep({ value, onChange, onNext }: DueDateStepProps) {
  return (
    <StepWrapper
      title="When is your little one arriving?"
      subtitle="This helps us create a timeline tailored to your journey."
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="due-date"
            className="text-sm font-medium text-neutral-600"
          >
            Expected due date
          </label>
          <input
            id="due-date"
            type="date"
            value={value || ''}
            onChange={(e) => onChange(e.target.value || null)}
            className="h-14 w-full rounded-2xl border-2 border-neutral-200 bg-white px-5 text-base text-neutral-800 transition-all duration-200 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
          />
        </div>

        <div className="flex gap-3">
          <Button
            variant="ghost"
            className="flex-1"
            onClick={() => {
              onChange(null);
              onNext();
            }}
          >
            Skip for now
          </Button>
          <Button
            className="flex-1"
            onClick={onNext}
            disabled={!value}
          >
            Continue
          </Button>
        </div>
      </div>
    </StepWrapper>
  );
}
