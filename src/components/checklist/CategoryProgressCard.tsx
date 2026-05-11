'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Card, Button } from '@/components/ui';
import { ChecklistCategoryConfig, CategoryProgressCardProps } from '@/lib/checklist/types';

/**
 * Category progress card component
 * 
 * Displays progress information for a checklist category including
 * completion rate, budget information, and quick access to items.
 */
export function CategoryProgressCard({ 
  category, 
  onClick, 
  compact = false, 
  showBudget = true 
}: CategoryProgressCardProps) {
  const progressPercentage = (category.completedCount / category.itemCount) * 100;
  const budgetSpentPercentage = category.totalEstimatedCost > 0 
    ? (category.totalActualCost / category.totalEstimatedCost) * 100 
    : 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getProgressColor = (percentage: number) => {
    if (percentage === 100) return 'bg-success-500';
    if (percentage >= 75) return 'bg-primary-500';
    if (percentage >= 50) return 'bg-amber-500';
    return 'bg-neutral-300';
  };

  const getBudgetColor = (percentage: number) => {
    if (percentage > 100) return 'text-error-600';
    if (percentage >= 90) return 'text-amber-600';
    return 'text-success-600';
  };

  if (compact) {
    return (
      <button
        onClick={() => onClick?.(category.id)}
        className={cn(
          'w-full p-4 border-2 rounded-xl transition-all duration-200',
          'hover:shadow-md hover:scale-[1.02]',
          category.backgroundColor,
          category.borderColor,
          'text-left'
        )}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{category.icon}</span>
            <div>
              <h3 className="font-semibold text-neutral-900">{category.name}</h3>
              <p className="text-sm text-neutral-600">
                {category.completedCount} / {category.itemCount} items
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-neutral-900">
              {Math.round(progressPercentage)}%
            </div>
            <div className="text-xs text-neutral-500">complete</div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-neutral-200 rounded-full h-2">
          <div
            className={cn('h-2 rounded-full transition-all duration-300', getProgressColor(progressPercentage))}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </button>
    );
  }

  return (
    <Card className={cn(
      'p-6 transition-all duration-200 hover:shadow-lg cursor-pointer',
      'hover:scale-[1.02]'
    )} onClick={() => onClick?.(category.id)}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={cn(
              'w-12 h-12 rounded-xl flex items-center justify-center',
              category.backgroundColor,
              category.borderColor,
              'border-2'
            )}>
              <span className="text-2xl">{category.icon}</span>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-neutral-900">{category.name}</h3>
              <p className="text-sm text-neutral-600">{category.description}</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-2xl font-bold text-neutral-900">
              {Math.round(progressPercentage)}%
            </div>
            <div className="text-sm text-neutral-500">complete</div>
          </div>
        </div>

        {/* Progress Details */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-neutral-600">Progress</span>
            <span className="font-medium text-neutral-900">
              {category.completedCount} of {category.itemCount} items
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-neutral-200 rounded-full h-3">
            <div
              className={cn('h-3 rounded-full transition-all duration-300', getProgressColor(progressPercentage))}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Budget Information */}
        {showBudget && (category.totalEstimatedCost > 0 || category.totalActualCost > 0) && (
          <div className="space-y-3 p-4 bg-neutral-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-neutral-700">Budget</span>
              <span className={cn(
                'text-sm font-medium',
                getBudgetColor(budgetSpentPercentage)
              )}>
                {formatCurrency(category.totalActualCost)} / {formatCurrency(category.totalEstimatedCost)}
              </span>
            </div>
            
            {/* Budget Progress Bar */}
            <div className="w-full bg-neutral-200 rounded-full h-2">
              <div
                className={cn(
                  'h-2 rounded-full transition-all duration-300',
                  budgetSpentPercentage > 100 ? 'bg-error-500' : 'bg-success-500'
                )}
                style={{ width: `${Math.min(100, budgetSpentPercentage)}%` }}
              />
            </div>
            
            {budgetSpentPercentage > 100 && (
              <div className="flex items-center space-x-2 text-amber-600 text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>Over budget by {formatCurrency(category.totalActualCost - category.totalEstimatedCost)}</span>
              </div>
            )}
          </div>
        )}

        {/* Quick Actions */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-neutral-500">
            {category.itemCount - category.completedCount} items remaining
          </div>
          <Button variant="ghost" size="sm">
            View Items
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Button>
        </div>
      </div>
    </Card>
  );
}
