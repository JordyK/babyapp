import React from 'react';
import { Card } from '@/components/ui';

export const ChecklistPreviewSection = () => {
  const checklistItems = [
    { name: "Hospital Bag Essentials", completed: true, priority: "high" },
    { name: "Nursery Furniture", completed: true, priority: "medium" },
    { name: "Feeding Supplies", completed: false, priority: "high" },
    { name: "Clothing (0-3 months)", completed: false, priority: "medium" },
    { name: "Diapering Station", completed: false, priority: "high" },
    { name: "Bath Time Essentials", completed: false, priority: "low" }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display text-neutral-900 mb-4">
            See Your Checklist Come to Life
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            Beautiful, organized checklists that adapt to your needs. No more overwhelming spreadsheets or forgotten items.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Preview Card */}
            <div className="order-2 lg:order-1">
              <Card variant="elevated" className="p-8">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-neutral-900">
                      Baby Essentials Checklist
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-neutral-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>Due: March 15, 2024</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-neutral-600">
                      <span>Progress</span>
                      <span>2 of 6 completed</span>
                    </div>
                    <div className="w-full bg-neutral-200 rounded-full h-2">
                      <div className="bg-primary-500 h-2 rounded-full" style={{ width: '33%' }}></div>
                    </div>
                  </div>

                  {/* Checklist Items */}
                  <div className="space-y-3">
                    {checklistItems.map((item, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-colors">
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          item.completed 
                            ? 'bg-primary-500 border-primary-500' 
                            : 'border-neutral-300'
                        }`}>
                          {item.completed && (
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <span className={`flex-1 ${
                          item.completed ? 'text-neutral-400 line-through' : 'text-neutral-900'
                        }`}>
                          {item.name}
                        </span>
                        <div className={`px-2 py-1 rounded text-xs font-medium ${
                          item.priority === 'high' 
                            ? 'bg-error-100 text-error-600'
                            : item.priority === 'medium'
                            ? 'bg-warning-100 text-warning-600'
                            : 'bg-neutral-100 text-neutral-600'
                        }`}>
                          {item.priority}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add Item Button */}
                  <button className="w-full py-3 border-2 border-dashed border-neutral-300 rounded-xl text-neutral-500 hover:border-primary-300 hover:text-primary-500 transition-colors flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Add Item</span>
                  </button>
                </div>
              </Card>
            </div>

            {/* Features List */}
            <div className="order-1 lg:order-2 space-y-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-500 flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                      Smart Organization
                    </h3>
                    <p className="text-neutral-600">
                      Items are automatically categorized and prioritized based on your timeline and preferences.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center text-accent-500 flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                      Gentle Reminders
                    </h3>
                    <p className="text-neutral-600">
                      Get timely notifications for important tasks without the overwhelming alerts.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-success-100 rounded-xl flex items-center justify-center text-success-500 flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                      Share with Partner
                    </h3>
                    <p className="text-neutral-600">
                      Collaborate with your partner and family members to plan together.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
