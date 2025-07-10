import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { Resend } from 'resend';
import { passwordResetTokens } from '@/lib/schema';
import crypto from 'crypto';
import fs from 'fs/promises';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  console.log('[Request Password Reset] API called');
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }
    // Find user by email
    const user = await db.query.users.findFirst({ where: (u, { eq }) => eq(u.email, email) });
    if (!user) {
      // For security, do not reveal if user exists
      return NextResponse.json({ success: true });
    }
    // Generate secure token
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    // Store token
    await db.insert(passwordResetTokens).values({
      token,
      userId: user.id,
      expiresAt,
    });
    // Send email with Maizzle template
    const resetUrl = `${process.env.NEXTAUTH_URL || 'https://stickylynx.online'}/reset-password?token=${token}`;
    let html = '';
    try {
      html = await fs.readFile('maizzle/build_production/password-reset.html', 'utf8');
      console.log('[Request Password Reset] Loaded HTML:', html.slice(0, 200));
    } catch (fileErr) {
      console.error('[Request Password Reset] Error reading Maizzle template:', fileErr);
      return NextResponse.json({ error: 'Failed to load email template' }, { status: 500 });
    }
    html = html.replace(/{{\s*resetUrl\s*}}/g, resetUrl);
    await resend.emails.send({
      from: process.env.EMAIL_FROM || 'noreply@yourdomain.com',
      to: email,
      subject: 'Password Reset Request',
      html
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[Request Password Reset] Unexpected error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 