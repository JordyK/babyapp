'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import type { MultipleChoiceQuestion, QuestionComponentProps, OnboardingTheme } from '@/lib/onboarding/types';
import { QuestionWrapper } from './QuestionWrapper';

interface MultipleChoiceQuestionProps extends QuestionComponentProps {
  question: MultipleChoiceQuestion;
}

/**
 * Multiple choice question component
 * 
 * Provides a checkbox-based interface for selecting multiple options
 * with support for minimum/maximum selection limits.
 */
export function MultipleChoiceQuestion({ question, value, onChange, error, disabled, theme }: MultipleChoiceQuestionProps) {
  const selectedValues = Array.isArray(value) ? value : [];
  const hasOther = question.allowOther && !question.options.some(opt => selectedValues.includes(opt.value));

  const handleChange = (optionValue: string, checked: boolean) => {
    let newValues: string[];

    if (checked) {
      // Add option
      newValues = [...selectedValues, optionValue];
      
      // Enforce maximum selections
      if (question.maxSelections && newValues.length > question.maxSelections) {
        newValues = newValues.slice(0, question.maxSelections);
      }
    } else {
      // Remove option
      newValues = selectedValues.filter(v => v !== optionValue);
    }

    onChange(newValues);
  };

  const handleOtherChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const otherValue = event.target.value;
    if (otherValue.trim()) {
      onChange([...selectedValues.filter(v => !question.options.some(opt => opt.value === v)), otherValue]);
    } else {
      onChange(selectedValues.filter(v => question.options.some(opt => opt.value === v)));
    }
  };

  const getOtherValue = () => {
    return selectedValues.find(v => !question.options.some(opt => opt.value === v)) || '';
  };

  const isAtMaxSelections = question.maxSelections !== undefined && selectedValues.length >= question.maxSelections;
  const selectionCount = selectedValues.length;

  return (
    <QuestionWrapper question={question} error={error} theme={theme}>
      <div className="space-y-3">
        {/* Selection Counter */}
        {question.minSelections || question.maxSelections ? (
          <div className="text-sm text-neutral-600">
            {question.minSelections && question.maxSelections !== undefined ? (
              <>Select {question.minSelections}-{question.maxSelections} options ({selectionCount} selected)</>
            ) : question.minSelections ? (
              <>Select at least {question.minSelections} option{question.minSelections > 1 ? 's' : ''} ({selectionCount} selected)</>
            ) : question.maxSelections !== undefined ? (
              <>Select up to {question.maxSelections} option{question.maxSelections > 1 ? 's' : ''} ({selectionCount} selected)</>
            ) : null}
          </div>
        ) : null}

        {/* Checkbox Options */}
        {question.options.map((option) => {
          const isSelected = selectedValues.includes(option.value);
          
          return (
            <label
              key={option.value}
              className={cn(
                'relative flex items-start p-4 border-2 rounded-xl cursor-pointer transition-all duration-200',
                'hover:border-primary-300 hover:bg-primary-50',
                isSelected
                  ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-500 ring-offset-2'
                  : 'border-neutral-200 bg-white',
                disabled && 'opacity-50 cursor-not-allowed',
                isAtMaxSelections && !isSelected && 'opacity-50 cursor-not-allowed'
              )}
            >
              <input
                type="checkbox"
                name={question.id}
                value={option.value}
                checked={isSelected}
                onChange={(e) => handleChange(option.value, e.target.checked)}
                disabled={disabled || (isAtMaxSelections && !isSelected)}
                className="sr-only"
              />
              
              {/* Custom Checkbox */}
              <div className={cn(
                'w-5 h-5 border-2 mr-3 mt-0.5 flex-shrink-0 rounded transition-colors duration-200',
                'flex items-center justify-center',
                isSelected
                  ? 'border-primary-500 bg-primary-500'
                  : 'border-neutral-300 bg-white'
              )}>
                {isSelected && (
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>

              {/* Option Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-3">
                  {option.icon && (
                    <div className={cn(
                      'w-8 h-8 rounded-lg flex items-center justify-center',
                      isSelected ? 'bg-primary-100' : 'bg-neutral-100'
                    )}>
                      <span className={cn(
                        'text-sm',
                        isSelected ? 'text-primary-600' : 'text-neutral-600'
                      )}>
                        {option.icon}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <div className="font-medium text-neutral-900">
                      {option.label}
                    </div>
                    
                    {option.description && (
                      <p className="text-sm text-neutral-600 mt-1">
                        {option.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </label>
          );
        })}

        {/* Other Option */}
        {question.allowOther && (
          <label
            className={cn(
              'relative flex items-start p-4 border-2 rounded-xl cursor-pointer transition-all duration-200',
              'hover:border-primary-300 hover:bg-primary-50',
              hasOther
                ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-500 ring-offset-2'
                : 'border-neutral-200 bg-white',
              disabled && 'opacity-50 cursor-not-allowed',
              isAtMaxSelections && !hasOther && 'opacity-50 cursor-not-allowed'
            )}
          >
            <input
              type="checkbox"
              name={`${question.id}-other`}
              checked={hasOther}
              onChange={(e) => {
                if (e.target.checked) {
                  handleChange('other', true);
                } else {
                  handleChange(getOtherValue(), false);
                }
              }}
              disabled={disabled || (isAtMaxSelections && !hasOther)}
              className="sr-only"
            />
            
            {/* Custom Checkbox */}
            <div className={cn(
              'w-5 h-5 border-2 mr-3 mt-0.5 flex-shrink-0 rounded transition-colors duration-200',
              'flex items-center justify-center',
              hasOther
                ? 'border-primary-500 bg-primary-500'
                : 'border-neutral-300 bg-white'
            )}>
              {hasOther && (
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>

            {/* Other Input */}
            <div className="flex-1">
              <input
                type="text"
                placeholder={question.otherLabel || 'Other (please specify)'}
                value={getOtherValue()}
                onChange={handleOtherChange}
                disabled={disabled || !hasOther}
                className={cn(
                  'w-full px-3 py-2 border border-neutral-300 rounded-lg bg-white',
                  'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
                  'placeholder:text-neutral-400',
                  disabled && 'opacity-50 cursor-not-allowed'
                )}
              />
            </div>
          </label>
        )}

        {/* Minimum Selection Warning */}
        {question.minSelections && selectionCount < question.minSelections && (
          <div className="flex items-center space-x-2 text-sm text-amber-600 bg-amber-50 p-3 rounded-lg">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>Please select at least {question.minSelections} option{question.minSelections > 1 ? 's' : ''}</span>
          </div>
        )}
      </div>
    </QuestionWrapper>
  );
}
