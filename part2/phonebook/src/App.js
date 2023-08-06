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
    const duplicate = persons.filter(p => p.name.toLowerCase() === newName.toLowerCase()).length !== 0
    if (duplicate) {
      return alert(`${newName} is already added to phonebook`)
    }

    const personObject = { name: newName, number: newNumber }
    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setKw('')
      })
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

export default App;
