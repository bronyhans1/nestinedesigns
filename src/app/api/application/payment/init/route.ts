import { NextRequest, NextResponse } from 'next/server';
import { FORM_FEE_KOBO } from '@/lib/applicationConstants';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
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
    } = body as {
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

    if (!firstName || firstName.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: 'First name must be at least 2 characters.' },
        { status: 400 }
      );
    }
    if (!lastName || lastName.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: 'Last name must be at least 2 characters.' },
        { status: 400 }
      );
    }
    if (!dateOfBirth) {
      return NextResponse.json(
        { success: false, error: 'Date of birth is required.' },
        { status: 400 }
      );
    }
    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required.' },
        { status: 400 }
      );
    }
    if (!phone || phone.trim().length < 10) {
      return NextResponse.json(
        { success: false, error: 'Phone number is required.' },
        { status: 400 }
      );
    }
    if (!address || address.trim().length < 5) {
      return NextResponse.json(
        { success: false, error: 'Residential address is required.' },
        { status: 400 }
      );
    }
    if (!programmeDuration) {
      return NextResponse.json(
        { success: false, error: 'Programme duration is required.' },
        { status: 400 }
      );
    }
    if (!guardianName) {
      return NextResponse.json(
        { success: false, error: 'Parent/Guardian name is required.' },
        { status: 400 }
      );
    }
    if (!guardianContact || guardianContact.trim().length < 10) {
      return NextResponse.json(
        {
          success: false,
          error: 'Parent/Guardian contact number is required.',
        },
        { status: 400 }
      );
    }
    if (!guardianAddress || guardianAddress.trim().length < 5) {
      return NextResponse.json(
        {
          success: false,
          error: 'Parent/Guardian address is required.',
        },
        { status: 400 }
      );
    }

    const secretKey = process.env.PAYSTACK_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json(
        { success: false, error: 'Payment is not configured.' },
        { status: 500 }
      );
    }

    const origin = request.nextUrl.origin;

    const initRes = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secretKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        amount: FORM_FEE_KOBO,
        callback_url: `${origin}/application/success`,
        metadata: {
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
        },
      }),
    });

    const initJson = await initRes.json();

    if (!initRes.ok || !initJson.status) {
      if (process.env.NODE_ENV !== 'production') console.error('Paystack init error:', initJson);
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to initialize payment. Please try again.',
        },
        { status: 500 }
      );
    }

    const { authorization_url, reference } = initJson.data;

    return NextResponse.json(
      {
        success: true,
        authorizationUrl: authorization_url,
        reference,
      },
      { status: 200 }
    );
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') console.error('Application payment init error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to start payment. Please try again.' },
      { status: 500 }
    );
  }
}

