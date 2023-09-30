import { useQuery } from '@apollo/client'
import { Button, Form, Table } from 'react-bootstrap'
import { ALL_BOOKS } from '../queries'
import { useState } from 'react'

const Books = () => {
  const [genre, setGenre] = useState(null)
  const result = useQuery(ALL_BOOKS, { variables: { genre } })

  const allGenres = ['refactoring', 'agile', 'patterns', 'design', 'crime', 'classic']

  if (result.loading) return null

  const books = result.data.allBooks

  return (
    <div>
      <h2 className='my-3'>Books</h2>

      {genre && <h4 className='my-3'>in genre <strong>patterns</strong></h4>}

      {allGenres.map(g => (
        <Button variant='outline-info' key={g} value={g} onClick={() => setGenre(g)}>{g}</Button>
      ))}

      <Table className='mt-3' striped>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </Table>

    </div >
  )
}

export default Books