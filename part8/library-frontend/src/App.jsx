import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'
import Notify from './components/Notify'

import { Link, Route, Routes } from 'react-router-dom'
import { Alert, Button } from 'react-bootstrap'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import { useEffect, useState } from 'react'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'

const App = () => {
  const result = useQuery(ALL_BOOKS, ALL_AUTHORS)
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    const token = localStorage.getItem('library-user-token')
    if (token) {
      setToken(token)
    }
  }, [])

  if (result.loading) return <div>loading...</div>

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

export default App