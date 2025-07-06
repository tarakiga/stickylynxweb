import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users, passwordResetTokens } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json();
    if (!token || !password) {
      return NextResponse.json({ error: 'Missing token or password' }, { status: 400 });
    }
    // Find token
    const resetToken = await db.query.passwordResetTokens.findFirst({ where: (t, { eq }) => eq(t.token, token) });
    if (!resetToken) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
    }
    if (resetToken.expiresAt < new Date()) {
      // Token expired
      await db.delete(passwordResetTokens).where(eq(passwordResetTokens.token, token));
      return NextResponse.json({ error: 'Token expired' }, { status: 400 });
    }
    // Hash new password
    const hashed = await bcrypt.hash(password, 12);
    // Update user password
    await db.update(users).set({ password: hashed }).where(eq(users.id, resetToken.userId));
    // Delete token
    await db.delete(passwordResetTokens).where(eq(passwordResetTokens.token, token));
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 