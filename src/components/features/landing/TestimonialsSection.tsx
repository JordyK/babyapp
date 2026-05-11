import React from 'react';
import { Card } from '@/components/ui';

export const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "First-time Mom",
      content: "BabyPlanner took away all the stress of preparing for our first baby. The personalized checklist was perfect - no overwhelming lists, just what we actually needed.",
      avatar: "SJ"
    },
    {
      name: "Michael Chen",
      role: "Expecting Dad",
      content: "As someone who felt completely lost, this platform gave me confidence. The step-by-step approach made everything manageable.",
      avatar: "MC"
    },
    {
      name: "Emily Rodriguez",
      role: "Second-time Mom",
      content: "Even with experience, I found this incredibly helpful. The expert recommendations and progress tracking kept me organized throughout.",
      avatar: "ER"
    }
  ];

  return (
    <section className="py-20 bg-neutral-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display text-neutral-900 mb-4">
            Loved by Expecting Parents
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            See what parents are saying about their experience with BabyPlanner.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} variant="default" className="p-8 space-y-4">
              {/* Quote Icon */}
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-500">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              {/* Content */}
              <blockquote className="text-neutral-600 leading-relaxed">
                "{testimonial.content}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-neutral-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-neutral-500">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Rating Summary */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 bg-white px-6 py-4 rounded-2xl border border-neutral-200">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-warning-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <div className="text-left">
              <div className="font-semibold text-neutral-900">4.9 out of 5</div>
              <div className="text-sm text-neutral-500">Based on 2,847 reviews</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
