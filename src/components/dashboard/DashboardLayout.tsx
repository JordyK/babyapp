'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { DashboardSidebar } from './DashboardSidebar';
import { DashboardTopbar } from './DashboardTopbar';
import { DashboardMobileNav } from './DashboardMobileNav';

interface DashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function DashboardLayout({ children, className }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={cn('min-h-screen bg-neutral-50', className)}>
      {/* Mobile navigation overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-neutral-900/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        'fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-neutral-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <DashboardSidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Topbar */}
        <DashboardTopbar onMenuClick={() => setSidebarOpen(true)} />

        {/* Page content */}
        <main className="min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>

      {/* Mobile navigation */}
      <DashboardMobileNav isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </div>
  );
}
