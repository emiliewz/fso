import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { ALL_BOOKS, ME } from '../queries'

const Recommend = () => {
  const [genre, setGenre] = useState('')
  const [books, setBooks] = useState([])
  
  const result1 = useQuery(ME)

  useEffect(() => {
    if (result1.data) {
      setGenre(result1.data.me.favoriteGenre)
    }
  }, [result1.data])

  const result = useQuery(ALL_BOOKS, { variables: { genre } })

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
    }
  }, [result.data])

  return (
    <div>
      <h4 className='my-3'>Recommendations</h4>
      <p>books in your favorite genre <strong>patterns</strong></p>
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
    </div>
  )
}

export default Recommend