
const Persons = ({ persons, handleClick }) => {
  return (
    <>
      {persons.map(person =>
        <p key={person.id}>
          {`${person.name} ${person.number} `}
          <button onClick={() => handleClick(person)}>delete</button>
        </p>
      )}
    </>
  )
}

export default Persons