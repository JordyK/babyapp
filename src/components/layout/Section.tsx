import React from 'react';
import { cn } from '@/lib/utils/cn';
import type { BaseComponentProps } from '@/types';

interface SectionProps extends BaseComponentProps {
  readonly id?: string;
  readonly centered?: boolean;
  readonly tight?: boolean;
}

export const Section = ({ 
  children, 
  className, 
  id, 
  centered = false, 
  tight = false 
}: SectionProps) => {
  const paddingClasses = tight 
    ? 'py-8' 
    : centered 
      ? 'py-16' 
      : 'py-12';

  return (
    <section 
      id={id}
      className={cn(
        paddingClasses,
        centered && 'text-center',
        className
      )}
    >
      <div className="container">
        {children}
      </div>
    </section>
  );
};
