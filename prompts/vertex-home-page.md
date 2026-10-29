# Implementation Prompt: Vertex Home Page

## Goal
Replace the current design-system showcase on `/` with the Vertex learning-platform home page from `design/vertex-home.png`. Reproduce the reference's centered navigation, large search-focused hero, course cards, weekly-content callout, subtle page-edge pattern, warm neutral palette, orange accents, and responsive layout.

## Skills and framework guidance
- No available project skill directly applies to this static home-page UI.
- Follow the installed Next.js App Router page conventions in `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/page.md`. The page can remain a Server Component.
- Use the existing Tailwind CSS 4/global CSS and TypeScript setup; do not add dependencies.

## Code and assets inspected
- `app/page.tsx` currently renders the static 14-section design-system showcase, with local inline SVG `Icon` and `BrandMark` helpers.
- `app/globals.css` contains the existing Vertex color tokens and showcase layout styles, which can be replaced by home-page styles while preserving applicable token values.
- `app/layout.tsx` provides Geist fonts and currently has design-system metadata.
- `package.json` has Next.js 16.4.3, React 19.3.0, Tailwind CSS 4, and scripts for dev/build/lint.
- `design/vertex-home.png` is the 1024 x 1536 visual reference.
- `public/` has no usable course logos or profile photo; `design/` holds the provided reference images.
- The repository was clean at inspection time.

## Decisions and assumptions
- Implement the supplied landing-page appearance only; course/catalog, account, notification, and search backends/routes do not exist yet.
- Keep the page server-rendered and presentational. Use representative sample course content shown in the reference; do not imply that these cards are live Sanity data.
- Header navigation, CTA, and course links should lead to meaningful in-page anchors where possible rather than nonexistent routes. The search field is a styled input only; do not build a search backend or fake search results.
- Keep visual assets local and avoid external network/image requests. Reuse/create small inline SVG marks for the Vertex logo, product icons, and course marks. Render the avatar as a small local CSS/SVG illustration if no source asset exists.
- Preserve responsive behavior with a compact mobile navigation, a stacked hero, and one-column course cards on narrow screens.

## Expected files to touch
- `app/page.tsx` — replace the design-system showcase with the home page and local UI helpers/sample course data.
- `app/globals.css` — replace showcase-specific styles with the homepage layout, reference styling, and responsive behavior; retain/reuse existing token names as appropriate.
- `app/layout.tsx` — update metadata to Vertex learning platform.
- `prompts/vertex-home-page.md` — this approved scope.

## Requirements
1. Reproduce the reference at desktop widths:
   - Warm white/off-white canvas with a slim diagonal hatch at the outer edges and subtle section dividers.
   - Top navigation with Vertex brand, Courses and My Learning links, notification icon, and circular profile avatar.
   - Centered hero with “INTELLIGENT LEARNING” badge, large serif headline “Search your learning in plain English.”, explanatory copy, orange “Explore Courses” button with arrow, and wide search input with search icon and ⌘ K hint.
   - “All Courses” heading and “View all courses” link, followed by three evenly sized course cards for Next.js for Production, Docker Essentials, and TypeScript Deep Dive. Include course logo, short summary, level, duration, and module count.
   - Star callout reading “New courses and lessons added every week.” with fine horizontal rules and soft orange gradient bars/decorative shapes at the bottom edge.
2. Keep content hierarchy, whitespace, typography, colors, borders, and card treatment close to the provided image.
3. Use semantic navigation, headings, links/buttons, and an explicitly labelled search input. Decorative marks should be hidden from assistive technology where appropriate.
4. Ensure no horizontal page overflow and adapt the nav, hero, and course cards for mobile.
5. Do not add packages, data fetching, routes, authentication, search functionality, or unrelated features.

## Security considerations
- The page is presentational and must not introduce credentials, user data, third-party network requests, or server-side writes.

## Acceptance criteria
- `/` renders the home-page design rather than the prior design-system sheet.
- All visible elements described above are represented with close desktop fidelity.
- On mobile, content remains readable and usable with no horizontal scrolling.
- The route remains statically renderable and does not require client-side state or new dependencies.

## Checks
Run from the repository root:
1. `npx.cmd tsc --noEmit`
2. `npx.cmd eslint app\page.tsx app\layout.tsx`
3. `npm.cmd run build`

## Manual test steps
1. Start the app using `npm.cmd run dev`.
2. Open `http://localhost:3000` at desktop width and compare the hero, navigation, card row, and bottom decoration to `design/vertex-home.png`.
3. Resize to a mobile viewport and verify navigation and course cards adapt without horizontal page overflow.
4. Check the browser console for runtime errors and verify the search field has an accessible label.
