import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { LOGIN } from '../queries'
import { useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'

const LoginForm = ({ setToken, setError }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
      navigate('/')
    }
  }, [result.data])

  const submit = (event) => {
    event.preventDefault()
    login({ variables: { username, password } })
  }
  return (
    <Form className='my-3' onSubmit={submit}>

      <Form.Group className='mb-3'>
        <Form.Label>Username:</Form.Label>
        <Form.Control
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </Form.Group>
      <Button variant='outline-primary' type='submit'>log in</Button>
    </Form>
  )
}

export default LoginForm