import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const authToken = request.cookies.get('authToken');
  
  // Public routes that don't require authentication
  const publicRoutes = ['/auth/login', '/auth/register'];
  
  // Check if user is authenticated
  const isAuthenticated = !!authToken;
  
  // If user is authenticated and trying to access auth pages, redirect to home
  if (isAuthenticated && publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  // If user is not authenticated and trying to access protected routes, redirect to login
  if (!isAuthenticated && !publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};