import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { email, name } = await req.json();
    if (!email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const displayName = name && name.trim() !== '' ? name : 'there';
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'noreply@yourdomain.com',
      to: email,
      subject: 'Welcome to Sticklynx!',
      html: `<h1>Welcome, ${displayName}!</h1><p>Thank you for joining Sticklynx. We're excited to have you on board.</p>`
    });
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 