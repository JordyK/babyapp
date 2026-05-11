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
