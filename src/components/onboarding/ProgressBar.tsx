'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  readonly currentStep: number;
  readonly totalSteps: number;
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider">
          Step {currentStep + 1} of {totalSteps}
        </span>
      </div>
      <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
        <div
          className={cn(
            'h-full bg-primary-500 rounded-full transition-all duration-500 ease-out'
          )}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
