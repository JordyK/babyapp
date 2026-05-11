import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils/cn';

interface MobileNavigationProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

export const MobileNavigation = ({ isOpen, onClose }: MobileNavigationProps) => {
  const navigationItems = [
    { href: '/features', label: 'Features' },
    { href: '/about', label: 'About' },
    { href: '/auth/signin', label: 'Sign In' },
  ];

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu */}
      <div className={cn(
        'fixed top-0 left-0 h-full w-64 bg-white shadow-large transform transition-transform duration-normal z-50 md:hidden',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex flex-col h-full">
          {/* Mobile Header */}
          <div className="flex items-center justify-between p-4 border-b border-neutral-200">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <span className="font-display font-semibold text-xl">BabyPlanner</span>
            </div>
            <button 
              onClick={onClose}
              className="p-2 text-neutral-600 hover:text-primary-600 transition-colors duration-fast"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-4 space-y-2">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="block px-4 py-3 text-neutral-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-fast font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile CTA */}
          <div className="p-4 border-t border-neutral-200">
            <Button className="w-full" variant="primary">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
