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
    
    // Redirect to signup after onboarding investment
    // This improves conversion as described in the vision
    setTimeout(() => {
      window.location.href = '/auth/signup?onboarding=true';
    }, 1000);
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
