import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './service/persons'

const Notification = ({ message, isError }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='msg'
      style={{
        color: isError ? 'red' : 'green'
      }}>
      {message}
    </div >
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [kw, setKw] = useState('')
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(false)

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
        const id = duplicate[0].id
        personService.update(id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== id ? p : returnedPerson))
            setMessage(`Added ${newName}`)
            setTimeout(() => { setMessage(null) }, 5000)
          })
          .catch(error => {
            const err = `Information of ${newName} has already been already removed from server`
            console.log(err)
            setIsError(true)
            setMessage(err)
            setTimeout(() => {
              setIsError(false)
              setMessage(null)
            }, 5000)
            setPersons(persons.filter(p => p.id !== id))
          })
      }
    } else { // if no duplicate, create a new person with a number
      personService
        .create(personObject)
        .then(createdPerson => {
          setPersons(persons.concat(createdPerson))
          setMessage(`Added ${newName}`)
          setTimeout(() => setMessage(null), 5000)
        })
        .catch(error => {
          // this is the way to access the error message
          console.log(error.response.data.error)
          setIsError(true)
          setMessage(error.response.data.error)
          setTimeout(() => {
            setIsError(false)
            setMessage(null)
          }, 5000)
        })
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

      <Notification message={message} isError={isError} />

      <Filter kw={kw} setKw={setKw} />

      <h3>Add a new</h3>

      <PersonForm handleSubmit={handleSubmit} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />

      <h3>Numbers</h3>

      <Persons persons={filteredPersons} handleClick={handleDelete} />
    </>
  );
}

export default App
