import 'server-only'

import { client } from './client'
import {
  CATEGORIES_QUERY,
  CATEGORY_BY_SLUG_QUERY,
  COURSE_BY_SLUG_QUERY,
  COURSES_QUERY,
  INSTRUCTOR_BY_SLUG_QUERY,
  LESSON_BY_SLUG_QUERY,
} from './queries'

export function getCourses() {
  return client.fetch(COURSES_QUERY)
}

export function getCourseBySlug(slug: string) {
  return client.fetch(COURSE_BY_SLUG_QUERY, { slug })
}

export function getLessonBySlug(slug: string) {
  return client.fetch(LESSON_BY_SLUG_QUERY, { slug })
}

export function getInstructorBySlug(slug: string) {
  return client.fetch(INSTRUCTOR_BY_SLUG_QUERY, { slug })
}

export function getCategories() {
  return client.fetch(CATEGORIES_QUERY)
}

export function getCategoryBySlug(slug: string) {
  return client.fetch(CATEGORY_BY_SLUG_QUERY, { slug })
}
