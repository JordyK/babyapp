'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface OptionCardProps {
  readonly label: string;
  readonly description?: string;
  readonly selected: boolean;
  readonly onClick: () => void;
  readonly icon?: React.ReactNode;
}

export function OptionCard({ label, description, selected, onClick, icon }: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'w-full text-left rounded-2xl border-2 p-5 transition-all duration-200',
        'hover:border-primary-300 hover:bg-primary-50/50',
        'focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:ring-offset-2',
        selected
          ? 'border-primary-500 bg-primary-50 shadow-primary'
          : 'border-neutral-200 bg-white'
      )}
    >
      <div className="flex items-center gap-4">
        {icon && (
          <div className={cn(
            'flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-lg',
            selected ? 'bg-primary-500 text-white' : 'bg-neutral-100 text-neutral-500'
          )}>
            {icon}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className={cn(
            'font-medium text-base',
            selected ? 'text-primary-700' : 'text-neutral-800'
          )}>
            {label}
          </p>
          {description && (
            <p className="text-sm text-neutral-500 mt-0.5 leading-relaxed">
              {description}
            </p>
          )}
        </div>
        <div className={cn(
          'flex-shrink-0 w-5 h-5 rounded-full border-2 transition-all duration-200',
          selected
            ? 'border-primary-500 bg-primary-500'
            : 'border-neutral-300'
        )}>
          {selected && (
            <svg className="w-full h-full text-white p-0.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </div>
      </div>
    </button>
  );
}
