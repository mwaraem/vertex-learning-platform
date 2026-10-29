import { defineQuery } from 'next-sanity'

export const COURSES_QUERY = defineQuery(`
  *[_type == "course"] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    summary,
    coverImage,
    level,
    price,
    isPopular,
    studentCount,
    learningOutcomes[] {
      _key,
      icon,
      title,
      description
    },
    "instructor": instructor->{
      _id,
      name,
      "slug": slug.current,
      photo,
      expertise
    },
    "category": category->{
      _id,
      title,
      "slug": slug.current
    }
  }
`)

export const COURSE_BY_SLUG_QUERY = defineQuery(`
  *[_type == "course" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    summary,
    coverImage,
    level,
    price,
    isPopular,
    studentCount,
    learningOutcomes[] {
      _key,
      icon,
      title,
      description
    },
    "instructor": instructor->{
      _id,
      name,
      "slug": slug.current,
      photo,
      expertise,
      bio
    },
    "category": category->{
      _id,
      title,
      "slug": slug.current,
      description
    },
    "modules": modules[] {
      _key,
      title,
      summary,
      "lessons": lessons[]->{
        _id,
        title,
        "slug": slug.current,
        thumbnail,
        duration,
        isFreePreview,
        studentCount,
        keyPoints
      }
    }
  }
`)

export const LESSON_BY_SLUG_QUERY = defineQuery(`
  *[_type == "lesson" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    videoUrl,
    thumbnail,
    duration,
    isFreePreview,
    studentCount,
    notes,
    keyPoints,
    proTip,
    resources[] {
      _key,
      type,
      title,
      description,
      url
    },
    "course": *[_type == "course" && references(^._id)][0] {
      _id,
      title,
      "slug": slug.current,
      "instructor": instructor->{_id, name, "slug": slug.current, photo},
      "category": category->{_id, title, "slug": slug.current},
      "modules": modules[] {
        _key,
        title,
        summary,
        "lessons": lessons[]->{
          _id,
          title,
          "slug": slug.current,
          duration,
          isFreePreview
        }
      }
    }
  }
`)

export const INSTRUCTOR_BY_SLUG_QUERY = defineQuery(`
  *[_type == "instructor" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    photo,
    expertise,
    bio,
    "courses": *[_type == "course" && references(^._id)] | order(_createdAt desc) {
      _id,
      title,
      "slug": slug.current,
      summary,
      coverImage,
      level,
      studentCount,
      "category": category->{title, "slug": slug.current}
    }
  }
`)

export const CATEGORIES_QUERY = defineQuery(`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    "courseCount": count(*[_type == "course" && references(^._id)])
  }
`)

export const CATEGORY_BY_SLUG_QUERY = defineQuery(`
  *[_type == "category" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    "courses": *[_type == "course" && references(^._id)] | order(_createdAt desc) {
      _id,
      title,
      "slug": slug.current,
      summary,
      coverImage,
      level,
      studentCount,
      "instructor": instructor->{name, "slug": slug.current, photo}
    }
  }
`)
