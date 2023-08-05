import { useState } from 'react'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setPersons([
      ...persons,
      { name: newName }
    ])
    setNewName('')
  }

  return (
    <>
      <h2>PhoneBook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name:
          <input
            value={newName}
            onChange={e => setNewName(e.target.value)}
          />
        </div>
        {/* <div>debug: {newName}</div> */}
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person =>
        <p
          key={person.name}>
          {person.name}
        </p>
      )}
    </>
  );
}

export default App;
