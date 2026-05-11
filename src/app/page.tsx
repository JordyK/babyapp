'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createBrowserClient } from '@/lib/supabase/browser';
import { Button, Card } from '@/components/ui';
import {
  HeroSection,
  CTASection,
  BenefitsSection,
  OnboardingSection,
  ChecklistPreviewSection,
  TestimonialsSection,
  FAQSection
} from '@/components/features/landing';

function HomePageContent() {
  const router = useRouter();
  const [magicLinkError, setMagicLinkError] = useState<string | null>(null);
  const [isHandlingAuth, setIsHandlingAuth] = useState(false);

  // Handle magic link tokens from URL hash
  useEffect(() => {
    const handleMagicLink = async () => {
      // Check if URL has error in hash (expired link, etc.)
      const hash = window.location.hash;
      if (hash.includes('error=')) {
        const urlParams = new URLSearchParams(hash.substring(1));
        const errorCode = urlParams.get('error_code');
        const errorDescription = urlParams.get('error_description');
        
        if (errorCode === 'otp_expired') {
          setMagicLinkError('The confirmation link has expired. Please start over to get a new link.');
        } else if (errorDescription) {
          setMagicLinkError(errorDescription);
        } else {
          setMagicLinkError('There was an error with the confirmation link. Please try again.');
        }
        
        // Clear the hash from URL
        window.history.replaceState({}, document.title, window.location.pathname);
        return;
      }

      // Check if URL has access token in hash (magic link)
      if (hash.includes('access_token')) {
        setIsHandlingAuth(true);
        try {
          // Let Supabase handle the token exchange
          const supabase = createBrowserClient();
          await supabase.auth.getSession();
          
          // Redirect to setup-password page
          router.replace('/auth/setup-password');
        } catch (error) {
          console.error('Auth error:', error);
          setMagicLinkError('Failed to process confirmation link. Please try again.');
        } finally {
          setIsHandlingAuth(false);
        }
      }
    };

    handleMagicLink();
  }, [router]);

  // Show error state if magic link error occurred
  if (magicLinkError) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 text-center">
          <div className="w-16 h-16 bg-error-100 rounded-full mx-auto mb-6 flex items-center justify-center">
            <svg className="w-8 h-8 text-error-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-neutral-900 mb-4">
            Link Expired
          </h1>
          <p className="text-neutral-600 mb-6">
            {magicLinkError}
          </p>
          <div className="space-y-3">
            <Button
              onClick={() => {
                setMagicLinkError(null);
                router.push('/onboarding');
              }}
              className="w-full"
            >
              Start Over
            </Button>
            <Button
              variant="secondary"
              onClick={() => router.push('/')}
              className="w-full"
            >
              Go to Home
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // Show loading state while handling auth
  if (isHandlingAuth) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-neutral-600">Confirming your email...</p>
        </div>
      </div>
    );
  }

  // Show normal landing page
  return (
    <div className="min-h-screen">
      <HeroSection />
      <BenefitsSection />
      <OnboardingSection />
      <ChecklistPreviewSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </div>
  );
}

export default function HomePage() {
  return (
    <HomePageContent />
  );
}
