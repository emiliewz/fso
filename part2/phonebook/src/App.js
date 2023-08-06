import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './service/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [kw, setKw] = useState('')

  useEffect(() => {
    // console.log('effect');
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  // console.log('render', persons.length, 'persons')

  const handleSubmit = (e) => {
    e.preventDefault()
    const personObject = { name: newName, number: newNumber }

    // check whether duplicate person's name exists
    const duplicate = persons.filter(p => p.name.toLowerCase() === newName.toLowerCase())

    // if exists a duplicate name, confirm about update an existing person's number
    if (duplicate.length !== 0) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService.update(duplicate[0].id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== duplicate[0].id ? p : returnedPerson))
          })
      }
    } else { // if no duplicate, create a new person with a number
      personService
        .create(personObject)
        .then(returnedPerson => setPersons(persons.concat(returnedPerson)))
    }
    setNewName('')
    setNewNumber('')
    setKw('')
  }

  const handleDelete = person => {
    if (window.confirm(`Delete ${person.name}`)) {
      personService.delete(person.id)
      setPersons(persons.filter(p => p.id !== person.id))
    }
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

      <Persons persons={filteredPersons} handleClick={handleDelete} />
    </>
  );
}

export default App
