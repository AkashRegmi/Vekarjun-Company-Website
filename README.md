# Nexora — Technology Consulting & AI Solutions Website

A premium, production-ready marketing website for an IT consulting and technology
solutions company, built with React, TypeScript, Tailwind CSS, and Framer Motion.

## Getting started

```bash
npm install
npm run dev       # start local dev server
npm run build     # production build (outputs to dist/)
npm run preview   # preview the production build
```

## Structure

```
src/
  components/    One component per section (Navbar, Hero, Services, Contact, etc.)
  data/
    content.ts   All copy, service lists, stats, case studies, nav links — edit here
  index.css      Design tokens (colors, fonts) and global styles
  App.tsx        Assembles the page from section components
index.html       SEO metadata, Open Graph tags, and JSON-LD schema
```

## Customizing

- **Company name & copy**: edit `src/data/content.ts`.
- **Colors & type**: edit the `@theme` block at the top of `src/index.css`.
- **Contact form**: `src/components/Contact.tsx` currently simulates a submission
  (no backend). Wire the `handleSubmit` function up to your form endpoint, email
  service, or CRM.
- **Real placeholders to replace before launch**: contact details in `content.ts`
  (`contactInfo`), testimonials, case study results, and social links in `Footer.tsx`.

## Notes

- Single-page site with anchor navigation (`#services`, `#portfolio`, etc.) matching
  the navbar links.
- Respects `prefers-reduced-motion`.
- All interactive elements are keyboard-accessible with visible focus states.
