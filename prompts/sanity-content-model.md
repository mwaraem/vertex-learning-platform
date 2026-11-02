# Implementation Prompt: Sanity Content Model, Studio, and Read Data Layer

## Goal
Implement Vertex's Sanity content model for courses, embedded modules, lessons, instructors, and categories; provide an independently runnable Sanity Studio; and add a typed, server-only Sanity read client and data-access layer for the Next.js app.

## Skills and framework guidance
- Read `sanity-best-practices`, including its `schema`, `studio-structure`, `project-structure`, `groq`, `typegen`, and `nextjs` references.
- The project instructions require separate Studio and web workspaces. Keep Next.js at the repository root as the web app and move authoring into a standalone `studio/` workspace; do not embed Studio in Next.js.
- Installed versions are Next.js 16.4.3, `next-sanity` 13.4.0, and Sanity 5.31.2. Preserve these compatible dependency generations unless checks demonstrate an issue.
- Next.js has `cacheComponents` enabled. Do not add route-segment `dynamic`, `revalidate`, or `fetchCache` exports.

## Code and configuration inspected
- Root `package.json` and lockfile already contain Clerk, `next-sanity`, `@sanity/image-url`, Sanity, Vision, and styled-components from an uncommitted bootstrap.
- Current `sanity.config.ts`, `sanity.cli.ts`, `sanity/`, and `app/studio/[[...tool]]/page.tsx` are uncommitted bootstrap files. The schema list is empty; `sanity/lib/client.ts` is not marked server-only and has no read token; `sanity/lib/live.ts` configures `defineLive` without a private token.
- `next.config.ts` enables Cache Components.
- Root `tsconfig.json` currently includes all TypeScript files and will need to avoid checking the standalone Studio's sources as part of the Next.js app.
- `.gitignore` excludes environment files. No environment file contents have been inspected.
- `AGENTS.md` defines the required fields and relationships: modules are embedded in courses; lessons have no parent-course field and are associated by reverse reference.

## Decisions and assumptions
- Implement only the five requested content types. Do not add video transcript documents, search configuration documents, learner progress, sample content, or other product features.
- Use Sanity document types `course`, `lesson`, `instructor`, and `category`; define `module`, learning outcome, and lesson resource as embedded object types.
- Match `AGENTS.md` content requirements: course marketing fields, outcomes, instructor/category references and ordered modules; lesson video, poster, duration, preview flag, notes as Portable Text, key points, optional pro tip and resources; instructor profile; category description.
- Use references for relationships and derive a lesson's course through reverse references in GROQ; do not store a parent course on the lesson.
- Move Studio dependencies (`sanity`, `@sanity/vision`, `styled-components`) into `studio/package.json`; keep `next-sanity` and `@sanity/image-url` in the Next.js app.
- Keep project ID and dataset configuration public as needed by Studio and image URLs. Require the private `SANITY_API_READ_TOKEN` only in the server-only web client. Do not read, print, copy, or commit actual environment values.
- Add safe `.env.example` templates with placeholders only and document how to configure root web and Studio environments independently.
- Do not deploy the Studio or change remote Sanity settings; those steps require user credentials and project selection.
- Preserve existing Clerk integration, existing unrelated changes, and all user work. Do not commit or push.

## Expected files to touch
- Studio workspace: `studio/package.json`, `studio/sanity.config.ts`, `studio/sanity.cli.ts`, `studio/schemaTypes/` document and object schemas, and `studio/structure.ts`.
- Web data layer: `sanity/env.ts`, `sanity/lib/client.ts`, `sanity/lib/image.ts` as needed, and new GROQ query/data-access modules under `sanity/lib/`.
- Root integration/configuration: root `package.json` and lockfile, `tsconfig.json`, `.gitignore`, `.env.example`, `studio/.env.example`, and `README.md`.
- Remove the embedded route and obsolete root Studio configuration/bootstrap files after the standalone Studio is wired: `app/studio/`, root `sanity.config.ts`, root `sanity.cli.ts`, and the unused unauthenticated live helper if replaced.
- Add generated `sanity.types.ts` and other TypeGen artifacts only when produced by the configured workflow.
- Keep `prompts/sanity-content-model.md` as the record of this approved scope.

## Requirements
1. Define validated, editor-friendly Sanity schemas for courses, lessons, instructors, categories, and embedded modules and their outcome/resource objects.
2. Provide a standalone Studio with an ordered, usable content structure and Vision enabled for development.
3. Configure Studio CLI and TypeGen to extract the schema and generate types for the web app's Sanity queries.
4. Provide a `server-only` Sanity client configured with project ID, dataset, API version, and a required private read token. Never expose the token to the browser.
5. Add typed GROQ queries and focused server read functions for course listing/detail, lesson detail with reverse-derived course/module context, instructor detail, and categories.
6. Avoid returning an entire Portable Text field or unrelated content when a data helper needs only a projection.
7. Keep request data access server-side; do not add `SanityLive` to the browser or a client-side token.
8. Document required environment variable names, running Next.js and Studio separately, TypeGen commands, and Studio build commands without including real values.
9. Keep the two package manifests and lockfiles consistent. Do not disable Cache Components or reintroduce incompatible route segment exports.
10. Run Studio schema extraction/TypeGen where possible, root type checking and lint, and a Next.js production build. Also run the standalone Studio build if project configuration allows; report credential/configuration blockers accurately.

## Security considerations
- Import `server-only` from the web read client and keep `SANITY_API_READ_TOKEN` out of `NEXT_PUBLIC_*` variables, Studio bundles, client modules, and version control.
- Public project ID and dataset identifiers are not secrets; expose only those public configuration values that the Studio/browser SDK requires.
- Do not inspect environment files, make remote API calls, deploy schemas, create content, or alter CORS/project settings.
- Ensure all data reads used by the web flow through the server-only client; Studio authoring uses Sanity's authenticated Studio session.

## Acceptance criteria
- Studio runs as a separate workspace and the Next.js app no longer embeds it.
- The five requested document types and embedded module/outcome/resource types match the Vertex requirements with useful validation and references.
- Web-side Sanity read access is server-only and requires the private token.
- GROQ data helpers return course, lesson, instructor, and category data with lesson-to-course association derived from references.
- TypeGen is configured against the new schema and query locations.
- Root type check/lint and production build pass; Studio checks pass when its public project configuration is available.
- Existing Clerk behavior and unrelated worktree changes remain intact.

## Manual test steps
1. Populate the safe root environment template with local values, including the private read token only in the root environment.
2. Populate `studio/.env.local` with the Studio's project ID and dataset variables.
3. Run `npm run dev` for the web app and `npm run studio:dev` for the independent Studio.
4. Open the Studio and create a category, instructor, course with ordered modules, and referenced lessons; verify validation and relationships.
5. Run the documented TypeGen command and confirm the generated types cover the web GROQ queries.
6. Call the server read helpers from server-side code and verify course and lesson projections, including reverse-derived course context, without exposing a token in browser assets.
