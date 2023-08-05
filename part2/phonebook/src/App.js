import { useState } from 'react'


const App = () => {
  // const [persons, setPersons] = useState([
  //   { name: 'Arto Hellas', number: '040-1234567' }
  // ])
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [kw, setKw] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const duplicate = persons.filter(p => p.name.toLowerCase() === newName.toLowerCase()).length !== 0
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

  const filteredPersons = kw
    ? persons.filter(p => p.name.toLowerCase().includes(kw.toLowerCase()))
    : persons

  return (
    <>
      <h2>PhoneBook</h2>
      <div>filter shown with
        <input
          value={kw}
          onChange={e => setKw(e.target.value)}
        />
      </div>
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
        filteredPersons.map(person =>
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
