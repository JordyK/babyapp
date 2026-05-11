'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Card } from '@/components/ui';
import { cn } from '@/lib/utils';
import type { Profile } from '@/lib/types/profile';

interface PreferenceItem {
  field: string;
  label: string;
  options: { value: string; label: string }[];
}

interface PreferenceGroup {
  title: string;
  items: PreferenceItem[];
}

const PREFERENCE_GROUPS: PreferenceGroup[] = [
  {
    title: 'Basics',
    items: [
      {
        field: 'budget_range',
        label: 'Budget',
        options: [
          { value: 'low', label: 'Budget-Friendly' },
          { value: 'medium', label: 'Balanced' },
          { value: 'high', label: 'Premium' },
        ],
      },
      {
        field: 'baby_count',
        label: 'Expecting',
        options: [
          { value: '1', label: 'One baby' },
          { value: 'twins', label: 'Twins' },
          { value: 'triplets_plus', label: 'Triplets+' },
        ],
      },
      {
        field: 'home_type',
        label: 'Home type',
        options: [
          { value: 'apartment', label: 'Apartment' },
          { value: 'small_house', label: 'Small house' },
          { value: 'large_house', label: 'Large house' },
        ],
      },
      {
        field: 'style_preference',
        label: 'Style',
        options: [
          { value: 'minimalist', label: 'Minimalist' },
          { value: 'premium', label: 'Premium' },
        ],
      },
    ],
  },
  {
    title: 'Feeding & Sleep',
    items: [
      {
        field: 'feeding_preference',
        label: 'Feeding plan',
        options: [
          { value: 'breastfeeding', label: 'Breastfeeding' },
          { value: 'formula', label: 'Formula' },
          { value: 'combination', label: 'Combination' },
          { value: 'not_sure', label: 'Not sure yet' },
        ],
      },
      {
        field: 'sleeping_preference',
        label: 'Sleeping',
        options: [
          { value: 'our_bedroom', label: 'Our bedroom' },
          { value: 'separate_nursery', label: 'Separate nursery' },
          { value: 'combination', label: 'Combination' },
          { value: 'not_sure', label: 'Not sure yet' },
        ],
      },
    ],
  },
  {
    title: 'Home & Space',
    items: [
      {
        field: 'nursery_plan',
        label: 'Nursery',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
          { value: 'not_sure', label: 'Not sure' },
        ],
      },
      {
        field: 'storage_space',
        label: 'Storage',
        options: [
          { value: 'very_limited', label: 'Very limited' },
          { value: 'moderate', label: 'Moderate' },
          { value: 'plenty', label: 'Plenty' },
        ],
      },
    ],
  },
  {
    title: 'Lifestyle',
    items: [
      {
        field: 'lifestyle_style',
        label: 'Style',
        options: [
          { value: 'minimalist', label: 'Minimalist' },
          { value: 'practical', label: 'Practical' },
          { value: 'premium', label: 'Premium' },
          { value: 'eco_conscious', label: 'Eco-conscious' },
        ],
      },
      {
        field: 'parenting_approach',
        label: 'Approach',
        options: [
          { value: 'simple', label: 'Keep it simple' },
          { value: 'research', label: 'Research everything' },
          { value: 'premium_convenience', label: 'Premium convenience' },
          { value: 'eco_conscious', label: 'Eco-conscious' },
        ],
      },
      {
        field: 'shopping_preference',
        label: 'Shopping priority',
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
    title: 'Daily Life',
    items: [
      {
        field: 'travel_frequency',
        label: 'Car travel',
        options: [
          { value: 'rarely', label: 'Rarely' },
          { value: 'sometimes', label: 'Sometimes' },
          { value: 'frequently', label: 'Frequently' },
        ],
      },
      {
        field: 'work_situation',
        label: 'Work situation',
        options: [
          { value: 'one_home', label: 'One parent home' },
          { value: 'both_working', label: 'Both working' },
          { value: 'flexible', label: 'Flexible / hybrid' },
          { value: 'not_sure', label: 'Not sure yet' },
        ],
      },
      {
        field: 'support_network',
        label: 'Support',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'occasionally', label: 'Occasionally' },
          { value: 'no', label: 'No' },
        ],
      },
    ],
  },
];

interface PreferencesEditorProps {
  readonly profile: Profile;
}

export function PreferencesEditor({ profile }: PreferencesEditorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);

  return (
    <Card className="p-0 overflow-hidden">
      {/* Collapsed header */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-neutral-50/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <p className="font-medium text-sm text-neutral-800">Your Preferences</p>
            <p className="text-xs text-neutral-400">Tap to view or edit your answers</p>
          </div>
        </div>
        <svg
          className={cn('w-5 h-5 text-neutral-300 transition-transform duration-200', isOpen && 'rotate-180')}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Expanded content */}
      {isOpen && (
        <div className="px-5 pb-5 border-t border-neutral-100 space-y-4 pt-4">
          {PREFERENCE_GROUPS.map((group) => (
            <div key={group.title}>
              <p className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2">
                {group.title}
              </p>
              <div className="space-y-2">
                {group.items.map((item) => (
                  <PreferenceRow
                    key={item.field}
                    item={item}
                    value={(profile as unknown as Record<string, unknown>)[item.field] as string | null}
                    isEditing={editingField === item.field}
                    onEdit={() => setEditingField(editingField === item.field ? null : item.field)}
                    onSaved={() => setEditingField(null)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

interface PreferenceRowProps {
  readonly item: PreferenceItem;
  readonly value: string | null;
  readonly isEditing: boolean;
  readonly onEdit: () => void;
  readonly onSaved: () => void;
}

function PreferenceRow({ item, value, isEditing, onEdit, onSaved }: PreferenceRowProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const currentLabel = item.options.find((o) => o.value === value)?.label ?? null;

  const handleSelect = async (newValue: string) => {
    setSaving(true);
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      await supabase
        .from('profiles')
        .update({ [item.field]: newValue })
        .eq('id', user.id);

      router.refresh();
      onSaved();
    } catch (e) {
      console.error('Failed to update preference:', e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-neutral-500">{item.label}</span>
        <button
          type="button"
          onClick={onEdit}
          className={cn(
            'text-sm font-medium transition-colors',
            currentLabel
              ? 'text-neutral-800 hover:text-primary-600'
              : 'text-neutral-300 hover:text-primary-600'
          )}
        >
          {currentLabel ?? 'Not set'}
        </button>
      </div>

      {isEditing && (
        <div className="flex flex-wrap gap-1.5 mt-2 animate-fade-in">
          {item.options.map((option) => (
            <button
              key={option.value}
              type="button"
              disabled={saving}
              onClick={() => handleSelect(option.value)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150',
                'border focus:outline-none disabled:opacity-50',
                value === option.value
                  ? 'bg-primary-50 border-primary-400 text-primary-700'
                  : 'bg-white border-neutral-200 text-neutral-600 hover:border-primary-300'
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
