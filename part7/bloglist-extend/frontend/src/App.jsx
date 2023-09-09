import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import storageService from './services/storage'

import LoginForm from './components/LoginForm'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState('')
  const [info, setInfo] = useState({ message: null })

  const blogFormRef = useRef()

  useEffect(() => {
    const user = storageService.loadUser()
    setUser(user)
  }, [])

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  const notifyWith = (message, type = 'info') => {
    setInfo({ message, type })

    setTimeout(() => {
      setInfo({ message: null })
    }, 3000)
  }

  const login = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      setUser(user)
      storageService.saveUser(user)
      notifyWith('Welcome!')
    } catch (exception) {
      notifyWith('wrong username or password', 'error')
    }
  }

  const logout = (event) => {
    setUser(null)
    storageService.removeUser()
    notifyWith('logged out')
  }

  const createBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    try {
      const createdBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(createdBlog))
      notifyWith(`a new blog ${createdBlog.title} by ${createdBlog.author} added`)
    } catch (exception) {
      notifyWith('error adding', 'error')
    }
  }

  const like = async (blog) => {
    const blogToUpdate = { ...blog, likes: blog.likes + 1 }
    try {
      const updatedBlog = await blogService.update(blogToUpdate)
      notifyWith(`A like for the blog '${blog.title}' by '${blog.author}'`)
      setBlogs(blogs.map((b) => (b.id !== blog.id ? b : updatedBlog)))
    } catch (exception) {
      notifyWith('error liking', 'error')
    }
  }

  const remove = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.remove(blog.id)
        notifyWith(`The blog' ${blog.title}' by '${blog.author} removed`)
        setBlogs(blogs.filter((b) => b.id !== blog.id))
      } catch (exception) {
        notifyWith('error deleting', 'error')
      }
    }
  }

  if (!user) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification info={info} />
        <LoginForm login={login} />
      </div>
    )
  }

  const byLikes = (a, b) => b.likes - a.likes

  return (
    <div>
      <h2>blogs</h2>
      <Notification info={info} />

      <div>
        {user.name} logged in
        <button onClick={logout}>logout</button>
      </div>

      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <NewBlog createBlog={createBlog} />
      </Togglable>

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
