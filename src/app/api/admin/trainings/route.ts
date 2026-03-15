import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Training from '@/models/Training';

export async function GET() {
  try {
    await connectDB();

    const trainings = await Training.find().sort({ createdAt: -1 }).lean();

    return NextResponse.json(
      { success: true, data: trainings },
      { status: 200 }
    );
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') console.error('Admin trainings API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to load training applications.' },
      { status: 500 }
    );
  }
}

