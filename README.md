# mumna-portfolio

My personal site — a scrapbook-meets-terminal portfolio. React, TypeScript, Vite, Tailwind.

Live content (about blurb, experience, projects, toolbox, certs, the random.md extras) all lives in
[`src/data/resume.ts`](src/data/resume.ts), so updating the site usually means editing one file.

## Running it

```bash
npm install
npm run dev
```

http://localhost:5173.

## Things I forget

- Photo: `public/photo.jpg`. If it 404s the about section falls back to my initials.
- Cert badges: `public/badges` (transparent SVG/PNG). Without one it draws the hexagon badge instead.
- Blog posts: markdown in `src/content/blog`. Files starting with `_` aren't published.
- Recipes and books: `src/data/recipes.ts`, `src/data/goodReads.ts`. Empty lists just show an empty card.
- Skill icons: `public/icons`, from [Devicon](https://devicon.dev). No icon means it falls back to the `abbr` label.

## Deploying

```bash
npm run build
```

Static output in `dist/`. Vercel and Netlify pick up the Vite config on their own. For GitHub Pages,
set `base: '/<repo-name>/'` in `vite.config.ts` first or every asset path breaks.

## Layout

```
src/
  components/   sections + the bits they use (ParticleCat, Modal, ...)
  content/blog/ markdown posts
  data/         resume.ts is the content; blog/recipes/goodReads feed random.md
  hooks/        theme, media queries, active section, tabs
  index.css     tokens + component styles
```
