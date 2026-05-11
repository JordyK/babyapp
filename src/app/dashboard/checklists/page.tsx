'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, Button } from '@/components/ui';
import { DashboardLayout } from '@/components/dashboard';
import { Container } from '@/components/layout';

export default function ChecklistsPage() {
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
            Please sign in to access your checklists.
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
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-semibold text-neutral-900">
                  My Checklists
                </h1>
                <p className="text-neutral-600 mt-2">
                  Manage and organize your baby essentials
                </p>
              </div>
              <Button>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Checklist
              </Button>
            </div>
          </div>

          {/* Empty State */}
          <Card className="p-12 text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">
              No checklists yet
            </h2>
            <p className="text-neutral-600 mb-6 max-w-md mx-auto">
              Create your first checklist to start organizing your baby essentials and track your preparation progress.
            </p>
            <Button size="lg">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Your First Checklist
            </Button>
          </Card>

          {/* Widget Areas (for future content) */}
          <div className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">Templates</h3>
                <p className="text-neutral-600 mb-4">
                  Start with our curated templates for different stages of pregnancy
                </p>
                <div className="space-y-2">
                  <div className="p-3 border border-neutral-200 rounded-xl">
                    <h4 className="font-medium text-neutral-900">Newborn Essentials</h4>
                    <p className="text-sm text-neutral-600">Must-have items for your baby's first weeks</p>
                  </div>
                  <div className="p-3 border border-neutral-200 rounded-xl">
                    <h4 className="font-medium text-neutral-900">Pregnancy Prep</h4>
                    <p className="text-sm text-neutral-600">Items to prepare before baby arrives</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-600">Total Checklists</span>
                    <span className="font-semibold text-neutral-900">0</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-600">Total Items</span>
                    <span className="font-semibold text-neutral-900">0</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-600">Completed</span>
                    <span className="font-semibold text-success-600">0%</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </DashboardLayout>
  );
}
