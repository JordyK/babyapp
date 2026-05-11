'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button, Card } from '@/components/ui';
import { ChecklistItem, ChecklistItemStatus, ChecklistItemPriority, ChecklistItemCardProps } from '@/lib/checklist/types';

/**
 * Checklist item card component
 * 
 * Displays individual checklist items with status, priority, cost,
 * and action buttons. Supports both compact and detailed views.
 */
export function ChecklistItemCard({ 
  item, 
  onStatusChange, 
  onCostUpdate, 
  onNoteUpdate, 
  compact = false, 
  showActions = true 
}: ChecklistItemCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [editingCost, setEditingCost] = useState(false);
  const [tempCost, setTempCost] = useState(item.actualCost?.toString() || item.estimatedCost?.toString() || '');

  const getStatusColor = (status: ChecklistItemStatus) => {
    switch (status) {
      case 'completed': return 'text-success-600 bg-success-50 border-success-200';
      case 'in-progress': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'skipped': return 'text-neutral-600 bg-neutral-50 border-neutral-200';
      case 'not-started': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-neutral-600 bg-neutral-50 border-neutral-200';
    }
  };

  const getPriorityColor = (priority: ChecklistItemPriority) => {
    switch (priority) {
      case 'critical': return 'text-error-600 bg-error-50 border-error-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-neutral-600 bg-neutral-50 border-neutral-200';
    }
  };

  const getStatusIcon = (status: ChecklistItemStatus) => {
    switch (status) {
      case 'completed': return '✅';
      case 'in-progress': return '⏳';
      case 'skipped': return '⏭️';
      case 'not-started': return '⭕';
      default: return '⭕';
    }
  };

  const handleStatusChange = (newStatus: ChecklistItemStatus) => {
    if (onStatusChange) {
      onStatusChange(item.id, newStatus);
    }
  };

  const handleCostSave = () => {
    const cost = parseFloat(tempCost);
    if (!isNaN(cost) && cost >= 0 && onCostUpdate) {
      onCostUpdate(item.id, cost);
    }
    setEditingCost(false);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (compact) {
    return (
      <div className={cn(
        'p-4 border-2 rounded-xl transition-all duration-200',
        item.status === 'completed' ? 'bg-success-50 border-success-200' : 'bg-white border-neutral-200',
        'hover:shadow-md'
      )}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <button
              onClick={() => handleStatusChange(
                item.status === 'completed' ? 'not-started' : 'completed'
              )}
              className="text-xl hover:scale-110 transition-transform"
            >
              {getStatusIcon(item.status)}
            </button>
            <div className="flex-1 min-w-0">
              <h4 className={cn(
                'font-medium truncate',
                item.status === 'completed' ? 'text-neutral-500 line-through' : 'text-neutral-900'
              )}>
                {item.title}
              </h4>
              {item.estimatedCost && (
                <p className="text-sm text-neutral-600">
                  {formatCurrency(item.actualCost || item.estimatedCost)}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className={cn(
              'px-2 py-1 text-xs font-medium rounded-full border',
              getPriorityColor(item.priority)
            )}>
              {item.priority}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card className={cn(
      'p-6 transition-all duration-200',
      item.status === 'completed' ? 'bg-success-50 border-success-200' : 'bg-white',
      'hover:shadow-lg'
    )}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1 min-w-0">
            <button
              onClick={() => handleStatusChange(
                item.status === 'completed' ? 'not-started' : 'completed'
              )}
              className="text-2xl hover:scale-110 transition-transform mt-1"
            >
              {getStatusIcon(item.status)}
            </button>
            <div className="flex-1 min-w-0">
              <h3 className={cn(
                'font-semibold text-lg leading-tight',
                item.status === 'completed' ? 'text-neutral-500 line-through' : 'text-neutral-900'
              )}>
                {item.title}
              </h3>
              {item.description && (
                <p className="text-sm text-neutral-600 mt-1">
                  {item.description}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className={cn(
              'px-2 py-1 text-xs font-medium rounded-full border',
              getPriorityColor(item.priority)
            )}>
              {item.priority}
            </span>
            {item.info && (
              <div className="group relative">
                <button className="text-neutral-400 hover:text-neutral-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
                <div className="absolute right-0 mt-2 w-64 p-3 bg-white border border-neutral-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                  <p className="text-sm text-neutral-600">{item.info}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Cost Information */}
        {(item.estimatedCost || item.actualCost) && (
          <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
            <div className="flex items-center space-x-4">
              <div>
                <p className="text-xs text-neutral-500">Estimated</p>
                <p className="font-medium text-neutral-900">
                  {item.estimatedCost ? formatCurrency(item.estimatedCost) : 'N/A'}
                </p>
              </div>
              {item.actualCost && (
                <div>
                  <p className="text-xs text-neutral-500">Actual</p>
                  <p className="font-medium text-neutral-900">
                    {formatCurrency(item.actualCost)}
                  </p>
                </div>
              )}
            </div>
            
            {showActions && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditingCost(!editingCost)}
              >
                {editingCost ? 'Cancel' : 'Edit Cost'}
              </Button>
            )}
          </div>
        )}

        {/* Cost Editor */}
        {editingCost && (
          <div className="flex items-center space-x-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <input
              type="number"
              value={tempCost}
              onChange={(e) => setTempCost(e.target.value)}
              placeholder="Enter cost"
              className="flex-1 px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <Button onClick={handleCostSave} size="sm">
              Save
            </Button>
          </div>
        )}

        {/* Tags */}
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs bg-neutral-100 text-neutral-600 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Recommendations */}
        {item.recommendations && item.recommendations.length > 0 && (
          <div className="space-y-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center space-x-2 text-sm text-primary-600 hover:text-primary-700"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              <span>{isExpanded ? 'Hide' : 'Show'} Recommendations ({item.recommendations.length})</span>
            </button>
            
            {isExpanded && (
              <div className="space-y-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                {item.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <svg className="w-4 h-4 text-blue-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-blue-700">{rec}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Notes */}
        {showActions && (
          <div className="space-y-2">
            <button
              onClick={() => setShowNotes(!showNotes)}
              className="flex items-center space-x-2 text-sm text-neutral-600 hover:text-neutral-700"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span>{item.notes ? 'Edit' : 'Add'} Notes</span>
            </button>
            
            {showNotes && (
              <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                <textarea
                  value={item.notes || ''}
                  onChange={(e) => onNoteUpdate?.(item.id, e.target.value)}
                  placeholder="Add notes about this item..."
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                  rows={3}
                />
                {onNoteUpdate && (
                  <div className="mt-2 flex justify-end">
                    <Button size="sm" onClick={() => onNoteUpdate(item.id, item.notes || '')}>
                      Save Notes
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Quantity */}
        {item.quantity && item.quantity > 1 && (
          <div className="flex items-center space-x-2 text-sm text-neutral-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
            </svg>
            <span>Quantity: {item.quantity}</span>
          </div>
        )}
      </div>
    </Card>
  );
}
