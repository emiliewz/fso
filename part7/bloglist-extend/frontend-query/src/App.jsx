import { useEffect } from 'react'
import blogService from './services/blogs'
import storageService from './services/storage'

import LoginForm, { LogoutForm } from './components/LoginForm'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import { useQuery } from '@tanstack/react-query'
import BlogList from './components/BlogList'
import { useLogin, useUserValue } from './UserContext'

const App = () => {
  const loginWith = useLogin()
  const user = useUserValue()

  useEffect(() => {
    const loadedUser = storageService.loadUser()
    if (loadedUser) {
      loginWith(loadedUser)
      blogService.setToken(loadedUser.token)
    }
  }, [])

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

  if (!user) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <LogoutForm />
      <NewBlog />
      <BlogList />

    </div>
  )
}

export default App