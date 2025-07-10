import { db } from '../src/lib/db';
import { restaurants } from '../src/lib/schema';
import { eq } from 'drizzle-orm';

function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
    .substring(0, 64);
}

async function main() {
  const all = await db.select().from(restaurants);
  let updated = 0;
  for (const r of all) {
    if (!r.slug || r.slug.trim() === '') {
      const baseSlug = slugify(r.name || 'restaurant');
      let slug = baseSlug;
      let i = 1;
      // Ensure uniqueness
      while (await db.query.restaurants.findFirst({ where: (rest, { eq }) => eq(rest.slug, slug) })) {
        slug = `${baseSlug}-${i++}`;
      }
      await db.update(restaurants).set({ slug }).where(eq(restaurants.id, r.id));
      console.log(`Updated restaurant ${r.id} (${r.name}) with slug: ${slug}`);
      updated++;
    }
  }
  console.log(`Backfill complete. Updated ${updated} restaurants.`);
  process.exit(0);
}

main().catch(err => { console.error(err); process.exit(1); }); 