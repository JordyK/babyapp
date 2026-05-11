'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Question, QuestionComponentProps, OnboardingTheme } from '@/lib/onboarding/types';

interface QuestionWrapperProps {
  question: Question;
  children: React.ReactNode;
  error?: string | undefined;
  theme?: OnboardingTheme | undefined;
  className?: string;
}

/**
 * Wrapper component for all question types
 * 
 * Provides consistent styling, layout, and error handling
 * for all question components in the onboarding flow.
 */
export function QuestionWrapper({ 
  question, 
  children, 
  error, 
  theme, 
  className 
}: QuestionWrapperProps) {
  const themeStyles = theme ? {
    '--primary-color': theme.primaryColor,
    '--background-color': theme.backgroundColor,
    '--text-color': theme.textColor,
    '--accent-color': theme.accentColor,
    '--border-radius': theme.borderRadius,
    '--font-family': theme.fontFamily,
  } as React.CSSProperties : {};

  return (
    <div 
      className={cn(
        'w-full space-y-4',
        className
      )}
      style={themeStyles}
    >
      {/* Question Header */}
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-neutral-900 leading-tight">
          {question.title}
          {question.required && (
            <span className="text-error-500 ml-1">*</span>
          )}
        </h3>
        
        {question.description && (
          <p className="text-sm text-neutral-600 leading-relaxed">
            {question.description}
          </p>
        )}
      </div>

      {/* Question Content */}
      <div className="space-y-3">
        {children}
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-center space-x-2 text-error-600 text-sm">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
