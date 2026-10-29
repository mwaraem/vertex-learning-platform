import { defineField, defineType } from 'sanity'

export const learningOutcome = defineType({
  name: 'learningOutcome',
  title: 'Learning outcome',
  type: 'object',
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon key',
      description: 'A short icon name used by the web app, such as code or rocket.',
      type: 'string',
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().max(300),
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'description' },
  },
})
