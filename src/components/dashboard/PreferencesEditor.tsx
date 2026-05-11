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
  const [editingField, setEditingField] = useState<string | null>(null);

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold text-neutral-900">Your Preferences</h2>
        <p className="text-xs text-neutral-400">Tap any value to edit</p>
      </div>

      <div className="space-y-4">
        {PREFERENCE_GROUPS.map((group) => (
          <Card key={group.title} className="p-4">
            <p className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-3">
              {group.title}
            </p>
            <div className="space-y-3">
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
          </Card>
        ))}
      </div>
    </div>
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
