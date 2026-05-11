'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import type { NumberQuestion, QuestionComponentProps, OnboardingTheme } from '@/lib/onboarding/types';
import { QuestionWrapper } from './QuestionWrapper';

interface NumberQuestionProps extends QuestionComponentProps {
  question: NumberQuestion;
}

/**
 * Number input question component
 * 
 * Provides a clean number input interface with validation
 * and support for min/max constraints and units.
 */
export function NumberQuestion({ question, value, onChange, error, disabled, theme }: NumberQuestionProps) {
  const [inputValue, setInputValue] = React.useState(() => {
    return typeof value === 'number' ? value.toString() : '';
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    
    const numValue = parseFloat(newValue);
    if (!isNaN(numValue)) {
      onChange(numValue);
    } else if (newValue === '') {
      onChange(null);
    }
  };

  const handleIncrement = () => {
    const current = typeof value === 'number' ? value : question.min || 0;
    const newValue = current + (question.step || 1);
    if (question.max === undefined || newValue <= question.max) {
      onChange(newValue);
      setInputValue(newValue.toString());
    }
  };

  const handleDecrement = () => {
    const current = typeof value === 'number' ? value : question.min || 0;
    const newValue = current - (question.step || 1);
    if (question.min === undefined || newValue >= question.min) {
      onChange(newValue);
      setInputValue(newValue.toString());
    }
  };

  return (
    <QuestionWrapper question={question} error={error} theme={theme}>
      <div className="space-y-4">
        {/* Number Input with Controls */}
        <div className="flex items-center space-x-3">
          {/* Decrement Button */}
          <button
            type="button"
            onClick={handleDecrement}
            disabled={disabled || (question.min !== undefined && typeof value === 'number' && value <= question.min)}
            className={cn(
              'w-12 h-12 rounded-xl border-2 border-neutral-200 bg-white',
              'flex items-center justify-center transition-colors duration-200',
              'hover:border-primary-300 hover:bg-primary-50',
              'disabled:opacity-50 disabled:cursor-not-allowed'
            )}
          >
            <svg className="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>

          {/* Number Input */}
          <div className="flex-1 relative">
            <input
              type="number"
              value={inputValue}
              onChange={handleChange}
              min={question.min}
              max={question.max}
              step={question.step}
              placeholder={question.placeholder || 'Enter a number'}
              disabled={disabled}
              className={cn(
                'w-full px-4 py-3 border-2 border-neutral-200 rounded-xl bg-white text-center',
                'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
                'text-base placeholder:text-neutral-400',
                disabled && 'opacity-50 cursor-not-allowed',
                error && 'border-error-500 focus:ring-error-500'
              )}
            />
            
            {/* Unit Display */}
            {question.unit && (
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-600">
                {question.unit}
              </div>
            )}
          </div>

          {/* Increment Button */}
          <button
            type="button"
            onClick={handleIncrement}
            disabled={disabled || (question.max !== undefined && typeof value === 'number' && value >= question.max)}
            className={cn(
              'w-12 h-12 rounded-xl border-2 border-neutral-200 bg-white',
              'flex items-center justify-center transition-colors duration-200',
              'hover:border-primary-300 hover:bg-primary-50',
              'disabled:opacity-50 disabled:cursor-not-allowed'
            )}
          >
            <svg className="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        {/* Range Display */}
        {(question.min !== undefined || question.max !== undefined) && (
          <div className="flex justify-between text-sm text-neutral-500">
            {question.min !== undefined && (
              <span>Min: {question.min}{question.unit}</span>
            )}
            {question.max !== undefined && (
              <span>Max: {question.max}{question.unit}</span>
            )}
          </div>
        )}

        {/* Quick Select Options */}
        {question.step && question.min !== undefined && question.max !== undefined && (
          <div className="space-y-2">
            <div className="text-sm text-neutral-600 font-medium">Quick select:</div>
            <div className="flex flex-wrap gap-2">
              {[question.min, question.min + question.step, question.max].filter((v, i, a) => a.indexOf(v) === i).slice(0, 4).map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => {
                    onChange(value);
                    setInputValue(value.toString());
                  }}
                  disabled={disabled}
                  className={cn(
                    'px-3 py-2 text-sm font-medium rounded-lg border-2 transition-colors duration-200',
                    'border-neutral-200 bg-white hover:border-primary-300 hover:bg-primary-50',
                    disabled && 'opacity-50 cursor-not-allowed'
                  )}
                >
                  {value}{question.unit}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Validation Info */}
        {question.description && (
          <div className="text-sm text-neutral-500 bg-neutral-50 p-3 rounded-lg">
            {question.description}
          </div>
        )}
      </div>
    </QuestionWrapper>
  );
}
