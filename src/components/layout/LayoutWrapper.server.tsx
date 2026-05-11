import React from 'react';
import { Header } from './Header';
import { MobileNavigation } from './MobileNavigation';
import { Footer } from './Footer';
import { cn } from '@/lib/utils/cn';
import type { BaseComponentProps } from '@/types';

interface LayoutWrapperProps extends BaseComponentProps {
  readonly showMobileMenu?: boolean;
  readonly onMobileMenuClose?: () => void;
}

export const LayoutWrapper = ({ 
  children, 
  className,
  showMobileMenu = false,
  onMobileMenuClose = () => {}
}: LayoutWrapperProps) => {
  return (
    <div className={cn('min-h-screen flex flex-col', className)}>
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      {showMobileMenu && (
        <div className="lg:hidden">
          <MobileNavigation isOpen={showMobileMenu} onClose={onMobileMenuClose} />
        </div>
      )}
    </div>
  );
};
