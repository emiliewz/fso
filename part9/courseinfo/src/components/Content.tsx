import { CoursePart } from '../types'
import Part from './Part'

const Content = ({ courseParts }: { courseParts: CoursePart []}) => {
  return (
    <>
      {courseParts.map(p => <Part part={p} />)}
    </>
  )
}

export default Content