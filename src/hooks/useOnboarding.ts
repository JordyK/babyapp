'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  OnboardingConfig, 
  OnboardingState, 
  OnboardingAnswers, 
  OnboardingProgress,
  OnboardingStep,
  UseOnboardingReturn
} from '@/lib/onboarding/types';
import { OnboardingStateManager } from '@/lib/onboarding/state';
import { OnboardingValidator } from '@/lib/onboarding/validation';

/**
 * React hook for managing onboarding questionnaire state
 * 
 * Provides a complete API for managing multi-step onboarding with validation,
 * progress tracking, and local state persistence.
 */
export function useOnboarding(config: OnboardingConfig): UseOnboardingReturn {
  // Initialize state
  const [state, setState] = useState<OnboardingState>(() => 
    OnboardingStateManager.initializeState(config)
  );

  // Calculate progress
  const progress = useMemo(() => 
    OnboardingStateManager.calculateProgress(config, state), 
    [config, state]
  );

  // Get current step
  const currentStep = useMemo(() => 
    OnboardingStateManager.getCurrentStep(config, state), 
    [config, state]
  );

  // Navigation capabilities
  const canGoNext = useMemo(() => 
    OnboardingStateManager.canGoNext(config, state), 
    [config, state]
  );

  const canGoPrevious = useMemo(() => 
    OnboardingStateManager.canGoPrevious(state), 
    [state]
  );

  const canSkip = useMemo(() => 
    OnboardingStateManager.canSkipStep(config, state), 
    [config, state]
  );

  const isLastStep = useMemo(() => 
    state.currentStepIndex >= config.steps.length - 1, 
    [state.currentStepIndex, config.steps.length]
  );

  const isFirstStep = useMemo(() => 
    state.currentStepIndex === 0, 
    [state.currentStepIndex]
  );

  // Save state to local storage whenever it changes
  useEffect(() => {
    OnboardingStateManager.saveState(config.id, state);
  }, [config.id, state]);

  // Navigate to next step
  const nextStep = useCallback(() => {
    if (!canGoNext) return;

    const { isValid, errors } = OnboardingStateManager.validateStep(config, state);
    
    if (!isValid) {
      setState(prev => ({
        ...prev,
        validationErrors: errors,
      }));
      return;
    }

    const newState = OnboardingStateManager.nextStep(config, state);
    
    // Call step callback if exists
    if (currentStep?.onNext) {
      currentStep.onNext(newState.answers);
    }

    // Save progress if callback exists
    if (config.onSave) {
      config.onSave(newState.answers, currentStep?.id || '');
    }

    // Check if completed
    if (newState.isCompleted && config.onComplete) {
      config.onComplete(newState.answers);
    }

    setState(newState);
  }, [canGoNext, config, state, currentStep]);

  // Navigate to previous step
  const previousStep = useCallback(() => {
    if (!canGoPrevious) return;

    const newState = OnboardingStateManager.previousStep(state);
    
    // Call step callback if exists
    if (currentStep?.onBack) {
      currentStep.onBack(newState.answers);
    }

    setState(newState);
  }, [canGoPrevious, state, currentStep]);

  // Skip current step
  const skipStep = useCallback(() => {
    if (!canSkip) return;

    const newState = OnboardingStateManager.skipStep(state);
    
    // Call skip callback if exists
    if (currentStep?.onSkip) {
      currentStep.onSkip();
    }

    // Call global skip callback if exists
    if (config.onSkip) {
      config.onSkip(currentStep?.id || '');
    }

    setState(newState);
    
    // Auto-advance to next step after skipping
    setTimeout(() => {
      nextStep();
    }, 100);
  }, [canSkip, state, currentStep, config, nextStep]);

  // Go to specific step
  const goToStep = useCallback((stepIndex: number) => {
    if (stepIndex < 0 || stepIndex >= config.steps.length) return;

    const newState = OnboardingStateManager.goToStep(stepIndex, state);
    setState(newState);
  }, [config.steps.length, state]);

  // Update answer for a question
  const updateAnswer = useCallback((questionId: string, value: any) => {
    const newState = OnboardingStateManager.updateAnswer(questionId, value, state);
    setState(newState);
  }, [state]);

  // Validate current step
  const validateStep = useCallback((): boolean => {
    const { isValid, errors } = OnboardingStateManager.validateStep(config, state);
    
    if (!isValid) {
      setState(prev => ({
        ...prev,
        validationErrors: errors,
      }));
    }

    return isValid;
  }, [config, state]);

  // Complete onboarding
  const complete = useCallback(() => {
    const newState = OnboardingStateManager.complete(state);
    setState(newState);
    
    if (config.onComplete) {
      config.onComplete(newState.answers);
    }
  }, [config, state]);

  // Reset onboarding
  const reset = useCallback(() => {
    const newState = OnboardingStateManager.reset(config);
    setState(newState);
  }, [config]);

  // Get visible questions for current step (handles conditional logic)
  const visibleQuestions = useMemo(() => {
    if (!currentStep) return [];

    return currentStep.questions.filter(question => 
      OnboardingValidator.shouldShowQuestion(question, state.answers)
    );
  }, [currentStep, state.answers]);

  // Auto-save progress periodically
  useEffect(() => {
    const interval = setInterval(() => {
      if (config.onSave && currentStep) {
        config.onSave(state.answers, currentStep.id);
      }
    }, 30000); // Auto-save every 30 seconds

    return () => clearInterval(interval);
  }, [config, state.answers, currentStep]);

  // Handle page visibility change (save when user leaves tab)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && config.onSave && currentStep) {
        config.onSave(state.answers, currentStep.id);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [config, state.answers, currentStep]);

  return {
    config,
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
  };
}
