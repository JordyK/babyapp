import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { generateUserChecklist } from '@/lib/checklist/generate';

export async function POST() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Delete existing checklist
  const { error: deleteError } = await supabase
    .from('user_checklist')
    .delete()
    .eq('user_id', user.id);

  if (deleteError) {
    return NextResponse.json({ error: 'Failed to delete existing checklist' }, { status: 500 });
  }

  // Regenerate with new smart logic
  const count = await generateUserChecklist(user.id);

  return NextResponse.json({ regenerated: count });
}
