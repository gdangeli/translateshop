// API route to send registration notifications
import { NextRequest, NextResponse } from 'next/server';
import { notifyNewUserRegistration, sendWelcomeEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { email, companyName, sendWelcome = true } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }

    const results = {
      adminNotification: null as any,
      welcomeEmail: null as any,
    };

    // Send admin notification
    results.adminNotification = await notifyNewUserRegistration({
      email,
      companyName,
    });

    // Send welcome email to user
    if (sendWelcome) {
      results.welcomeEmail = await sendWelcomeEmail({
        email,
        companyName,
      });
    }

    return NextResponse.json({
      success: true,
      results,
    });

  } catch (error) {
    console.error('Notification error:', error);
    return NextResponse.json({
      error: 'Failed to send notifications',
      message: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}
