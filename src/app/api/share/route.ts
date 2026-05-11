import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { randomBytes } from 'crypto';

export async function POST() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Check if user already has a share token
  const { data: profile } = await supabase
    .from('profiles')
    .select('share_token')
    .eq('id', user.id)
    .single();

  if (profile?.share_token) {
    return NextResponse.json({ token: profile.share_token });
  }

  // Generate a new token
  const token = randomBytes(16).toString('hex');

  const { error } = await supabase
    .from('profiles')
    .update({ share_token: token })
    .eq('id', user.id);

  if (error) {
    return NextResponse.json({ error: 'Failed to generate share link' }, { status: 500 });
  }

  return NextResponse.json({ token });
}
