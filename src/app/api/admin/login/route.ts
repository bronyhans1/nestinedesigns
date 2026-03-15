import { NextRequest, NextResponse } from 'next/server';
import { createAdminToken } from '@/lib/adminAuth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body as {
      username?: string;
      password?: string;
    };

    const envUser = process.env.ADMIN_USERNAME;
    const envPass = process.env.ADMIN_PASSWORD;

    if (!envUser || !envPass) {
      return NextResponse.json(
        {
          success: false,
          error: 'Admin credentials are not configured.',
        },
        { status: 500 }
      );
    }

    if (username !== envUser || password !== envPass) {
      return NextResponse.json(
        { success: false, error: 'Invalid username or password.' },
        { status: 401 }
      );
    }

    const token = await createAdminToken(username);

    const response = NextResponse.json(
      { success: true },
      { status: 200 }
    );

    const isProd = process.env.NODE_ENV === 'production';

    response.cookies.set('admin_auth', token, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    });

    return response;
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') console.error('Admin login error:', error);
    return NextResponse.json(
      { success: false, error: 'Login failed. Please try again.' },
      { status: 500 }
    );
  }
}

