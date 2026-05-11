'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Card, Button } from '@/components/ui';
import { Recommendation, RecommendationWidgetProps, CATEGORY_METADATA } from '@/lib/checklist/types';

/**
 * Recommendation widget component
 * 
 * Displays personalized recommendations including tips, articles,
 * checklists, and product suggestions with priority indicators.
 */
export function RecommendationWidget({ 
  recommendations, 
  maxItems = 3, 
  compact = false 
}: RecommendationWidgetProps) {
  const displayRecommendations = recommendations.slice(0, maxItems);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-error-600 bg-error-50 border-error-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-neutral-600 bg-neutral-50 border-neutral-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'product': return '🛍️';
      case 'tip': return '💡';
      case 'article': return '📖';
      case 'checklist': return '✅';
      default: return '📋';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'product': return 'bg-purple-50 text-purple-700';
      case 'tip': return 'bg-blue-50 text-blue-700';
      case 'article': return 'bg-green-50 text-green-700';
      case 'checklist': return 'bg-amber-50 text-amber-700';
      default: return 'bg-neutral-50 text-neutral-700';
    }
  };

  if (compact) {
    return (
      <Card className="p-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-neutral-900">Recommendations</h3>
            <span className="text-sm text-neutral-500">{recommendations.length} total</span>
          </div>
          
          <div className="space-y-2">
            {displayRecommendations.map((rec) => (
              <div key={rec.id} className="flex items-center space-x-3 p-2 bg-neutral-50 rounded-lg">
                <span className="text-lg">{getTypeIcon(rec.type)}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-neutral-900 truncate">{rec.title}</p>
                  <p className="text-xs text-neutral-600 truncate">{rec.description}</p>
                </div>
                <span className={cn(
                  'px-2 py-1 text-xs font-medium rounded-full border',
                  getPriorityColor(rec.priority)
                )}>
                  {rec.priority}
                </span>
              </div>
            ))}
          </div>
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
            <h3 className="text-lg font-semibold text-neutral-900">Personalized Recommendations</h3>
            <p className="text-sm text-neutral-600">Tips and suggestions tailored for you</p>
          </div>
          <div className="text-sm text-neutral-500">
            {recommendations.length} recommendations
          </div>
        </div>

        {/* Recommendations List */}
        <div className="space-y-4">
          {displayRecommendations.map((rec) => (
            <div key={rec.id} className="p-4 border-2 border-neutral-200 rounded-xl hover:border-primary-300 hover:shadow-md transition-all duration-200">
              <div className="flex items-start space-x-3">
                {/* Icon */}
                <div className={cn(
                  'w-10 h-10 rounded-lg flex items-center justify-center text-lg',
                  getTypeColor(rec.type)
                )}>
                  {getTypeIcon(rec.type)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-neutral-900 leading-tight">
                      {rec.title}
                    </h4>
                    <span className={cn(
                      'px-2 py-1 text-xs font-medium rounded-full border flex-shrink-0 ml-2',
                      getPriorityColor(rec.priority)
                    )}>
                      {rec.priority}
                    </span>
                  </div>

                  <p className="text-sm text-neutral-600 mb-3">
                    {rec.description}
                  </p>

                  {/* Tags and Category */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {rec.category && (
                        <div className="flex items-center space-x-1">
                          <span className="text-sm">{CATEGORY_METADATA[rec.category]?.icon}</span>
                          <span className="text-xs text-neutral-500">{CATEGORY_METADATA[rec.category]?.name}</span>
                        </div>
                      )}
                      
                      {rec.tags && rec.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {rec.tags.slice(0, 2).map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 text-xs bg-neutral-100 text-neutral-600 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                          {rec.tags.length > 2 && (
                            <span className="px-2 py-1 text-xs bg-neutral-100 text-neutral-600 rounded-full">
                              +{rec.tags.length - 2}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Action Button */}
                    {rec.link && (
                      <Button variant="ghost" size="sm">
                        Learn More
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        {recommendations.length > maxItems && (
          <div className="text-center">
            <Button variant="secondary" className="w-full">
              View All Recommendations ({recommendations.length - maxItems} more)
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </div>
        )}

        {/* Empty State */}
        {recommendations.length === 0 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-neutral-900 mb-2">
              No recommendations yet
            </h4>
            <p className="text-sm text-neutral-600 mb-4">
              Complete more checklist items to get personalized recommendations
            </p>
            <Button variant="secondary">
              Start Checklist
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
