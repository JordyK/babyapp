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
                Welcome back, {user.email?.split('@')[0]}
              </h1>
              <p className="text-neutral-600 mt-2">
                Your peaceful journey continues here
              </p>
            </div>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900">My Checklists</h3>
                  <p className="text-sm text-neutral-600">Manage your baby checklists</p>
                </div>
              </div>
              <p className="text-3xl font-bold text-primary-500 mb-4">0</p>
              <Button className="w-full">Create Checklist</Button>
            </Card>

            <Card className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900">Due Date</h3>
                  <p className="text-sm text-neutral-600">Track your pregnancy timeline</p>
                </div>
              </div>
              <p className="text-lg text-neutral-500 mb-4">Not set</p>
              <Button variant="secondary" className="w-full">Set Due Date</Button>
            </Card>

            <Card className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-success-100 rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-success-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900">Progress</h3>
                  <p className="text-sm text-neutral-600">Overall preparation status</p>
                </div>
              </div>
              <p className="text-3xl font-bold text-success-500 mb-4">0%</p>
              <Button variant="ghost" className="w-full">View Details</Button>
            </Card>
          </div>

          {/* Getting Started Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">Getting Started</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-xs font-semibold text-primary-600">1</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-neutral-900">Set your due date</h3>
                    <p className="text-sm text-neutral-600">Help us personalize your experience</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-neutral-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-xs font-semibold text-neutral-600">2</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-neutral-900">Create your first checklist</h3>
                    <p className="text-sm text-neutral-600">Start planning with our templates</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-neutral-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-xs font-semibold text-neutral-600">3</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-neutral-900">Add items and track progress</h3>
                    <p className="text-sm text-neutral-600">Build your personalized baby essentials list</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">Recent Activity</h2>
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-neutral-500 mb-2">No recent activity</p>
                <p className="text-sm text-neutral-400">Start by creating your first checklist</p>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </DashboardLayout>
  );
}
