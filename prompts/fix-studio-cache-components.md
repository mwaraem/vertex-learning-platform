# Implementation Prompt: Fix Embedded Studio Build Error

## Goal
Fix the Next.js build error on the embedded Sanity Studio route caused by exporting `dynamic = 'force-static'` while `cacheComponents` is enabled.

## Skills and framework guidance
- Read `sanity-best-practices`, specifically its Next.js integration guidance for embedded Studio routes.
- Consult the installed Next.js 16.4.3 documentation at `node_modules/next/dist/docs/01-app/02-guides/migrating-to-cache-components.md`. It says to remove the `dynamic` route-segment config when Cache Components is enabled and make caching explicit only for data that needs it.
- Preserve the existing Sanity Studio route and `NextStudio` configuration.

## Code and configuration inspected
- `next.config.ts` enables `cacheComponents`.
- `app/studio/[[...tool]]/page.tsx` mounts `NextStudio` and exports `dynamic = 'force-static'`, matching the reported build error.
- The worktree has pre-existing uncommitted Sanity setup changes in `package.json`, `package-lock.json`, `sanity.config.ts`, `sanity.cli.ts`, `sanity/`, and `app/studio/`. Preserve these changes and do not stage or modify unrelated files.

## Decisions and assumptions
- Remove only the incompatible `dynamic` export from the embedded Studio route; do not disable Cache Components or convert the Studio to a standalone workspace.
- Avoid cache directives because this route has no application data fetch to cache.
- Keep any pre-existing user changes intact.

## Expected files to touch
- `app/studio/[[...tool]]/page.tsx`: remove the incompatible route-segment config.
- This prompt file records the approved scope.

## Requirements
1. Retain the embedded Sanity Studio and its metadata/viewport exports.
2. Remove the incompatible `dynamic = 'force-static'` export.
3. Do not edit `next.config.ts` or unrelated Sanity setup.
4. Run TypeScript and the production build to verify the reported build error is resolved.

## Security considerations
- No credentials, environment files, or external services are needed.
- Do not inspect or reveal environment-variable contents.
- Do not stage unrelated worktree changes.

## Acceptance criteria
- The Studio route no longer exports `dynamic`.
- The app type-checks.
- `next build` gets past the route-segment compatibility error and completes, or any separate failure is reported accurately.

## Manual test steps
1. Run `npx tsc --noEmit`.
2. Run `npm run build`.
3. Open `/studio` in the running app and confirm the Studio route loads if Sanity environment configuration is available.
