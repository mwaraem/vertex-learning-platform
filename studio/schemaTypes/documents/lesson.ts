import { defineArrayMember, defineField, defineType } from 'sanity'

export const lesson = defineType({
  name: 'lesson',
  title: 'Lesson',
  type: 'document',
  groups: [
    { name: 'details', title: 'Details', default: true },
    { name: 'notes', title: 'Notes and resources' },
    { name: 'marketing', title: 'Marketing' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'details',
      validation: (rule) => rule.required().min(3).max(120),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'details',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      group: 'details',
      validation: (rule) => rule.required().uri({ scheme: ['https'] }),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Poster or thumbnail',
      type: 'image',
      options: { hotspot: true },
      group: 'details',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'duration',
      title: 'Duration (seconds)',
      type: 'number',
      group: 'details',
      validation: (rule) => rule.required().integer().min(0),
    }),
    defineField({
      name: 'isFreePreview',
      title: 'Free preview',
      type: 'boolean',
      initialValue: false,
      group: 'marketing',
    }),
    defineField({
      name: 'studentCount',
      title: 'Student count',
      type: 'number',
      initialValue: 0,
      group: 'marketing',
      validation: (rule) => rule.integer().min(0),
    }),
    defineField({
      name: 'notes',
      title: 'Lesson notes',
      type: 'array',
      group: 'notes',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  defineField({
                    name: 'href',
                    title: 'URL',
                    type: 'url',
                    validation: (rule) =>
                      rule.required().uri({ scheme: ['http', 'https', 'mailto'] }),
                  }),
                ],
              },
            ],
          },
        }),
      ],
    }),
    defineField({
      name: 'keyPoints',
      title: 'In this lesson',
      type: 'array',
      group: 'notes',
      of: [defineArrayMember({ type: 'string' })],
      validation: (rule) => rule.required().min(1).max(8),
    }),
    defineField({
      name: 'proTip',
      title: 'Pro tip',
      type: 'text',
      rows: 3,
      group: 'notes',
      validation: (rule) => rule.max(500),
    }),
    defineField({
      name: 'resources',
      title: 'Resources',
      type: 'array',
      group: 'notes',
      of: [defineArrayMember({ type: 'lessonResource' })],
      validation: (rule) => rule.max(20),
    }),
  ],
  preview: {
    select: { title: 'title', media: 'thumbnail' },
  },
})
