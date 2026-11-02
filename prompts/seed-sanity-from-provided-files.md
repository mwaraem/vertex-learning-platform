# Seed Sanity From Provided Files

## Goal

Import the supplied `studio/scripts/seed/seed.ndjson` into the configured Sanity project `l3506rl9`, dataset `production`, using the Sanity CLI. Use `studio/scripts/seed/videos.json` only as the associated lesson/video manifest; do not generate or substitute content. Do not edit either seed file.

## Skills and inspected code

- Read `sanity-best-practices`.
- Inspected `studio/package.json`, `studio/sanity.cli.ts`, `studio/sanity/env.ts`, `studio/sanity.config.ts`, and both seed files.
- The CLI is Sanity 5.31.2. Its import command supports `--replace`; its query command supports GROQ document queries.
- The seed has 141 documents: 6 categories, 5 instructors, 120 lessons, and 10 courses. The video manifest has 120 entries and matches all lesson slugs exactly.

## Decisions and assumptions

- Target the project and dataset from `studio/.env.local`: project `l3506rl9`, dataset `production`.
- Use `--replace` so any existing documents with matching source IDs are updated from the provided seed. Do not delete unrelated documents.
- `videos.json` is not an import source; it is metadata aligned with the lesson records.
- Current blocker: the Sanity CLI query and the configured read token both failed with `project user not found` for the configured project. Do not attempt an import until CLI authentication has write access to this project, or a valid import token is configured. Never use the read token as an import token.

## Files and data scope

- Read only: `studio/scripts/seed/seed.ndjson` and `studio/scripts/seed/videos.json`.
- No changes to either source file. Do not add a content-generation script or create additional Sanity documents.
- Only import the 141 documents represented by the NDJSON. Matching IDs may be replaced; unrelated dataset documents must remain untouched.

## Security

- Keep tokens out of command output, prompts, and logs.
- Use an authenticated Sanity CLI identity with write access or a server-side import token with write access. Do not expose or repurpose `SANITY_API_READ_TOKEN`.
- Stop if the configured project/dataset differs or authorization is rejected.

## Execution

From the `studio` directory, first establish that the authorized CLI identity can query the configured project and dataset. Capture per-type counts before import. Then run:

```sh
npx sanity datasets import scripts/seed/seed.ndjson --project-id l3506rl9 --dataset production --replace
```

If the import command requires a token, use the authorized import-token mechanism without printing the secret. Do not retry with a read-only token.

After import, query the dataset through the Sanity CLI and verify the imported source IDs and per-type counts. Expected source counts are 6 categories, 5 instructors, 120 lessons, and 10 courses (141 total); existing unrelated documents may make the dataset's overall per-type totals higher. Compare before/after counts and confirm that all seeded IDs are present with their expected types. Confirm both input files remain unchanged.

## Acceptance criteria

- Sanity CLI import completes successfully against `l3506rl9` / `production`.
- All 141 source IDs are present with the expected per-type counts.
- No documents outside the source ID set are deleted or replaced.
- The two provided source files are unchanged.
- Report the real import output, before/after counts, and any authorization or asset-import failures; do not claim success if verification did not run.

## Checks and manual test

1. Authenticate the CLI to the configured project with write access; verify a read-only query succeeds.
2. Record pre-import counts for the four seeded types.
3. Run the exact import command above from `studio`.
4. Run post-import read-only queries to verify seeded IDs and per-type counts.
5. Confirm the seed and video manifest have not changed.