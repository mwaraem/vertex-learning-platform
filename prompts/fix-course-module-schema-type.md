# Align the Studio module schema with seeded course content

## Goal

Fix the Sanity Studio error stating that list items of type `module` are not declared. Existing course documents store embedded curriculum objects with `_type: "module"`, while the current Studio schema declares the embedded type as `courseModule`.

## Skills and inspected code

- Read `sanity-best-practices`, including its schema guidance.
- Inspected `studio/schemaTypes/objects/course-module.ts`, `studio/schemaTypes/documents/course.ts`, `studio/schemaTypes/index.ts`, `studio/schema.json`, `sanity.types.ts`, the seed file, and Studio scripts.
- The seed contains 10 courses, 4 modules per course, and 3 lesson references per module. All 40 embedded module objects have `_type: "module"`.
- The current schema uses `name: "courseModule"` and courses declare their list items as `type: "courseModule"`. The generated schema and root TypeScript types also declare `courseModule`.
- Studio scripts include `typegen`, `typecheck`, `build`, and `deploy`.

## Decisions and assumptions

- Treat the stored Sanity content as the source of truth; update the schema object type name to `module`, rather than rewriting the 40 existing embedded objects.
- Keep the object schema's fields, validation, title, preview, and references unchanged.
- Regenerate the extracted Studio schema and TypeScript types using the repository's existing Studio typegen command.
- Deploy the Studio application/schema only after local validation succeeds, so the hosted Studio accepts existing content.
- Do not modify course or lesson content in the dataset.

## Files expected to change

- `studio/schemaTypes/objects/course-module.ts`
- `studio/schemaTypes/documents/course.ts`
- Generated `studio/schema.json`
- Generated root `sanity.types.ts`
- This prompt file only for task documentation

## Requirements

1. Declare the embedded object using schema type name `module`.
2. Update the course `modules` array to accept type `module`.
3. Keep the module fields and behavior unchanged.
4. Regenerate schema extraction and TypeScript types with existing Studio scripts.
5. Run Studio typecheck and build.
6. Deploy the Studio schema/application if validation passes and project access is available.
7. Verify the seeded course-module lesson references remain unchanged.

## Security and scope

- Use the already configured Sanity project and dataset; do not print or expose credentials.
- Do not import, replace, delete, or mutate Sanity documents.
- Limit the change to aligning schema and generated types with the existing `_type`.

## Acceptance criteria

- The extracted schema declares an object type named `module`.
- The course `modules` field accepts list items of type `module`.
- Generated types represent module objects as `_type: "module"`.
- Studio typecheck and production build pass.
- The deployed Studio schema accepts and renders existing modules without the undeclared-list-item error.
- The 10 courses and their 40 module objects/120 lesson references remain intact.

## Checks and manual test steps

1. From `studio/`, run `npm run typegen`.
2. Run `npm run typecheck` and `npm run build`.
3. If both pass, run `npm run deploy` to publish the Studio schema.
4. In the deployed Studio, open a seeded course such as “Building AI Apps with LLMs”.
5. Expand its modules and confirm all 4 modules render with their 3 lessons, without the unknown item type warning.
6. Requery the dataset and confirm course/module/lesson relationships were not changed by the schema deployment.
