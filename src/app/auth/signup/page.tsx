'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button, Card, Input } from '@/components/ui';
import { useAuth } from '@/contexts/AuthContext';
import { signUpSchema, type SignUpFormData } from '@/lib/auth/schemas';

function SignUpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signUp, loading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const prefillEmail = searchParams.get('email') || '';
  const fromOnboarding = searchParams.get('onboarding') === 'true';

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: prefillEmail,
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      acceptTerms: false,
    },
  });

  // Pre-fill email if provided in URL
  useEffect(() => {
    if (prefillEmail) {
      setValue('email', prefillEmail);
    }
  }, [prefillEmail, setValue]);

  const password = watch('password');

  const onSubmit = async (data: SignUpFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const signUpOptions: {
        firstName?: string;
        lastName?: string;
      } = {};
      
      if (data.firstName) {
        signUpOptions.firstName = data.firstName;
      }
      if (data.lastName) {
        signUpOptions.lastName = data.lastName;
      }

      const { error } = await signUp(
        data.email,
        data.password,
        signUpOptions
      );

      if (error) {
        setSubmitError(error);
      } else {
        setSubmitSuccess(true);
        // Redirect to sign in page after successful signup
        setTimeout(() => {
          router.push('/auth/signin?message=check-email');
        }, 3000);
      }
    } catch (error) {
      setSubmitError('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-success-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-success-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-semibold text-neutral-900 mb-2">
              Check your email
            </h1>
            <p className="text-neutral-600 mb-6">
              We've sent you a confirmation link. Please check your email and click the link to complete your sign up.
            </p>
            <p className="text-sm text-neutral-500">
              Redirecting to sign in page...
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold text-neutral-900 mb-2">
            Create your account
          </h1>
          <p className="text-neutral-600">
            Start your peaceful journey into parenthood
          </p>
        </div>

        {submitError && (
          <div className="mb-6 p-4 bg-error-50 border border-error-200 rounded-xl">
            <p className="text-sm text-error-700">{submitError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input
                label="First Name"
                type="text"
                placeholder="Sarah"
                {...register('firstName')}
                error={errors.firstName?.message}
                disabled={isSubmitting || loading}
              />
            </div>
            <div>
              <Input
                label="Last Name"
                type="text"
                placeholder="Johnson"
                {...register('lastName')}
                error={errors.lastName?.message}
                disabled={isSubmitting || loading}
              />
            </div>
          </div>

          <Input
            label="Email Address"
            type="email"
            placeholder="sarah@example.com"
            autoComplete="email"
            {...register('email')}
            error={errors.email?.message}
            disabled={isSubmitting || loading}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="Create a strong password"
            autoComplete="new-password"
            {...register('password')}
            error={errors.password?.message}
            disabled={isSubmitting || loading}
            required
          />

          <Input
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            autoComplete="new-password"
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message}
            disabled={isSubmitting || loading}
            required
          />

          {password && (
            <div className="text-sm text-neutral-600">
              <p className="mb-2">Password must contain:</p>
              <ul className="space-y-1">
                <li className={password.length >= 8 ? 'text-success-600' : 'text-neutral-500'}>
                  ✓ At least 8 characters
                </li>
                <li className={/[a-zA-Z]/.test(password) ? 'text-success-600' : 'text-neutral-500'}>
                  ✓ At least 1 letter
                </li>
                <li className={/\d/.test(password) ? 'text-success-600' : 'text-neutral-500'}>
                  ✓ At least 1 number
                </li>
              </ul>
            </div>
          )}

          <div className="space-y-2">
            <label className="flex items-start space-x-3">
              <input
                type="checkbox"
                {...register('acceptTerms')}
                className="mt-1 h-4 w-4 text-primary-500 border-neutral-300 rounded focus:ring-primary-500 focus:ring-offset-0"
                disabled={isSubmitting || loading}
              />
              <span className="text-sm text-neutral-600">
                I agree to the{' '}
                <Link href="/terms" className="text-primary-500 hover:text-primary-600 underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-primary-500 hover:text-primary-600 underline">
                  Privacy Policy
                </Link>
              </span>
            </label>
            {errors.acceptTerms && (
              <p className="text-sm text-error-600">{errors.acceptTerms.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || loading}
            loading={isSubmitting || loading}
          >
            {isSubmitting ? 'Creating account...' : 'Create account'}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-neutral-600">
            Already have an account?{' '}
            <Link href="/auth/signin" className="text-primary-500 hover:text-primary-600 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">Loading...</div>}>
      <SignUpContent />
    </Suspense>
  );
}
