# Seed Sample Catalog Content in Sanity

## Goal

Populate the configured Sanity dataset with the existing sample catalog so the catalog and cross-course search have usable programming, development, data, and AI content. Seed the existing instructors, categories, courses, and lessons; do not generate a second content set.

## Skills and inspected code

- Read `sanity-best-practices` and its schema and migration guidance.
- Inspected the Studio document schemas, `studio/sanity.config.ts`, `studio/sanity/env.ts`, `studio/package.json`, and the existing files under `studio/scripts/seed/`.
- The existing seed contains 141 documents: 10 courses, 120 lessons, 5 instructors, and 6 categories. It has 4 modules per course and 3 lessons per module. All 120 lesson references resolve to distinct lesson documents, each referenced exactly once. Every course instructor and category reference resolves.
- Existing seed course titles cover Next.js, React performance, TypeScript, LLM applications, RAG, Python data work, system design, PostgreSQL, DevOps, and web security.
- The Sanity schema names two fields `isPopular` and `isFreePreview`, while the existing seed currently names them `popular` and `freePreview`.
- The Studio is configured for project `l3506rl9` and dataset `production`. The existing prompt `prompts/seed-sanity-from-provided-files.md` records that an earlier CLI query and the configured read token failed with `project user not found`; current authorization must be rechecked and this failure must not be bypassed.

## Decisions and assumptions

- Use the existing seed as the source of truth. Preserve its 10 courses, 4 modules per course, 3 lessons per module, and one-to-one lesson assignment.
- Normalize only `popular` to `isPopular` on course documents and `freePreview` to `isFreePreview` on lesson documents before import. Leave the original seed file intact; use a temporary normalized NDJSON file and remove it after the import attempt.
- Use Sanity CLI dataset import with `--replace`, so only matching seed document IDs are updated. Do not delete unrelated documents.
- Proceed only if the current authenticated Sanity CLI identity has write access to the configured project and dataset. Do not use the server-side read token as an import token.
- If preflight authorization fails, stop without importing and report the exact non-secret error.

## Files and data scope

- Read: `studio/scripts/seed/seed.ndjson`, `studio/scripts/seed/videos.json`, Studio schemas, and Studio configuration.
- Do not edit the existing seed or video manifest.
- No application or schema code changes are expected.
- Import only the 141 documents from the existing seed after the two field-name normalizations.

## Requirements

1. Validate source document counts and relationships before import.
2. Verify all required fields are populated and all lesson, instructor, and category references resolve to seeded documents.
3. Check current CLI access to `l3506rl9` / `production` without exposing tokens.
4. Record pre-import counts for categories, instructors, courses, and lessons.
5. Normalize only the two schema field names listed above and import the normalized file with `--replace`.
6. Verify all 141 source IDs and their document types exist after import; verify the seeded references and per-type counts.
7. Leave both source files unchanged and remove temporary files.

## Security considerations

- Never print, copy into logs, or expose tokens or secrets.
- Do not use `SANITY_API_READ_TOKEN` for writes.
- Do not import if project identity, dataset, or write authorization is uncertain.
- Do not replace or delete documents outside the 141 seed IDs.

## Acceptance criteria

- All 10 courses, 5 instructors, 6 categories, and 120 lessons are present in the configured Sanity dataset.
- Every course contains its four ordered modules; every module has its three ordered lessons; every seeded lesson is referenced exactly once.
- All seeded course-to-instructor and course-to-category relationships resolve.
- The Sanity schema’s `isPopular` and `isFreePreview` fields receive the seed values.
- No unrelated documents are deleted or replaced.
- The original NDJSON and video manifest remain unchanged.
- Report the actual authorization, import, and verification results; never claim an import succeeded if it did not.

## Checks and manual test steps

1. From `studio/`, verify the current CLI identity can query `l3506rl9` / `production`; stop on authorization failure.
2. Record pre-import per-type counts and verify source-file hashes for later comparison.
3. Create a temporary normalized NDJSON file, changing only `popular` and `freePreview` to their schema field names.
4. Run `npx sanity datasets import <temporary-file> --project-id l3506rl9 --dataset production --replace` with the authorized CLI identity.
5. Query the dataset to verify all seeded IDs, counts, references, and the normalized popularity/preview fields.
6. Confirm unrelated document counts and source-file hashes are unchanged; remove the temporary normalized file.
7. In Sanity Studio, open the course list and verify the ten seeded courses, then open a course and verify its four modules and three lessons in each module.
8. Open the catalog and search across courses for terms such as “App Router”, “RAG”, and “PostgreSQL”; confirm results are grounded in the imported content.
