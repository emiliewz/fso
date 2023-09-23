import { Table } from 'react-bootstrap'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'
import BirthForm from './BirthForm'

const Authors = ({ setError }) => {
  const result = useQuery(ALL_AUTHORS)

  if (result.loading) return null

  const authors = result.data.allAuthors

  return (
    <div>
      <h2 className='mt-3 mb-3'>Authors</h2>
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
      <BirthForm setError={setError} authors={authors} />
    </div>
  )
}

export default Authors