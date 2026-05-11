import { 
  OnboardingConfig, 
  OnboardingState, 
  OnboardingAnswers, 
  OnboardingProgress,
  OnboardingStep
} from './types';
import { OnboardingValidator } from './validation';

/**
 * Local state management for onboarding questionnaire
 * 
 * Handles state persistence, progress tracking, and step management
 * with support for local storage and progressive profiling.
 */

export class OnboardingStateManager {
  private static readonly STORAGE_KEY = 'onboarding_state';
  private static readonly STATE_VERSION = '1.0';

  /**
   * Initialize onboarding state
   */
  static initializeState(config: OnboardingConfig): OnboardingState {
    const savedState = this.loadState(config.id);
    
    if (savedState && !savedState.isCompleted) {
      // Resume existing onboarding
      return savedState;
    }

    // Start fresh onboarding
    return {
      currentStepIndex: 0,
      answers: {},
      isCompleted: false,
      isSkipped: false,
      validationErrors: {},
      isLoading: false,
      startTime: new Date(),
    };
  }

  /**
   * Calculate progress information
   */
  static calculateProgress(config: OnboardingConfig, state: OnboardingState): OnboardingProgress {
    const totalSteps = config.steps.length;
    const currentStep = state.currentStepIndex + 1;
    const percentage = totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0;

    // Count total and completed questions
    let totalQuestions = 0;
    let completedQuestions = 0;

    for (let i = 0; i <= state.currentStepIndex && i < config.steps.length; i++) {
      const step = config.steps[i];
      if (!step) continue;
      
      totalQuestions += step.questions.length;
      
      for (const question of step.questions) {
        if (state.answers[question.id] !== undefined && state.answers[question.id] !== '') {
          completedQuestions++;
        }
      }
    }

    return {
      currentStep,
      totalSteps,
      percentage,
      completedQuestions,
      totalQuestions,
    };
  }

  /**
   * Get current step
   */
  static getCurrentStep(config: OnboardingConfig, state: OnboardingState): OnboardingStep | null {
    if (state.currentStepIndex >= 0 && state.currentStepIndex < config.steps.length) {
      return config.steps[state.currentStepIndex] || null;
    }
    return null;
  }

  /**
   * Navigate to next step
   */
  static nextStep(config: OnboardingConfig, state: OnboardingState): OnboardingState {
    if (state.currentStepIndex >= config.steps.length - 1) {
      // Complete onboarding
      return {
        ...state,
        isCompleted: true,
        endTime: new Date(),
      };
    }

    return {
      ...state,
      currentStepIndex: state.currentStepIndex + 1,
      validationErrors: {},
    };
  }

  /**
   * Navigate to previous step
   */
  static previousStep(state: OnboardingState): OnboardingState {
    if (state.currentStepIndex <= 0) {
      return state;
    }

    return {
      ...state,
      currentStepIndex: state.currentStepIndex - 1,
      validationErrors: {},
    };
  }

  /**
   * Skip current step
   */
  static skipStep(state: OnboardingState): OnboardingState {
    return {
      ...state,
      isSkipped: true,
    };
  }

  /**
   * Go to specific step
   */
  static goToStep(stepIndex: number, state: OnboardingState): OnboardingState {
    return {
      ...state,
      currentStepIndex: Math.max(0, stepIndex),
      validationErrors: {},
    };
  }

  /**
   * Update answer for a question
   */
  static updateAnswer(
    questionId: string, 
    value: any, 
    state: OnboardingState
  ): OnboardingState {
    // Clear validation error for this question
    const newValidationErrors = { ...state.validationErrors };
    delete newValidationErrors[questionId];

    return {
      ...state,
      answers: {
        ...state.answers,
        [questionId]: value,
      },
      validationErrors: newValidationErrors,
    };
  }

  /**
   * Validate current step
   */
  static validateStep(
    config: OnboardingConfig, 
    state: OnboardingState
  ): { isValid: boolean; errors: Record<string, string> } {
    const currentStep = this.getCurrentStep(config, state);
    
    if (!currentStep) {
      return { isValid: true, errors: {} };
    }

    const errors = OnboardingValidator.validateStep(currentStep, state.answers);
    const isValid = Object.keys(errors).length === 0;

    return { isValid, errors };
  }

  /**
   * Complete onboarding
   */
  static complete(state: OnboardingState): OnboardingState {
    return {
      ...state,
      isCompleted: true,
      endTime: new Date(),
    };
  }

  /**
   * Reset onboarding state
   */
  static reset(config: OnboardingConfig): OnboardingState {
    this.clearState(config.id);
    return this.initializeState(config);
  }

  /**
   * Save state to local storage
   */
  static saveState(configId: string, state: OnboardingState): void {
    try {
      const stateData = {
        version: this.STATE_VERSION,
        configId,
        state,
        timestamp: new Date().toISOString(),
      };

      localStorage.setItem(this.getStorageKey(configId), JSON.stringify(stateData));
    } catch (error) {
      console.warn('Failed to save onboarding state:', error);
    }
  }

  /**
   * Load state from local storage
   */
  static loadState(configId: string): OnboardingState | null {
    try {
      const stored = localStorage.getItem(this.getStorageKey(configId));
      
      if (!stored) {
        return null;
      }

      const data = JSON.parse(stored);
      
      // Check version compatibility
      if (data.version !== this.STATE_VERSION) {
        this.clearState(configId);
        return null;
      }

      return data.state;
    } catch (error) {
      console.warn('Failed to load onboarding state:', error);
      return null;
    }
  }

  /**
   * Clear state from local storage
   */
  static clearState(configId: string): void {
    try {
      localStorage.removeItem(this.getStorageKey(configId));
    } catch (error) {
      console.warn('Failed to clear onboarding state:', error);
    }
  }

  /**
   * Get storage key for config
   */
  private static getStorageKey(configId: string): string {
    return `${this.STORAGE_KEY}_${configId}`;
  }

  /**
   * Export answers for API submission
   */
  static exportAnswers(state: OnboardingState): OnboardingAnswers {
    return { ...state.answers };
  }

  /**
   * Import answers from API response
   */
  static importAnswers(answers: OnboardingAnswers, state: OnboardingState): OnboardingState {
    return {
      ...state,
      answers: { ...answers },
    };
  }

  /**
   * Get onboarding duration
   */
  static getDuration(state: OnboardingState): number | null {
    if (!state.startTime) return null;
    
    const endTime = state.endTime || new Date();
    return endTime.getTime() - state.startTime.getTime();
  }

  /**
   * Check if step can be skipped
   */
  static canSkipStep(config: OnboardingConfig, state: OnboardingState): boolean {
    const currentStep = this.getCurrentStep(config, state);
    return currentStep?.skipable ?? config.allowSkip ?? false;
  }

  /**
   * Check if user can go to next step
   */
  static canGoNext(config: OnboardingConfig, state: OnboardingState): boolean {
    const { isValid } = this.validateStep(config, state);
    return isValid && state.currentStepIndex < config.steps.length - 1;
  }

  /**
   * Check if user can go to previous step
   */
  static canGoPrevious(state: OnboardingState): boolean {
    return state.currentStepIndex > 0;
  }

  /**
   * Get step completion status
   */
  static getStepCompletion(config: OnboardingConfig, state: OnboardingState): boolean[] {
    return config.steps.map((step, index) => {
      if (index > state.currentStepIndex) return false;
      
      for (const question of step.questions) {
        if (question.required && !state.answers[question.id]) {
          return false;
        }
      }
      
      return true;
    });
  }
}
