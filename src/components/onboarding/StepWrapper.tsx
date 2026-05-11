'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface StepWrapperProps {
  readonly title: string;
  readonly subtitle?: string;
  readonly children: React.ReactNode;
  readonly className?: string;
}

export function StepWrapper({ title, subtitle, children, className }: StepWrapperProps) {
  return (
    <div className={cn('animate-fade-in', className)}>
      <div className="mb-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900 mb-3">
          {title}
        </h2>
        {subtitle && (
          <p className="text-neutral-500 text-base sm:text-lg max-w-md mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
      <div className="w-full max-w-md mx-auto">
        {children}
      </div>
    </div>
  );
}
