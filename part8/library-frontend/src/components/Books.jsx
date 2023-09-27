import { useQuery } from '@apollo/client'
import { Table } from 'react-bootstrap'
import { ALL_BOOKS } from '../queries'

const Books = () => {
  const result = useQuery(ALL_BOOKS)

  if (result.loading) return null

  const books = result.data.allBooks

  return (
    <div>
      <h2 className='mt-3 mb-3'>books</h2>

      <Table striped>
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

export default Books