import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils/cn';

interface MobileNavigationProps {
  readonly isOpen: boolean;
  readonly onClose?: () => void;
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
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50" onClick={onClose}>
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="bg-white rounded-lg p-6 max-w-sm mx-auto shadow-xl">
              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-neutral-900">Navigation</h2>
                  <button
                    type="button"
                    className="p-2 rounded-md text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100"
                    onClick={onClose || (() => {})}
                  >
                    Close
                  </button>
                </div>
              </div>
              <ul className="space-y-2">
                {navigationItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="block px-3 py-2 rounded-md text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
