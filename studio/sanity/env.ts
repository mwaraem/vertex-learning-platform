function requiredValue(value: string | undefined, name: string): string {
  if (!value?.trim()) {
    throw new Error(`Missing environment variable: ${name}`)
  }

  return value
}

export const projectId = requiredValue(
  process.env.SANITY_STUDIO_PROJECT_ID,
  'SANITY_STUDIO_PROJECT_ID',
)

export const dataset = requiredValue(
  process.env.SANITY_STUDIO_DATASET,
  'SANITY_STUDIO_DATASET',
)

export const apiVersion =
  process.env.SANITY_STUDIO_API_VERSION || '2026-10-28'
