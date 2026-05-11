import type { ProgressiveProfileField } from '@/lib/types/profile';

export interface QuestionOption {
  value: string;
  label: string;
}

export interface ProfileQuestion {
  field: ProgressiveProfileField;
  title: string;
  options: QuestionOption[];
}

export interface QuestionGroup {
  id: string;
  title: string;
  description: string;
  icon: string;
  questions: ProfileQuestion[];
}

export const QUESTION_GROUPS: QuestionGroup[] = [
  {
    id: 'feeding-sleep',
    title: 'Feeding & Sleep',
    description: 'Helps us recommend the right feeding supplies and sleep products.',
    icon: '🍼',
    questions: [
      {
        field: 'feeding_preference',
        title: 'How are you planning to feed your baby?',
        options: [
          { value: 'breastfeeding', label: 'Breastfeeding' },
          { value: 'formula', label: 'Formula feeding' },
          { value: 'combination', label: 'Combination feeding' },
          { value: 'not_sure', label: 'Not sure yet' },
        ],
      },
      {
        field: 'sleeping_preference',
        title: 'Where will your baby likely sleep during the first months?',
        options: [
          { value: 'our_bedroom', label: 'In our bedroom' },
          { value: 'separate_nursery', label: 'Separate nursery' },
          { value: 'combination', label: 'Combination' },
          { value: 'not_sure', label: 'Not sure yet' },
        ],
      },
    ],
  },
  {
    id: 'home-space',
    title: 'Home & Space',
    description: 'Helps us suggest products that fit your living situation.',
    icon: '🏠',
    questions: [
      {
        field: 'nursery_plan',
        title: 'Will your baby have a separate nursery?',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
          { value: 'not_sure', label: 'Not sure yet' },
        ],
      },
      {
        field: 'storage_space',
        title: 'How much storage space do you have?',
        options: [
          { value: 'very_limited', label: 'Very limited' },
          { value: 'moderate', label: 'Moderate' },
          { value: 'plenty', label: 'Plenty of space' },
        ],
      },
    ],
  },
  {
    id: 'lifestyle',
    title: 'Lifestyle & Preferences',
    description: 'Helps us match recommendations to your values and style.',
    icon: '✨',
    questions: [
      {
        field: 'lifestyle_style',
        title: 'Which style best describes you?',
        options: [
          { value: 'minimalist', label: 'Minimalist' },
          { value: 'practical', label: 'Practical' },
          { value: 'premium', label: 'Premium' },
          { value: 'eco_conscious', label: 'Eco-conscious' },
        ],
      },
      {
        field: 'parenting_approach',
        title: 'Which approach sounds most like you?',
        options: [
          { value: 'simple', label: 'Keep things simple' },
          { value: 'research', label: 'Research everything' },
          { value: 'premium_convenience', label: 'Premium convenience' },
          { value: 'eco_conscious', label: 'Eco-conscious parenting' },
        ],
      },
      {
        field: 'shopping_preference',
        title: 'What matters most when choosing baby products?',
        options: [
          { value: 'lowest_price', label: 'Lowest price' },
          { value: 'best_value', label: 'Best value' },
          { value: 'premium_quality', label: 'Premium quality' },
          { value: 'sustainability', label: 'Sustainability' },
        ],
      },
    ],
  },
  {
    id: 'daily-life',
    title: 'Daily Life',
    description: 'Helps us understand your routine and recommend accordingly.',
    icon: '🌤️',
    questions: [
      {
        field: 'travel_frequency',
        title: 'How often will you travel by car with your baby?',
        options: [
          { value: 'rarely', label: 'Rarely' },
          { value: 'sometimes', label: 'Sometimes' },
          { value: 'frequently', label: 'Frequently' },
        ],
      },
      {
        field: 'work_situation',
        title: 'What will your work situation likely look like after birth?',
        options: [
          { value: 'one_home', label: 'One parent staying home' },
          { value: 'both_working', label: 'Both working' },
          { value: 'flexible', label: 'Flexible / hybrid' },
          { value: 'not_sure', label: 'Not sure yet' },
        ],
      },
      {
        field: 'support_network',
        title: 'Will family or friends regularly help with childcare?',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'occasionally', label: 'Occasionally' },
          { value: 'no', label: 'No' },
        ],
      },
    ],
  },
];

/** Total number of progressive profiling questions */
export const TOTAL_PROFILE_QUESTIONS = QUESTION_GROUPS.reduce(
  (sum, group) => sum + group.questions.length,
  0
);
