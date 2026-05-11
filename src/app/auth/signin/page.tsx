'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button, Card, Input } from '@/components/ui';
import { useAuth } from '@/contexts/AuthContext';
import { signInSchema, type SignInFormData } from '@/lib/auth/schemas';

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signIn, loading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  useEffect(() => {
    const msg = searchParams.get('message');
    if (msg === 'check-email') {
      setMessage('Please check your email for a confirmation link.');
    } else if (msg === 'password-reset') {
      setMessage('Your password has been reset successfully.');
    }
  }, [searchParams]);

  const onSubmit = async (data: SignInFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const { error } = await signIn(data.email, data.password);

      if (error) {
        setSubmitError(error);
      } else {
        // Redirect to dashboard after successful sign in
        router.push('/dashboard');
      }
    } catch (error) {
      setSubmitError('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold text-neutral-900 mb-2">
            Welcome back
          </h1>
          <p className="text-neutral-600">
            Continue your peaceful journey into parenthood
          </p>
        </div>

        {message && (
          <div className="mb-6 p-4 bg-success-50 border border-success-200 rounded-xl">
            <p className="text-sm text-success-700">{message}</p>
          </div>
        )}

        {submitError && (
          <div className="mb-6 p-4 bg-error-50 border border-error-200 rounded-xl">
            <p className="text-sm text-error-700">{submitError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
            placeholder="Enter your password"
            autoComplete="current-password"
            {...register('password')}
            error={errors.password?.message}
            disabled={isSubmitting || loading}
            required
          />

          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                {...register('rememberMe')}
                className="h-4 w-4 text-primary-500 border-neutral-300 rounded focus:ring-primary-500 focus:ring-offset-0"
                disabled={isSubmitting || loading}
              />
              <span className="text-sm text-neutral-600">Remember me</span>
            </label>
            <Link 
              href="/auth/forgot-password" 
              className="text-sm text-primary-500 hover:text-primary-600 font-medium"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || loading}
            loading={isSubmitting || loading}
          >
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-neutral-600">
            Don't have an account?{' '}
            <Link href="/auth/signup" className="text-primary-500 hover:text-primary-600 font-medium">
              Sign up
            </Link>
          </p>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-neutral-500">
            By signing in, you agree to our{' '}
            <Link href="/terms" className="text-primary-500 hover:text-primary-600 underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-primary-500 hover:text-primary-600 underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">Loading...</div>}>
      <SignInContent />
    </Suspense>
  );
}
