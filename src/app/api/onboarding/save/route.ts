import { createAdminClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Server-side endpoint to save onboarding answers
 * 
 * Uses admin client (service role key) to bypass RLS policies
 * This allows saving onboarding data even when user hasn't confirmed email yet
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { user_id, answers } = body;

    // Validate required fields
    if (!user_id) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    if (!answers || typeof answers !== 'object') {
      return NextResponse.json(
        { error: 'Answers object is required' },
        { status: 400 }
      );
    }

    // Create admin client with service role key (bypasses RLS)
    const supabase = createAdminClient();

    // Convert answers object to array of question-answer pairs
    const answerRows = Object.entries(answers).map(([questionKey, answerValue]) => ({
      user_id,
      question_key: questionKey,
      answer_value: answerValue,
    }));

    console.log(`Saving ${answerRows.length} onboarding answers for user: ${user_id}`);

    // Insert into database using admin client (bypasses RLS)
    const { data, error } = await supabase
      .from('onboarding_answers' as any)
      .insert(answerRows as any)
      .select();

    if (error) {
      console.error('Database insert error:', error);
      return NextResponse.json(
        { error: 'Failed to save onboarding answers', details: error },
        { status: 500 }
      );
    }

    console.log(`Successfully saved ${data?.length || 0} onboarding answers for user: ${user_id}`);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Onboarding answers saved successfully',
        count: data?.length || 0
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Server error saving onboarding answers:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
