import React from 'react';
import { Card } from '@/components/ui';

export const OnboardingSection = () => {
  const steps = [
    {
      step: "01",
      title: "Tell Us About Your Journey",
      description: "Share your due date, preferences, and what matters most to you. We'll use this to personalize everything just for you.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      step: "02",
      title: "Get Your Personalized Checklist",
      description: "We'll create a custom checklist based on your needs. No overwhelming lists - just what you actually need, organized beautifully.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      )
    },
    {
      step: "03",
      title: "Plan at Your Own Pace",
      description: "Track your progress, get gentle reminders, and celebrate milestones. We're here to support you, not rush you.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-20 bg-neutral-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display text-neutral-900 mb-4">
            Simple, Calm Onboarding
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            Get started in minutes. We've designed every step to reduce stress and build confidence.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Step Number */}
                <div className="text-primary-500 text-6xl font-display font-bold mb-4 opacity-20">
                  {step.step}
                </div>

                {/* Step Content */}
                <Card variant="default" className="relative h-full p-8 space-y-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-500">
                    {step.icon}
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-neutral-900">
                      {step.title}
                    </h3>
                    <p className="text-neutral-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </Card>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-primary-200 transform -translate-y-1/2" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 text-sm text-neutral-500 bg-white px-4 py-2 rounded-full border border-neutral-200">
            <svg className="w-4 h-4 text-success-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Most users complete onboarding in under 5 minutes</span>
          </div>
        </div>
      </div>
    </section>
  );
};
