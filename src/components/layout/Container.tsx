import React from 'react';
import { cn } from '@/lib/utils/cn';
import type { BaseComponentProps } from '@/types';

interface ContainerProps extends BaseComponentProps {
  readonly size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  readonly centered?: boolean;
}

export const Container = ({ 
  children, 
  className, 
  size = 'lg', 
  centered = false 
}: ContainerProps) => {
  const sizeClasses = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-7xl',
    xl: 'max-w-8xl',
    full: 'max-w-full',
  };

  return (
    <div 
      className={cn(
        'container mx-auto px-4 sm:px-6 lg:px-8',
        sizeClasses[size],
        centered && 'flex items-center justify-center',
        className
      )}
    >
      {children}
    </div>
  );
};
