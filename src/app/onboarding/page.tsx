'use client';

import React, { useState } from 'react';
import { OnboardingFlow } from '@/components/onboarding';
import type { OnboardingConfig } from '@/lib/onboarding/types';

export default function OnboardingPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Sample onboarding configuration for baby planning
  const onboardingConfig: OnboardingConfig = {
    id: 'baby-planning-onboarding',
    title: "Welcome to your baby planning journey",
    description: "Let's create a personalized plan that fits your unique situation",
    steps: [
      {
        id: 'personalization',
        title: 'Tell us about you',
        description: 'This helps us tailor everything to your needs',
        questions: [
          {
            id: 'first-child',
            type: 'radio',
            title: "Is this your first baby?",
            required: true,
            options: [
              { value: 'yes', label: "Yes, first baby", description: "I'm new to this" },
              { value: 'no', label: "No, I've done this before", description: "I have experience" }
            ]
          },
          {
            id: 'due-date',
            type: 'date',
            title: "When is your due date?",
            description: "We'll time everything perfectly for your arrival",
            required: true
          },
          {
            id: 'budget',
            type: 'radio',
            title: "What's your budget range?",
            required: true,
            options: [
              { value: 'budget', label: "Budget-friendly", description: "Save where possible" },
              { value: 'mid-range', label: "Mid-range", description: "Balance quality and cost" },
              { value: 'premium', label: "Premium", description: "Quality over cost" }
            ]
          },
          {
            id: 'second-hand',
            type: 'radio',
            title: "Are you open to second-hand items?",
            required: true,
            options: [
              { value: 'yes', label: "Absolutely", description: "Save money where possible" },
              { value: 'some', label: "For some items", description: "Certain things only" },
              { value: 'no', label: "Prefer new", description: "Everything new" }
            ]
          }
        ]
      }
    ],
    onComplete: (answers) => {
      // Handled by handleComplete function
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

  const handleComplete = async (answers: any) => {
    console.log('[Onboarding] handleComplete called with answers:', Object.keys(answers));
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Save onboarding answers to localStorage
      console.log('[Onboarding] Saving answers to localStorage');
      localStorage.setItem('onboarding-answers', JSON.stringify(answers));

      setSubmitSuccess(true);
    } catch (error: any) {
      console.error('[Onboarding] Onboarding completion error:', error);
      setSubmitError(error.message || 'Failed to complete onboarding. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md text-center">
          <div className="w-16 h-16 bg-success-100 rounded-full mx-auto mb-6 flex items-center justify-center">
            <svg className="w-8 h-8 text-success-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-semibold text-neutral-900 mb-4">
            Onboarding Complete!
          </h1>
          <p className="text-lg text-neutral-600 mb-6">
            Your personalized baby plan has been saved.
          </p>
          <p className="text-sm text-neutral-500">
            Your answers are saved locally.
          </p>
        </div>
      </div>
    );
  }

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

        {submitError && (
          <div className="mb-6 p-4 bg-error-50 border border-error-200 rounded-xl">
            <p className="text-sm text-error-700">{submitError}</p>
          </div>
        )}

        {/* Onboarding Flow */}
        <OnboardingFlow 
          config={onboardingConfig} 
          onComplete={handleComplete}
        />
      </div>
    </div>
  );
}
