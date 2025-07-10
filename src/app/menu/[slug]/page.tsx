import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { restaurants, restaurant_phones, restaurant_emails } from '@/lib/schema';
import { eq, inArray } from 'drizzle-orm';
import { Mail, Globe } from 'lucide-react';
import ShareButton from './ShareButton';
import Accordion from './Accordion';
import { menu_categories, menu_items } from '@/lib/schema';
import PhoneButtonWrapper from "./PhoneButtonWrapper";

async function getRestaurantBySlug(slug: string) {
  // Fetch restaurant by slug
  const [restaurant] = await db.select().from(restaurants).where(eq(restaurants.slug, slug));
  if (!restaurant) return null;
  // Fetch phones/emails
  const phones = await db.select().from(restaurant_phones).where(eq(restaurant_phones.restaurant_id, restaurant.id));
  const emails = await db.select().from(restaurant_emails).where(eq(restaurant_emails.restaurant_id, restaurant.id));
  // Fetch categories
  const categories = await db.select().from(menu_categories).where(eq(menu_categories.restaurant_id, restaurant.id));
  // Fetch items for all categories
  const catIds = categories.map(c => c.id);
  type MenuItemType = {
    id: number;
    name: string | null;
    description: string | null;
    prices: { label: string; price: string | number }[] | null;
    category_id: number | null;
    is_active: boolean | null;
    display_order: number | null;
  };
  type MenuCategoryType = {
    id: number;
    name: string | null;
    description: string | null;
    display_order?: number | null;
    is_active?: boolean | null;
  };
  let items: MenuItemType[] = [];
  if (catIds.length > 0) {
    const rawItems = await db.select().from(menu_items).where(inArray(menu_items.category_id, catIds));
    items = rawItems.map((item: unknown) => {
      const typedItem = item as {
        id: number;
        name: string | null;
        description: string | null;
        prices: unknown;
        category_id: number | null;
        is_active: boolean | null;
        display_order: number | null;
      };
      return {
        id: typedItem.id,
        name: typedItem.name,
        description: typedItem.description,
        prices: Array.isArray(typedItem.prices)
          ? typedItem.prices.filter((p: unknown) => !!p && typeof p === 'object' && 'label' in (p as object) && 'price' in (p as object))
          : null,
        category_id: typedItem.category_id,
        is_active: typedItem.is_active,
        display_order: typedItem.display_order,
      };
    });
  }
  // Attach items to categories
  const categoriesWithItems = categories
    .filter((c: MenuCategoryType) => c.is_active)
    .sort((a: MenuCategoryType, b: MenuCategoryType) => (a.display_order ?? 0) - (b.display_order ?? 0))
    .map((cat: MenuCategoryType) => ({
      id: cat.id,
      name: cat.name ?? '',
      description: cat.description ?? '',
      items: items
        .filter((i: MenuItemType) => i.category_id === cat.id && i.is_active)
        .sort((a: MenuItemType, b: MenuItemType) => (a.display_order ?? 0) - (b.display_order ?? 0))
        .map((item: MenuItemType) => ({
          id: item.id,
          name: item.name ?? '',
          description: item.description ?? '',
          prices: Array.isArray(item.prices)
            ? item.prices.filter((p): p is { label: string; price: string | number } => !!p && typeof p === 'object' && 'label' in p && 'price' in p)
            : [],
        })),
    })) as Array<{ id: number; name: string; description: string; items: { id: number; name: string; description: string; prices: { label: string; price: string | number }[]; }[] }>;
  return { ...restaurant, phones, emails, categories: categoriesWithItems };
}

export default async function MenuPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getRestaurantBySlug(slug);
  if (!data) return notFound();
  const { name, logo_url, description, website: rawWebsite, phones, emails, categories } = data;
  const website = rawWebsite ?? '';

  // Client-side dropdown for phones
  // (This is a hybrid page: static data, but dropdown is client-side)
  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex flex-col items-center gap-2 mb-6">
        {/* Phone button above logo */}
        {phones && phones.length > 0 && (
          <PhoneButtonWrapper phones={phones.map(p => p.phone).filter((n): n is string => !!n)} />
        )}
        {logo_url && (
          <Image
            src={logo_url}
            alt={name || ''}
            width={80}
            height={80}
            className="w-20 h-20 rounded-full object-cover border"
            unoptimized
          />
        )}
        <h1 className="text-2xl font-bold text-center">{name}</h1>
        {description && <p className="text-gray-600 text-center max-w-md">{description}</p>}
        <div className="flex gap-2 mt-2">
          {/* Email icon */}
          {emails && emails.filter(e => !!e.email).length > 0 && (
            <a href={`mailto:${emails.find(e => !!e.email)?.email || ''}`} className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-black" title="Email">
              <Mail size={24} className="text-black" />
            </a>
          )}
          {/* Website icon */}
          {website && (
            <a href={(website ?? '').startsWith('http') ? (website ?? '') : `https://${website ?? ''}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-black" title="Website">
              <Globe size={24} className="text-black" />
            </a>
          )}
          {/* Chain (share) icon */}
          <div className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-black">
            <ShareButton iconClassName="text-black" iconType="link" />
          </div>
        </div>
      </div>
      {/* Menu/categories will go here */}
      {categories && categories.length > 0 && <Accordion categories={categories} />}
      <footer className="mt-12 text-center text-gray-400 text-sm">
        © stickylynx.online
      </footer>
    </div>
  );
} 