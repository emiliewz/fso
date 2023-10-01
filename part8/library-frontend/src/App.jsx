import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { Link, Route, Routes } from 'react-router-dom'
import { Alert, Button } from 'react-bootstrap'
import LoginForm from './components/LoginForm'
import { useApolloClient } from '@apollo/client'
import Recommend from './components/Recommend'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    const token = localStorage.getItem('library-user-token')
    if (token) {
      setToken(token)
    }
  }, [])

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div className='container'>
      <Notify info={errorMessage} />
      <Link className='p-2 ps-0 text-decoration-none' to='/'>authors</Link>
      <Link className='p-2 text-decoration-none' to='/books'>books</Link>
      {!token && <Link className='p-2 text-decoration-none' to='/login'>login</Link>}
      {token && <>
        <Link className='p-2 text-decoration-none' to='/create'>add book</Link>
        <Link className='p-2 text-decoration-none' to='/recommend'>recommend</Link>
        <Button size='sm' variant='outline-dark' onClick={logout}>logout</Button>
      </>}

      <Routes>
        <Route path='/' element={<Authors setError={notify} />} />
        <Route path='/books' element={<Books />} />
        <Route path='/create' element={<NewBook setError={notify} />} />
        <Route path='/recommend' element={<Recommend />} />
        <Route path='/login' element={<LoginForm setError={notify} setToken={setToken} />} />
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