import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import fs from 'fs/promises';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  console.log('[Password Reset Email] API called');
  try {
    const { email, resetUrl } = await req.json();
    if (!email || !resetUrl) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    let html = '';
    try {
      html = await fs.readFile('maizzle/emails/password-reset.html', 'utf8');
      console.log('[Password Reset Email] Loaded HTML:', html.slice(0, 200));
    } catch (fileErr) {
      console.error('[Password Reset Email] Error reading Maizzle template:', fileErr);
      return NextResponse.json({ error: 'Failed to load email template' }, { status: 500 });
    }
    html = html.replace(/{{\s*resetUrl\s*}}/g, resetUrl);
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'noreply@yourdomain.com',
      to: email,
      subject: 'Password Reset Request',
      html
    });
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error('[Password Reset Email] Unexpected error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 