import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'
import Notify from './components/Notify'

import { Link, Route, Routes } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from './queries'
import { useApolloClient, useSubscription } from '@apollo/client'

// function that takes care of manipulating cache
export const updateCache = (cache, addedBook) => {
  // helper that is used to eliminate saving same person twice
  const uniqByTitle = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery({ query: ALL_BOOKS, variables: { genre: null } }, ({ allBooks }) => {
    return {
      allBooks: uniqByTitle(allBooks.concat(addedBook)),
    }
  })

  // cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
  //   return {
  //     allAuthors: allAuthors.concat(addedBook.author)
  //   }
  // })
}

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('library-user-token')
    if (token) {
      setToken(token)
    }
  }, [])

  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      notify(`${addedBook.title} added`, 'info')

      updateCache(client.cache, addedBook)
    }
  })

  const notify = (message, type) => {
    setErrorMessage({ message, type })
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