import React from 'react';
import { Button, Card } from '@/components/ui';

export const CTASection = () => {
  return (
    <section className="py-16 bg-primary-50">
      <div className="container">
        <Card variant="default" className="max-w-4xl mx-auto p-8 md:p-12 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-display text-neutral-900">
            Ready to Plan with Confidence?
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Join thousands of expecting parents who've found peace of mind through our organized, calming approach to baby planning.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="w-full sm:w-auto">
              Start Your Free Journey
            </Button>
            <Button variant="ghost" size="lg" className="w-full sm:w-auto">
              See How It Works
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
            <div className="flex items-center gap-2 text-sm text-neutral-500">
              <svg className="w-5 h-5 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-500">
              <svg className="w-5 h-5 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              <span>10,000+ Parents</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-500">
              <svg className="w-5 h-5 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 00-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 00-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 00-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 002.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Expert-Approved</span>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
