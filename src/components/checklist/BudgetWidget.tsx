'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui';
import { ChecklistBudget, BudgetWidgetProps, CATEGORY_METADATA } from '@/lib/checklist/types';

/**
 * Budget widget component
 * 
 * Displays overall budget information including estimated costs,
 * actual spending, and remaining budget with optional category breakdown.
 */
export function BudgetWidget({ budget, compact = false, showBreakdown = false }: BudgetWidgetProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getBudgetStatus = () => {
    const spentPercentage = budget.totalEstimated > 0 
      ? (budget.totalSpent / budget.totalEstimated) * 100 
      : 0;

    if (spentPercentage > 100) return { status: 'over', color: 'text-error-600', bgColor: 'bg-error-50' };
    if (spentPercentage >= 90) return { status: 'warning', color: 'text-amber-600', bgColor: 'bg-amber-50' };
    if (spentPercentage >= 75) return { status: 'on-track', color: 'text-primary-600', bgColor: 'bg-primary-50' };
    return { status: 'under', color: 'text-success-600', bgColor: 'bg-success-50' };
  };

  const budgetStatus = getBudgetStatus();
  const spentPercentage = budget.totalEstimated > 0 
    ? (budget.totalSpent / budget.totalEstimated) * 100 
    : 0;

  if (compact) {
    return (
      <Card className={cn('p-4', budgetStatus.bgColor, 'border-2', budgetStatus.bgColor.replace('bg-', 'border-'))}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-neutral-700">Total Budget</p>
            <p className="text-xl font-bold text-neutral-900">
              {formatCurrency(budget.totalSpent)} / {formatCurrency(budget.totalEstimated)}
            </p>
          </div>
          <div className="text-right">
            <div className={cn('text-lg font-bold', budgetStatus.color)}>
              {formatCurrency(budget.remaining)}
            </div>
            <p className="text-xs text-neutral-600">remaining</p>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-3 w-full bg-neutral-200 rounded-full h-2">
          <div
            className={cn(
              'h-2 rounded-full transition-all duration-300',
              spentPercentage > 100 ? 'bg-error-500' : 'bg-success-500'
            )}
            style={{ width: `${Math.min(100, spentPercentage)}%` }}
          />
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-neutral-900">Budget Overview</h3>
            <p className="text-sm text-neutral-600">Track your baby preparation expenses</p>
          </div>
          <div className={cn(
            'px-3 py-1 rounded-full text-sm font-medium',
            budgetStatus.bgColor,
            budgetStatus.color
          )}>
            {budgetStatus.status === 'over' ? 'Over Budget' : 
             budgetStatus.status === 'warning' ? 'Near Limit' :
             budgetStatus.status === 'on-track' ? 'On Track' : 'Under Budget'}
          </div>
        </div>

        {/* Main Budget Summary */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-neutral-50 rounded-lg">
            <p className="text-sm text-neutral-600 mb-1">Estimated</p>
            <p className="text-xl font-bold text-neutral-900">
              {formatCurrency(budget.totalEstimated)}
            </p>
          </div>
          <div className="text-center p-4 bg-primary-50 rounded-lg">
            <p className="text-sm text-primary-600 mb-1">Spent</p>
            <p className="text-xl font-bold text-primary-900">
              {formatCurrency(budget.totalSpent)}
            </p>
          </div>
          <div className={cn(
            'text-center p-4 rounded-lg',
            budget.remaining >= 0 ? 'bg-success-50' : 'bg-error-50'
          )}>
            <p className={cn(
              'text-sm mb-1',
              budget.remaining >= 0 ? 'text-success-600' : 'text-error-600'
            )}>
              {budget.remaining >= 0 ? 'Remaining' : 'Over'}
            </p>
            <p className={cn(
              'text-xl font-bold',
              budget.remaining >= 0 ? 'text-success-900' : 'text-error-900'
            )}>
              {formatCurrency(Math.abs(budget.remaining))}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-neutral-600">Budget Usage</span>
            <span className="font-medium text-neutral-900">
              {Math.round(spentPercentage)}% used
            </span>
          </div>
          <div className="w-full bg-neutral-200 rounded-full h-3">
            <div
              className={cn(
                'h-3 rounded-full transition-all duration-300',
                spentPercentage > 100 ? 'bg-error-500' : 'bg-success-500'
              )}
              style={{ width: `${Math.min(100, spentPercentage)}%` }}
            />
          </div>
        </div>

        {/* Budget Status Message */}
        {budgetStatus.status === 'over' && (
          <div className="flex items-center space-x-2 p-3 bg-error-50 border border-error-200 rounded-lg">
            <svg className="w-5 h-5 text-error-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="text-sm text-error-700">
              You're over budget by {formatCurrency(Math.abs(budget.remaining))}. Consider reviewing your expenses.
            </p>
          </div>
        )}

        {budgetStatus.status === 'warning' && (
          <div className="flex items-center space-x-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="text-sm text-amber-700">
              You're approaching your budget limit. Keep track of remaining expenses.
            </p>
          </div>
        )}

        {/* Category Breakdown */}
        {showBreakdown && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-neutral-900">Category Breakdown</h4>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                {isExpanded ? 'Hide' : 'Show'} Details
              </button>
            </div>
            
            {isExpanded && (
              <div className="space-y-3">
                {Object.entries(budget.byCategory).map(([categoryId, categoryBudget]) => {
                  const metadata = CATEGORY_METADATA[categoryId as keyof typeof CATEGORY_METADATA];
                  const categorySpentPercentage = categoryBudget.estimated > 0 
                    ? (categoryBudget.spent / categoryBudget.estimated) * 100 
                    : 0;

                  return (
                    <div key={categoryId} className="flex items-center space-x-3 p-3 bg-neutral-50 rounded-lg">
                      <div className={cn(
                        'w-8 h-8 rounded-lg flex items-center justify-center text-sm',
                        metadata.backgroundColor,
                        metadata.borderColor,
                        'border'
                      )}>
                        <span>{metadata.icon}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-neutral-900 truncate">
                            {metadata.name}
                          </span>
                          <span className="text-sm text-neutral-600">
                            {formatCurrency(categoryBudget.spent)} / {formatCurrency(categoryBudget.estimated)}
                          </span>
                        </div>
                        <div className="w-full bg-neutral-200 rounded-full h-1.5">
                          <div
                            className={cn(
                              'h-1.5 rounded-full transition-all duration-300',
                              categorySpentPercentage > 100 ? 'bg-error-500' : 'bg-success-500'
                            )}
                            style={{ width: `${Math.min(100, categorySpentPercentage)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
