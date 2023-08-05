import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

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
      <h2>Phonebook</h2>

      <Filter kw={kw} setKw={setKw} />

      <h3>Add a new</h3>

      <PersonForm handleSubmit={handleSubmit} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />

      <h3>Numbers</h3>

      <Persons persons={filteredPersons} />
    </>
  );
}

export default App;
