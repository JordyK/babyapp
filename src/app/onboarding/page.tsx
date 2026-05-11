'use client';

import React from 'react';
import { OnboardingFlow } from '@/components/onboarding';
import type { OnboardingConfig } from '@/lib/onboarding/types';

/**
 * Sample onboarding page demonstrating the questionnaire engine
 * 
 * This page shows how to configure and use the onboarding system
 * with various question types and validation rules.
 */
export default function OnboardingPage() {
  // Sample onboarding configuration for baby planning
  const onboardingConfig: OnboardingConfig = {
    id: 'baby-planning-onboarding',
    title: 'Welcome to Your Baby Planning Journey',
    description: 'Let us get to know you better to personalize your experience',
    steps: [
      {
        id: 'personal-info',
        title: 'Tell us about yourself',
        description: 'This helps us personalize your experience',
        questions: [
          {
            id: 'first-name',
            type: 'text',
            title: 'What\'s your first name?',
            required: true,
            validation: [
              { type: 'required', message: 'Please enter your first name' },
              { type: 'minLength', value: 2, message: 'Name must be at least 2 characters' }
            ],
            placeholder: 'Enter your first name'
          },
          {
            id: 'due-date',
            type: 'date',
            title: 'When is your due date?',
            description: 'This helps us track your pregnancy timeline and provide relevant information',
            required: true,
            validation: [
              { type: 'required', message: 'Please select your due date' }
            ],
            minDate: new Date(),
            maxDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
          }
        ]
      },
      {
        id: 'pregnancy-details',
        title: 'Pregnancy Details',
        description: 'Help us understand your current situation',
        questions: [
          {
            id: 'pregnancy-type',
            type: 'radio',
            title: 'Is this your first pregnancy?',
            required: true,
            options: [
              { value: 'first', label: 'First pregnancy', description: 'This is my first time' },
              { value: 'second', label: 'Second pregnancy', description: 'I have one child already' },
              { value: 'third-plus', label: 'Third or more', description: 'I have multiple children' }
            ]
          },
          {
            id: 'current-week',
            type: 'slider',
            title: 'How many weeks pregnant are you?',
            required: true,
            min: 4,
            max: 42,
            step: 1,
            showValue: true,
            unit: 'weeks',
            marks: [
              { value: 12, label: 'First trimester' },
              { value: 24, label: 'Second trimester' },
              { value: 36, label: 'Third trimester' }
            ]
          }
        ]
      },
      {
        id: 'preferences',
        title: 'Your Preferences',
        description: 'Let us know what matters most to you',
        questions: [
          {
            id: 'interests',
            type: 'multiple-choice',
            title: 'What topics are you most interested in?',
            description: 'Select all that apply',
            required: true,
            minSelections: 1,
            maxSelections: 4,
            options: [
              { value: 'nutrition', label: 'Nutrition & Diet', description: 'Healthy eating during pregnancy' },
              { value: 'exercise', label: 'Exercise & Fitness', description: 'Staying active and healthy' },
              { value: 'preparation', label: 'Baby Preparation', description: 'Getting ready for baby' },
              { value: 'checklists', label: 'Checklists & Planning', description: 'Organized preparation lists' },
              { value: 'community', label: 'Community Support', description: 'Connecting with other parents' }
            ]
          },
          {
            id: 'communication-style',
            type: 'radio',
            title: 'How do you prefer to receive information?',
            required: true,
            options: [
              { value: 'gentle', label: 'Gentle & Calm', description: 'Soft, reassuring guidance' },
              { value: 'direct', label: 'Direct & Clear', description: 'Straightforward information' },
              { value: 'detailed', label: 'Detailed & Thorough', description: 'Comprehensive explanations' }
            ]
          }
        ]
      },
      {
        id: 'final-details',
        title: 'Just a few more details',
        description: 'Help us provide the best experience for you',
        questions: [
          {
            id: 'email',
            type: 'email',
            title: 'What\'s your email address?',
            description: 'We\'ll send you personalized tips and updates',
            required: true,
            validation: [
              { type: 'required', message: 'Please enter your email address' },
              { type: 'email', message: 'Please enter a valid email address' }
            ],
            placeholder: 'your.email@example.com'
          },
          {
            id: 'partner-involvement',
            type: 'slider',
            title: 'How involved is your partner in the pregnancy journey?',
            description: 'This helps us tailor content for both of you',
            required: true,
            min: 1,
            max: 5,
            step: 1,
            showValue: true,
            marks: [
              { value: 1, label: 'Not involved' },
              { value: 3, label: 'Somewhat involved' },
              { value: 5, label: 'Very involved' }
            ]
          }
        ]
      }
    ],
    onComplete: (answers) => {
      console.log('Onboarding completed!', answers);
      // Here you would typically save the data to your backend
      // and redirect to the dashboard or next step
    },
    allowSkip: true,
    showProgress: true,
    progressType: 'percentage',
    theme: {
      primaryColor: '#0ea5e9',
      backgroundColor: '#f8fafc',
      textColor: '#1e293b',
      accentColor: '#f59e0b',
      borderRadius: '12px',
      fontFamily: 'Inter, system-ui, sans-serif'
    }
  };

  const handleComplete = (answers: any) => {
    console.log('Onboarding completed with answers:', answers);
    // Save to localStorage for demo purposes
    localStorage.setItem('onboarding-answers', JSON.stringify(answers));
    
    // Redirect to dashboard after a short delay
    setTimeout(() => {
      window.location.href = '/dashboard';
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-neutral-900 mb-2">
            {onboardingConfig.title}
          </h1>
          <p className="text-lg text-neutral-600">
            {onboardingConfig.description}
          </p>
        </div>

        {/* Onboarding Flow */}
        <OnboardingFlow 
          config={onboardingConfig} 
          onComplete={handleComplete}
        />
      </div>
    </div>
  );
}
