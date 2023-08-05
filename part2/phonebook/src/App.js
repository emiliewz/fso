import { useState } from 'react'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const duplicate = persons.filter(p => p.name === newName).length !== 0
    if (duplicate) {
      return alert(`${newName} is already added to phonebook`)
    }
    setPersons([
      ...persons,
      { name: newName, number: newNumber }
    ])
    setNewName('')
    setNewNumber('')
  }

  return (
    <>
      <h2>PhoneBook</h2>
      <form onSubmit={handleSubmit}>
        <div>name:
          <input
            value={newName}
            onChange={e => setNewName(e.target.value)}
          />
        </div>
        <div>number:
          <input
            value={newNumber}
            onChange={e => setNewNumber(e.target.value)}
          />
        </div>
        <div><button type="submit">add</button></div>
      </form >
      <h2>Numbers</h2>
      {
        persons.map(person =>
          <p
            key={person.name}>
            {person.name} {person.number}
          </p>
        )
      }
    </>
  );
}

export default App;
