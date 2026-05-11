// User Types
export interface User {
  readonly id: string;
  readonly email: string;
  readonly fullName: string | null;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

// Checklist Types
export interface Checklist {
  readonly id: string;
  readonly userId: string;
  readonly title: string;
  readonly description: string | null;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface ChecklistItem {
  readonly id: string;
  readonly checklistId: string;
  readonly name: string;
  readonly completed: boolean;
  readonly priority: number;
  readonly notes: string | null;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

// API Types
export interface ApiResponse<T> {
  readonly data: T;
  readonly error: string | null;
  readonly success: boolean;
}

export interface CreateChecklistData {
  readonly title: string;
  readonly description?: string;
}

export interface UpdateChecklistData {
  readonly title?: string;
  readonly description?: string;
}

export interface CreateChecklistItemData {
  readonly checklistId: string;
  readonly name: string;
  readonly priority?: number;
  readonly notes?: string;
}

export interface UpdateChecklistItemData {
  readonly name?: string;
  readonly completed?: boolean;
  readonly priority?: number;
  readonly notes?: string;
}

// Component Props Types
export interface BaseComponentProps {
  readonly className?: string;
  readonly children?: React.ReactNode;
}

// Status Types
export type ChecklistStatus = 'pending' | 'in_progress' | 'completed';
export type Priority = 1 | 2 | 3 | 4 | 5;
