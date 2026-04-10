import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;
  const isAdmin = (req.auth?.user as any)?.isAdmin;

  // Public routes
  if (pathname.startsWith('/login') || pathname.startsWith('/api/auth')) {
    if (isLoggedIn && pathname.startsWith('/login')) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
    return NextResponse.next();
  }

  // All other routes require auth
  if (!isLoggedIn) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Admin routes require admin role
  if (pathname.startsWith('/admin') && !isAdmin) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|pdf/).*)'],
};
