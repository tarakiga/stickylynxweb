import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { menu_categories } from "@/lib/schema";
import { eq } from "drizzle-orm";

// GET: List menu categories (optionally by restaurant_id)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const restaurantId = searchParams.get("restaurant_id");
    let categories;
    if (restaurantId) {
      categories = await db.select().from(menu_categories).where(eq(menu_categories.restaurant_id, Number(restaurantId)));
    } else {
      categories = await db.select().from(menu_categories);
    }
    return NextResponse.json(categories);
  } catch (err) {
    console.error("[API /menu-categories][GET] error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// POST: Create menu category
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, restaurant_id, description, display_order, ...rest } = body;
    if (!name || !restaurant_id) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    const result = await db.insert(menu_categories).values({
      name,
      restaurant_id,
      description: description ?? null,
      display_order: display_order ?? null,
      ...rest,
    }).returning();
    return NextResponse.json(result[0]);
  } catch (err) {
    console.error("[API /menu-categories][POST] error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// PATCH: Update menu category (by id)
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, name, description, display_order, ...rest } = body;
    if (!id) {
      return NextResponse.json({ error: "Missing category id" }, { status: 400 });
    }
    const result = await db.update(menu_categories)
      .set({
        name,
        description,
        display_order,
        ...rest,
      })
      .where(eq(menu_categories.id, id))
      .returning();
    return NextResponse.json(result[0]);
  } catch (err) {
    console.error("[API /menu-categories][PATCH] error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// DELETE: Remove menu category by id
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Missing category id" }, { status: 400 });
    }
    await db.delete(menu_categories).where(eq(menu_categories.id, id));
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[API /menu-categories][DELETE] error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
} 