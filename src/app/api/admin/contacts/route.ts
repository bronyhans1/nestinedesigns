import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Contact from '@/models/Contact';

export async function GET() {
  try {
    await connectDB();

    const contacts = await Contact.find().sort({ createdAt: -1 }).lean();

    return NextResponse.json(
      { success: true, data: contacts },
      { status: 200 }
    );
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') console.error('Admin contacts API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to load contact messages.' },
      { status: 500 }
    );
  }
}

