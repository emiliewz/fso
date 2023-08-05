import Header from "./Header"
import Content from "./Content"

const Course = ({ course }) => {
  const total = course.parts.reduce((a, b) => {
    return { exercises: a.exercises + b.exercises }
  })

  return (
    <>
      <Header course={course} />
      <Content parts={course.parts} />
      <p><strong>total of {total.exercises} exercises</strong></p>
    </>
  )
}

export default Course