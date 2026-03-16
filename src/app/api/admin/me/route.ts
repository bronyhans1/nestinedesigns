import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken } from '@/lib/adminAuth';

export async function GET(request: NextRequest) {
  const token = request.cookies.get('admin_auth')?.value;
  if (!token) {
    return NextResponse.json({ success: false }, { status: 401 });
  }
  const { valid } = await verifyAdminToken(token);
  if (!valid) {
    return NextResponse.json({ success: false }, { status: 401 });
  }
  return NextResponse.json({ success: true });
}
