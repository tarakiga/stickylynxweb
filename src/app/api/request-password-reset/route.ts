import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { db } from '@/lib/db';
import { users, passwordResetTokens } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import crypto from 'crypto';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
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
    // Send email
    const resetUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/reset-password?token=${token}`;
    await resend.emails.send({
      from: process.env.EMAIL_FROM || 'noreply@yourdomain.com',
      to: email,
      subject: 'Password Reset Request',
      html: `<h1>Password Reset</h1><p>Click the link below to reset your password. This link will expire in 1 hour.</p><p><a href="${resetUrl}">${resetUrl}</a></p>`
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 