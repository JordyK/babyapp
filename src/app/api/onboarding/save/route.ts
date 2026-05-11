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

    console.log('Creating admin client...');
    console.log('Service key available:', !!process.env.SUPABASE_SERVICE_ROLE_KEY);
    
    // Create admin client with service role key (bypasses RLS)
    let supabase;
    try {
      supabase = createAdminClient();
      console.log('Admin client created successfully');
    } catch (clientError: any) {
      console.error('Failed to create admin client:', clientError);
      return NextResponse.json(
        { error: 'Failed to create database client', message: clientError.message },
        { status: 500 }
      );
    }

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

  } catch (error: any) {
    console.error('Server error saving onboarding answers:', error);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}
