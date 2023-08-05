import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [kw, setKw] = useState('')

  useEffect(() => {
    // console.log('effect');
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        // console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  // console.log('render', persons.length, 'persons')

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
