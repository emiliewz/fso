interface CoursePartBase {
  name: string
  exerciseCount: number
}

interface CoursePartDescribe extends CoursePartBase {
  description: string
}

interface CoursePartBasic extends CoursePartDescribe {
  kind: 'basic'
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number
  kind: 'group'
}

interface CoursePartBackground extends CoursePartDescribe {
  backgroundMaterial: string
  kind: 'background'
}

interface CoursePartRequirement extends CoursePartDescribe {
  requirements: string []
  kind: 'special'
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartRequirement
