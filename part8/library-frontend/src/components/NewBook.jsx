import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK } from '../queries'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { updateCache } from '../App'
import { useNavigate } from 'react-router-dom'


const NewBook = ({ setError }) => {
  const [title, setTitle] = useState('title')
  const [author, setAuthor] = useState('author')
  const [published, setPublished] = useState(2023)
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const navigate = useNavigate()

  const [createBook] = useMutation(CREATE_BOOK, {
    onError: (error) => {
      let messages = error.graphQLErrors.map(e => e.message).join('\n')
      // console.log(error.graphQLErrors[0].extensions);
      if (error.graphQLErrors[0]?.extensions) {
        messages += error.graphQLErrors[0].extensions?.error?.message
      }
      setError(messages)
    },
    onCompleted: () => {
      navigate('/books')
    },
    update: (cache, response) => {
      updateCache(cache, { query: ALL_BOOKS }, response.data.addBook)
    },
  })

  const submit = async (event) => {
    event.preventDefault()

    createBook({ variables: { title, author, published, genres } })

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