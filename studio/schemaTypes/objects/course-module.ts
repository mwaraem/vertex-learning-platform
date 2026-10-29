import { defineArrayMember, defineField, defineType } from 'sanity'

export const courseModule = defineType({
  name: 'courseModule',
  title: 'Course module',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().min(2).max(100),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().max(500),
    }),
    defineField({
      name: 'lessons',
      title: 'Lessons',
      description: 'Add lessons in the order they should appear in the course.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'lesson' }],
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: 'title', lessons: 'lessons' },
    prepare({ title, lessons }) {
      return {
        title,
        subtitle: `${lessons?.length ?? 0} lessons`,
      }
    },
  },
})
