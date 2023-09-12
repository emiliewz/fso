import { useState } from 'react'
import { useInfo } from '../InfoContext'
import blogService from '../services/blogs'
import loginService from '../services/login'
import storageService from '../services/storage'
import { useLogin, useLogout, useUserValue } from '../UserContext'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const notify = useInfo()
  const loginWith = useLogin()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      storageService.saveUser(user)
      blogService.setToken(user.token)
      loginWith(user)
      notify('Welcome!')
    } catch (exception) {
      notify('wrong username or password', 'error')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        username
        <input
          id='username'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id='password'
          type='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='login-button' type='submit'>
        login
      </button>
    </form>
  )
}

export const LogoutForm = () => {
  const user = useUserValue()
  const logout = useLogout()
  const notify = useInfo()

  const handleLogout = () => {
    storageService.removeUser()
    logout()
    notify('logged out')
  }

  return (
    <div>
      {user.name} logged in
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default LoginForm