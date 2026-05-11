'use client';

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { Button } from '@/components/ui';

function VerifyContent() {
  const searchParams = useSearchParams();
  const hasError = searchParams.get('error') === 'true';

  if (hasError) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary-50/30 via-white to-white flex items-center justify-center p-5">
        <div className="w-full max-w-md text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full mx-auto mb-6 flex items-center justify-center">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-neutral-900 mb-3">
            Something went wrong
          </h1>
          <p className="text-neutral-500 mb-8 leading-relaxed">
            We couldn&apos;t verify your email. The link may have expired. Please try signing up again.
          </p>
          <Link href="/onboarding">
            <Button className="w-full">Try again</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50/30 via-white to-white flex items-center justify-center p-5">
      <div className="w-full max-w-md text-center">
        <div className="w-20 h-20 bg-primary-100 rounded-full mx-auto mb-8 flex items-center justify-center">
          <svg className="w-10 h-10 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>

        <h1 className="text-3xl font-semibold text-neutral-900 mb-3">
          Check your email
        </h1>

        <p className="text-neutral-500 text-lg mb-4 leading-relaxed">
          We&apos;ve sent you a confirmation link.
        </p>

        <p className="text-neutral-400 text-sm mb-10 leading-relaxed max-w-sm mx-auto">
          Click the link in your email to activate your account and start building your personalized baby plan.
        </p>

        <div className="bg-primary-50/50 rounded-2xl p-6 mb-8 border border-primary-100">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center mt-0.5">
              <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-primary-800 mb-1">
                Don&apos;t see the email?
              </p>
              <p className="text-xs text-primary-600 leading-relaxed">
                Check your spam folder, or wait a minute and try refreshing. Confirmation emails usually arrive within seconds.
              </p>
            </div>
          </div>
        </div>

        <Link href="/" className="text-sm text-neutral-400 hover:text-neutral-600 transition-colors">
          Back to homepage
        </Link>
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-primary-50/30 via-white to-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500" />
      </div>
    }>
      <VerifyContent />
    </Suspense>
  );
}
