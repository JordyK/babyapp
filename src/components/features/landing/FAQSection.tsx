import React, { useState } from 'react';
import { Card } from '@/components/ui';

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Is BabyPlanner really free?",
      answer: "Yes! BabyPlanner is free to use for all essential features. We believe every expecting parent deserves access to quality planning tools without financial stress."
    },
    {
      question: "How is this different from other baby checklists?",
      answer: "Unlike generic checklists that overwhelm you with hundreds of items, BabyPlanner creates personalized recommendations based on your specific due date, preferences, and location. We focus on what you actually need, not what you might need."
    },
    {
      question: "Can I share my checklist with my partner?",
      answer: "Absolutely! You can share your checklist with your partner, family members, or friends. Everyone can collaborate and track progress together."
    },
    {
      question: "What if I'm already far along in my pregnancy?",
      answer: "No problem! BabyPlanner adapts to your current stage. We'll help you prioritize what's most important for your timeline."
    },
    {
      question: "Are the product recommendations biased by affiliate partnerships?",
      answer: "Never. We only recommend products we genuinely believe in. Any affiliate relationships are clearly disclosed, and we always provide alternative options."
    },
    {
      question: "Can I use BabyPlanner on my phone?",
      answer: "Yes! BabyPlanner works beautifully on all devices - desktop, tablet, and mobile. Your checklists sync automatically so you can plan anywhere, anytime."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display text-neutral-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            Got questions? We've got answers. Here are the most common ones we hear from expecting parents.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} variant="default" className="overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-neutral-50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-neutral-900">
                  {faq.question}
                </h3>
                <svg
                  className={`w-5 h-5 text-neutral-400 transition-transform ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {openIndex === index && (
                <div className="px-8 pb-6">
                  <p className="text-neutral-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Still Have Questions */}
        <div className="text-center mt-16">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-primary-50 px-8 py-6 rounded-2xl">
            <div className="text-neutral-900">
              <div className="font-semibold mb-1">Still have questions?</div>
              <div className="text-sm text-neutral-600">We're here to help you every step of the way.</div>
            </div>
            <button className="bg-primary-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-600 transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
