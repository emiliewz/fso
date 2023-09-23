import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { Button, Form } from 'react-bootstrap'
import { EDIT_BORN_YEAR } from '../queries'
// import Select from 'react-select'

const BirthForm = ({ setError, authors }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [editBirthYear, result] = useMutation(EDIT_BORN_YEAR, {
    onError: (error) => setError(error.graphQLErrors[0].message)
  })

  const submit = (event) => {
    event.preventDefault()

    editBirthYear({ variables: { name, born } })

    setName('')
    setBorn('')
  }

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      setError('author not found')
    }
  }, [result.data])

  // const options = authors.map(a => {
  //   return { value: a.name, label: a.name }
  // })

  return (
    <>
      <h2 className='my-3'>Set birthyear</h2>
      <Form onSubmit={submit}>
        <Form.Select
          aria-label='default select'
          onChange={({ target }) => setName(target.value)}
          defaultValue=''
        >
          <option value='' disabled>--Please choose an author--</option>
          {authors.map(a => (
            <option key={a.name} value={a.name}>{a.name}</option>
          ))}
        </Form.Select>

        {/* <Select
          placeholder='--Please choose an author--'
          defaultInputValue={name}
          onChange={(v) => setName(v.value)}
          options={options}
        /> */}

        <Form.Group>
          <Form.Label>born:</Form.Label>
          <Form.Control value={born} type='number' onChange={({ target }) => setBorn(parseInt(target.value))} />
        </Form.Group>

        <Button variant='outline-primary' type='submit'>update author</Button>
      </Form>
    </>
  )
}

export default BirthForm