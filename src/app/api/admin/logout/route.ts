import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const loginUrl = new URL('/admin/login', request.nextUrl.origin);
  const response = NextResponse.redirect(loginUrl);

  response.cookies.set('admin_auth', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });

  return response;
}
