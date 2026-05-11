'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import type { RadioQuestion, QuestionComponentProps, OnboardingTheme } from '@/lib/onboarding/types';
import { QuestionWrapper } from './QuestionWrapper';

interface RadioQuestionProps extends QuestionComponentProps {
  question: RadioQuestion;
}

/**
 * Radio button question component
 * 
 * Provides a clean, accessible radio button interface
 * with optional icons and descriptions for each option.
 */
export function RadioQuestion({ question, value, onChange, error, disabled, theme }: RadioQuestionProps) {
  const selectedValue = value || '';
  const hasOther = question.allowOther && !question.options.some(opt => opt.value === selectedValue);

  const handleChange = (optionValue: string) => {
    onChange(optionValue);
  };

  const handleOtherChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <QuestionWrapper question={question} error={error} theme={theme}>
      <div className="space-y-3">
        {/* Radio Options */}
        {question.options.map((option) => {
          const isSelected = selectedValue === option.value;
          
          return (
            <label
              key={option.value}
              className={cn(
                'relative flex items-start p-4 border-2 rounded-xl cursor-pointer transition-all duration-200',
                'hover:border-primary-300 hover:bg-primary-50',
                isSelected
                  ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-500 ring-offset-2'
                  : 'border-neutral-200 bg-white',
                disabled && 'opacity-50 cursor-not-allowed'
              )}
            >
              <input
                type="radio"
                name={question.id}
                value={option.value}
                checked={isSelected}
                onChange={() => handleChange(option.value)}
                disabled={disabled}
                className="sr-only"
              />
              
              {/* Custom Radio Button */}
              <div className={cn(
                'w-5 h-5 rounded-full border-2 mr-3 mt-0.5 flex-shrink-0 transition-colors duration-200',
                isSelected
                  ? 'border-primary-500 bg-primary-500'
                  : 'border-neutral-300 bg-white'
              )}>
                {isSelected && (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
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
              disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            <input
              type="radio"
              name={question.id}
              value="other"
              checked={hasOther}
              onChange={() => handleChange('other')}
              disabled={disabled}
              className="sr-only"
            />
            
            {/* Custom Radio Button */}
            <div className={cn(
              'w-5 h-5 rounded-full border-2 mr-3 mt-0.5 flex-shrink-0 transition-colors duration-200',
              hasOther
                ? 'border-primary-500 bg-primary-500'
                : 'border-neutral-300 bg-white'
            )}>
              {hasOther && (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              )}
            </div>

            {/* Other Input */}
            <div className="flex-1">
              <input
                type="text"
                placeholder={question.otherLabel || 'Other (please specify)'}
                value={hasOther ? selectedValue : ''}
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
      </div>
    </QuestionWrapper>
  );
}
