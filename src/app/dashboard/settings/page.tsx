'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, Button } from '@/components/ui';
import { DashboardLayout } from '@/components/dashboard';
import { Container } from '@/components/layout';

export default function SettingsPage() {
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
            Please sign in to access your settings.
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
                Settings
              </h1>
              <p className="text-neutral-600 mt-2">
                Manage your account settings and preferences
              </p>
            </div>
          </div>

          {/* Settings Sections */}
          <div className="space-y-6">
            {/* General Settings */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-neutral-900 mb-6">General Settings</h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-neutral-900">Email Notifications</h3>
                    <p className="text-sm text-neutral-600">Receive email updates about your pregnancy journey</p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary-500 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6"></span>
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-neutral-900">Weekly Tips</h3>
                    <p className="text-sm text-neutral-600">Get weekly pregnancy tips and recommendations</p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-neutral-200 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1"></span>
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-neutral-900">Marketing Emails</h3>
                    <p className="text-sm text-neutral-600">Receive promotional offers and product recommendations</p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-neutral-200 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1"></span>
                  </button>
                </div>
              </div>
            </Card>

            {/* Privacy Settings */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-neutral-900 mb-6">Privacy Settings</h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-neutral-900">Profile Visibility</h3>
                    <p className="text-sm text-neutral-600">Make your profile visible to other users</p>
                  </div>
                  <select className="px-3 py-2 border border-neutral-200 rounded-xl bg-white">
                    <option>Private</option>
                    <option>Friends Only</option>
                    <option>Public</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-neutral-900">Share Progress</h3>
                    <p className="text-sm text-neutral-600">Allow others to see your preparation progress</p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-neutral-200 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1"></span>
                  </button>
                </div>
              </div>
            </Card>

            {/* Account Management */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-neutral-900 mb-6">Account Management</h2>
              
              <div className="space-y-4">
                <Button variant="secondary" className="w-full justify-start">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                  Change Password
                </Button>

                <Button variant="secondary" className="w-full justify-start">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Update Email Address
                </Button>

                <Button variant="secondary" className="w-full justify-start">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V2" />
                  </svg>
                  Export Data
                </Button>

                <Button variant="ghost" className="w-full justify-start text-error-600">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete Account
                </Button>
              </div>
            </Card>

            {/* Danger Zone */}
            <Card className="p-6 border border-error-200">
              <h2 className="text-xl font-semibold text-error-900 mb-2">Danger Zone</h2>
              <p className="text-error-600 mb-4">
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <Button variant="destructive">
                Delete Account
              </Button>
            </Card>
          </div>
        </div>
      </Container>
    </DashboardLayout>
  );
}
