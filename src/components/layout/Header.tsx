'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

interface HeaderProps {
  readonly className?: string;
}

export const Header = ({ className }: HeaderProps) => {
  const { user, signOut, loading } = useAuth();

  return (
    <header className={cn('bg-white border-b border-neutral-200 shadow-soft', className)}>
      <div className="container">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 text-neutral-900 hover:text-primary-600 transition-colors duration-fast"
          >
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <span className="font-display font-semibold text-xl">BabyPlanner</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {user ? (
              <>
                <Link 
                  href="/dashboard" 
                  className="text-neutral-600 hover:text-primary-600 font-medium transition-colors duration-fast"
                >
                  Dashboard
                </Link>
                <Link 
                  href="/checklists" 
                  className="text-neutral-600 hover:text-primary-600 font-medium transition-colors duration-fast"
                >
                  My Checklists
                </Link>
                <Button variant="ghost" size="sm" onClick={signOut} disabled={loading}>
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link 
                  href="/features" 
                  className="text-neutral-600 hover:text-primary-600 font-medium transition-colors duration-fast"
                >
                  Features
                </Link>
                <Link 
                  href="/about" 
                  className="text-neutral-600 hover:text-primary-600 font-medium transition-colors duration-fast"
                >
                  About
                </Link>
                <Link href="/auth/signin">
                  <Button variant="secondary" size="sm">
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-neutral-600 hover:text-primary-600 transition-colors duration-fast">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </nav>
      </div>
    </header>
  );
};
