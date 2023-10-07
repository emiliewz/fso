import { CoursePart } from '../types'
import Part from './Part'

const Content = ({ courseParts }: { courseParts: CoursePart []}) => {
  return (
    <>
      {courseParts.map(c => (
      <>
        <p><strong>{c.name} {c.exerciseCount}</strong></p>
        <Part part={c} />
      </>
      ))}
      
    </>
  )
}

export default Content