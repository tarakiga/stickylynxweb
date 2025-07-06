import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { db } from "@/lib/db";
import { restaurants } from "@/lib/schema";
import { eq, and } from "drizzle-orm";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;
    if (typeof userEmail !== "string" || !userEmail) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userRecord = await db.query.users.findFirst({
      where: (u, { eq }) => eq(u.email, userEmail),
    });
    if (!userRecord) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const userId = userRecord.id;
    const data = await db.select().from(restaurants).where(eq(restaurants.user_id, userId));
    return NextResponse.json(data);
  } catch (err) {
    console.error("[API /restaurants][GET] error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;
    if (typeof userEmail !== "string" || !userEmail) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userRecord = await db.query.users.findFirst({
      where: (u, { eq }) => eq(u.email, userEmail),
    });
    if (!userRecord) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const userId = userRecord.id;
    const body = await req.json();
    const result = await db.insert(restaurants).values({ ...body, user_id: userId });
    return NextResponse.json(result);
  } catch (err) {
    console.error("[API /restaurants][POST] error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;
    if (typeof userEmail !== "string" || !userEmail) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userRecord = await db.query.users.findFirst({
      where: (u, { eq }) => eq(u.email, userEmail),
    });
    if (!userRecord) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const userId = userRecord.id;
    const body = await req.json();
    const { id, ...update } = body;
    const result = await db
      .update(restaurants)
      .set(update)
      .where(and(eq(restaurants.id, id), eq(restaurants.user_id, userId)));
    return NextResponse.json(result);
  } catch (err) {
    console.error("[API /restaurants][PATCH] error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;
    if (typeof userEmail !== "string" || !userEmail) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userRecord = await db.query.users.findFirst({
      where: (u, { eq }) => eq(u.email, userEmail),
    });
    if (!userRecord) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const userId = userRecord.id;
    const { id } = await req.json();
    const result = await db
      .delete(restaurants)
      .where(and(eq(restaurants.id, id), eq(restaurants.user_id, userId)));
    return NextResponse.json(result);
  } catch (err) {
    console.error("[API /restaurants][DELETE] error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
} 