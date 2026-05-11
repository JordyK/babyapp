'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import type { EmailQuestion, QuestionComponentProps, OnboardingTheme } from '@/lib/onboarding/types';
import { QuestionWrapper } from './QuestionWrapper';

interface EmailQuestionProps extends QuestionComponentProps {
  question: EmailQuestion;
}

/**
 * Email input question component
 * 
 * Provides a specialized email input interface with validation
 * and quick email suggestions for common scenarios.
 */
export function EmailQuestion({ question, value, onChange, error, disabled, theme }: EmailQuestionProps) {
  const [inputValue, setInputValue] = React.useState(() => {
    return typeof value === 'string' ? value : '';
  });

  const [isValid, setIsValid] = React.useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    
    if (newValue) {
      const valid = validateEmail(newValue);
      setIsValid(valid);
      onChange(newValue);
    } else {
      setIsValid(false);
      onChange(null);
    }
  };

  const commonEmails = [
    'john@example.com',
    'sarah@family.com',
    'mike@work.com',
    'jane@home.com'
  ];

  return (
    <QuestionWrapper question={question} error={error} theme={theme}>
      <div className="space-y-4">
        {/* Email Input */}
        <div className="relative">
          <input
            type="email"
            value={inputValue}
            onChange={handleChange}
            placeholder={question.placeholder || 'Enter your email address'}
            disabled={disabled}
            className={cn(
              'w-full px-4 py-3 border-2 border-neutral-200 rounded-xl bg-white',
              'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
              'text-base placeholder:text-neutral-400',
              disabled && 'opacity-50 cursor-not-allowed',
              error && 'border-error-500 focus:ring-error-500',
              isValid && inputValue && 'border-success-500 focus:ring-success-500'
            )}
          />
          
          {/* Email Icon */}
          <div className={cn(
            'absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none',
            isValid && inputValue ? 'text-success-500' : 'text-neutral-400'
          )}>
            {isValid && inputValue ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            )}
          </div>
        </div>

        {/* Email Validation Status */}
        {inputValue && (
          <div className={cn(
            'flex items-center space-x-2 text-sm p-3 rounded-lg',
            isValid 
              ? 'text-success-600 bg-success-50' 
              : 'text-amber-600 bg-amber-50'
          )}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isValid ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              )}
            </svg>
            <span>
              {isValid ? 'Valid email address' : 'Please enter a valid email address'}
            </span>
          </div>
        )}

        {/* Privacy Note */}
        <div className="flex items-start space-x-2 text-xs text-neutral-500">
          <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span>
            Your email address will only be used for account-related communications and will never be shared with third parties.
          </span>
        </div>
      </div>
    </QuestionWrapper>
  );
}
