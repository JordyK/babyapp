'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button, Card, Input } from '@/components/ui';
import { createBrowserClient } from '@/lib/supabase/browser';
import { z } from 'zod';

const setPasswordSchema = z.object({
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[a-zA-Z]/, 'Password must contain at least 1 letter')
    .regex(/\d/, 'Password must contain at least 1 number'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SetPasswordFormData = z.infer<typeof setPasswordSchema>;

function SetupPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SetPasswordFormData>({
    resolver: zodResolver(setPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const password = watch('password');

  // Handle magic link authentication
  useEffect(() => {
    const handleAuth = async () => {
      const supabase = createBrowserClient();
      
      // Check if user is already authenticated
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        setIsAuthenticated(true);
        setIsLoading(false);
        return;
      }

      // Handle magic link tokens from URL hash
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Auth error:', error);
        setSubmitError(error.message);
        setIsLoading(false);
        return;
      }

      if (data.session) {
        setIsAuthenticated(true);
      } else {
        // If no session, redirect to signin
        router.push('/auth/signin');
      }
      
      setIsLoading(false);
    };

    handleAuth();
  }, [router]);

  const onSubmit = async (data: SetPasswordFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const supabase = createBrowserClient();

      // Update user password
      const { error: updateError } = await supabase.auth.updateUser({
        password: data.password
      });

      if (updateError) {
        throw updateError;
      }

      // Redirect to dashboard after successful password setup
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Password setup error:', error);
      setSubmitError(error.message || 'Failed to set password. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 text-center">
          <p className="text-neutral-600 mb-4">Authentication required</p>
          <Button onClick={() => router.push('/auth/signin')}>
            Go to Sign In
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold text-neutral-900 mb-2">
            Set your password
          </h1>
          <p className="text-neutral-600">
            Create a password to access your personalized baby plan
          </p>
        </div>

        {submitError && (
          <div className="mb-6 p-4 bg-error-50 border border-error-200 rounded-xl">
            <p className="text-sm text-error-700">{submitError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            label="Password"
            type="password"
            placeholder="Create a strong password"
            autoComplete="new-password"
            {...register('password')}
            error={errors.password?.message}
            disabled={isSubmitting}
            required
          />

          <Input
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            autoComplete="new-password"
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message}
            disabled={isSubmitting}
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

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
            loading={isSubmitting}
          >
            {isSubmitting ? 'Setting password...' : 'Set password & continue'}
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default function SetupPasswordPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">Loading...</div>}>
      <SetupPasswordContent />
    </React.Suspense>
  );
}
