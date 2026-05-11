'use client';

import React, { useState } from 'react';
import { OnboardingFlow } from '@/components/onboarding';
import type { OnboardingConfig } from '@/lib/onboarding/types';
import { createBrowserClient } from '@/lib/supabase/browser';
import type { Database } from '@/lib/supabase/types';

export default function OnboardingPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Sample onboarding configuration for baby planning
  const onboardingConfig: OnboardingConfig = {
    id: 'baby-planning-onboarding',
    title: "Let's create your personalized baby plan",
    description: "Just a few quick questions to help you figure out exactly what you need",
    steps: [
      {
        id: 'quick-start',
        title: 'Quick questions',
        description: 'This takes less than 2 minutes',
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
            id: 'due-month',
            type: 'radio',
            title: "When are you due?",
            required: true,
            options: [
              { value: 'first-trimester', label: "First trimester", description: "Months 1-3" },
              { value: 'second-trimester', label: "Second trimester", description: "Months 4-6" },
              { value: 'third-trimester', label: "Third trimester", description: "Months 7-9" }
            ]
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
          }
        ]
      },
      {
        id: 'preferences',
        title: 'Your style',
        description: 'Help us tailor recommendations',
        questions: [
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
          },
          {
            id: 'living-space',
            type: 'radio',
            title: "What's your living situation?",
            required: true,
            options: [
              { value: 'apartment', label: "Apartment", description: "Smaller space" },
              { value: 'house', label: "House", description: "More space available" }
            ]
          },
          {
            id: 'email',
            type: 'email',
            title: "What's your email?",
            description: "We'll send your personalized plan here",
            required: true,
            validation: [
              { type: 'required', message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' }
            ],
            placeholder: 'you@example.com'
          },
          {
            id: 'password',
            type: 'text',
            title: "Create a password",
            description: "You'll need this to access your plan",
            required: true,
            validation: [
              { type: 'required', message: 'Please create a password' },
              { type: 'minLength', value: 8, message: 'Password must be at least 8 characters' }
            ],
            placeholder: 'Create a strong password'
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
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const email = answers.email;
      const password = answers.password;
      
      if (!email) {
        throw new Error('Email is required');
      }
      
      if (!password) {
        throw new Error('Password is required');
      }

      // Save onboarding answers to localStorage
      localStorage.setItem('onboarding-answers', JSON.stringify(answers));

      // Create Supabase client
      const supabase = createBrowserClient();

      // Sign up user with email and password
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`
        }
      });

      if (error) {
        throw error;
      }

      setSubmitSuccess(true);
    } catch (error: any) {
      console.error('Onboarding completion error:', error);
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-3xl font-semibold text-neutral-900 mb-4">
            Check your email
          </h1>
          <p className="text-lg text-neutral-600 mb-6">
            We've sent a confirmation link to your email. Click it to verify your account and access your personalized baby plan.
          </p>
          <p className="text-sm text-neutral-500">
            You can close this page and check your email.
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
