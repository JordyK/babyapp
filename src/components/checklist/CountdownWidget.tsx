'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui';
import { DueDateCountdown, CountdownWidgetProps } from '@/lib/checklist/types';

/**
 * Countdown widget component
 * 
 * Displays due date countdown with days remaining, weeks remaining,
 * trimester information, and progress through pregnancy.
 */
export function CountdownWidget({ countdown, compact = false }: CountdownWidgetProps) {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const getTrimesterColor = (trimester: number) => {
    switch (trimester) {
      case 1: return 'bg-blue-100 text-blue-700 border-blue-200';
      case 2: return 'bg-green-100 text-green-700 border-green-200';
      case 3: return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-neutral-100 text-neutral-700 border-neutral-200';
    }
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-success-500';
    if (percentage >= 70) return 'bg-primary-500';
    if (percentage >= 40) return 'bg-amber-500';
    return 'bg-neutral-300';
  };

  const getUrgencyColor = (daysRemaining: number) => {
    if (daysRemaining <= 7) return 'text-error-600';
    if (daysRemaining <= 30) return 'text-amber-600';
    if (daysRemaining <= 60) return 'text-primary-600';
    return 'text-success-600';
  };

  const getUrgencyMessage = (daysRemaining: number) => {
    if (daysRemaining < 0) return 'Baby has arrived!';
    if (daysRemaining === 0) return 'Due today!';
    if (daysRemaining === 1) return 'Due tomorrow!';
    if (daysRemaining <= 7) return 'Due this week!';
    if (daysRemaining <= 14) return 'Due soon!';
    if (daysRemaining <= 30) return 'Getting close!';
    return 'Plenty of time';
  };

  if (compact) {
    return (
      <Card className={cn(
        'p-4',
        countdown.isOverdue ? 'bg-error-50 border-error-200' : 'bg-primary-50 border-primary-200'
      )}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-neutral-700">Due Date</p>
            <p className="text-lg font-bold text-neutral-900">
              {countdown.daysRemaining > 0 ? `${countdown.daysRemaining} days` : 'Arrived!'}
            </p>
          </div>
          <div className="text-right">
            <div className={cn('text-lg font-bold', getUrgencyColor(countdown.daysRemaining))}>
              {countdown.weeksRemaining > 0 ? `${countdown.weeksRemaining} weeks` : '0 weeks'}
            </div>
            <p className="text-xs text-neutral-600">remaining</p>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-3 w-full bg-neutral-200 rounded-full h-2">
          <div
            className={cn('h-2 rounded-full transition-all duration-300', getProgressColor(countdown.progressPercentage))}
            style={{ width: `${countdown.progressPercentage}%` }}
          />
        </div>
      </Card>
    );
  }

  return (
    <Card className={cn(
      'p-6',
      countdown.isOverdue ? 'bg-error-50 border-error-200' : 'bg-white'
    )}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-neutral-900">Due Date Countdown</h3>
            <p className="text-sm text-neutral-600">Track your pregnancy journey</p>
          </div>
          <div className={cn(
            'px-3 py-1 rounded-full text-sm font-medium border',
            getTrimesterColor(countdown.trimester)
          )}>
            Trimester {countdown.trimester}
          </div>
        </div>

        {/* Main Countdown */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-primary-50 rounded-lg">
            <div className={cn('text-3xl font-bold', getUrgencyColor(countdown.daysRemaining))}>
              {formatNumber(countdown.daysRemaining)}
            </div>
            <p className="text-sm text-primary-600 mt-1">
              {countdown.daysRemaining === 1 ? 'Day' : 'Days'} Remaining
            </p>
          </div>
          <div className="text-center p-4 bg-amber-50 rounded-lg">
            <div className="text-3xl font-bold text-amber-700">
              {formatNumber(countdown.weeksRemaining)}
            </div>
            <p className="text-sm text-amber-600 mt-1">
              {countdown.weeksRemaining === 1 ? 'Week' : 'Weeks'} Remaining
            </p>
          </div>
        </div>

        {/* Due Date Information */}
        <div className="p-4 bg-neutral-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-neutral-700">Due Date</span>
            <span className="text-sm text-neutral-600">
              {countdown.dueDate.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className={cn(
              'px-2 py-1 rounded-full text-xs font-medium',
              getUrgencyColor(countdown.daysRemaining)
            )}>
              {getUrgencyMessage(countdown.daysRemaining)}
            </div>
            {countdown.isOverdue && (
              <div className="px-2 py-1 rounded-full text-xs font-medium bg-error-100 text-error-700">
                Overdue by {formatNumber(Math.abs(countdown.daysRemaining))} days
              </div>
            )}
          </div>
        </div>

        {/* Pregnancy Progress */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-neutral-700">Pregnancy Progress</span>
            <span className="text-sm font-medium text-neutral-900">
              {Math.round(countdown.progressPercentage)}% Complete
            </span>
          </div>
          
          <div className="w-full bg-neutral-200 rounded-full h-3">
            <div
              className={cn('h-3 rounded-full transition-all duration-300', getProgressColor(countdown.progressPercentage))}
              style={{ width: `${countdown.progressPercentage}%` }}
            />
          </div>
          
          <div className="flex justify-between text-xs text-neutral-500">
            <span>Week 1</span>
            <span>Week 40</span>
          </div>
        </div>

        {/* Trimester Information */}
        <div className="grid grid-cols-3 gap-2">
          <div className={cn(
            'p-3 rounded-lg text-center border-2',
            countdown.trimester === 1 ? 'bg-blue-50 border-blue-200' : 'bg-neutral-50 border-neutral-200'
          )}>
            <div className="text-sm font-medium text-neutral-900">1st</div>
            <div className="text-xs text-neutral-600">Weeks 1-12</div>
          </div>
          <div className={cn(
            'p-3 rounded-lg text-center border-2',
            countdown.trimester === 2 ? 'bg-green-50 border-green-200' : 'bg-neutral-50 border-neutral-200'
          )}>
            <div className="text-sm font-medium text-neutral-900">2nd</div>
            <div className="text-xs text-neutral-600">Weeks 13-27</div>
          </div>
          <div className={cn(
            'p-3 rounded-lg text-center border-2',
            countdown.trimester === 3 ? 'bg-purple-50 border-purple-200' : 'bg-neutral-50 border-neutral-200'
          )}>
            <div className="text-sm font-medium text-neutral-900">3rd</div>
            <div className="text-xs text-neutral-600">Weeks 28-40</div>
          </div>
        </div>

        {/* Urgency Message */}
        {countdown.daysRemaining <= 14 && (
          <div className={cn(
            'flex items-center space-x-2 p-3 rounded-lg border',
            countdown.daysRemaining <= 7 ? 'bg-error-50 border-error-200' : 'bg-amber-50 border-amber-200'
          )}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className={cn(
              'text-sm',
              countdown.daysRemaining <= 7 ? 'text-error-700' : 'text-amber-700'
            )}>
              {countdown.daysRemaining <= 7 
                ? 'Final preparations needed! Make sure your hospital bag is packed and emergency contacts are ready.'
                : 'Time to start final preparations. Review your checklist and complete any remaining tasks.'
              }
            </p>
          </div>
        )}

        {/* Success Message */}
        {countdown.isOverdue && (
          <div className="flex items-center space-x-2 p-3 bg-success-50 border border-success-200 rounded-lg">
            <svg className="w-5 h-5 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-success-700">
              Congratulations! Your baby has arrived. Focus on recovery and enjoying this special time.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
