'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { StepWrapper } from '../StepWrapper';
import { Button, Input } from '@/components/ui';
import { accountSchema, type AccountFormData } from '@/lib/validations/onboarding';

interface AccountStepProps {
  readonly onSubmit: (data: AccountFormData) => void;
  readonly isSubmitting: boolean;
  readonly submitError: string | null;
}

export function AccountStep({ onSubmit, isSubmitting, submitError }: AccountStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<AccountFormData>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      full_name: '',
      email: '',
      password: '',
    },
  });

  const password = watch('password');

  return (
    <StepWrapper
      title="Let's create your account"
      subtitle="Almost there! Your personalized baby plan is just one step away."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {submitError && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200">
            <p className="text-sm text-red-700">{submitError}</p>
          </div>
        )}

        <Input
          label="Full name"
          type="text"
          placeholder="Sarah Johnson"
          autoComplete="name"
          {...register('full_name')}
          error={errors.full_name?.message}
          disabled={isSubmitting}
        />

        <Input
          label="Email address"
          type="email"
          placeholder="sarah@example.com"
          autoComplete="email"
          {...register('email')}
          error={errors.email?.message}
          disabled={isSubmitting}
        />

        <div className="space-y-2">
          <Input
            label="Password"
            type="password"
            placeholder="Create a strong password"
            autoComplete="new-password"
            {...register('password')}
            error={errors.password?.message}
            disabled={isSubmitting}
          />
          {password && (
            <div className="text-xs space-y-1 px-1">
              <p className={password.length >= 8 ? 'text-green-600' : 'text-neutral-400'}>
                ✓ At least 8 characters
              </p>
              <p className={/[a-zA-Z]/.test(password) ? 'text-green-600' : 'text-neutral-400'}>
                ✓ Contains a letter
              </p>
              <p className={/\d/.test(password) ? 'text-green-600' : 'text-neutral-400'}>
                ✓ Contains a number
              </p>
            </div>
          )}
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting}
          loading={isSubmitting}
        >
          {isSubmitting ? 'Creating your plan...' : 'Create my baby plan'}
        </Button>

        <p className="text-xs text-neutral-400 text-center leading-relaxed">
          By creating an account, you agree to our Terms of Service and Privacy Policy.
        </p>
      </form>
    </StepWrapper>
  );
}
