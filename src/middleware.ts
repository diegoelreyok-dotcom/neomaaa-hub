import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

// Public routes that don't require authentication
const PUBLIC_ROUTES = ['/login', '/register', '/api/auth'];

// Routes that require only POST (registration is public for submission only)
const PUBLIC_POST_ROUTES = ['/api/register'];

// Admin-only routes (both pages and API endpoints)
const ADMIN_ROUTES = ['/admin', '/api/users', '/api/roles', '/api/seed'];

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const method = req.method;
  const isLoggedIn = !!req.auth;
  const isAdmin = (req.auth?.user as any)?.isAdmin;

  // Public routes (login, register page, auth API)
  const isPublicRoute = PUBLIC_ROUTES.some((route) => pathname.startsWith(route));
  if (isPublicRoute) {
    // Redirect logged-in users away from login
    if (isLoggedIn && pathname.startsWith('/login')) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
    return NextResponse.next();
  }

  // Registration POST is public, but GET/PATCH/DELETE require admin
  const isPublicPostRoute = PUBLIC_POST_ROUTES.some((route) => pathname.startsWith(route));
  if (isPublicPostRoute && method === 'POST') {
    return NextResponse.next();
  }

  // All other routes require authentication
  if (!isLoggedIn) {
    // API routes return 401 JSON, page routes redirect
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Admin routes require admin role
  const isAdminRoute = ADMIN_ROUTES.some((route) => pathname.startsWith(route));
  if (isAdminRoute && !isAdmin) {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|pdf/).*)'],
};
