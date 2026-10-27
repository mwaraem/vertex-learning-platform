# Implementation Prompt: Widen Home Page Content

## Goal
Adjust the existing Vertex home page so its centered outer content container can use approximately 1440px of width on large desktop displays, rather than stopping at 1120px. Let the course row and hero search scale proportionally while retaining the current layout at the 1024px reference width and below.

## Skills and framework guidance
- No available project skill directly applies to this responsive CSS adjustment.
- Follow the installed Next.js App Router conventions; no route or rendering changes are needed.
- Use the current global CSS and design tokens; do not add dependencies.

## Code and assets inspected
- `app/globals.css` sets `.site-shell` to `width: min(100%, 1120px)`.
- `.section-heading`, `.course-grid`, and `.weekly-callout` are capped at 856px.
- `.hero-search` is capped at 746px.
- The 1024px reference is `design/vertex-home.png`.
- The current worktree already contains the home-page implementation changes in `app/page.tsx`, `app/globals.css`, `app/layout.tsx`, and `prompts/vertex-home-page.md`. Preserve these changes and keep this adjustment scoped to its relevant CSS.

## Decisions and assumptions
- Interpret “main content takes about 1440px” as a centered site-shell maximum width of 1440px on large screens.
- Scale course content with the shell using a larger proportional max width (about 1220px for the course row), rather than leaving cards constrained to 856px.
- Increase the hero search max width proportionally (about 1060px) while keeping it centered.
- Preserve the existing design proportions at widths at or below 1120px and preserve mobile breakpoints.
- No layout markup or app behavior needs to change.

## Expected files to touch
- `app/globals.css` — increase desktop width limits for the shell, course row, and hero search.
- `prompts/widen-home-content.md` — this approved scope.

## Requirements
1. At a 1440px viewport, center `.site-shell` at up to 1440px wide, with no horizontal overflow.
2. Allow the course heading/cards/callout to use up to about 1220px within the shell; keep the three course cards balanced.
3. Allow the hero search control to scale to about 1060px and remain centered.
4. At 1024px and smaller, retain existing reference and responsive appearance.
5. Do not alter unrelated content, route behavior, dependencies, or application logic.

## Security considerations
- This is a presentation-only CSS update with no data, credentials, network calls, or writes.

## Acceptance criteria
- At a 1440px viewport, the shell width is about 1440px and the course row expands beyond its former 856px cap.
- At 1024px, the shell and course area retain their current sizes.
- At mobile widths, content remains responsive and does not overflow horizontally.

## Checks
1. `npx.cmd tsc --noEmit`
2. `npx.cmd eslint app\page.tsx app\layout.tsx`
3. `npm.cmd run build`
4. Check browser layout widths at 1440px, 1024px, and 390px.

## Manual test steps
1. Run `npm.cmd run dev`.
2. Open `http://localhost:3000`, set the browser viewport to 1440px, and verify the site shell and course row use the wider layout.
3. Repeat at 1024px and 390px; confirm the reference layout remains intact and no horizontal scrolling is introduced.
