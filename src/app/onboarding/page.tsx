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
      },
      {
        id: 'account',
        title: 'Create your account',
        description: 'Save your plan and access it anytime',
        questions: [
          {
            id: 'full-name',
            type: 'text',
            title: "What's your full name?",
            description: "We'll personalize your experience",
            required: true,
            validation: [
              { type: 'required', message: 'Please enter your name' }
            ],
            placeholder: 'Your full name'
          },
          {
            id: 'email',
            type: 'email',
            title: "What's your email?",
            description: "We'll send your personalized plan here",
            required: true,
            validation: [
              { type: 'required', message: 'Please enter your email' }
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
              { type: 'required', message: 'Please create a password' }
            ],
            placeholder: 'Create a strong password',
            password: true
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
      const email = answers.email;
      const password = answers.password;
      const fullName = answers['full-name'];
      
      console.log('[Onboarding] Extracted form data:', {
        hasEmail: !!email,
        hasPassword: !!password,
        hasFullName: !!fullName,
        email: email
      });

      if (!email) {
        console.error('[Onboarding] Email is required');
        throw new Error('Email is required');
      }
      
      if (!password) {
        console.error('[Onboarding] Password is required');
        throw new Error('Password is required');
      }

      // Save onboarding answers to localStorage (will be saved to DB after email verification)
      console.log('[Onboarding] Saving answers to localStorage');
      localStorage.setItem('onboarding-answers', JSON.stringify(answers));

      // Create Supabase client
      console.log('[Onboarding] Creating Supabase client');
      const supabase = createBrowserClient();

      console.log('[Onboarding] Attempting to sign up user:', email);

      // Sign up user with email and password
      console.log('[Onboarding] Calling Supabase auth.signUp with:', {
        email,
        hasPassword: !!password,
        fullName,
        emailRedirectTo: `${window.location.origin}/dashboard`
      });

      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            first_name: fullName?.split(' ')[0],
            last_name: fullName?.split(' ').slice(1).join(' '),
          },
          emailRedirectTo: `${window.location.origin}/dashboard`
        }
      });

      console.log('[Onboarding] SignUp response:', {
        hasError: !!error,
        hasData: !!data,
        hasUser: !!data?.user,
        hasSession: !!data?.session,
        error: error?.message,
        errorDetails: error,
        userId: data?.user?.id,
        userEmail: data?.user?.email,
        userConfirmedAt: data?.user?.confirmed_at,
        userCreatedAt: data?.user?.created_at
      });

      if (error) {
        console.error('[Onboarding] Supabase signUp error:', error);
        throw error;
      }

      console.log('[Onboarding] Sign up successful:', data);

      // Check if user was actually created
      if (!data.user) {
        console.error('[Onboarding] No user data returned from signUp');
        throw new Error('Failed to create user account');
      }

      console.log('[Onboarding] User created with ID:', data.user.id);

      // Save user ID to localStorage for post-verification processing
      console.log('[Onboarding] Saving user ID to localStorage');
      localStorage.setItem('pending-user-id', data.user.id);

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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-3xl font-semibold text-neutral-900 mb-4">
            Almost there!
          </h1>
          <p className="text-lg text-neutral-600 mb-6">
            We've sent a confirmation link to your email. Click it to verify your account and access your personalized baby plan.
          </p>
          <p className="text-sm text-neutral-500">
            Your personalized answers are saved and will be applied once you verify your email.
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
