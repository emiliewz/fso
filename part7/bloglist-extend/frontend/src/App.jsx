import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import storageService from './services/storage'

import LoginForm from './components/LoginForm'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import { useInfo } from './InfoContext'
import { useMutation, useQuery } from '@tanstack/react-query'

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

  const like = async (blog) => {
    const blogToUpdate = { ...blog, likes: blog.likes + 1 }
    try {
      const updatedBlog = await blogService.update(blogToUpdate)
      notify(`A like for the blog '${blog.title}' by '${blog.author}'`)
      setBlogs(blogs.map((b) => (b.id !== blog.id ? b : updatedBlog)))
    } catch (exception) {
      notify('error liking', 'error')
    }
  }

  const remove = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.remove(blog.id)
        notify(`The blog' ${blog.title}' by '${blog.author} removed`)
        setBlogs(blogs.filter((b) => b.id !== blog.id))
      } catch (exception) {
        notify('error deleting', 'error')
      }
    }
  }

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  } else if (result.isError) {
    return <div>error...</div>
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

  const byLikes = (a, b) => b.likes - a.likes

  return (
    <div>
      <h2>blogs</h2>
      <Notification />

      <div>
        {user.name} logged in
        <button onClick={logout}>logout</button>
      </div>

      <NewBlog />

      <div>
        {blogs.sort(byLikes).map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            like={() => like(blog)}
            canRemove={user && blog.user.username === user.username}
            remove={() => remove(blog)}
          />
        )}
      </div>
    </div>
  )
}

export default App