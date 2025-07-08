# Sticklynx Workplan

---

## 1. Project Summary

- **Product:** Sticklynx – Curated, shareable lists via a single customizable link.
- **Target:** Influencers, restaurants, artists, professionals, general users.
- **Core Value:** Centralized, branded, and analytics-enabled link sharing.

---

## 2. Milestones & Deliverables

### 2.1. Project Initialization

- [ ] Create monorepo or single repo (frontend + backend)
- [ ] Set up version control (GitHub/GitLab)
- [ ] Configure CI/CD (Vercel/Netlify for frontend, Neon.tech for DB)
- [x] Add README with project structure and setup instructions

### 2.2. Tech Stack Setup

- [x] Next.js (React, TypeScript, Tailwind CSS)
- [x] Next.js API routes or Node.js/Express backend
- [x] PostgreSQL (Neon.tech)
- [x] NextAuth.js (email + social providers)
- [x] Resend integration (email)
- [ ] Google Analytics + custom events

### 2.3. Design System

- [ ] Figma file for design system (colors, typography, components)
- [ ] Storybook for React components
  - [x] Storybook installed and configured for component documentation
  - [ ] Initial stories to be created for: Button, Card, Input, Modal, List Item, List Editor, Analytics Widget, Share Dialog, Auth Forms
- [ ] Accessibility (WCAG 2.1 AA+)

### 2.4. Core Feature Development (MVP)

- [ ] Auth & User Management (email/social login, profile)
- [ ] Dashboard (list overview, analytics widget)
- [ ] List Creation & Management (CRUD, customizable URL, theme, branding, items)
- [ ] Sharing & Embedding (shareable link, embed code, QR code)
- [ ] Privacy & Access (public/private, password, scheduling)

### 2.5. Integrations

- [ ] Social sharing previews (Open Graph, Twitter Cards)
- [ ] Google Analytics
- [ ] URL metadata fetcher

### 2.6. Testing & QA

- [ ] Unit/integration tests (Jest, React Testing Library)
- [ ] E2E tests (Cypress/Playwright)
- [ ] Accessibility and performance audits (Lighthouse)

### 2.7. Deployment

- [ ] Configure environment variables (DB, API keys, secrets)
- [ ] Deploy to Vercel/Netlify
- [ ] Set up custom domain (for Pro tier)

### 2.8. Documentation & Handoff

- [ ] Update README, API docs, and user guides
- [ ] Document Figma/Storybook links
- [ ] Prepare handoff package

---

## 3. Progress Tracking

- Use this checklist for weekly standups and handoff reference.
- Update status (e.g., [x] for done, [ ] for pending).
- Link to Figma, Storybook, and deployment URLs as available.

- [2024-05-XX] UI/UX Progress:
  - All core UI components upgraded for premium look (Tailwind, Lucide, gradients, micro-interactions).
  - Storybook stories scaffolded, updated, and deduped for all premium components.
  - Restaurant modal refactored to a 3-step wizard with progress indicator and floating-label fields.
  - ChipsInput and FieldRepeater created for multi-entry fields (emails, phones, tags).
  - Dashboard and modal flows now scalable for multiple item types, not just restaurants.
  - All form and card components use design-token-driven spacing and color.
  - Step 3 of the modal now uses a 2-column layout on desktop (Address/Website left, Phones/Emails right), single column on mobile.
  - Helper text and spacing refined for accessibility and clarity.

## Sticklynx Menu Builder & Dashboard Progress (Handover Log)

### 2024-05-XX (Session Summary)

#### UI/UX & Architecture

- Refactored all menu/category/item management from modal to premium BottomDrawer component for a more modern, accessible, and mobile-friendly UX.
- Ensured only one modal/drawer can be open at a time; fixed all state conflicts and double-modal issues.
- Redesigned AddCategoryStepperModal:
  - Category name is now an editable field in the header; category description removed.
  - Step indicator and category name are side-by-side in the header, with progress at far right.
  - Stepper supports Back/Next navigation and always allows adding a new item at the end.
  - Fixed logic so items are always collected in the items array, not just the current step.
  - Added robust error handling and debug logging for all save operations.
- MenuBuilder list is now fully flexible (no unnecessary scrollbars) and updates instantly after saving a new category or item.

#### Backend/API

- Inspected and confirmed `/api/menu-categories` and `/api/menu-items` endpoints are implemented and POST to the database.
- Fixed all type issues (e.g., price as string vs number) before sending to the API.
- Added error handling and user feedback for all save operations (alerts and UI errors).
- Ensured categories are saved and appear immediately in the dashboard after creation.
- Fixed bug where items were not being saved due to stepper logic; now all items are collected and POSTed correctly.

#### Debugging & Testing

- Added debug logs to trace items array and POST payloads.
- Validated that categories and items are now being saved to the database.
- Identified and planned for next steps on edit flow (pre-filling modal with category/items for editing).

#### Outstanding/Next Steps

- Implement edit flow for categories/items (pre-fill modal with existing data).
- Further polish on error feedback and optimistic UI updates.
- Continue to enforce design system and accessibility best practices.

### 2024-05-XX (Inline Editing & Menu Item Actions)

#### UI/UX & Dashboard Improvements

- Implemented inline editing for menu category names in the Menu Builder list:
  - Category name is now editable in-place with a pencil icon.
  - Save (checkmark) and cancel (X) icons appear during editing for explicit actions.
  - Editing auto-focuses the input and supports Enter/Escape keyboard shortcuts.
- Removed legacy Edit and Delete buttons for categories; all actions are now inline and icon-based for a premium, modern UX.
- Updated menu item actions:
  - Edit and Delete for menu items are now icon-only (pencil and trash), improving clarity and reducing visual clutter.
  - All actions use accessible aria-labels and premium styling.
- All changes follow design system, accessibility, and performance best practices.

#### Backend/API

- Fixed category update logic:
  - Switched frontend to use PATCH (not POST) for updating category names, matching backend API contract.
  - Now, category name changes persist correctly in the database and UI.

#### Status

- Inline editing and icon-only actions are fully functional and tested.
- Ready for handoff or further iteration.

---

**This log records all major architectural, UX, and backend changes for the menu builder and dashboard as of this session. Ready for handover or next dev session.**

---

## 4. Notes for Handoff

- All credentials and API keys stored securely (not in repo).
- Figma files and design system documented.
- Codebase follows ES6+, TypeScript, functional React, Tailwind CSS.
- Accessibility and performance benchmarks included.
- Monetization and advanced features (collab, custom domains, API) are future scope.

---

**This workplan is living documentation. Update as requirements evolve.**

## [DATE] Type Safety & Linting Improvements

- **TypeScript Strictness:**
  - Replaced all `any` types in `MenuBuilder.tsx`, `RestaurantList.tsx`, and `RestaurantModal.tsx` with explicit interfaces:
    - `MenuItem`, `MenuItemPrice`, `MenuCategory` now used throughout.
  - Updated all state hooks and function signatures to use these types (no more `any` in menu/category/item logic).
  - All handlers and callbacks (e.g., `onEditItem`, `onSave`, etc.) now use strong types.

- **Component Metadata:**
  - Added `displayName` to `PremiumInput` to resolve missing display name warning for React DevTools and linting.

- **Lint/Build Cleanliness:**
  - Fixed all linter errors related to type safety, function typing, and prop usage.
  - Ensured all `.id` and `.category_id` usages are guarded or have fallback values to prevent `undefined` errors.
  - No remaining `any` type or missing `displayName` warnings in the codebase.

- **Best Practices:**
  - All changes follow project conventions for premium, accessible, and maintainable code.

**Next Steps:**

- Review for any further runtime validation or stricter type needs.
- Continue to enforce strong typing for all new features.

---

## [DATE] Image Loader Fix

- **Next.js Image Optimization:**
  - Updated `next.config.ts` to add `'res.cloudinary.com'` to `images.domains`.
  - This resolves `<Image />` loader errors for Cloudinary-hosted images in `PremiumCardList` and `RestaurantList`.
  - Local images (starting with `/`) continue to work as before.
  - If new remote image domains are used in the future, add them to `images.domains` for compatibility.

---
