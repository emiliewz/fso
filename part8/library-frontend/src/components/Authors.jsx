import { Table } from 'react-bootstrap'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'

const Authors = () => {
  const result = useQuery(ALL_AUTHORS)

  if (result.loading) return null

  const authors = result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <Table striped>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Authors