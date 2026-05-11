export type ChecklistCategory =
  | 'nursery'
  | 'feeding'
  | 'diapering'
  | 'clothing'
  | 'bathing'
  | 'health_safety'
  | 'travel_gear'
  | 'play_development';

export type ChecklistPriority = 'essential' | 'recommended' | 'nice_to_have';

export type ChecklistStatus = 'pending' | 'done' | 'skipped';

export interface ChecklistItem {
  id: string;
  name: string;
  description: string;
  category: ChecklistCategory;
  priority: ChecklistPriority;
  conditions: Record<string, string[]>;
  sort_order: number;
  explainer: string;
  tips: string;
}

export interface GiftClaim {
  id: string;
  share_token: string;
  item_id: string;
  claimer_name: string;
  claimed_at: string;
}

export type CollaboratorStatus = 'pending' | 'accepted';

export interface ChecklistCollaborator {
  id: string;
  owner_id: string;
  collaborator_id: string | null;
  collaborator_email: string;
  status: CollaboratorStatus;
  created_at: string;
}

export interface UserChecklistItem {
  id: string;
  user_id: string;
  item_id: string | null;
  name: string;
  category: ChecklistCategory;
  status: ChecklistStatus;
  is_custom: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export const CATEGORY_LABELS: Record<ChecklistCategory, string> = {
  nursery: 'Nursery',
  feeding: 'Feeding',
  diapering: 'Diapering',
  clothing: 'Clothing',
  bathing: 'Bathing',
  health_safety: 'Health & Safety',
  travel_gear: 'Travel & Gear',
  play_development: 'Play & Development',
};

export const CATEGORY_ICONS: Record<ChecklistCategory, string> = {
  nursery: '🛏️',
  feeding: '🍼',
  diapering: '🧷',
  clothing: '👶',
  bathing: '🛁',
  health_safety: '🩺',
  travel_gear: '🚗',
  play_development: '🧸',
};

export const PRIORITY_LABELS: Record<ChecklistPriority, string> = {
  essential: 'Essential',
  recommended: 'Recommended',
  nice_to_have: 'Nice to have',
};

export const CATEGORY_ORDER: ChecklistCategory[] = [
  'nursery',
  'feeding',
  'diapering',
  'clothing',
  'bathing',
  'health_safety',
  'travel_gear',
  'play_development',
];
