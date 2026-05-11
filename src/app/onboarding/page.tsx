'use client';

import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { ProgressBar } from '@/components/onboarding/ProgressBar';
import {
  DueDateStep,
  BudgetStep,
  FirstChildStep,
  BabyCountStep,
  HomeTypeStep,
  SecondHandStep,
  StyleStep,
  AccountStep,
} from '@/components/onboarding/steps';
import type { OnboardingAnswers } from '@/lib/types/profile';
import type { AccountFormData } from '@/lib/validations/onboarding';
import type { BudgetRange, BabyCount, HomeType, StylePreference } from '@/lib/types/profile';

const TOTAL_STEPS = 8;

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [answers, setAnswers] = useState<OnboardingAnswers>({
    due_date: null,
    budget_range: null,
    first_child: null,
    baby_count: null,
    home_type: null,
    second_hand_friendly: null,
    style_preference: null,
  });

  const goNext = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS - 1));
  }, []);

  const goBack = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

  const handleAccountSubmit = async (accountData: AccountFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const supabase = createClient();

      // Sign up user with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: accountData.email,
        password: accountData.password,
        options: {
          data: {
            full_name: accountData.full_name,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (authError) {
        setSubmitError(authError.message);
        return;
      }

      if (!authData.user) {
        setSubmitError('Something went wrong. Please try again.');
        return;
      }

      // Save profile with onboarding answers
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          full_name: accountData.full_name,
          due_date: answers.due_date,
          budget_range: answers.budget_range,
          first_child: answers.first_child,
          baby_count: answers.baby_count,
          home_type: answers.home_type,
          second_hand_friendly: answers.second_hand_friendly,
          style_preference: answers.style_preference,
          onboarding_completed: true,
        });

      if (profileError) {
        console.error('Profile save error:', profileError);
        // Profile save failed but account was created — user can still verify
      }

      // Redirect to verification page
      router.push('/auth/verify');
    } catch (error) {
      setSubmitError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <DueDateStep
            value={answers.due_date}
            onChange={(v) => setAnswers((prev) => ({ ...prev, due_date: v }))}
            onNext={goNext}
          />
        );
      case 1:
        return (
          <BudgetStep
            value={answers.budget_range}
            onChange={(v: BudgetRange) => setAnswers((prev) => ({ ...prev, budget_range: v }))}
            onNext={goNext}
          />
        );
      case 2:
        return (
          <FirstChildStep
            value={answers.first_child}
            onChange={(v) => setAnswers((prev) => ({ ...prev, first_child: v }))}
            onNext={goNext}
          />
        );
      case 3:
        return (
          <BabyCountStep
            value={answers.baby_count}
            onChange={(v: BabyCount) => setAnswers((prev) => ({ ...prev, baby_count: v }))}
            onNext={goNext}
          />
        );
      case 4:
        return (
          <HomeTypeStep
            value={answers.home_type}
            onChange={(v: HomeType) => setAnswers((prev) => ({ ...prev, home_type: v }))}
            onNext={goNext}
          />
        );
      case 5:
        return (
          <SecondHandStep
            value={answers.second_hand_friendly}
            onChange={(v) => setAnswers((prev) => ({ ...prev, second_hand_friendly: v }))}
            onNext={goNext}
          />
        );
      case 6:
        return (
          <StyleStep
            value={answers.style_preference}
            onChange={(v: StylePreference) => setAnswers((prev) => ({ ...prev, style_preference: v }))}
            onNext={goNext}
          />
        );
      case 7:
        return (
          <AccountStep
            onSubmit={handleAccountSubmit}
            isSubmitting={isSubmitting}
            submitError={submitError}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50/30 via-white to-white">
      <div className="max-w-lg mx-auto px-5 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8">
          <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />
        </div>

        {/* Back button */}
        {currentStep > 0 && (
          <button
            type="button"
            onClick={goBack}
            className="mb-6 flex items-center gap-1.5 text-sm text-neutral-400 hover:text-neutral-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        )}

        {/* Step content */}
        {renderStep()}
      </div>
    </div>
  );
}
