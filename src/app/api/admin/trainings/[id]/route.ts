import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Training from '@/models/Training';

const ALLOWED_STATUSES = ['new', 'contacted', 'enrolled', 'rejected'] as const;

type AllowedStatus = (typeof ALLOWED_STATUSES)[number];

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body as { status?: string };

    if (!status || !ALLOWED_STATUSES.includes(status as AllowedStatus)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid status. Allowed values: new, contacted, enrolled, rejected.',
        },
        { status: 400 }
      );
    }

    await connectDB();

    const updated = await Training.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        { success: false, error: 'Training application not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updated }, { status: 200 });
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') console.error('Admin training status update error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update training status.' },
      { status: 500 }
    );
  }
}

