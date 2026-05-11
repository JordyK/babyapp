'use client';

import React from 'react';
import { Button } from '@/components/ui';
import { useAuth } from '@/contexts/AuthContext';

interface DashboardTopbarProps {
  onMenuClick: () => void;
}

export function DashboardTopbar({ onMenuClick }: DashboardTopbarProps) {
  const { user, signOut, loading } = useAuth();

  return (
    <header className="h-16 bg-white border-b border-neutral-200 shadow-sm">
      <div className="flex items-center justify-between h-full px-4 sm:px-6 lg:px-8">
        {/* Left side - Mobile menu button */}
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="lg:hidden"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
        </div>

        {/* Right side - User actions */}
        <div className="flex items-center space-x-4">
          {/* Notifications (placeholder) */}
          <Button variant="ghost" size="sm" className="relative">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-1 right-1 w-2 h-2 bg-error-500 rounded-full"></span>
          </Button>

          {/* User menu */}
          <div className="flex items-center space-x-3">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-neutral-900">
                {user?.email?.split('@')[0] || 'User'}
              </p>
              <p className="text-xs text-neutral-500">
                {user?.email || 'user@example.com'}
              </p>
            </div>
            
            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
              <span className="text-primary-600 font-semibold text-sm">
                {user?.email?.charAt(0).toUpperCase() || 'U'}
              </span>
            </div>
          </div>

          {/* Sign out button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={signOut}
            disabled={loading}
            className="hidden sm:flex"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign out
          </Button>
        </div>
      </div>
    </header>
  );
}
