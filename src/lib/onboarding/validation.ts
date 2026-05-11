import { ValidationRule, ValidationType, Question, OnboardingAnswers } from './types';

/**
 * Validation engine for onboarding questions
 * 
 * Provides comprehensive validation for all question types with customizable rules.
 */

export class OnboardingValidator {
  /**
   * Validate a single question value against its validation rules
   */
  static validateQuestion(question: Question, value: any): string | null {
    // Skip validation if question is not required and value is empty
    if (!question.required && this.isEmpty(value)) {
      return null;
    }

    // Check required validation
    if (question.required && this.isEmpty(value)) {
      return 'This field is required';
    }

    // Run custom validation rules
    if (question.validation) {
      for (const rule of question.validation) {
        const error = this.validateRule(rule, value, question);
        if (error) {
          return error;
        }
      }
    }

    return null;
  }

  /**
   * Validate a complete step with all questions
   */
  static validateStep(step: { questions: Question[] }, answers: OnboardingAnswers): Record<string, string> {
    const errors: Record<string, string> = {};

    for (const question of step.questions) {
      const error = this.validateQuestion(question, answers[question.id]);
      if (error) {
        errors[question.id] = error;
      }
    }

    return errors;
  }

  /**
   * Validate a specific rule against a value
   */
  private static validateRule(rule: ValidationRule, value: any, question: Question): string | null {
    switch (rule.type) {
      case 'required':
        return this.validateRequired(value);
      case 'min':
        return this.validateMin(value, rule.value);
      case 'max':
        return this.validateMax(value, rule.value);
      case 'minLength':
        return this.validateMinLength(value, rule.value);
      case 'maxLength':
        return this.validateMaxLength(value, rule.value);
      case 'pattern':
        return this.validatePattern(value, rule.value);
      case 'email':
        return this.validateEmail(value);
      case 'custom':
        return this.validateCustom(value, rule.params);
      default:
        return null;
    }
  }

  /**
   * Validation rule implementations
   */
  private static validateRequired(value: any): string | null {
    if (this.isEmpty(value)) {
      return 'This field is required';
    }
    return null;
  }

  private static validateMin(value: any, min: number): string | null {
    if (typeof value === 'number' && value < min) {
      return `Value must be at least ${min}`;
    }
    if (Array.isArray(value) && value.length < min) {
      return `Please select at least ${min} option${min > 1 ? 's' : ''}`;
    }
    return null;
  }

  private static validateMax(value: any, max: number): string | null {
    if (typeof value === 'number' && value > max) {
      return `Value must be no more than ${max}`;
    }
    if (Array.isArray(value) && value.length > max) {
      return `Please select no more than ${max} option${max > 1 ? 's' : ''}`;
    }
    return null;
  }

  private static validateMinLength(value: any, minLength: number): string | null {
    if (typeof value === 'string' && value.length < minLength) {
      return `Must be at least ${minLength} character${minLength > 1 ? 's' : ''}`;
    }
    return null;
  }

  private static validateMaxLength(value: any, maxLength: number): string | null {
    if (typeof value === 'string' && value.length > maxLength) {
      return `Must be no more than ${maxLength} character${maxLength > 1 ? 's' : ''}`;
    }
    return null;
  }

  private static validatePattern(value: any, pattern: string): string | null {
    if (typeof value === 'string') {
      const regex = new RegExp(pattern);
      if (!regex.test(value)) {
        return 'Invalid format';
      }
    }
    return null;
  }

  private static validateEmail(value: any): string | null {
    if (typeof value === 'string') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return 'Please enter a valid email address';
      }
    }
    return null;
  }

  private static validateCustom(value: any, params?: Record<string, any>): string | null {
    // Custom validation logic can be implemented here
    // This is a placeholder for future custom validation needs
    return null;
  }

  /**
   * Check if a value is considered empty
   */
  private static isEmpty(value: any): boolean {
    if (value === null || value === undefined) {
      return true;
    }
    if (typeof value === 'string') {
      return value.trim() === '';
    }
    if (Array.isArray(value)) {
      return value.length === 0;
    }
    return false;
  }

  /**
   * Built-in validation rules for common question types
   */
  static getBuiltInValidation(questionType: Question['type']): ValidationRule[] {
    switch (questionType) {
      case 'email':
        return [
          { type: 'email', message: 'Please enter a valid email address' }
        ];
      case 'number':
        return [
          { type: 'custom', message: 'Please enter a valid number' }
        ];
      case 'date':
        return [
          { type: 'custom', message: 'Please enter a valid date' }
        ];
      default:
        return [];
    }
  }

  /**
   * Validate conditional rules for question visibility
   */
  static shouldShowQuestion(question: Question, answers: OnboardingAnswers): boolean {
    if (!question.conditional) {
      return true;
    }

    const { dependsOn, operator, value, values } = question.conditional;
    const dependentValue = answers[dependsOn];

    switch (operator) {
      case 'equals':
        return dependentValue === value;
      case 'not_equals':
        return dependentValue !== value;
      case 'contains':
        return Array.isArray(dependentValue) 
          ? dependentValue.includes(value)
          : typeof dependentValue === 'string' && dependentValue.includes(value);
      case 'not_contains':
        return Array.isArray(dependentValue) 
          ? !dependentValue.includes(value)
          : typeof dependentValue === 'string' && !dependentValue.includes(value);
      case 'greater_than':
        return typeof dependentValue === 'number' && dependentValue > value;
      case 'less_than':
        return typeof dependentValue === 'number' && dependentValue < value;
      case 'in':
        return values ? values.includes(dependentValue) : false;
      case 'not_in':
        return values ? !values.includes(dependentValue) : true;
      default:
        return true;
    }
  }

  /**
   * Sanitize input values based on question type
   */
  static sanitizeValue(question: Question, value: any): any {
    switch (question.type) {
      case 'text':
      case 'email':
      case 'textarea':
        return typeof value === 'string' ? value.trim() : value;
      case 'number':
        return typeof value === 'string' ? parseFloat(value) || 0 : value;
      case 'multiple-choice':
        return Array.isArray(value) ? value : [];
      case 'radio':
        return value;
      case 'slider':
        return typeof value === 'number' ? value : parseFloat(value) || 0;
      case 'date':
        return value instanceof Date ? value : new Date(value);
      default:
        return value;
    }
  }
}
