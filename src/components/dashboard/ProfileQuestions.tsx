'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Card } from '@/components/ui';
import { cn } from '@/lib/utils';
import {
  QUESTION_GROUPS,
  TOTAL_PROFILE_QUESTIONS,
  type QuestionGroup,
  type ProfileQuestion,
} from '@/lib/config/profiling-questions';
import type { Profile, ProgressiveProfileField } from '@/lib/types/profile';

interface ProfileQuestionsProps {
  readonly profile: Profile;
}

function getAnsweredCount(profile: Profile): number {
  const fields: ProgressiveProfileField[] = [
    'feeding_preference',
    'travel_frequency',
    'lifestyle_style',
    'nursery_plan',
    'storage_space',
    'support_network',
    'work_situation',
    'parenting_approach',
    'sleeping_preference',
    'shopping_preference',
  ];
  return fields.filter((f) => profile[f] !== null && profile[f] !== undefined).length;
}

function getGroupAnsweredCount(profile: Profile, group: QuestionGroup): number {
  return group.questions.filter((q) => profile[q.field] !== null && profile[q.field] !== undefined).length;
}

export function ProfileQuestions({ profile }: ProfileQuestionsProps) {
  const answeredCount = getAnsweredCount(profile);
  const completionPercent = Math.round((answeredCount / TOTAL_PROFILE_QUESTIONS) * 100);
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);

  return (
    <Card className="p-0 overflow-hidden">
      {/* Collapsible header */}
      <button
        type="button"
        onClick={() => setExpandedGroup(expandedGroup ? null : '__open__')}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-neutral-50/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-accent-50 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm text-neutral-800">Improve Your Recommendations</p>
            <p className="text-xs text-neutral-400">
              {completionPercent > 0
                ? `${completionPercent}% complete — keep going at your own pace`
                : 'Optional questions to personalize your experience'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="text-xs font-medium text-primary-600">{completionPercent}%</span>
          <svg
            className={cn('w-5 h-5 text-neutral-300 transition-transform duration-200', expandedGroup && 'rotate-180')}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Expanded content */}
      {expandedGroup && (
        <div className="px-5 pb-5 border-t border-neutral-100 pt-4">
          {/* Progress bar */}
          <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-primary-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${completionPercent}%` }}
            />
          </div>

          {/* Question groups */}
          <div className="space-y-3">
            {QUESTION_GROUPS.map((group) => {
              const groupAnswered = getGroupAnsweredCount(profile, group);
              const groupTotal = group.questions.length;
              const isComplete = groupAnswered === groupTotal;
              const isGroupExpanded = expandedGroup === group.id;

              return (
                <QuestionGroupCard
                  key={group.id}
                  group={group}
                  profile={profile}
                  isExpanded={isGroupExpanded}
                  isComplete={isComplete}
                  answeredCount={groupAnswered}
                  totalCount={groupTotal}
                  onToggle={() => setExpandedGroup(isGroupExpanded ? '__open__' : group.id)}
                />
              );
            })}
          </div>
        </div>
      )}
    </Card>
  );
}

interface QuestionGroupCardProps {
  readonly group: QuestionGroup;
  readonly profile: Profile;
  readonly isExpanded: boolean;
  readonly isComplete: boolean;
  readonly answeredCount: number;
  readonly totalCount: number;
  readonly onToggle: () => void;
}

function QuestionGroupCard({
  group,
  profile,
  isExpanded,
  isComplete,
  answeredCount,
  totalCount,
  onToggle,
}: QuestionGroupCardProps) {
  return (
    <div className={cn('rounded-xl border transition-all duration-200', isExpanded ? 'border-primary-200 bg-primary-50/20' : 'border-neutral-100')}>
      {/* Group header — always visible */}
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center gap-4 p-4 text-left hover:bg-neutral-50/50 transition-colors rounded-xl"
      >
        <span className="text-xl flex-shrink-0">{group.icon}</span>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-neutral-800 text-sm">{group.title}</p>
          <p className="text-xs text-neutral-400 mt-0.5">
            {isComplete ? 'Completed' : `${answeredCount} of ${totalCount} answered`}
          </p>
        </div>
        {isComplete ? (
          <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
            <svg className="w-3.5 h-3.5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        ) : (
          <svg
            className={cn('w-5 h-5 text-neutral-300 transition-transform duration-200', isExpanded && 'rotate-180')}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </button>

      {/* Expanded content */}
      {isExpanded && (
        <div className="px-5 pb-5 pt-0 border-t border-neutral-100">
          <p className="text-xs text-neutral-400 mt-4 mb-5">{group.description}</p>
          <div className="space-y-5">
            {group.questions.map((question) => (
              <SingleQuestion
                key={question.field}
                question={question}
                currentValue={profile[question.field] as string | null}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

interface SingleQuestionProps {
  readonly question: ProfileQuestion;
  readonly currentValue: string | null;
}

function SingleQuestion({ question, currentValue }: SingleQuestionProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [selected, setSelected] = useState<string | null>(currentValue);

  const handleSelect = async (value: string) => {
    // If clicking the same option, deselect
    const newValue = selected === value ? null : value;
    setSelected(newValue);
    setSaving(true);

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      await supabase
        .from('profiles')
        .update({ [question.field]: newValue })
        .eq('id', user.id);

      router.refresh();
    } catch (e) {
      console.error('Failed to save preference:', e);
      setSelected(currentValue);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <p className="text-sm font-medium text-neutral-700 mb-2.5">
        {question.title}
      </p>
      <div className="flex flex-wrap gap-2">
        {question.options.map((option) => {
          const isSelected = selected === option.value;
          return (
            <button
              key={option.value}
              type="button"
              disabled={saving}
              onClick={() => handleSelect(option.value)}
              className={cn(
                'px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200',
                'border focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:ring-offset-1',
                'disabled:opacity-60',
                isSelected
                  ? 'bg-primary-50 border-primary-400 text-primary-700'
                  : 'bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50'
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
