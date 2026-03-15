import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
import { FORM_FEE_GHS, FORM_FEE_KOBO } from '@/lib/applicationConstants';
import connectDB from '@/lib/mongodb';
import Application from '@/models/Application';
import { generateApplicationPdf } from '@/lib/applicationPdf';

async function sendApplicationEmail(
  email: string,
  firstName: string,
  programmeDuration: string,
  pdfBuffer: Buffer
) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const programme = programmeDuration;

  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Nestine Designs <no-reply@nestinedesigns.com>',
        to: [email],
        subject: 'Application Successful – Nestine Designs',
        html: `
          <p>Hello ${firstName},</p>
          <p>Your application form payment has been received successfully.</p>
          <p>
            <strong>Programme:</strong> ${programme}
          </p>
          <p>
            Please find your pre-filled admission form attached. Kindly download, print, and complete any required signatures.
          </p>
          <p>Thank you for choosing Nestine Designs.</p>
        `,
        attachments: [
          {
            filename: 'Nestine-Admission-Form.pdf',
            content: pdfBuffer.toString('base64'),
            encoding: 'base64',
          },
        ],
      }),
    });
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') console.error('Failed to send application email:', error);
  }
}

function generateApplicantId(): string {
  const now = new Date();
  const y = now.getFullYear().toString().slice(-2);
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  const rand = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0');
  return `ND-APP-${y}${m}${d}-${rand}`;
}

export async function GET(request: NextRequest) {
  try {
    const reference =
      request.nextUrl.searchParams.get('reference') ?? undefined;

    if (!reference) {
      return NextResponse.json(
        { success: false, error: 'Missing payment reference.' },
        { status: 400 }
      );
    }

    await connectDB();

    // Duplicate protection
    const existing = await Application.findOne({
      paymentReference: reference,
    }).lean();

    if (existing) {
      return NextResponse.json(
        { success: true, data: existing },
        { status: 200 }
      );
    }

    const secretKey = process.env.PAYSTACK_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json(
        { success: false, error: 'Payment is not configured.' },
        { status: 500 }
      );
    }

    const verifyRes = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${secretKey}`,
        },
      }
    );

    const verifyJson = await verifyRes.json();

    if (!verifyRes.ok || !verifyJson.status) {
      if (process.env.NODE_ENV !== 'production') console.error('Paystack verify error:', verifyJson);
      return NextResponse.json(
        { success: false, error: 'Could not verify payment.' },
        { status: 400 }
      );
    }

    const data = verifyJson.data;
    if (data.status !== 'success') {
      return NextResponse.json(
        { success: false, error: 'Payment not successful.' },
        { status: 400 }
      );
    }

    const amountKobo: number = data.amount;
    if (amountKobo !== FORM_FEE_KOBO) {
      return NextResponse.json(
        {
          success: false,
          error: 'Payment amount does not match the application fee.',
        },
        { status: 400 }
      );
    }

    const metadata = data.metadata || {};
    const {
      firstName,
      lastName,
      dateOfBirth,
      email,
      phone,
      address,
      programmeDuration,
      guardianName,
      guardianContact,
      guardianAddress,
    } = metadata as {
      firstName?: string;
      lastName?: string;
      dateOfBirth?: string;
      email?: string;
      phone?: string;
      address?: string;
      programmeDuration?: string;
      guardianName?: string;
      guardianContact?: string;
      guardianAddress?: string;
    };

    if (
      !firstName ||
      !lastName ||
      !dateOfBirth ||
      !email ||
      !phone ||
      !address ||
      !programmeDuration ||
      !guardianName ||
      !guardianContact ||
      !guardianAddress
    ) {
      return NextResponse.json(
        {
          success: false,
          error: 'Payment metadata is incomplete. Please contact support.',
        },
        { status: 400 }
      );
    }

    const applicantId = generateApplicantId();

    const toSave = {
      applicantId,
      firstName,
      lastName,
      dateOfBirth,
      email,
      phone,
      address,
      programmeDuration,
      guardianName,
      guardianContact,
      guardianAddress,
      paymentReference: reference,
      paymentStatus: 'paid' as const,
      amountPaid: FORM_FEE_GHS,
    };

    const created = await Application.create(toSave);

    const pdfBuffer = await generateApplicationPdf({
      applicantId,
      firstName,
      lastName,
      dateOfBirth,
      email,
      phone,
      address,
      programmeDuration,
      guardianName,
      guardianContact,
      guardianAddress,
    });

    await sendApplicationEmail(
      email,
      firstName,
      programmeDuration,
      pdfBuffer
    );

    return NextResponse.json(
      { success: true, data: created },
      { status: 200 }
    );
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') console.error('Application payment verify error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to verify payment.' },
      { status: 500 }
    );
  }
}

