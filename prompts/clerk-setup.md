# Implementation Prompt: Complete Clerk Setup

## Goal
Complete and verify Clerk authentication in the existing Vertex Next.js App Router application, using the already selected Clerk application `app_3L5Wl3WDnZHddxxXR4azJrFHyBr`. Preserve any correct integration already present; do not create or switch to another Clerk application.

## Skills and framework guidance
- Read `clerk` and its `clerk-setup` guidance.
- The project uses current-generation `@clerk/nextjs` 7.x, Next.js 16.4.3, and React 19.3. Preserve these versions unless an actual incompatibility requires a change.
- Follow Next.js 16 proxy conventions and Clerk's current App Router patterns.
- Keep public browsing public. Do not add unrelated product features.

## Code and configuration inspected
- `package.json`: `@clerk/nextjs` is already installed; scripts include `dev`, `build`, and `lint`.
- `app/layout.tsx`: `ClerkProvider` is already inside `<body>`.
- `proxy.ts`: already exports `clerkMiddleware()` with a matcher that includes application routes and API routes without explicitly protecting public pages.
- `app/sign-in/[[...sign-in]]/page.tsx` and `app/sign-up/[[...sign-up]]/page.tsx`: both render Clerk's prebuilt component inside `Suspense`.
- `app/page.tsx`: the header already renders signed-out sign-in/sign-up controls and the signed-in `UserButton`, inside `Suspense`.
- `next.config.ts`: `cacheComponents` is enabled.
- `.gitignore` ignores `.env*`; `.env.local` exists but its contents were not read and must remain unread.
- Existing setup edits are in the worktree. Integrate with them; do not discard or overwrite unrelated work.

## Decisions and assumptions
- Use only Clerk app `app_3L5Wl3WDnZHddxxXR4azJrFHyBr`.
- Since the repository already uses Clerk, do not run `clerk init`. Do not replace credentials, create an accountless app, or change the selected app.
- Before any CLI operation that targets the selected application, have the user authenticate the Clerk CLI from their host terminal with `npx -y clerk@latest auth login`; do not perform authentication on the user's behalf. If authentication is unavailable, complete local code checks and report the account-level verification as blocked.
- Never read or print `.env.local`, any other environment file, or Clerk claim/key files. Do not expose or commit secret keys.
- Keep `/` and course browsing public. Add no protected routes, progress storage, custom auth flows, organizations, or production credentials.
- Do not create a test user unless the user explicitly authorizes it.
- Do not commit or push unless explicitly requested; this task explicitly requests both.

## Expected files to touch
- Existing Clerk integration surfaces only if review reveals a concrete issue: `app/layout.tsx`, `proxy.ts`, `app/page.tsx`, `app/sign-in/[[...sign-in]]/page.tsx`, `app/sign-up/[[...sign-up]]/page.tsx`, and `app/globals.css`.
- `package.json` / `package-lock.json` or `.gitignore` only if a verified integration defect requires a focused correction.
- `prompts/clerk-setup.md` records this approved implementation scope.

## Requirements
1. Retain the selected existing Clerk application and current SDK generation.
2. Ensure provider, request middleware, sign-in/up routes, and visible signed-in/signed-out controls work with Next.js 16 and `cacheComponents`.
3. Keep the public landing page and course browsing accessible when signed out.
4. Ensure request-aware Clerk UI and catch-all auth pages use `Suspense` where required.
5. Keep credentials server-side and environment files unread.
6. Preserve current layout and avoid unrelated modifications.
7. Run focused lint, TypeScript, and production build checks. Run Clerk CLI doctor and verify live auth only when the user's CLI is authenticated and the required app access is available.

## Security considerations
- Never expose `CLERK_SECRET_KEY` or other private credentials to client code or version control.
- Do not run `init`, `link`, `env pull`, or other app-targeting operations without user CLI authentication and the selected app confirmed.
- Do not create test accounts or alter Clerk dashboard sign-up settings.
- Avoid accidental route protection; authentication is optional for public browsing.

## Acceptance criteria
- Clerk provider, proxy middleware, prebuilt sign-in/up pages, and header auth controls are wired consistently.
- Signed-out visitors can browse publicly and access sign-in/sign-up.
- Signed-in visitors can see the Clerk user control.
- TypeScript and focused lint pass; production build succeeds.
- CLI doctor and live authentication are verified when account access is available; otherwise, the exact remaining user action is reported.
- No environment or claim/key file contents are read or disclosed.

## Manual test steps
1. If needed, authenticate the Clerk CLI in the host terminal with `npx -y clerk@latest auth login`; do not paste credentials or key output into chat.
2. Run `npx -y clerk@latest doctor` from the repository root.
3. Start the app with `npm run dev` and open the local site signed out; confirm the public landing page and auth controls appear.
4. Sign in with the user's own Clerk account and confirm the profile control appears.
5. Sign out and confirm the public landing page remains available.
