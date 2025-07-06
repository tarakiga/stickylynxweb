import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { hash } from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    const existing = await db.query.users.findFirst({ where: (u, { eq }) => eq(u.email, email) });
    if (existing) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 });
    }
    const hashed = await bcrypt.hash(password, 10);
    const id = crypto.randomUUID();
    const userName = name && name.trim() !== "" ? name : null;
    const [user] = await db.insert(users).values({ id, name: userName, email, password: hashed }).returning();
    // Trigger onboarding email
    await fetch(`${process.env.NEXTAUTH_URL}/api/onboarding-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name: userName }),
    });
    return NextResponse.json({ success: true, user: { id: user.id, email: user.email } });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 