# Implementation Prompt: Vertex Design System

## Goal
Implement the design-system showcase shown in `design/vertex-designsystem.png` as the Vertex app's home page. Treat the provided image as the visual source of truth: reproduce its warm off-white canvas, compact card grid, orange accent, typography, spacing, and all 14 numbered sections as closely as practical.

## Skills and framework guidance
- No available project skill directly applies to building this static design-system showcase.
- Before writing application code, read the relevant Next.js App Router guide from `node_modules/next/dist/docs/` and follow this installed Next.js version's conventions.
- Follow the existing Tailwind CSS 4 and TypeScript setup; do not add dependencies.

## Code and assets inspected
- `app/page.tsx` is the create-next-app starter home page.
- `app/globals.css` contains only starter colors and Tailwind import.
- `app/layout.tsx` defines the root layout and default Next.js metadata.
- `package.json` has Next.js 16.4.3, React 19.3.0, Tailwind CSS 4, and scripts for dev/build/lint.
- `next.config.ts`, `eslint.config.mjs`, and `tsconfig.json` were inspected.
- The reference image is `design/vertex-designsystem.png`.
- The repository has pre-existing unrelated changes and untracked files. Preserve them.

## Decisions and assumptions
- This request is for a polished, static component-library showcase on `/`, not a production feature or a separate design-system package.
- Keep the page self-contained with semantic React markup, reusable local components as useful, CSS custom properties for the visible tokens, and inline SVG/CSS for small icons. Do not introduce icon or UI dependencies.
- Use representative sample content from the reference cards and navigation; all example controls may be presentational and need not implement application behavior.
- Preserve the existing standalone Next.js app structure. No Sanity, Clerk, search, data fetching, or backend integration is in scope.
- Make the composition responsive: preserve the dense multi-column layout on desktop and reflow panels and component examples to readable single-column/two-column layouts on narrow screens.

## Expected files to touch
- `app/page.tsx` — replace the starter page with the 14-section Vertex design-system showcase.
- `app/globals.css` — define the design tokens, typography, card/grid layout, components, and responsive styles.
- `app/layout.tsx` — update document metadata to Vertex Design System; change font setup only if needed for a reliable close match.
- `prompts/vertex-design-system.md` — this approved implementation scope.

## Requirements
1. Reproduce the reference's page-level composition, warm near-white background, subtle borders, rounded panel corners, black/charcoal text, and orange `#F97316` accent.
2. Build all 14 numbered sections:
   - Intro/brand and color swatches (primary and neutral palettes)
   - Typography specimens and type scale table
   - Spacing scale
   - Radius and shadow examples
   - Outline and filled icon rows with short icon specs
   - Button variants and default/hover/disabled states
   - Search/text input and select examples with field specs
   - Video/lesson/popular badges
   - In-progress/completed/now-playing/locked indicators
   - Progress bar
   - Course, video lesson, lesson, and resource cards
   - Navigation, breadcrumbs, and pagination examples
   - Four design principles
3. Keep text legible and hierarchy close to the screenshot, including the serif display sample and sans-serif UI/body copy.
4. Ensure the design works at desktop and mobile widths without horizontal page overflow. At mobile sizes, stack or reflow grid items while retaining sensible grouping and spacing.
5. Use accessible semantic headings, visible labels, meaningful button/input roles, and sufficient contrast. Mark purely illustrative, non-interactive controls appropriately.
6. Do not add packages, routes, backend services, or unrelated features.

## Security considerations
- The page is static and needs no credentials, user data, network calls, or server-side writes.
- Do not add external asset requests or embed secrets.

## Acceptance criteria
- `/` renders the full design-system showcase rather than the starter page.
- All 14 sections and their defining examples from the reference are represented.
- The page uses consistent, named CSS custom properties for core colors and spacing/radius values.
- Desktop panels align into a dense, balanced grid; narrow screens reflow with no horizontal scrolling.
- Existing project conventions and TypeScript remain valid, with no new dependency.

## Checks
Run from the repository root:
1. `npx tsc --noEmit`
2. `npm run lint`
3. `npm run build`

## Manual test steps
1. Start the app with `npm run dev`.
2. Open `http://localhost:3000` and compare the page against `design/vertex-designsystem.png`.
3. Confirm each numbered section (01–14) is visible and the sample controls/cards are legible.
4. Resize to a narrow mobile viewport and verify sections reflow without horizontal page scrolling or clipped content.
5. Check browser console for runtime errors.
