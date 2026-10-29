# Implementation Prompt: Vertex Sanity Model and Read Layer

## Goal
Deliver a correct Sanity content model and standalone Studio for Vertex courses, embedded modules, lessons, instructors, and categories, plus a typed server-only Sanity read client and data layer. The implementation is already substantially present; audit it against the requirements, validate it, and make only necessary, focused corrections.

## Skills and framework guidance read
- `sanity-best-practices` skill, especially `references/schema.md`, `references/groq.md`, and `references/nextjs.md`.
- Installed Next.js docs at `node_modules/next/dist/docs/01-app/03-api-reference/01-directives/use-server.md` and `01-directives/index.md`. Read helpers belong in ordinary server-only modules, not Server Actions.
- Follow `AGENTS.md`: keep the Studio independent; reads and private credentials remain on the server.

## Code and configuration inspected
- `studio/schemaTypes/documents/` currently contains course, lesson, instructor, and category schemas.
- `studio/schemaTypes/objects/` contains embedded course module, learning outcome, and lesson resource schemas.
- `studio/schemaTypes/index.ts` registers all seven schema types; `studio/structure.ts` lists the four document types.
- `studio/sanity.config.ts`, `studio/sanity.cli.ts`, and `studio/sanity/env.ts` configure a separate Studio and TypeGen.
- `sanity/lib/client.ts` imports `server-only`, requires `SANITY_API_READ_TOKEN`, and creates a non-CDN client.
- `sanity/lib/queries.ts` has GROQ projections for courses, lessons, instructors, and categories. Lesson course context is derived through a reverse reference.
- `sanity/lib/data.ts` exposes read functions for course list/detail, lesson detail, instructor detail, and category list/detail.
- `sanity.types.ts` is generated. Root `tsconfig.json` excludes `studio/`; Studio has an independent `tsconfig.json`.
- Root scripts include Studio dev/build/typecheck and Sanity TypeGen commands. `.env.example` and `studio/.env.example` contain placeholders. Do not read `.env.local` values.
- Existing worktree changes are present. Preserve them; do not revert unrelated work or overwrite `prompts/sanity-content-model.md`.

## Decisions and assumptions
- Course, lesson, instructor, and category are Sanity documents. Module, learning outcome, and lesson resource are embedded objects.
- Course module order and lesson order are represented by array order; never add stored numbering.
- Lessons do not store a parent course; GROQ derives course/module context from references.
- Keep the standalone Studio and current dependency/workspace boundary. Do not embed Studio into Next.js.
- Keep `SANITY_API_READ_TOKEN` private, required, and used only in server-only reads.
- Do not deploy, call remote Sanity APIs, create content, inspect local secret values, or change project settings.
- Do not add search, progress, transcript ingestion, seed data, UI, or unrelated refactors.

## Expected files to touch
Only update files needed to fix a verified gap, likely in:
- `studio/schemaTypes/` or Studio registration/configuration files
- `sanity/lib/client.ts`, `sanity/lib/queries.ts`, and `sanity/lib/data.ts`
- `eslint.config.mjs` only to exclude generated Studio build output from root lint
- `sanity.types.ts` or `studio/schema.json` only when regeneration follows a necessary schema/query change
- This implementation prompt as the task record

Avoid package, dependency, environment, and README changes unless a verified requirement requires them.

## Requirements
1. Courses have title/slug, summary, cover image, level, price, optional popularity and student-count display fields, learning outcomes, instructor/category references, and ordered modules.
2. Modules are embedded and contain title, summary, and ordered lesson references.
3. Lessons have title/slug, HTTPS video URL, thumbnail, duration, optional preview/student-count fields, Portable Text notes, key points, optional pro tip, and typed resources.
4. Instructor and category documents contain the profile and taxonomy fields specified in `AGENTS.md`.
5. The standalone Studio registers all types and provides usable navigation for all document types.
6. Server read functions cover course listing/detail, lesson detail with reverse-derived course/module context, instructor detail, and category list/detail.
7. Queries return only their needed projections and do not introduce transcript data.
8. The client is server-only and requires the private read token; no browser code receives that token.
9. TypeGen remains configured, and generated files are changed only when a necessary schema/query change requires regeneration.

## Security considerations
- Never expose `SANITY_API_READ_TOKEN` through `NEXT_PUBLIC_*`, Studio configuration, client modules, or browser bundles.
- Do not inspect local environment values or make external/remote Sanity requests.
- Keep read helpers server-only and constrain their projections to returned data needed by callers.

## Acceptance criteria
- Schema relationships and ordering match the content contract, including lesson-to-course reverse lookup.
- Studio schema, navigation, and environment requirements are clear and independently configured.
- The read layer is focused, typed, private, and server-only.
- No unrelated product features or structural changes are introduced.
- Run and report real results for root TypeScript (`npx tsc --noEmit`), lint (`npm run lint`), Studio typecheck/build, TypeGen when applicable, and Next production build. Do not claim any check passed unless it was run; report environment/configuration blockers accurately.

## Manual test steps
1. Configure `studio/.env.local` with the Sanity project ID and dataset, then run `npm run studio:dev` from the repository root.
2. Verify Courses, Lessons, Instructors, and Categories appear; create/edit a course with modules and ordered lesson references.
3. Confirm required fields and validation in Studio.
4. Configure the web app's local environment and exercise server-side course, lesson, instructor, and category reads.
5. Confirm the browser bundle does not contain `SANITY_API_READ_TOKEN`.
6. Run the documented TypeScript, lint, TypeGen-if-needed, Studio, and production build checks.

## Validation results
- Created `studio/.env.local` from the populated template after confirming no local file existed; `git check-ignore` confirms it is ignored.
- `npx.cmd tsc --noEmit`: passed against regenerated Sanity types.
- `npm.cmd run studio:typecheck`: passed.
- `npx.cmd eslint app sanity studio/schemaTypes`: passed.
- `npm.cmd run sanity:typegen`: passed; generated 22 schema types and six query result types.
- `npm.cmd run studio:build`: passed.
- Root `npm.cmd run lint` and `npm.cmd run build` were attempted earlier but did not complete within several minutes and were stopped. Focused lint and TypeScript checks passed; no production web build pass is claimed.
- No remote Sanity deploys, writes, or API calls were performed.
