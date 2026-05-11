'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import type { SliderQuestion, QuestionComponentProps, OnboardingTheme } from '@/lib/onboarding/types';
import { QuestionWrapper } from './QuestionWrapper';

interface SliderQuestionProps extends QuestionComponentProps {
  question: SliderQuestion;
}

/**
 * Slider question component
 * 
 * Provides an interactive slider interface for numeric input
 * with optional marks and value display.
 */
export function SliderQuestion({ question, value, onChange, error, disabled, theme }: SliderQuestionProps) {
  const currentValue = typeof value === 'number' ? value : question.min;
  const [isDragging, setIsDragging] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.target.value);
    onChange(newValue);
  };

  const getPercentage = () => {
    const range = question.max - question.min;
    const position = (currentValue - question.min) / range;
    return position * 100;
  };

  const getMarkPosition = (markValue: number) => {
    const range = question.max - question.min;
    const position = (markValue - question.min) / range;
    return position * 100;
  };

  return (
    <QuestionWrapper question={question} error={error} theme={theme}>
      <div className="space-y-6">
        {/* Value Display */}
        {question.showValue !== false && (
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-primary-50 px-4 py-2 rounded-full">
              <span className="text-2xl font-bold text-primary-600">{currentValue}</span>
              {question.unit && (
                <span className="text-sm text-primary-600 font-medium">{question.unit}</span>
              )}
            </div>
          </div>
        )}

        {/* Slider Container */}
        <div className="relative">
          {/* Track */}
          <div className="relative h-2 bg-neutral-200 rounded-full">
            {/* Filled Track */}
            <div 
              className="absolute h-full bg-primary-500 rounded-full transition-all duration-200"
              style={{ width: `${getPercentage()}%` }}
            />
            
            {/* Marks */}
            {question.marks && question.marks.map((mark) => (
              <div
                key={mark.value}
                className="absolute top-1/2 transform -translate-y-1/2 w-1 h-4 bg-neutral-400 rounded-full"
                style={{ left: `${getMarkPosition(mark.value)}%` }}
              />
            ))}
            
            {/* Thumb */}
            <input
              type="range"
              min={question.min}
              max={question.max}
              step={question.step || 1}
              value={currentValue}
              onChange={handleChange}
              disabled={disabled}
              className={cn(
                'absolute top-1/2 transform -translate-y-1/2 w-6 h-6 bg-white border-2 border-primary-500 rounded-full cursor-pointer',
                'appearance-none outline-none transition-all duration-200',
                'hover:scale-110 active:scale-125',
                disabled && 'opacity-50 cursor-not-allowed hover:scale-100',
                isDragging && 'scale-125'
              )}
              style={{ left: `${getPercentage()}%`, transform: 'translateX(-50%) translateY(-50%)' }}
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
            />
          </div>

          {/* Mark Labels */}
          {question.marks && (
            <div className="relative mt-6">
              {question.marks.map((mark) => (
                <div
                  key={mark.value}
                  className="absolute transform -translate-x-1/2 text-xs text-neutral-600"
                  style={{ left: `${getMarkPosition(mark.value)}%` }}
                >
                  {mark.label}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Min/Max Labels */}
        <div className="flex justify-between text-sm text-neutral-600">
          <span>{question.min}{question.unit}</span>
          <span>{question.max}{question.unit}</span>
        </div>

        {/* Quick Select Buttons */}
        {question.marks && question.marks.length <= 5 && (
          <div className="flex flex-wrap gap-2 justify-center">
            {question.marks.map((mark) => (
              <button
                key={mark.value}
                type="button"
                onClick={() => onChange(mark.value)}
                disabled={disabled}
                className={cn(
                  'px-3 py-1.5 text-sm font-medium rounded-lg transition-colors duration-200',
                  currentValue === mark.value
                    ? 'bg-primary-500 text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200',
                  disabled && 'opacity-50 cursor-not-allowed'
                )}
              >
                {mark.label}
              </button>
            ))}
          </div>
        )}

        {/* Description */}
        {question.description && (
          <div className="text-center text-sm text-neutral-600 italic">
            {question.description}
          </div>
        )}
      </div>
    </QuestionWrapper>
  );
}
