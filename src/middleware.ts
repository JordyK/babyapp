import { createServerClient } from '@/lib/supabase/server';
import { NextResponse, type NextRequest } from 'next/server';

/**
 * Middleware for Supabase auth context
 * 
 * This middleware handles authentication state across the application.
 * It refreshes the user's session and updates auth cookies.
 */
export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  try {
    const supabase = createServerClient();
    
    // Refresh session if expired - required for Server Components
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    // If there's no session, continue without auth
    if (!session || error) {
      return response;
    }

    // Update response with refreshed auth headers
    response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    // Set auth cookies for the response
    const authEvent = await supabase.auth.getSession();
    if (authEvent.data.session) {
      response.headers.set(
        'set-cookie',
        `supabase.auth.token=${JSON.stringify(authEvent.data.session)}; Path=/; Secure; SameSite=Lax; HttpOnly`
      );
    }
  } catch (error) {
    // Log error but don't block the request
    console.error('Middleware auth error:', error);
  }

  return response;
}

/**
 * Matcher configuration
 * 
 * This defines which routes the middleware should run on.
 * We exclude static assets, API routes, and Next.js internals.
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};
