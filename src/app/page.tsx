'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@/lib/supabase/browser';
import {
  HeroSection,
  CTASection,
  BenefitsSection,
  OnboardingSection,
  ChecklistPreviewSection,
  TestimonialsSection,
  FAQSection
} from '@/components/features/landing';

export default function HomePage() {
  const router = useRouter();

  // Handle magic link tokens from URL hash
  useEffect(() => {
    const handleMagicLink = async () => {
      // Check if URL has access token in hash (magic link)
      if (window.location.hash.includes('access_token')) {
        // Let Supabase handle the token exchange
        const supabase = createBrowserClient();
        await supabase.auth.getSession();
        
        // Redirect to setup-password page
        router.replace('/auth/setup-password');
      }
    };

    handleMagicLink();
  }, [router]);

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
