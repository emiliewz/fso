
const Persons = ({ persons, handleClick }) => {
  return (
    <>
      {persons.map(person =>
        <p key={person.name}>
          {`${person.name} ${person.number} `}
          <button onClick={() => handleClick(person.id)}>delete</button>
        </p>
      )}
    </>
  )
}

export default Persons