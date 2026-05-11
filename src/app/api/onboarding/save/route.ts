import { createClient } from '@supabase/supabase-js';
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

    // Get environment variables directly
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    console.log('Environment check:');
    console.log('- NEXT_PUBLIC_SUPABASE_URL available:', !!supabaseUrl);
    console.log('- SUPABASE_SERVICE_ROLE_KEY available:', !!supabaseServiceKey);
    console.log('- Service key length:', supabaseServiceKey ? supabaseServiceKey.length : 0);
    
    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { 
          error: 'Missing environment variables', 
          details: {
            urlAvailable: !!supabaseUrl,
            keyAvailable: !!supabaseServiceKey
          }
        },
        { status: 500 }
      );
    }
    
    // Create admin client with service role key (bypasses RLS)
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    });
    
    console.log('Admin client created successfully');

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
