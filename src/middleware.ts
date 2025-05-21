
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // This is a very basic mock of authentication status.
  // In a real app, you'd use a proper session/token check.
  const isAuthenticatedCookie = request.cookies.get('isAuthenticated'); // You'd need to set this cookie on login
  const isAuthenticated = isAuthenticatedCookie?.value === 'true';

  const authRoutes = ['/login', '/signup', '/forgot-password']; // Add other auth-related routes
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));

  // If trying to access the root path
  if (pathname === '/') {
    if (isAuthenticated) {
      // If authenticated and accessing root, let (app)/page.tsx handle it (dashboard)
      // No specific redirect needed here as the (app) group layout should handle display.
      // If you want to explicitly redirect from '/' to '/dashboard' (or your main app page):
      // return NextResponse.redirect(new URL('/dashboard', request.url)); // Assuming '/dashboard' is your main app page
      return NextResponse.next(); // Let the (app)/page.tsx render
    } else {
      // If not authenticated and accessing root, redirect to login
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // If authenticated and trying to access an auth route (e.g., /login)
  if (isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(new URL('/', request.url)); // Redirect to dashboard or main app page
  }

  // If not authenticated and trying to access a protected (app) route
  // Note: The (app)/layout.tsx already has a client-side redirect.
  // This middleware provides an additional server-side layer.
  // It's generally good practice to protect routes on both server (middleware) and client.
  if (!isAuthenticated && !isAuthRoute && pathname.startsWith('/')) { // Check if it's an app route
    // Consider how to distinguish truly protected app routes from public ones if any exist outside (app)
    // This example assumes all non-auth routes under root are protected
    // Let the client-side check in (app)/layout.tsx handle the immediate redirect
    // to avoid potential conflicts if the client-side state is more up-to-date.
    // Alternatively, you can enforce server-side redirect here:
    // return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  // Match all request paths except for the ones starting with:
  // - api (API routes)
  // - _next/static (static files)
  // - _next/image (image optimization files)
  // - favicon.ico (favicon file)
  // - public assets (images, etc.)
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - files in public folder (e.g. /images/*)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images|.*\\..*).*)',
    // The root path '/' is already matched by the regex above.
    // Removing the explicit '/' entry to avoid potential conflicts or redundancy.
  ],
};
