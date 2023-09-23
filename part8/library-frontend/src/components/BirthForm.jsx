import React, { useEffect, useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { Button, Form } from 'react-bootstrap'
import { EDIT_BORN_YEAR } from '../queries'

const BirthForm = ({ setError }) => {
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

  return (
    <Form onSubmit={submit}>
      <Form.Group>
        <Form.Label>name:</Form.Label>
        <Form.Control value={name} onChange={({ target }) => setName(target.value)} />
      </Form.Group>

      <Form.Group>
        <Form.Label>born:</Form.Label>
        <Form.Control value={born} type='number' onChange={({ target }) => setBorn(parseInt(target.value))} />
      </Form.Group>

      <Button variant='outline-primary' type='submit'>update author</Button>
    </Form>
  )
}

export default BirthForm