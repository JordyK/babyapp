'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import type { TextQuestion, QuestionComponentProps, OnboardingTheme } from '@/lib/onboarding/types';
import { QuestionWrapper } from './QuestionWrapper';

interface TextQuestionProps extends QuestionComponentProps {
  question: TextQuestion;
}

/**
 * Text input question component
 * 
 * Provides a clean text input interface with validation
 * and support for various input modes.
 */
export function TextQuestion({ question, value, onChange, error, disabled, theme }: TextQuestionProps) {
  const [inputValue, setInputValue] = React.useState(() => {
    return typeof value === 'string' ? value : '';
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    onChange(newValue);
  };

  const getCharacterCount = () => {
    return inputValue.length;
  };

  const getCharacterLimit = () => {
    return question.maxLength || Infinity;
  };

  const isNearLimit = () => {
    const limit = getCharacterLimit();
    const count = getCharacterCount();
    return limit !== Infinity && count > limit * 0.9;
  };

  const isAtLimit = () => {
    const limit = getCharacterLimit();
    const count = getCharacterCount();
    return limit !== Infinity && count >= limit;
  };

  return (
    <QuestionWrapper question={question} error={error} theme={theme}>
      <div className="space-y-4">
        {/* Text Input */}
        <div className="relative">
          <input
            type={question.inputMode === 'email' ? 'email' : 'text'}
            value={inputValue}
            onChange={handleChange}
            placeholder={question.placeholder || 'Enter your answer'}
            maxLength={question.maxLength}
            minLength={question.minLength}
            pattern={question.pattern}
            inputMode={question.inputMode}
            disabled={disabled}
            className={cn(
              'w-full px-4 py-3 border-2 border-neutral-200 rounded-xl bg-white',
              'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
              'text-base placeholder:text-neutral-400',
              disabled && 'opacity-50 cursor-not-allowed',
              error && 'border-error-500 focus:ring-error-500'
            )}
          />
          
          {/* Character Count */}
          {question.maxLength && (
            <div className={cn(
              'absolute right-4 top-1/2 transform -translate-y-1/2 text-xs',
              isAtLimit() ? 'text-error-600' : 
              isNearLimit() ? 'text-amber-600' : 
              'text-neutral-400'
            )}>
              {getCharacterCount()}/{getCharacterLimit()}
            </div>
          )}
        </div>

        {/* Input Mode Indicator */}
        {question.inputMode && (
          <div className="flex items-center space-x-2 text-xs text-neutral-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Input mode: {question.inputMode}</span>
          </div>
        )}

        {/* Validation Hints */}
        {question.minLength && (
          <div className="text-sm text-neutral-500">
            Minimum {question.minLength} character{question.minLength > 1 ? 's' : ''}
          </div>
        )}

        {question.maxLength && (
          <div className="text-sm text-neutral-500">
            Maximum {question.maxLength} character{question.maxLength > 1 ? 's' : ''}
          </div>
        )}

        {question.pattern && (
          <div className="text-sm text-neutral-500">
            Specific format required
          </div>
        )}

        {/* Character Limit Warning */}
        {isNearLimit() && !isAtLimit() && (
          <div className="flex items-center space-x-2 text-amber-600 bg-amber-50 p-3 rounded-lg">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>Approaching character limit</span>
          </div>
        )}

        {/* Character Limit Reached */}
        {isAtLimit() && (
          <div className="flex items-center space-x-2 text-error-600 bg-error-50 p-3 rounded-lg">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span>Character limit reached</span>
          </div>
        )}

        {/* Quick Fill Options (for common inputs) */}
        {question.inputMode === 'email' && (
          <div className="space-y-2">
            <div className="text-sm text-neutral-600 font-medium">Quick examples:</div>
            <div className="flex flex-wrap gap-2">
              {['john@example.com', 'sarah@family.com'].map((example) => (
                <button
                  key={example}
                  type="button"
                  onClick={() => {
                    setInputValue(example);
                    onChange(example);
                  }}
                  disabled={disabled}
                  className={cn(
                    'px-3 py-1 text-sm font-medium rounded-lg border transition-colors duration-200',
                    'border-neutral-200 bg-white hover:border-primary-300 hover:bg-primary-50',
                    disabled && 'opacity-50 cursor-not-allowed'
                  )}
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </QuestionWrapper>
  );
}
