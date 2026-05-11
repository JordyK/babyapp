export type BudgetRange = 'low' | 'medium' | 'high';
export type BabyCount = '1' | 'twins' | 'triplets_plus';
export type HomeType = 'apartment' | 'small_house' | 'large_house';
export type StylePreference = 'minimalist' | 'premium' | null;

// Progressive profiling types
export type FeedingPreference = 'breastfeeding' | 'formula' | 'combination' | 'not_sure';
export type TravelFrequency = 'rarely' | 'sometimes' | 'frequently';
export type LifestyleStyle = 'minimalist' | 'practical' | 'premium' | 'eco_conscious';
export type NurseryPlan = 'yes' | 'no' | 'not_sure';
export type StorageSpace = 'very_limited' | 'moderate' | 'plenty';
export type SupportNetwork = 'yes' | 'occasionally' | 'no';
export type WorkSituation = 'one_home' | 'both_working' | 'flexible' | 'not_sure';
export type ParentingApproach = 'simple' | 'research' | 'premium_convenience' | 'eco_conscious';
export type SleepingPreference = 'our_bedroom' | 'separate_nursery' | 'combination' | 'not_sure';
export type ShoppingPreference = 'lowest_price' | 'best_value' | 'premium_quality' | 'sustainability';

export interface Profile {
  id: string;
  full_name: string;
  due_date: string | null;
  budget_range: BudgetRange | null;
  first_child: boolean | null;
  baby_count: BabyCount | null;
  home_type: HomeType | null;
  second_hand_friendly: boolean | null;
  style_preference: StylePreference;
  onboarding_completed: boolean;
  // Progressive profiling fields
  feeding_preference: FeedingPreference | null;
  travel_frequency: TravelFrequency | null;
  lifestyle_style: LifestyleStyle | null;
  nursery_plan: NurseryPlan | null;
  storage_space: StorageSpace | null;
  support_network: SupportNetwork | null;
  work_situation: WorkSituation | null;
  parenting_approach: ParentingApproach | null;
  sleeping_preference: SleepingPreference | null;
  shopping_preference: ShoppingPreference | null;
  created_at: string;
  updated_at: string;
}

export interface OnboardingAnswers {
  due_date: string | null;
  budget_range: BudgetRange | null;
  first_child: boolean | null;
  baby_count: BabyCount | null;
  home_type: HomeType | null;
  second_hand_friendly: boolean | null;
  style_preference: StylePreference;
}

export interface AccountDetails {
  full_name: string;
  email: string;
  password: string;
}

/** Keys of progressive profile fields that can be updated independently */
export type ProgressiveProfileField =
  | 'feeding_preference'
  | 'travel_frequency'
  | 'lifestyle_style'
  | 'nursery_plan'
  | 'storage_space'
  | 'support_network'
  | 'work_situation'
  | 'parenting_approach'
  | 'sleeping_preference'
  | 'shopping_preference';
