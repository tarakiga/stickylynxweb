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
- [ ] Resend integration (email)
- [ ] Google Analytics + custom events

### 2.3. Design System

- [ ] Figma file for design system (colors, typography, components)
- [ ] Storybook for React components
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

---

## 4. Notes for Handoff

- All credentials and API keys stored securely (not in repo).
- Figma files and design system documented.
- Codebase follows ES6+, TypeScript, functional React, Tailwind CSS.
- Accessibility and performance benchmarks included.
- Monetization and advanced features (collab, custom domains, API) are future scope.

---

**This workplan is living documentation. Update as requirements evolve.**
