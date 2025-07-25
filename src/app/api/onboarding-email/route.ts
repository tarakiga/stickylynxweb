import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import fs from 'fs/promises';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { email, name } = await req.json();
    if (!email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const displayName = name && name.trim() !== '' ? name : 'there';
    let html = '';
    try {
      html = await fs.readFile('maizzle/emails/onboarding.html', 'utf8');
      console.log('[Onboarding Email] Loaded HTML:', html.slice(0, 200));
    } catch (fileErr) {
      console.error('[Onboarding Email] Error reading Maizzle template:', fileErr);
      return NextResponse.json({ error: 'Failed to load email template' }, { status: 500 });
    }
    html = html.replace(/{{\s*displayName\s*}}/g, displayName);
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'noreply@yourdomain.com',
      to: email,
      subject: 'Welcome to Sticklynx!',
      html
    });
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error('[Onboarding Email] Unexpected error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 