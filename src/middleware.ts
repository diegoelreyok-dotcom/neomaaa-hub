import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

// Public routes that don't require authentication
const PUBLIC_ROUTES = ['/login', '/register', '/api/auth'];

// Routes that require only POST (registration is public for submission only)
const PUBLIC_POST_ROUTES = ['/api/register'];

// KB API routes: auth is handled by X-API-Key in the route handler itself,
// not by session. Middleware must NOT force session auth here.
// NOTE: /api/search/* is NOT in this list — it uses the session gate below
// (SEC1: endpoint replaces the old public /search-index.json and must be
// cookie-authenticated, not API-key authenticated).
const API_KEY_ROUTES = ['/api/kb'];

// Admin-only routes (both pages and API endpoints)
const ADMIN_ROUTES = ['/admin', '/api/users', '/api/roles', '/api/seed', '/api/admin'];

// Routes that a logged-in user can reach even when mustChangeCode is true.
// Everything else forces a redirect to /change-code until they rotate.
const CODE_CHANGE_ALLOWED = [
  '/change-code',
  '/api/users/change-code',
  '/api/auth', // session/signOut endpoints
];

export default auth(async (req) => {
  const { pathname } = req.nextUrl;
  const method = req.method;
  const isLoggedIn = !!req.auth;
  const user = req.auth?.user as any;
  const isAdmin = user?.isAdmin;
  const mustChangeCode = user?.mustChangeCode === true;
  const userId: string | undefined = user?.userId;

  // Public routes (login, register page, auth API)
  const isPublicRoute = PUBLIC_ROUTES.some((route) => pathname.startsWith(route));
  if (isPublicRoute) {
    // Redirect logged-in users away from login
    if (isLoggedIn && pathname.startsWith('/login')) {
      // If they must rotate first, send to /change-code instead of /dashboard
      const target = mustChangeCode ? '/change-code' : '/dashboard';
      return NextResponse.redirect(new URL(target, req.url));
    }
    return NextResponse.next();
  }

  // Registration POST is public, but GET/PATCH/DELETE require admin
  const isPublicPostRoute = PUBLIC_POST_ROUTES.some((route) => pathname.startsWith(route));
  if (isPublicPostRoute && method === 'POST') {
    return NextResponse.next();
  }

  // KB API: bypass session check; route handlers enforce X-API-Key
  const isApiKeyRoute = API_KEY_ROUTES.some((route) => pathname.startsWith(route));
  if (isApiKeyRoute) {
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

  // Session is valid — optionally verify user is still active in DB.
  // Only blocks if KV EXPLICITLY returns isActive=false. If KV is unreachable
  // or returns null (edge runtime quirks), we fall through and trust the JWT.
  // This prevents accidental lockout of everyone when KV has transient issues.
  if (userId) {
    try {
      const dbUser: any = await kv.get(`user:${userId}`);
      if (dbUser && dbUser.isActive === false) {
        // User was explicitly disabled — kill the session.
        if (pathname.startsWith('/api/')) {
          return NextResponse.json(
            { error: 'Account disabled', code: 'ACCOUNT_DISABLED' },
            { status: 401 },
          );
        }
        return NextResponse.redirect(
          new URL('/login?error=AccountDisabled', req.url),
        );
      }
      // If dbUser is null/undefined, KV might be slow or rate-limited.
      // Don't block the user — trust the JWT that was validated at login.
    } catch {
      // KV unavailable — don't block on infra failure. Fall through.
    }
  }

  // Forced code rotation: user must rotate their code before reaching anything
  // else. /change-code and its API endpoint stay accessible so they can
  // actually complete the rotation; /api/auth allows signOut.
  const isChangeCodeAllowed = CODE_CHANGE_ALLOWED.some((route) => pathname.startsWith(route));
  if (mustChangeCode && !isChangeCodeAllowed) {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'Code rotation required', code: 'MUST_CHANGE_CODE' }, { status: 403 });
    }
    return NextResponse.redirect(new URL('/change-code', req.url));
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
