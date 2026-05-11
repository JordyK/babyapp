'use client';

import React from 'react';
import { Card, Button } from '@/components/ui';
import { DashboardLayout } from '@/components/dashboard';
import { Container } from '@/components/layout';

export default function ProfilePage() {

  return (
    <DashboardLayout>
      <Container>
        <div className="py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div>
              <h1 className="text-3xl font-semibold text-neutral-900">
                Profile
              </h1>
              <p className="text-neutral-600 mt-2">
                Manage your personal information and preferences
              </p>
            </div>
          </div>

          {/* Profile Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Profile Info */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-neutral-900 mb-6">Personal Information</h2>
                
                <div className="space-y-6">
                  {/* Avatar Section */}
                  <div className="flex items-center space-x-6">
                    <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-primary-600 font-bold text-2xl">
                        G
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900">Profile Picture</h3>
                      <p className="text-sm text-neutral-600 mb-3">Upload a profile picture to personalize your account</p>
                      <Button variant="secondary" size="sm">
                        Upload Photo
                      </Button>
                    </div>
                  </div>

                  {/* Basic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">First Name</label>
                      <div className="p-3 border border-neutral-200 rounded-xl bg-neutral-50">
                        <span className="text-neutral-600">Not set</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Last Name</label>
                      <div className="p-3 border border-neutral-200 rounded-xl bg-neutral-50">
                        <span className="text-neutral-600">Not set</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Email Address</label>
                      <div className="p-3 border border-neutral-200 rounded-xl bg-neutral-50">
                        <span className="text-neutral-600">guest@example.com</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Due Date</label>
                      <div className="p-3 border border-neutral-200 rounded-xl bg-neutral-50">
                        <span className="text-neutral-600">Not set</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button>Save Changes</Button>
                  </div>
                </div>
              </Card>

              {/* Pregnancy Details */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-neutral-900 mb-6">Pregnancy Details</h2>
                
                <div className="space-y-4">
                  <div className="p-4 border border-neutral-200 rounded-xl bg-neutral-50">
                    <p className="text-neutral-600">No pregnancy information added yet</p>
                    <p className="text-sm text-neutral-500 mt-1">Add your due date to get personalized recommendations</p>
                  </div>
                  
                  <Button variant="secondary" className="w-full">
                    Add Pregnancy Information
                  </Button>
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Account Status */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">Account Status</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-600">Account Type</span>
                    <span className="font-medium text-neutral-900">Free</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-600">Member Since</span>
                    <span className="font-medium text-neutral-900">Today</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-600">Email Verified</span>
                    <span className="font-medium text-success-600">Yes</span>
                  </div>
                </div>
              </Card>

              {/* Quick Actions */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                    </svg>
                    Change Password
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email Preferences
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-error-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete Account
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </DashboardLayout>
  );
}
