export type BudgetRange = 'low' | 'medium' | 'high';
export type BabyCount = '1' | 'twins' | 'triplets_plus';
export type HomeType = 'apartment' | 'small_house' | 'large_house';
export type StylePreference = 'minimalist' | 'premium' | null;

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
