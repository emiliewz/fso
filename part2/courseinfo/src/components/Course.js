import Header from "./Header"
import Content from "./Content"

const Total = ({ total }) =>
  <p><strong>total of {total} exercises</strong></p>

const Course = ({ course }) => {
  // const total = course.parts.reduce((a, b) => {
  //   return { exercises: a.exercises + b.exercises }
  // }).exercises
  const total = course.parts.reduce((a, b) => a + b.exercises, 0)

  return (
    <>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total total={total} />
    </>
  )
}

export default Course