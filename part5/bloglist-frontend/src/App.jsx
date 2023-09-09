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
  const [info, setInfo] = useState({ message: null })

  const blogFormRef = useRef()

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => setBlogs(blogs)
      )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notifyWith = (message, type = 'info') => {
    setInfo({ message, type })

    setTimeout(() => {
      setInfo({ message: null })
    }, 3000)
  }

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      notifyWith('Welcome!')
    } catch (exception) {
      notifyWith('wrong username or password', 'error')
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    notifyWith('logged out')
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      notifyWith(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
    } catch (exception) {
      notifyWith('error adding', 'error')
    }
  }

  const addLikes = async (blog) => {
    const blogToUpdate = { ...blog, likes: blog.likes + 1 }
    try {
      const updatedBlog = await blogService.update(blog.id, blogToUpdate)
      setBlogs(blogs.map(b => b.id !== blog.id ? b : updatedBlog))
      notifyWith(`A like for the blog '${blog.title}' by '${blog.author}'`)
    }
    catch (exception) {
      notifyWith('error liking', 'error')
    }
  }

  const deleteBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        const returnedBlog = await blogService.deleteBlog(blog.id)
        setBlogs(blogs.filter(b => b.id !== blog.id))
        notifyWith(`The blog' ${blog.title}' by '${blog.author} removed`)
      }
      catch (exception) {
        notifyWith('error deleting', 'error')
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
      <Notification info={info} />
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