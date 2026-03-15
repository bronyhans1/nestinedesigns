import { NextRequest, NextResponse } from 'next/server';
import { createHmac } from 'crypto';
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
            <strong>Programme:</strong> ${programmeDuration}
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
    if (process.env.NODE_ENV !== 'production') console.error('Failed to send application email (webhook):', error);
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

export async function POST(request: NextRequest) {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json({ received: true }, { status: 200 });
  }

  const rawBody = await request.text();
  const signature = request.headers.get('x-paystack-signature') || '';

  const hash = createHmac('sha512', secretKey)
    .update(rawBody)
    .digest('hex');

  if (hash !== signature) {
    return NextResponse.json({ received: true }, { status: 200 });
  }

  try {
    const event = JSON.parse(rawBody);
    if (event.event !== 'charge.success') {
      return NextResponse.json({ received: true }, { status: 200 });
    }

    const data = event.data;
    const reference: string = data.reference;
    const amountKobo: number = data.amount;
    const metadata = data.metadata || {};

    if (amountKobo !== FORM_FEE_KOBO) {
      return NextResponse.json({ received: true }, { status: 200 });
    }

    await connectDB();

    const existing = await Application.findOne({
      paymentReference: reference,
    }).lean();

    if (existing) {
      return NextResponse.json({ received: true }, { status: 200 });
    }

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
      return NextResponse.json({ received: true }, { status: 200 });
    }

    const applicantId = generateApplicantId();

    const created = await Application.create({
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
      paymentStatus: 'paid',
      amountPaid: FORM_FEE_GHS,
    });

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
      email!,
      firstName!,
      programmeDuration!,
      pdfBuffer
    );

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') console.error('Paystack webhook error:', error);
    return NextResponse.json({ received: true }, { status: 200 });
  }
}

