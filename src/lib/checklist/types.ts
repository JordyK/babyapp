/**
 * Checklist Types and Interfaces
 * 
 * This file defines the type system for the checklist dashboard,
 * supporting categories, items, progress tracking, and budget estimation.
 */

/**
 * Priority levels for checklist items
 */
export type ChecklistItemPriority = 'low' | 'medium' | 'high' | 'critical';

/**
 * Status for checklist items
 */
export type ChecklistItemStatus = 'not-started' | 'in-progress' | 'completed' | 'skipped';

/**
 * Checklist categories
 */
export type ChecklistCategory = 
  | 'sleeping'
  | 'feeding'
  | 'travel'
  | 'clothing'
  | 'nursery'
  | 'health-safety'
  | 'bathing'
  | 'essentials';

/**
 * Checklist item interface
 */
export interface ChecklistItem {
  id: string;
  title: string;
  description?: string;
  category: ChecklistCategory;
  priority: ChecklistItemPriority;
  status: ChecklistItemStatus;
  estimatedCost?: number | undefined;
  actualCost?: number | undefined;
  quantity?: number | undefined;
  notes?: string | undefined;
  info?: string | undefined; // For tooltip content
  recommendations?: string[] | undefined;
  completedAt?: Date | undefined;
  dueDate?: Date | undefined;
  tags?: string[] | undefined;
  metadata?: Record<string, any> | undefined;
  // Educational content fields
  whyItMatters?: string | undefined;
  essential?: boolean | undefined;
  overspendWarning?: string | undefined;
  secondHandFriendly?: boolean | undefined;
}

/**
 * Checklist category configuration
 */
export interface ChecklistCategoryConfig {
  id: ChecklistCategory;
  name: string;
  description: string;
  icon: string;
  color: string;
  backgroundColor: string;
  borderColor: string;
  itemCount: number;
  completedCount: number;
  totalEstimatedCost: number;
  totalActualCost: number;
  items: ChecklistItem[];
}

/**
 * Overall checklist progress
 */
export interface ChecklistProgress {
  totalItems: number;
  completedItems: number;
  inProgressItems: number;
  notStartedItems: number;
  skippedItems: number;
  percentage: number;
  byCategory: Record<ChecklistCategory, {
    total: number;
    completed: number;
    percentage: number;
  }>;
}

/**
 * Budget information
 */
export interface ChecklistBudget {
  totalEstimated: number;
  totalSpent: number;
  remaining: number;
  byCategory: Record<ChecklistCategory, {
    estimated: number;
    spent: number;
    remaining: number;
  }>;
  currency: string;
}

/**
 * Due date countdown information
 */
export interface DueDateCountdown {
  dueDate: Date;
  daysRemaining: number;
  weeksRemaining: number;
  trimester: 1 | 2 | 3;
  progressPercentage: number;
  isOverdue: boolean;
  message: string;
}

/**
 * Recommendation widget data
 */
export interface Recommendation {
  id: string;
  title: string;
  description: string;
  type: 'product' | 'tip' | 'article' | 'checklist';
  priority: ChecklistItemPriority;
  category?: ChecklistCategory;
  imageUrl?: string;
  link?: string;
  tags?: string[];
}

/**
 * Checklist dashboard state
 */
export interface ChecklistDashboardState {
  categories: ChecklistCategoryConfig[];
  progress: ChecklistProgress;
  budget: ChecklistBudget;
  dueDateCountdown?: DueDateCountdown;
  recommendations: Recommendation[];
  isLoading: boolean;
  error?: string;
  lastUpdated: Date;
}

/**
 * Checklist filters
 */
export interface ChecklistFilters {
  category?: ChecklistCategory;
  status?: ChecklistItemStatus;
  priority?: ChecklistItemPriority;
  search?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  tags?: string[];
}

/**
 * Checklist sorting options
 */
export type ChecklistSortOption = 
  | 'priority-desc'
  | 'priority-asc'
  | 'cost-desc'
  | 'cost-asc'
  | 'status'
  | 'category'
  | 'title-asc'
  | 'title-desc';

/**
 * Checklist item card props
 */
export interface ChecklistItemCardProps {
  item: ChecklistItem;
  onStatusChange?: (itemId: string, status: ChecklistItemStatus) => void;
  onCostUpdate?: (itemId: string, cost: number) => void;
  onNoteUpdate?: (itemId: string, notes: string) => void;
  compact?: boolean;
  showActions?: boolean;
}

/**
 * Category progress card props
 */
export interface CategoryProgressCardProps {
  category: ChecklistCategoryConfig;
  onClick?: (category: ChecklistCategory) => void;
  compact?: boolean;
  showBudget?: boolean;
}

/**
 * Budget widget props
 */
export interface BudgetWidgetProps {
  budget: ChecklistBudget;
  compact?: boolean;
  showBreakdown?: boolean;
}

/**
 * Countdown widget props
 */
export interface CountdownWidgetProps {
  countdown: DueDateCountdown;
  compact?: boolean;
}

/**
 * Recommendation widget props
 */
export interface RecommendationWidgetProps {
  recommendations: Recommendation[];
  maxItems?: number;
  compact?: boolean;
}

/**
 * Checklist dashboard props
 */
export interface ChecklistDashboardProps {
  state: ChecklistDashboardState;
  filters?: ChecklistFilters;
  sortBy?: ChecklistSortOption;
  onFilterChange?: (filters: ChecklistFilters) => void;
  onSortChange?: (sort: ChecklistSortOption) => void;
  onItemUpdate?: (itemId: string, updates: Partial<ChecklistItem>) => void;
  onCategoryClick?: (category: ChecklistCategory) => void;
  compact?: boolean;
}

/**
 * Mock data generator options
 */
export interface MockDataOptions {
  itemCount?: number;
  completionRate?: number;
  budgetRange?: {
    min: number;
    max: number;
  };
  dueDate?: Date;
  categories?: ChecklistCategory[];
}

/**
 * Category metadata for UI display
 */
export const CATEGORY_METADATA: Record<ChecklistCategory, {
  name: string;
  description: string;
  icon: string;
  color: string;
  backgroundColor: string;
  borderColor: string;
}> = {
  sleeping: {
    name: 'Sleeping',
    description: 'Everything you need for peaceful sleep',
    icon: '🌙',
    color: 'text-indigo-600',
    backgroundColor: 'bg-indigo-50',
    borderColor: 'border-indigo-200'
  },
  feeding: {
    name: 'Feeding',
    description: 'Bottles, breastfeeding supplies, and more',
    icon: '🍼',
    color: 'text-green-600',
    backgroundColor: 'bg-green-50',
    borderColor: 'border-green-200'
  },
  travel: {
    name: 'Travel',
    description: 'Car seats, strollers, and travel gear',
    icon: '🚗',
    color: 'text-blue-600',
    backgroundColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  clothing: {
    name: 'Clothing',
    description: 'Onesies, outfits, and seasonal wear',
    icon: '👕',
    color: 'text-purple-600',
    backgroundColor: 'bg-purple-50',
    borderColor: 'border-purple-200'
  },
  nursery: {
    name: 'Nursery',
    description: 'Furniture and room essentials',
    icon: '🏠',
    color: 'text-amber-600',
    backgroundColor: 'bg-amber-50',
    borderColor: 'border-amber-200'
  },
  'health-safety': {
    name: 'Health & Safety',
    description: 'Medical supplies and safety items',
    icon: '🏥',
    color: 'text-red-600',
    backgroundColor: 'bg-red-50',
    borderColor: 'border-red-200'
  },
  bathing: {
    name: 'Bathing',
    description: 'Tub, toiletries, and bath time essentials',
    icon: '🛁',
    color: 'text-cyan-600',
    backgroundColor: 'bg-cyan-50',
    borderColor: 'border-cyan-200'
  },
  essentials: {
    name: 'Essentials',
    description: 'Must-have items for daily care',
    icon: '📦',
    color: 'text-neutral-600',
    backgroundColor: 'bg-neutral-50',
    borderColor: 'border-neutral-200'
  }
};
