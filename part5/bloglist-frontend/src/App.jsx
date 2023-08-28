import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [isError, setIsError] = useState(false)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => setBlogs(blogs)
      )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setIsError(true)
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setErrorMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      setTimeout(() => setErrorMessage(null), 5000)
    } catch (exception) {
      setIsError(true)
      setErrorMessage('error adding')
      setTimeout(() => {
        setErrorMessage(null)
        setIsError(false)
      }, 5000)
    }
  }

  const addLikes = async (blog) => {
    const newBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    try {
      const returnedBlog = await blogService.update(blog.id, newBlog)
      setBlogs(blogs.map(b => b.id !== blog.id ? b : returnedBlog))
    }
    catch (exception) {
      setIsError(true)
      setErrorMessage('error liking')
      setTimeout(() => {
        setErrorMessage(null)
        setIsError(false)
      }, 5000)
      setBlogs(blogs.filter(b => b.id !== blog.id))
    }
  }

  const deleteBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        const returnedBlog = await blogService.deleteBlog(blog.id)
        setBlogs(blogs.filter(b => b.id !== blog.id))
      }
      catch (exception) {
        setIsError(true)
        setErrorMessage('error deleting')
        setTimeout(() => {
          setErrorMessage(null)
          setIsError(false)
        }, 5000)
      }
    }
  }

  const addNewBlogsForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const showSortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  return (
    < div >
      {user ? <h2>blogs</h2> : <h2>log in to application</h2>}
      <Notification message={errorMessage} isError={isError} />
      {!user && <LoginForm createLogin={handleLogin} />}
      {user && <>
        <p>{user.name} logged in
          <button type='submit' onClick={handleLogout}>logout</button>
        </p>
        {addNewBlogsForm()}
        {showSortedBlogs.map(b => {
          return <Blog key={b.id} blog={b} increaseLikes={addLikes} removeBlog={deleteBlog} />
        }
        )}
      </>}
    </div >
  )
}

export default App