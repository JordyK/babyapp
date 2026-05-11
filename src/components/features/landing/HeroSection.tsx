import React from 'react';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';

export const HeroSection = () => {
  return (
    <section className="bg-gradient-to-b from-neutral-50 to-white py-20 md:py-32">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Headline */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-display text-neutral-900 leading-tight animate-fade-in">
              We help you figure out exactly
              <br />
              <span className="text-primary-500">what you actually need</span>
              <br />
              for your baby
            </h1>
            <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed animate-slide-up">
              Stop the overwhelm. Get a personalized baby essentials checklist that saves you time, money, and stress.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
            <Button size="lg" className="w-full sm:w-auto">
              Get Your Personalized Plan
            </Button>
            <Button variant="secondary" size="lg" className="w-full sm:w-auto">
              How It Works
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-neutral-500 animate-fade-in">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-success-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Curated by parents</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-success-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>No affiliate spam</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-success-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Save 40% on essentials</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
