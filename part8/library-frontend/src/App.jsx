import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import BirthForm from './components/BirthForm'
import { Link, Route, Routes } from 'react-router-dom'
import { Alert } from 'react-bootstrap'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  return (
    <div className='container'>
      <Notify info={errorMessage} />
      <Link className='p-2 ps-0 text-decoration-none' to='/'>authors</Link>
      <Link className='p-2 text-decoration-none' to='/books'>books</Link>
      <Link className='p-2 text-decoration-none' to='/create'>add book</Link>

      <Routes>
        <Route path='/' element={<Authors setError={notify} />} />
        <Route path='/books' element={<Books />} />
        <Route path='/create' element={<NewBook setError={notify} />} />
      </Routes>

    </div >
  )
}

const Notify = ({ info }) => {
  if (!info) return null

  return (
    <Alert variant='danger'>
      {info}
    </Alert>
  )
}

export default App