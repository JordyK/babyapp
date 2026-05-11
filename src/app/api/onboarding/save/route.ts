import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Server-side endpoint to save onboarding answers
 * 
 * Uses admin client (service role key) to bypass RLS policies
 * This allows saving onboarding data even when user hasn't confirmed email yet
 */
export async function POST(request: NextRequest) {
  console.log('[API Onboarding Save] POST request received');
  
  try {
    const body = await request.json();
    const { user_id, answers } = body;

    console.log('[API Onboarding Save] Request body:', {
      hasUserId: !!user_id,
      hasAnswers: !!answers,
      userId: user_id,
      answerKeys: answers ? Object.keys(answers) : []
    });

    // Validate required fields
    if (!user_id) {
      console.error('[API Onboarding Save] User ID is required');
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    if (!answers || typeof answers !== 'object') {
      console.error('[API Onboarding Save] Answers object is required');
      return NextResponse.json(
        { error: 'Answers object is required' },
        { status: 400 }
      );
    }

    // Get environment variables directly
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    console.log('[API Onboarding Save] Environment check:', {
      hasSupabaseUrl: !!supabaseUrl,
      hasServiceKey: !!supabaseServiceKey,
      serviceKeyLength: supabaseServiceKey ? supabaseServiceKey.length : 0
    });
    
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('[API Onboarding Save] Missing environment variables');
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
    console.log('[API Onboarding Save] Creating admin client');
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    });
    
    console.log('[API Onboarding Save] Admin client created successfully');

    // Convert answers object to array of question-answer pairs
    // Schema: onboarding_answers (id, user_id, question_key, answer_value, created_at, updated_at)
    const answerRows = Object.entries(answers).map(([questionKey, answerValue]) => ({
      user_id,
      question_key: questionKey,
      answer_value: answerValue,
    }));

    console.log(`[API Onboarding Save] Saving ${answerRows.length} onboarding answers for user: ${user_id}`);
    console.log('[API Onboarding Save] Answer rows:', answerRows);

    // First, ensure user exists in profiles table
    console.log('[API Onboarding Save] Creating/updating profile for user:', user_id);
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .upsert({ 
        id: user_id, 
        updated_at: new Date().toISOString(),
        onboarding_completed: false
      }, { onConflict: 'id' })
      .select();

    console.log('[API Onboarding Save] Profile upsert result:', {
      hasError: !!profileError,
      hasData: !!profileData,
      error: profileError?.message,
      data: profileData
    });

    if (profileError) {
      console.error('[API Onboarding Save] Error ensuring profile exists:', profileError);
    } else {
      console.log('[API Onboarding Save] Profile created/updated successfully:', profileData);
    }

    // Insert into database using admin client (bypasses RLS)
    console.log('[API Onboarding Save] Inserting onboarding answers...');
    const { data, error } = await supabase
      .from('onboarding_answers' as any)
      .insert(answerRows as any)
      .select();

    console.log('[API Onboarding Save] Insert result:', {
      hasError: !!error,
      hasData: !!data,
      error: error?.message,
      errorDetails: error,
      dataLength: data?.length || 0
    });

    if (error) {
      console.error('[API Onboarding Save] Database insert error:', error);
      return NextResponse.json(
        { error: 'Failed to save onboarding answers', details: error },
        { status: 500 }
      );
    }

    console.log(`[API Onboarding Save] Successfully saved ${data?.length || 0} onboarding answers for user: ${user_id}`);

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
