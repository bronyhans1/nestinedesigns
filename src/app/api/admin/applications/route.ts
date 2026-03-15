import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Application from '@/models/Application';

export async function GET() {
  try {
    await connectDB();
    const apps = await Application.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, data: apps }, { status: 200 });
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') console.error('Admin applications API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to load applications.' },
      { status: 500 }
    );
  }
}

