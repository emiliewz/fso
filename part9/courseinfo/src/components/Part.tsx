import { CoursePart } from '../types'

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  )
}

const renderPart = (part: CoursePart) => {
  switch (part.kind) {
    case 'basic':
      return <p><em>{part.description}</em></p>
    case 'group':
      return <p>project exercises {part.groupProjectCount}</p>
    case 'background':
      return (
          <>
            <p>{part.description}</p>
            <p>{part.backgroundMaterial}</p>
          </>
        )
    default:
      return assertNever(part)
  }
}

const Part = (props : { part: CoursePart }) => {

  return (
    <>
      {renderPart(props.part)}
    </>
  )
}

export default Part