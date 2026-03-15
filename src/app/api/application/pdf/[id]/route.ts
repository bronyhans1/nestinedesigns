import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Application from '@/models/Application';
import { generateApplicationPdf } from '@/lib/applicationPdf';

export const runtime = 'nodejs';

type ApplicationDoc = {
  applicantId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  address: string;
  programmeDuration: string;
  guardianName: string;
  guardianContact: string;
  guardianAddress: string;
};

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();

    const app = (await Application.findById(id).lean()) as ApplicationDoc | null;
    if (!app) {
      return NextResponse.json(
        { success: false, error: 'Application not found.' },
        { status: 404 }
      );
    }

    const pdfBuffer = await generateApplicationPdf({
      applicantId: app.applicantId,
      firstName: app.firstName,
      lastName: app.lastName,
      dateOfBirth: app.dateOfBirth,
      email: app.email,
      phone: app.phone,
      address: app.address,
      programmeDuration: app.programmeDuration,
      guardianName: app.guardianName,
      guardianContact: app.guardianContact,
      guardianAddress: app.guardianAddress,
    });

    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition':
          `attachment; filename="Nestine-Admission-Form-${app.applicantId}.pdf"`,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (process.env.NODE_ENV !== 'production') console.error('Application PDF error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to generate PDF.',
        ...(process.env.NODE_ENV !== 'production' && { detail: message }),
      },
      { status: 500 }
    );
  }
}

