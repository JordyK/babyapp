import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';

interface FooterProps {
  readonly className?: string;
}

export const Footer = ({ className }: FooterProps) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={cn('bg-neutral-50 border-t border-neutral-200', className)}>
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-neutral-900 mb-4">BabyPlanner</h3>
            <p className="text-neutral-600 text-sm leading-relaxed">
              A modern platform that helps expecting parents create personalized baby essentials checklists with confidence and peace of mind.
            </p>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h4 className="font-semibold text-neutral-900 mb-4">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/features" 
                  className="text-neutral-600 hover:text-primary-600 text-sm transition-colors duration-fast"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link 
                  href="/pricing" 
                  className="text-neutral-600 hover:text-primary-600 text-sm transition-colors duration-fast"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="font-semibold text-neutral-900 mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/blog" 
                  className="text-neutral-600 hover:text-primary-600 text-sm transition-colors duration-fast"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link 
                  href="/guides" 
                  className="text-neutral-600 hover:text-primary-600 text-sm transition-colors duration-fast"
                >
                  Guides
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-semibold text-neutral-900 mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/about" 
                  className="text-neutral-600 hover:text-primary-600 text-sm transition-colors duration-fast"
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  href="/privacy" 
                  className="text-neutral-600 hover:text-primary-600 text-sm transition-colors duration-fast"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link 
                  href="/terms" 
                  className="text-neutral-600 hover:text-primary-600 text-sm transition-colors duration-fast"
                >
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-200 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-neutral-500 text-sm">
              © {currentYear} BabyPlanner. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <span className="text-neutral-500 text-sm">Made with ❤️ for expecting parents</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
