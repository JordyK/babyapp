import { createClient } from '@/lib/supabase/server';
import type { Profile } from '@/lib/types/profile';
import type { ChecklistItem } from '@/lib/types/checklist';

/**
 * Checks if a checklist item's conditions are met by the user's profile.
 * Empty conditions ({}) means the item is always included.
 */
function matchesConditions(
  item: ChecklistItem,
  profile: Profile
): boolean {
  const conditions = item.conditions;
  if (!conditions || Object.keys(conditions).length === 0) {
    return true;
  }

  // ALL conditions must be satisfied (AND logic between fields)
  for (const [field, allowedValues] of Object.entries(conditions)) {
    const profileValue = (profile as unknown as Record<string, unknown>)[field];
    if (profileValue === null || profileValue === undefined) {
      // If user hasn't answered this question, include the item (be inclusive)
      continue;
    }
    if (!allowedValues.includes(String(profileValue))) {
      return false;
    }
  }

  return true;
}

/**
 * Generates a personalized checklist for a user based on their profile.
 * Only runs if the user doesn't already have checklist items.
 * Returns the number of items generated.
 */
export async function generateUserChecklist(userId: string): Promise<number> {
  const supabase = await createClient();

  // Check if user already has a checklist
  const { count } = await supabase
    .from('user_checklist')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId);

  if (count && count > 0) {
    return count;
  }

  // Fetch user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single() as { data: Profile | null; error: unknown };

  if (!profile) {
    return 0;
  }

  // Fetch all catalog items
  const { data: catalogItems } = await supabase
    .from('checklist_items')
    .select('*')
    .order('category')
    .order('sort_order') as { data: ChecklistItem[] | null; error: unknown };

  if (!catalogItems || catalogItems.length === 0) {
    return 0;
  }

  // Filter items based on profile conditions
  const matchingItems = catalogItems.filter((item) =>
    matchesConditions(item, profile)
  );

  // Insert into user_checklist
  const rows = matchingItems.map((item, index) => ({
    user_id: userId,
    item_id: item.id,
    name: item.name,
    category: item.category,
    status: 'pending' as const,
    is_custom: false,
    sort_order: index,
  }));

  if (rows.length === 0) {
    return 0;
  }

  const { error } = await supabase.from('user_checklist').insert(rows);

  if (error) {
    console.error('Failed to generate checklist:', error);
    return 0;
  }

  return rows.length;
}
