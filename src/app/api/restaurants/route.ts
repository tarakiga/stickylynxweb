import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { db } from "@/lib/db";
import { restaurants, restaurant_phones, restaurant_emails, menu_categories, menu_items } from "@/lib/schema";
import { eq, and, sql, inArray } from "drizzle-orm";

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
    // Get all restaurants for user
    const data = await db.select().from(restaurants).where(eq(restaurants.user_id, userId));
    // For each restaurant, get phones/emails
    const restaurantIds = data.map(r => r.id);
    type PhoneRow = { id: number; restaurant_id: number | null; phone: string | null };
    type EmailRow = { id: number; restaurant_id: number | null; email: string | null };
    let phones: PhoneRow[] = [];
    let emails: EmailRow[] = [];
    if (restaurantIds.length > 0) {
      phones = (await db.select().from(restaurant_phones).where(inArray(restaurant_phones.restaurant_id, restaurantIds)))
        .filter((p): p is PhoneRow => p.restaurant_id !== null && p.phone !== null && typeof p.id === 'number');
      emails = (await db.select().from(restaurant_emails).where(inArray(restaurant_emails.restaurant_id, restaurantIds)))
        .filter((e): e is EmailRow => e.restaurant_id !== null && e.email !== null && typeof e.id === 'number');
    }
    // Aggregate
    const byId = <T extends { restaurant_id: number | null }>(arr: T[], key: keyof T) =>
      arr.reduce((acc: Record<number, string[]>, item) => {
        if (item.restaurant_id !== null) {
          const value = item[key];
          if (typeof value === 'string') {
            (acc[item.restaurant_id] = acc[item.restaurant_id] || []).push(value);
          }
        }
        return acc;
      }, {} as Record<number, string[]>);
    const phonesById = byId(phones, "phone");
    const emailsById = byId(emails, "email");
    const result = data.map(r => ({
      ...r,
      phones: phonesById[r.id] || [],
      emails: emailsById[r.id] || [],
    }));
    return NextResponse.json(result);
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
    const { phones, emails, ...rest } = body;
    // Insert restaurant
    const [restaurant] = await db.insert(restaurants).values({ ...rest, user_id: userId }).returning();
    // Insert phones/emails
    if (phones && Array.isArray(phones)) {
      await Promise.all(phones.map((phone: string) => db.insert(restaurant_phones).values({ restaurant_id: restaurant.id, phone })));
    }
    if (emails && Array.isArray(emails)) {
      await Promise.all(emails.map((email: string) => db.insert(restaurant_emails).values({ restaurant_id: restaurant.id, email })));
    }
    return NextResponse.json({ ...restaurant, phones: phones || [], emails: emails || [] });
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
    const { id, phones, emails, ...update } = body;
    // Update restaurant
    await db.update(restaurants).set(update).where(and(eq(restaurants.id, id), eq(restaurants.user_id, userId)));
    // Replace phones
    await db.delete(restaurant_phones).where(eq(restaurant_phones.restaurant_id, id));
    if (phones && Array.isArray(phones)) {
      await Promise.all(phones.map((phone: string) => db.insert(restaurant_phones).values({ restaurant_id: id, phone })));
    }
    // Replace emails
    await db.delete(restaurant_emails).where(eq(restaurant_emails.restaurant_id, id));
    if (emails && Array.isArray(emails)) {
      await Promise.all(emails.map((email: string) => db.insert(restaurant_emails).values({ restaurant_id: id, email })));
    }
    return NextResponse.json({ success: true });
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
    // Cascade delete: menu items -> menu categories -> phones/emails -> restaurant
    // 1. Find all menu category IDs for this restaurant
    const categories = await db.select().from(menu_categories).where(eq(menu_categories.restaurant_id, id));
    const categoryIds = categories.map(cat => cat.id);
    if (categoryIds.length > 0) {
      // 2. Delete all menu items for these categories
      await db.delete(menu_items).where(inArray(menu_items.category_id, categoryIds));
      // 3. Delete all menu categories for this restaurant
      await db.delete(menu_categories).where(inArray(menu_categories.id, categoryIds));
    }
    // Delete phones/emails first
    await db.delete(restaurant_phones).where(eq(restaurant_phones.restaurant_id, id));
    await db.delete(restaurant_emails).where(eq(restaurant_emails.restaurant_id, id));
    // Delete restaurant
    await db.delete(restaurants).where(and(eq(restaurants.id, id), eq(restaurants.user_id, userId)));
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[API /restaurants][DELETE] error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
} 