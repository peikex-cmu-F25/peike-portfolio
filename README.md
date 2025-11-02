# Peike Portfolio

Personal portfolio built with React, TypeScript, and Vite. It showcases AI demos, project highlights, and visualizations tailored to Peike Xu’s work.

## Local Development

- **Prerequisites:** Node.js 20+, npm 9+.
- Install dependencies with `npm install`.
- Run the dev server using `npm run dev` and open the URL printed in the console.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Generate the production bundle in `dist/`. |
| `npm run preview` | Preview the production build locally. |
| `npm run lint` | Run ESLint on `.ts` and `.tsx` files. |
| `npm run test` | Launch Vitest in interactive mode. |
| `npm run test:run` | Execute the Vitest suite once (used in CI). |
| `npm run test:coverage` | Generate coverage reports. |

## CI & QA Workflow

- `.github/workflows/ci.yml` runs on pushes and pull requests targeting `main`. It installs dependencies, runs ESLint, executes the Vitest suite via `npm run test:run`, builds the site, and audits the generated `dist/` folder with Lighthouse.
- `.github/workflows/deploy.yml` validates linting and tests before building and deploying to GitHub Pages when changes land on `main`.
- Lighthouse thresholds are defined in `lighthouserc.json`. The performance category must stay above **0.85** (error threshold) and accessibility warnings trigger below **0.90**.

## Deployment

- CI deploys automatically to GitHub Pages from the `main` branch.
- To test a production build locally, run `npm run build` followed by `npm run preview`.
- Manual deployment remains available with `npm run deploy`, which builds the project and pushes `dist/` to the `gh-pages` branch.

## Content Architecture

- `src/data/portfolio.ts` now focuses on branding content, case studies, open source highlights, and theme configuration. Structured datasets that power multiple sections live in dedicated modules:
  - `src/data/experience.ts` for education and work experience entries.
  - `src/data/skills.ts` for skill categories consumed by dashboards and about pages.
  - `src/data/blogArticles.ts` for article metadata mirrored by MDX content.
- `src/content/blog/` contains MDX sources for long-form articles. Use the slug-based naming pattern (`{slug}.mdx`) to match entries in `blogArticles`.
- `public/images/` stores static assets served at runtime:
  - `public/images/profile/` for portraits and brand imagery.
  - `public/images/gallery/` with sub-folders (`nature`, `urban`, `portrait`, `travel`) for the Gallery page.
  - Keep filenames kebab-cased (e.g., `urban-city-heights.jpg`) to stay consistent.
- `public/PeikeXu_resume.pdf` hosts the latest resume. Replace it with an updated version using the same filename to keep download links stable.

## Updating Content

1. **Add a new project or experience:** Update `src/data/experience.ts` for education or employer history, and append new builds to `src/data/portfolio.ts#projects`. Components such as `Projects`, `About`, and `SkillsDashboard` consume these modules directly.
2. **Publish a blog post:** Create a new MDX file in `src/content/blog`, add a corresponding metadata entry in `src/data/blogArticles.ts`, and ensure the slug matches the file name. The runtime layer resolves MDX via `src/data/blogIndex.ts`.
3. **Refresh gallery photos:** Place optimized images inside the relevant `public/images/gallery/{category}` folder and update the `photos` array in `src/pages/Gallery.tsx`.
4. **Change the hero/profile visuals:** Replace the files in `public/images/profile/` and adjust alt text where necessary.

## Asset Management Guidelines

- Optimize images to reasonable sizes before committing. Prefer WebP or compressed JPEG where possible.
- Store public, non-imported assets in `public/images/...`. Use React component imports only for assets that must pass through the bundler (e.g., small SVGs).
- When adding new assets, follow the existing folder structure and naming conventions to keep imports predictable.

## Performance Targets

- Production builds should pass the Lighthouse assertions defined in `lighthouserc.json`.
- If the Lighthouse step fails in CI, audit the local build with `npx lhci autorun --config=lighthouserc.json`, address regressions (image optimization, code splitting, etc.), and re-run the suite.

## Collaboration Notes

- Keep `main` deploy-ready: open pull requests for sizable changes to benefit from CI checks.
- Document noteworthy architectural or data changes in commit messages for easier future maintenance.

## UI Enhancements

- The UI now supports light and dark themes. The preference is persisted (\`localStorage\`) and respects system defaults. A toggle lives in the navigation (and mobile drawer) built on the shared `ThemeProvider`.
