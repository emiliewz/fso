import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import storageService from './services/storage'

import LoginForm from './components/LoginForm'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import { useInfo } from './InfoContext'
import { useQuery } from '@tanstack/react-query'
import BlogList from './components/BlogList'

const App = () => {
  const [user, setUser] = useState('')
  const notify = useInfo()

  useEffect(() => {
    const loadedUser = storageService.loadUser()
    if (loadedUser) {
      setUser(loadedUser)
      blogService.setToken(loadedUser.token)
    }
  }, [])

  const login = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      storageService.saveUser(user)
      blogService.setToken(user.token)
      setUser(user)
      notify('Welcome!')
    } catch (exception) {
      notify('wrong username or password', 'error')
    }
  }

  const logout = (event) => {
    storageService.removeUser()
    setUser(null)
    notify('logged out')
  }

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
    retry: false
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  } else if (result.isError) {
    return <div>blog service not available due to problems in server</div>
  }

  const blogs = result.data

  if (!user) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification />
        <LoginForm login={login} />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />

      <div>
        {user.name} logged in
        <button onClick={logout}>logout</button>
      </div>

      <NewBlog />
      <BlogList user={user} blogs={blogs} />

    </div>
  )
}

export default App