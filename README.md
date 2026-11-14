# project-portfolio-app

Frazier Kyle's portfolio — a showcase of the games and experiences I've built.

Live: https://frazier-kyle-portfolio.vercel.app

## Stack

SvelteKit 3 · Svelte 5 · Tailwind CSS 4 · `@sveltejs/enhanced-img` · deployed to Vercel (fully prerendered).

## Develop

```sh
npm install
npm run dev       # local dev server
npm run check     # type-check
npm run lint      # prettier + eslint
npm run build     # production build
```

## Adding or editing projects

- Every project card comes from [`src/lib/data/projects.ts`](src/lib/data/projects.ts). Add an entry with an image import, and set `featured` to show it on the home page.
- Projects with a long-form write-up set `caseStudy: true` and get a page at `src/routes/portfolio/<slug>/+page.svelte`, built from the `CaseStudy` and `Section` components.
- Images live in `src/lib/assets/` and are optimized at build time (AVIF/WebP, responsive sizes). PDFs (resume, project book) live in `static/`.
- Contact details and nav links are in [`src/lib/data/site.ts`](src/lib/data/site.ts).
