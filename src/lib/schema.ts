import { pgTable, text, integer, serial, timestamp, boolean, jsonb, varchar, decimal, primaryKey, pgEnum, date } from "drizzle-orm/pg-core";

// ENUMS
export const epkTypeEnum = pgEnum("epk_type", ["musician", "filmmaker", "author", "startup"]);

// USERS (from NextAuth)
export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  password: text("password"),
});

// RESTAURANTS
export const restaurants = pgTable("restaurants", {
  id: serial("id").primaryKey(),
  user_id: text("user_id").references(() => users.id),
  name: varchar("name", { length: 255 }),
  description: text("description"),
  address: text("address"),
  phone: varchar("phone", { length: 32 }),
  email: varchar("email", { length: 255 }),
  website: varchar("website", { length: 255 }),
  opening_hours: jsonb("opening_hours"), // {day: [hours]}
  logo_url: varchar("logo_url", { length: 255 }),
  cover_image_url: varchar("cover_image_url", { length: 255 }),
  is_active: boolean("is_active").default(true),
  created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
  updated_at: timestamp("updated_at", { mode: "date" }).defaultNow(),
});

export const menu_categories = pgTable("menu_categories", {
  id: serial("id").primaryKey(),
  restaurant_id: integer("restaurant_id").references(() => restaurants.id),
  name: varchar("name", { length: 255 }),
  description: text("description"),
  display_order: integer("display_order"),
  is_active: boolean("is_active").default(true),
  created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
  updated_at: timestamp("updated_at", { mode: "date" }).defaultNow(),
});

export const menu_items = pgTable("menu_items", {
  id: serial("id").primaryKey(),
  category_id: integer("category_id").references(() => menu_categories.id),
  name: varchar("name", { length: 255 }),
  description: text("description"),
  price: decimal("price", { precision: 10, scale: 2 }),
  is_vegetarian: boolean("is_vegetarian").default(false),
  is_vegan: boolean("is_vegan").default(false),
  is_gluten_free: boolean("is_gluten_free").default(false),
  is_spicy: boolean("is_spicy").default(false),
  image_url: varchar("image_url", { length: 255 }),
  display_order: integer("display_order"),
  is_active: boolean("is_active").default(true),
  created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
  updated_at: timestamp("updated_at", { mode: "date" }).defaultNow(),
});

// EPK PROFILES
export const epk_profiles = pgTable("epk_profiles", {
  id: serial("id").primaryKey(),
  user_id: text("user_id").references(() => users.id),
  type: epkTypeEnum("type"),
  stage_name: varchar("stage_name", { length: 255 }),
  legal_name: varchar("legal_name", { length: 255 }),
  bio: text("bio"),
  location: varchar("location", { length: 255 }),
  contact_email: varchar("contact_email", { length: 255 }),
  phone: varchar("phone", { length: 32 }),
  website: varchar("website", { length: 255 }),
  press_photos: jsonb("press_photos"), // array of image URLs
  logo_url: varchar("logo_url", { length: 255 }),
  social_links: jsonb("social_links"), // {platform: url}
  is_active: boolean("is_active").default(true),
  created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
  updated_at: timestamp("updated_at", { mode: "date" }).defaultNow(),
});

export const musician_epk = pgTable("musician_epk", {
  epk_id: integer("epk_id").primaryKey().references(() => epk_profiles.id),
  genres: text("genres").array(),
  members: jsonb("members"), // [{name, role, bio}]
  upcoming_shows: jsonb("upcoming_shows"), // [{date, venue, location, ticket_url}]
  discography: jsonb("discography"), // [{title, year, type, link}]
  press_kit_url: varchar("press_kit_url", { length: 255 }),
  booking_contact: varchar("booking_contact", { length: 255 }),
});

export const filmmaker_epk = pgTable("filmmaker_epk", {
  epk_id: integer("epk_id").primaryKey().references(() => epk_profiles.id),
  filmography: jsonb("filmography"), // [{title, year, role, link}]
  skills: text("skills").array(),
  representation: varchar("representation", { length: 255 }),
  reel_url: varchar("reel_url", { length: 255 }),
});

export const author_epk = pgTable("author_epk", {
  epk_id: integer("epk_id").primaryKey().references(() => epk_profiles.id),
  genres: text("genres").array(),
  published_works: jsonb("published_works"), // [{title, publisher, year, isbn}]
  speaking_topics: text("speaking_topics").array(),
  sample_chapter_url: varchar("sample_chapter_url", { length: 255 }),
  agent_contact: varchar("agent_contact", { length: 255 }),
});

export const startup_epk = pgTable("startup_epk", {
  epk_id: integer("epk_id").primaryKey().references(() => epk_profiles.id),
  industry: varchar("industry", { length: 255 }),
  founding_date: date("founding_date"),
  team: jsonb("team"), // [{name, title, bio}]
  pitch_deck_url: varchar("pitch_deck_url", { length: 255 }),
  investment_status: varchar("investment_status", { length: 255 }),
  press_releases: jsonb("press_releases"), // [{title, date, url}]
});

// INFLUENCER PROFILES
export const influencer_profiles = pgTable("influencer_profiles", {
  id: serial("id").primaryKey(),
  user_id: text("user_id").references(() => users.id),
  stage_name: varchar("stage_name", { length: 255 }),
  real_name: varchar("real_name", { length: 255 }),
  bio: text("bio"),
  location: varchar("location", { length: 255 }),
  contact_email: varchar("contact_email", { length: 255 }),
  niche: text("niche").array(),
  demographics: jsonb("demographics"), // {age_range, gender, location_breakdown}
  social_profiles: jsonb("social_profiles"), // [{platform, handle, followers, engagement_rate}]
  brand_collaborations: jsonb("brand_collaborations"), // [{brand, campaign, date}]
  media_kit_url: varchar("media_kit_url", { length: 255 }),
  rates: jsonb("rates"), // {post_rate, story_rate, etc.}
  portfolio_images: jsonb("portfolio_images"), // array of URLs
  is_active: boolean("is_active").default(true),
  created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
  updated_at: timestamp("updated_at", { mode: "date" }).defaultNow(),
});

// NEXTAUTH TABLES (unchanged)
export const accounts = pgTable(
  "account",
  {
    userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
    type: text("type").notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({ columns: [account.provider, account.providerAccountId] }),
  })
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);

export const passwordResetTokens = pgTable('password_reset_tokens', {
  token: text('token').notNull().primaryKey(),
  userId: text('user_id').notNull(),
  expiresAt: timestamp('expires_at', { mode: 'date' }).notNull(),
});
