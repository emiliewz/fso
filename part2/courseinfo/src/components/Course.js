import Header from "./Header"
import Content from "./Content"

const Course = ({ course }) => {
  // const total = course.parts.reduce((a, b) => {
  //   return { exercises: a.exercises + b.exercises }
  // })

  const total = course.parts.reduce((a, b) => a + b.exercises, 0)

  return (
    <>
      <Header course={course} />
      <Content parts={course.parts} />
      <p><strong>total of {total} exercises</strong></p>
    </>
  )
}

export default Course