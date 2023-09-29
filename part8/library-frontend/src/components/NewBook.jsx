import { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK } from '../queries'
import { Button, Form, InputGroup } from 'react-bootstrap'


const NewBook = ({ setError }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [addBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
    onError: (error) => {
      const gqlError = error.graphQLErrors[0]
      gqlError.extensions.error
        ? setError(gqlError.extensions.error.message)
        : setError(gqlError.message)
    }
  })

  const submit = async (event) => {
    event.preventDefault()

    addBook({ variables: { title, author, published, genres } })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <Form className='my-3' onSubmit={submit}>

      <Form.Group className='mb-3'>
        <Form.Label>Title:</Form.Label>
        <Form.Control
          placeholder='title'
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>Author:</Form.Label>
        <Form.Control
          placeholder='author'
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>Published:</Form.Label>
        <Form.Control
          placeholder='published'
          type='number'
          value={published}
          onChange={({ target }) => setPublished(parseInt(target.value))}
        />
      </Form.Group>

      <InputGroup className='mb-3'>
        <Form.Control
          placeholder='genre'
          value={genre}
          onChange={({ target }) => setGenre(target.value)}
        />
        <Button variant='outline-info' onClick={addGenre}>
          add genre
        </Button>
      </InputGroup>

      <div className='mb-3'>
        genres: {genres.join(' ')}
      </div>

      <Button variant='primary' type='submit'>create book</Button>
    </Form >
  )
}

export default NewBook