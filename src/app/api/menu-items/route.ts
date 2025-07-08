import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { menu_items } from "@/lib/schema";
import { eq, and } from "drizzle-orm";

// GET: List menu items (optionally by category_id)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("category_id");
    let items;
    if (categoryId) {
      items = await db.select().from(menu_items).where(eq(menu_items.category_id, Number(categoryId)));
    } else {
      items = await db.select().from(menu_items);
    }
    return NextResponse.json(items);
  } catch (err) {
    console.error("[API /menu-items][GET] error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// POST: Create menu item (with variable pricing)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, description, category_id, price, prices, ...rest } = body;
    // Validate
    if (!name || !category_id || (!price && (!prices || !Array.isArray(prices) || prices.length === 0))) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (prices && Array.isArray(prices)) {
      for (const p of prices) {
        if (!p.label || typeof p.price !== "number") {
          return NextResponse.json({ error: "Each price option must have a label and price (number)" }, { status: 400 });
        }
      }
    }
    const result = await db.insert(menu_items).values({
      name,
      description,
      category_id,
      price: price ?? null,
      prices: prices ?? null,
      ...rest,
    }).returning();
    return NextResponse.json(result[0]);
  } catch (err) {
    console.error("[API /menu-items][POST] error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// PATCH: Update menu item (by id)
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, name, description, category_id, price, prices, ...rest } = body;
    if (!id) {
      return NextResponse.json({ error: "Missing item id" }, { status: 400 });
    }
    if (prices && Array.isArray(prices)) {
      for (const p of prices) {
        if (!p.label || typeof p.price !== "number") {
          return NextResponse.json({ error: "Each price option must have a label and price (number)" }, { status: 400 });
        }
      }
    }
    const result = await db.update(menu_items)
      .set({
        name,
        description,
        category_id,
        price: price ?? null,
        prices: prices ?? null,
        ...rest,
      })
      .where(eq(menu_items.id, id))
      .returning();
    return NextResponse.json(result[0]);
  } catch (err) {
    console.error("[API /menu-items][PATCH] error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// DELETE: Remove menu item by id
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Missing item id" }, { status: 400 });
    }
    await db.delete(menu_items).where(eq(menu_items.id, id));
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[API /menu-items][DELETE] error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
} 