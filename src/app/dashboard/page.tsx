'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, Button } from '@/components/ui';
import { DashboardLayout } from '@/components/dashboard';
import { Container } from '@/components/layout';

export default function DashboardPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <Card className="w-full max-w-md p-8 text-center">
          <h1 className="text-2xl font-semibold text-neutral-900 mb-4">
            Not authenticated
          </h1>
          <p className="text-neutral-600 mb-6">
            Please sign in to access your dashboard.
          </p>
          <Button className="w-full">Sign in</Button>
        </Card>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <Container>
        <div className="py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div>
              <h1 className="text-3xl font-semibold text-neutral-900">
                Your Personalized Baby Plan
              </h1>
              <p className="text-neutral-600 mt-2">
                Step by step, you're getting prepared
              </p>
            </div>
          </div>

          {/* Progress Overview with Milestone Awareness */}
          <Card className="p-6 mb-8 bg-gradient-to-r from-primary-50 to-accent-50 border-0">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-neutral-900 mb-2">Your Progress</h2>
                <p className="text-neutral-600">You're doing great! Keep going step by step.</p>
                <div className="mt-3 flex items-center gap-2 text-sm text-neutral-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Next milestone: Complete your onboarding</span>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <p className="text-4xl font-bold text-primary-500">0%</p>
                  <p className="text-sm text-neutral-600">Completed</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-accent-500">0</p>
                  <p className="text-sm text-neutral-600">Items Done</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-success-500">0</p>
                  <p className="text-sm text-neutral-600">Milestones</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Personalized Categories */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">Your Essentials by Category</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="p-6 hover-lift">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-neutral-900">Nursery</h3>
                  <span className="text-sm text-neutral-500">0/0</span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-2 mb-3">
                  <div className="bg-primary-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
                <p className="text-sm text-neutral-600">Crib, changing table, storage</p>
              </Card>

              <Card className="p-6 hover-lift">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-neutral-900">Feeding</h3>
                  <span className="text-sm text-neutral-500">0/0</span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-2 mb-3">
                  <div className="bg-primary-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
                <p className="text-sm text-neutral-600">Bottles, nursing, formula prep</p>
              </Card>

              <Card className="p-6 hover-lift">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-neutral-900">Diapering</h3>
                  <span className="text-sm text-neutral-500">0/0</span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-2 mb-3">
                  <div className="bg-primary-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
                <p className="text-sm text-neutral-600">Diapers, wipes, changing supplies</p>
              </Card>

              <Card className="p-6 hover-lift">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-neutral-900">Clothing</h3>
                  <span className="text-sm text-neutral-500">0/0</span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-2 mb-3">
                  <div className="bg-primary-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
                <p className="text-sm text-neutral-600">Onesies, sleepers, outfits</p>
              </Card>

              <Card className="p-6 hover-lift">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-neutral-900">Health & Safety</h3>
                  <span className="text-sm text-neutral-500">0/0</span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-2 mb-3">
                  <div className="bg-primary-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
                <p className="text-sm text-neutral-600">Thermometer, first aid kit, monitor</p>
              </Card>

              <Card className="p-6 hover-lift">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-neutral-900">Travel</h3>
                  <span className="text-sm text-neutral-500">0/0</span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-2 mb-3">
                  <div className="bg-primary-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
                <p className="text-sm text-neutral-600">Car seat, stroller, carrier</p>
              </Card>
            </div>
          </div>

          {/* Upcoming Priorities */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">Upcoming Priorities</h2>
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-neutral-500 mb-2">Complete your onboarding</p>
                <p className="text-sm text-neutral-400">We'll personalize your priorities based on your due date</p>
                <Button className="mt-4">Start Onboarding</Button>
              </div>
            </Card>

            {/* Progressive Profiling */}
            <Card className="p-6 bg-gradient-to-r from-accent-50 to-primary-50 border-0">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-neutral-900 mb-2">Want more accurate recommendations?</h2>
                  <p className="text-neutral-600 mb-4">Answer a few optional questions to help us personalize your experience even better.</p>
                  <Button variant="secondary" className="w-full sm:w-auto">
                    Improve Recommendations
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </DashboardLayout>
  );
}
