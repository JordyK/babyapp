'use client';

import React, { useState, useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, Button } from '@/components/ui';
import { DashboardLayout } from '@/components/dashboard';
import { Container } from '@/components/layout';
import { 
  ChecklistItemCard, 
  CategoryProgressCard, 
  BudgetWidget, 
  CountdownWidget, 
  RecommendationWidget 
} from '@/components/checklist';
import { generateMockData } from '@/lib/checklist/mockData';
import type { ChecklistCategory, ChecklistItem, ChecklistItemStatus } from '@/lib/checklist/types';

export default function ChecklistsPage() {
  const { user, loading } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<ChecklistCategory | null>(null);
  const [items, setItems] = useState<Record<string, ChecklistItem>>({});

  // Generate mock data
  const mockData = useMemo(() => generateMockData({
    itemCount: 50,
    completionRate: 0.3,
    budgetRange: { min: 10, max: 500 },
    dueDate: new Date(Date.now() + (120 * 24 * 60 * 60 * 1000)) // 4 months from now
  }), []);

  // Handle item status changes
  const handleStatusChange = (itemId: string, status: ChecklistItemStatus) => {
    setItems(prev => {
      const existingItem = prev[itemId];
      if (!existingItem) return prev;
      return {
        ...prev,
        [itemId]: { ...existingItem, status }
      };
    });
  };

  // Handle cost updates
  const handleCostUpdate = (itemId: string, cost: number) => {
    setItems(prev => {
      const existingItem = prev[itemId];
      if (!existingItem) return prev;
      return {
        ...prev,
        [itemId]: { ...existingItem, actualCost: cost }
      };
    });
  };

  // Handle note updates
  const handleNoteUpdate = (itemId: string, notes: string) => {
    setItems(prev => {
      const existingItem = prev[itemId];
      if (!existingItem) return prev;
      return {
        ...prev,
        [itemId]: { ...existingItem, notes }
      };
    });
  };

  // Get items for selected category
  const categoryItems = selectedCategory 
    ? mockData.categories.find(cat => cat.id === selectedCategory)?.items || []
    : [];

  // Update items with local changes
  const updatedItems = categoryItems.map(item => ({
    ...item,
    ...items[item.id]
  }));

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <Card className="w-full max-w-md p-8 text-center">
          <h1 className="text-2xl font-semibold text-neutral-900 mb-4">
            Not authenticated
          </h1>
          <p className="text-neutral-600 mb-6">
            Please sign in to access your checklists.
          </p>
          <Button className="w-full">Sign in</Button>
        </Card>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <Container>
        <div className="py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-semibold text-neutral-900">
                  My Checklists
                </h1>
                <p className="text-neutral-600 mt-2">
                  Track your baby preparation progress across all categories
                </p>
              </div>
              <Button>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Item
              </Button>
            </div>
          </div>

          {/* Top Widgets Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <CountdownWidget countdown={mockData.dueDateCountdown!} compact={true} />
            <BudgetWidget budget={mockData.budget} compact={true} />
            <RecommendationWidget 
              recommendations={mockData.recommendations} 
              maxItems={2} 
              compact={true} 
            />
          </div>

          {/* Category Progress Cards */}
          {!selectedCategory && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">Categories</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {mockData.categories.map((category) => (
                  <CategoryProgressCard
                    key={category.id}
                    category={category}
                    onClick={setSelectedCategory}
                    compact={true}
                    showBudget={true}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Selected Category Items */}
          {selectedCategory && (
            <div className="space-y-6">
              {/* Category Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="text-neutral-600 hover:text-neutral-900"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <div>
                    <h2 className="text-xl font-semibold text-neutral-900">
                      {mockData.categories.find(cat => cat.id === selectedCategory)?.name}
                    </h2>
                    <p className="text-neutral-600">
                      {updatedItems.filter(item => item.status === 'completed').length} of {updatedItems.length} items completed
                    </p>
                  </div>
                </div>
                <Button variant="secondary" size="sm">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Item
                </Button>
              </div>

              {/* Category Budget Widget */}
              <BudgetWidget 
                budget={mockData.budget} 
                compact={false}
                showBreakdown={false}
              />

              {/* Items List */}
              <div className="space-y-4">
                {updatedItems.map((item) => (
                  <ChecklistItemCard
                    key={item.id}
                    item={item}
                    onStatusChange={handleStatusChange}
                    onCostUpdate={handleCostUpdate}
                    onNoteUpdate={handleNoteUpdate}
                    compact={false}
                    showActions={true}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Bottom Widgets Row */}
          {!selectedCategory && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
              <BudgetWidget 
                budget={mockData.budget} 
                compact={false} 
                showBreakdown={true} 
              />
              <RecommendationWidget 
                recommendations={mockData.recommendations} 
                maxItems={5} 
                compact={false} 
              />
            </div>
          )}

          {/* Overall Progress Summary */}
          {!selectedCategory && (
            <Card className="mt-8 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Overall Progress</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-neutral-900">{mockData.progress.totalItems}</div>
                  <div className="text-sm text-neutral-600">Total Items</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-success-600">{mockData.progress.completedItems}</div>
                  <div className="text-sm text-neutral-600">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-600">{mockData.progress.inProgressItems}</div>
                  <div className="text-sm text-neutral-600">In Progress</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600">{Math.round(mockData.progress.percentage)}%</div>
                  <div className="text-sm text-neutral-600">Complete</div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </Container>
    </DashboardLayout>
  );
}
