/**
 * Onboarding Questionnaire Engine Types
 * 
 * This file defines the type system for the reusable onboarding questionnaire engine.
 * It supports multiple question types, validation, branching logic, and progressive profiling.
 */

/**
 * Base question interface that all question types extend
 */
export interface BaseQuestion {
  id: string;
  type: QuestionType;
  title: string;
  description?: string;
  required?: boolean;
  validation?: ValidationRule[];
  conditional?: ConditionalRule;
  metadata?: Record<string, any>;
}

/**
 * Available question types
 */
export type QuestionType = 
  | 'radio'
  | 'multiple-choice'
  | 'slider'
  | 'date'
  | 'text'
  | 'number'
  | 'email'
  | 'textarea';

/**
 * Radio button question
 */
export interface RadioQuestion extends BaseQuestion {
  type: 'radio';
  options: RadioOption[];
  allowOther?: boolean;
  otherLabel?: string;
}

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  icon?: string;
  metadata?: Record<string, any>;
}

/**
 * Multiple choice question
 */
export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple-choice';
  options: MultipleChoiceOption[];
  minSelections?: number;
  maxSelections?: number;
  allowOther?: boolean;
  otherLabel?: string;
}

export interface MultipleChoiceOption extends RadioOption {}

/**
 * Slider question
 */
export interface SliderQuestion extends BaseQuestion {
  type: 'slider';
  min: number;
  max: number;
  step?: number;
  marks?: SliderMark[];
  showValue?: boolean;
  unit?: string;
}

export interface SliderMark {
  value: number;
  label: string;
}

/**
 * Date question
 */
export interface DateQuestion extends BaseQuestion {
  type: 'date';
  minDate?: Date;
  maxDate?: Date;
  format?: string;
  placeholder?: string;
}

/**
 * Text input question
 */
export interface TextQuestion extends BaseQuestion {
  type: 'text';
  placeholder?: string;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  inputMode?: 'text' | 'numeric' | 'email' | 'tel';
}

/**
 * Number input question
 */
export interface NumberQuestion extends BaseQuestion {
  type: 'number';
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  unit?: string;
}

/**
 * Email input question
 */
export interface EmailQuestion extends BaseQuestion {
  type: 'email';
  placeholder?: string;
}

/**
 * Textarea question
 */
export interface TextareaQuestion extends BaseQuestion {
  type: 'textarea';
  placeholder?: string;
  maxLength?: number;
  minLength?: number;
  rows?: number;
}

/**
 * Union type for all question types
 */
export type Question = 
  | RadioQuestion
  | MultipleChoiceQuestion
  | SliderQuestion
  | DateQuestion
  | TextQuestion
  | NumberQuestion
  | EmailQuestion
  | TextareaQuestion;

/**
 * Validation rules
 */
export interface ValidationRule {
  type: ValidationType;
  message: string;
  value?: any;
  params?: Record<string, any>;
}

export type ValidationType = 
  | 'required'
  | 'min'
  | 'max'
  | 'minLength'
  | 'maxLength'
  | 'pattern'
  | 'email'
  | 'custom';

/**
 * Conditional rules for showing/hiding questions
 */
export interface ConditionalRule {
  dependsOn: string;
  operator: ConditionalOperator;
  value: any;
  values?: any[];
}

export type ConditionalOperator = 
  | 'equals'
  | 'not_equals'
  | 'contains'
  | 'not_contains'
  | 'greater_than'
  | 'less_than'
  | 'in'
  | 'not_in';

/**
 * Onboarding step configuration
 */
export interface OnboardingStep {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
  progress?: number;
  skipable?: boolean;
  onSkip?: () => void;
  onNext?: (answers: OnboardingAnswers) => void;
  onBack?: (answers: OnboardingAnswers) => void;
}

/**
 * Onboarding configuration
 */
export interface OnboardingConfig {
  id: string;
  title: string;
  description?: string;
  steps: OnboardingStep[];
  onComplete: (answers: OnboardingAnswers) => void;
  onSkip?: (stepId: string) => void;
  onSave?: (answers: OnboardingAnswers, stepId: string) => void;
  allowSkip?: boolean;
  showProgress?: boolean;
  progressType?: 'steps' | 'percentage';
  theme?: OnboardingTheme;
}

/**
 * Theme configuration
 */
export interface OnboardingTheme {
  primaryColor?: string;
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
  borderRadius?: string;
  fontFamily?: string;
}

/**
 * Answer types
 */
export type OnboardingAnswers = Record<string, any>;

/**
 * Questionnaire state
 */
export interface OnboardingState {
  currentStepIndex: number;
  answers: OnboardingAnswers;
  isCompleted: boolean;
  isSkipped: boolean;
  validationErrors: Record<string, string>;
  isLoading: boolean;
  startTime?: Date;
  endTime?: Date;
}

/**
 * Progress information
 */
export interface OnboardingProgress {
  currentStep: number;
  totalSteps: number;
  percentage: number;
  completedQuestions: number;
  totalQuestions: number;
}

/**
 * Question component props
 */
export interface QuestionComponentProps {
  question: Question;
  value: any;
  onChange: (value: any) => void;
  error?: string | undefined;
  disabled?: boolean;
  theme?: OnboardingTheme | undefined;
}

/**
 * Onboarding context
 */
export interface OnboardingContextValue {
  config: OnboardingConfig;
  state: OnboardingState;
  progress: OnboardingProgress;
  currentStep: OnboardingStep | null;
  nextStep: () => void;
  previousStep: () => void;
  skipStep: () => void;
  goToStep: (stepIndex: number) => void;
  updateAnswer: (questionId: string, value: any) => void;
  validateStep: () => boolean;
  complete: () => void;
  reset: () => void;
}

/**
 * Hook return type
 */
export interface UseOnboardingReturn extends OnboardingContextValue {
  canGoNext: boolean;
  canGoPrevious: boolean;
  canSkip: boolean;
  isLastStep: boolean;
  isFirstStep: boolean;
  visibleQuestions: Question[];
}
