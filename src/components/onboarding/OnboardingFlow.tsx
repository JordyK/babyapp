'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Button, Card } from '@/components/ui';
import { useOnboarding } from '@/hooks/useOnboarding';
import { Question } from '@/lib/onboarding/types';
import { RadioQuestion } from './RadioQuestion';
import { MultipleChoiceQuestion } from './MultipleChoiceQuestion';
import { SliderQuestion } from './SliderQuestion';
import { DateQuestion } from './DateQuestion';
import { TextQuestion } from './TextQuestion';
import { NumberQuestion } from './NumberQuestion';
import { EmailQuestion } from './EmailQuestion';

interface OnboardingFlowProps {
  config: any; // Will be typed properly when we create the config
  onComplete?: (answers: any) => void;
  className?: string;
}

/**
 * Multi-step onboarding flow component
 * 
 * Provides a complete onboarding experience with progress tracking,
 * validation, and conversational UI patterns.
 */
export function OnboardingFlow({ config, onComplete, className }: OnboardingFlowProps) {
  const {
    state,
    progress,
    currentStep,
    visibleQuestions,
    nextStep,
    previousStep,
    skipStep,
    goToStep,
    updateAnswer,
    validateStep,
    complete,
    reset,
    canGoNext,
    canGoPrevious,
    canSkip,
    isLastStep,
    isFirstStep,
  } = useOnboarding(config);

  // Render question based on type
  const renderQuestion = (question: Question) => {
    const value = state.answers[question.id];
    const error = state.validationErrors[question.id] || undefined;

    switch (question.type) {
      case 'radio':
        return (
          <RadioQuestion
            question={question}
            value={value}
            onChange={(newValue) => updateAnswer(question.id, newValue)}
            error={error}
            disabled={state.isLoading}
            theme={config.theme}
          />
        );
      case 'multiple-choice':
        return (
          <MultipleChoiceQuestion
            question={question}
            value={value}
            onChange={(newValue) => updateAnswer(question.id, newValue)}
            error={error}
            disabled={state.isLoading}
            theme={config.theme}
          />
        );
      case 'slider':
        return (
          <SliderQuestion
            question={question}
            value={value}
            onChange={(newValue) => updateAnswer(question.id, newValue)}
            error={error}
            disabled={state.isLoading}
            theme={config.theme}
          />
        );
      case 'date':
        return (
          <DateQuestion
            question={question}
            value={value}
            onChange={(newValue) => updateAnswer(question.id, newValue)}
            error={error}
            disabled={state.isLoading}
            theme={config.theme}
          />
        );
      case 'text':
        return (
          <TextQuestion
            question={question}
            value={value}
            onChange={(newValue) => updateAnswer(question.id, newValue)}
            error={error}
            disabled={state.isLoading}
            theme={config.theme}
          />
        );
      case 'number':
        return (
          <NumberQuestion
            question={question}
            value={value}
            onChange={(newValue) => updateAnswer(question.id, newValue)}
            error={error}
            disabled={state.isLoading}
            theme={config.theme}
          />
        );
      case 'email':
        return (
          <EmailQuestion
            question={question}
            value={value}
            onChange={(newValue) => updateAnswer(question.id, newValue)}
            error={error}
            disabled={state.isLoading}
            theme={config.theme}
          />
        );
      default:
        return (
          <div className="text-error-600">
            Unsupported question type: {question.type}
          </div>
        );
    }
  };

  const handleNext = () => {
    if (isLastStep) {
      complete();
      onComplete?.(state.answers);
    } else {
      nextStep();
    }
  };

  const handleComplete = () => {
    complete();
    onComplete?.(state.answers);
  };

  if (state.isCompleted) {
    return (
      <div className={cn('w-full max-w-2xl mx-auto p-6', className)}>
        <Card className="p-8 text-center">
          <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-success-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
            Onboarding Complete!
          </h2>
          <p className="text-neutral-600 mb-6">
            Thank you for completing the onboarding. We've personalized your experience based on your responses.
          </p>
          <Button onClick={() => window.location.href = '/dashboard'}>
            Go to Dashboard
          </Button>
        </Card>
      </div>
    );
  }

  if (!currentStep) {
    return (
      <div className={cn('w-full max-w-2xl mx-auto p-6', className)}>
        <Card className="p-8 text-center">
          <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
            No Steps Available
          </h2>
          <p className="text-neutral-600">
            The onboarding configuration appears to be empty.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className={cn('w-full max-w-2xl mx-auto p-6', className)}>
      {/* Progress Bar */}
      {config.showProgress !== false && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-neutral-600">
              Step {progress.currentStep} of {progress.totalSteps}
            </span>
            <span className="text-sm font-medium text-primary-600">
              {Math.round(progress.percentage)}%
            </span>
          </div>
          <div className="w-full bg-neutral-200 rounded-full h-2">
            <div
              className="bg-primary-500 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress.percentage}%` }}
            />
          </div>
        </div>
      )}

      {/* Step Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-neutral-900 mb-2">
          {currentStep.title}
        </h1>
        {currentStep.description && (
          <p className="text-lg text-neutral-600">
            {currentStep.description}
          </p>
        )}
      </div>

      {/* Questions */}
      <Card className="p-6 mb-8">
        <div className="space-y-8">
          {visibleQuestions.map((question) => (
            <div key={question.id}>
              {renderQuestion(question)}
            </div>
          ))}
        </div>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {!isFirstStep && (
            <Button
              variant="secondary"
              onClick={previousStep}
              disabled={state.isLoading}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </Button>
          )}
        </div>

        <div className="flex items-center space-x-4">
          {canSkip && currentStep.skipable && (
            <Button
              variant="ghost"
              onClick={skipStep}
              disabled={state.isLoading}
            >
              Skip
            </Button>
          )}

          <Button
            onClick={handleNext}
            disabled={(!canGoNext && !isLastStep) || state.isLoading}
            loading={state.isLoading}
          >
            {isLastStep ? 'Complete' : 'Next'}
            {!isLastStep && (
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
          </Button>
        </div>
      </div>

      {/* Debug Info (development only) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-8 p-4 bg-neutral-100 rounded-lg">
          <h3 className="text-sm font-semibold text-neutral-700 mb-2">Debug Info:</h3>
          <pre className="text-xs text-neutral-600 overflow-auto">
            {JSON.stringify(state.answers, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
