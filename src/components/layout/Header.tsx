'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';

interface HeaderProps {
  readonly className?: string;
}

export const Header = ({ className }: HeaderProps) => {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);

  // Hide header on onboarding, auth, and dashboard pages
  const hideHeader = pathname.startsWith('/onboarding') ||
    pathname.startsWith('/auth') ||
    pathname.startsWith('/dashboard');

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (hideHeader) return null;

  return (
    <header className={cn('bg-white border-b border-neutral-200 shadow-soft', className)}>
      <div className="container">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 text-neutral-900 hover:text-primary-600 transition-colors"
          >
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <span className="font-semibold text-xl">BabyPlanner</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {user ? (
              <Link href="/dashboard">
                <Button size="sm">Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link href="/auth/signin" className="text-neutral-600 hover:text-neutral-900 font-medium text-sm transition-colors">
                  Sign in
                </Link>
                <Link href="/onboarding">
                  <Button size="sm">Get Started</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center gap-3">
            {user ? (
              <Link href="/dashboard">
                <Button size="sm">Dashboard</Button>
              </Link>
            ) : (
              <Link href="/onboarding">
                <Button size="sm">Get Started</Button>
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};
