'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import type { DateQuestion, QuestionComponentProps, OnboardingTheme } from '@/lib/onboarding/types';
import { QuestionWrapper } from './QuestionWrapper';

interface DateQuestionProps extends QuestionComponentProps {
  question: DateQuestion;
}

/**
 * Date question component
 * 
 * Provides a clean date input interface with validation
 * and optional min/max date constraints.
 */
export function DateQuestion({ question, value, onChange, error, disabled, theme }: DateQuestionProps) {
  const [inputValue, setInputValue] = useState(() => {
    if (value instanceof Date) {
      return value.toISOString().split('T')[0];
    }
    return '';
  });

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    
    if (newValue) {
      const date = new Date(newValue + 'T00:00:00');
      if (!isNaN(date.getTime())) {
        onChange(date);
      }
    } else {
      onChange(null);
    }
  };

  const getMinDate = () => {
    if (question.minDate) {
      return question.minDate.toISOString().split('T')[0];
    }
    // Default to today for due dates
    return new Date().toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    if (question.maxDate) {
      return question.maxDate.toISOString().split('T')[0];
    }
    // Default to 1 year from now
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);
    return maxDate.toISOString().split('T')[0];
  };

  const getDaysUntil = () => {
    if (!value || !(value instanceof Date)) return null;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const targetDate = new Date(value);
    targetDate.setHours(0, 0, 0, 0);
    
    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };

  const daysUntil = getDaysUntil();

  return (
    <QuestionWrapper question={question} error={error} theme={theme}>
      <div className="space-y-4">
        {/* Date Input */}
        <div className="relative">
          <input
            type="date"
            value={inputValue}
            onChange={handleChange}
            min={getMinDate()}
            max={getMaxDate()}
            disabled={disabled}
            placeholder={question.placeholder || 'Select a date'}
            className={cn(
              'w-full px-4 py-3 border-2 border-neutral-200 rounded-xl bg-white',
              'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
              'text-base placeholder:text-neutral-400',
              disabled && 'opacity-50 cursor-not-allowed',
              error && 'border-error-500 focus:ring-error-500'
            )}
          />
          
          {/* Calendar Icon */}
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>

        {/* Selected Date Display */}
        {value instanceof Date && !isNaN(value.getTime()) && (
          <div className="bg-primary-50 border border-primary-200 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-primary-600 font-medium">Selected Date</div>
                <div className="text-lg font-semibold text-primary-900">
                  {formatDate(value)}
                </div>
              </div>
              
              {daysUntil !== null && (
                <div className="text-right">
                  <div className="text-sm text-primary-600 font-medium">
                    {daysUntil === 0 ? 'Today' : 
                     daysUntil > 0 ? `${daysUntil} days away` : 
                     `${Math.abs(daysUntil)} days ago`}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Quick Date Options */}
        <div className="space-y-2">
          <div className="text-sm text-neutral-600 font-medium">Quick Select:</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button
              type="button"
              onClick={() => {
                const today = new Date();
                setInputValue(today.toISOString().split('T')[0]);
                onChange(today);
              }}
              disabled={disabled}
              className={cn(
                'px-3 py-2 text-sm font-medium rounded-lg border-2 transition-colors duration-200',
                'border-neutral-200 bg-white hover:border-primary-300 hover:bg-primary-50',
                disabled && 'opacity-50 cursor-not-allowed'
              )}
            >
              Today
            </button>
            
            <button
              type="button"
              onClick={() => {
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                setInputValue(tomorrow.toISOString().split('T')[0]);
                onChange(tomorrow);
              }}
              disabled={disabled}
              className={cn(
                'px-3 py-2 text-sm font-medium rounded-lg border-2 transition-colors duration-200',
                'border-neutral-200 bg-white hover:border-primary-300 hover:bg-primary-50',
                disabled && 'opacity-50 cursor-not-allowed'
              )}
            >
              Tomorrow
            </button>
            
            <button
              type="button"
              onClick={() => {
                const nextWeek = new Date();
                nextWeek.setDate(nextWeek.getDate() + 7);
                setInputValue(nextWeek.toISOString().split('T')[0]);
                onChange(nextWeek);
              }}
              disabled={disabled}
              className={cn(
                'px-3 py-2 text-sm font-medium rounded-lg border-2 transition-colors duration-200',
                'border-neutral-200 bg-white hover:border-primary-300 hover:bg-primary-50',
                disabled && 'opacity-50 cursor-not-allowed'
              )}
            >
              Next Week
            </button>
            
            <button
              type="button"
              onClick={() => {
                const nextMonth = new Date();
                nextMonth.setMonth(nextMonth.getMonth() + 1);
                setInputValue(nextMonth.toISOString().split('T')[0]);
                onChange(nextMonth);
              }}
              disabled={disabled}
              className={cn(
                'px-3 py-2 text-sm font-medium rounded-lg border-2 transition-colors duration-200',
                'border-neutral-200 bg-white hover:border-primary-300 hover:bg-primary-50',
                disabled && 'opacity-50 cursor-not-allowed'
              )}
            >
              Next Month
            </button>
          </div>
        </div>

        {/* Date Constraints Info */}
        {(question.minDate || question.maxDate) && (
          <div className="text-sm text-neutral-500 bg-neutral-50 p-3 rounded-lg">
            {question.minDate && (
              <div>Earliest date: {formatDate(question.minDate)}</div>
            )}
            {question.maxDate && (
              <div>Latest date: {formatDate(question.maxDate)}</div>
            )}
          </div>
        )}
      </div>
    </QuestionWrapper>
  );
}
