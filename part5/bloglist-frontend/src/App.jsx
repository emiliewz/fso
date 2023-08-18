import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [isError, setIsError] = useState(false)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setIsError(true)
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit' >login</button>
    </form>
  )

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleAddNewNote = async (event) => {
    event.preventDefault()
    try {
      const returnedBlog = await blogService.create({ title, author, url })
      setBlogs(blogs.concat(returnedBlog))
      setErrorMessage(`a new blog ${title} by ${author} added`)
      setTimeout(() => setErrorMessage(null), 5000)
    } catch (exception) {
      setErrorMessage('error adding')
      setIsError(true)
      setTimeout(() => {
        setErrorMessage(null)
        setIsError(false)
      }, 5000)
    }
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const addNewNotesForm = () => (
    <form onSubmit={handleAddNewNote}>
      <div>
        title:
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        author:
        <input
          type='text'
          value={author}
          onChange={(e) => setAuthor(e.target.value)} />
      </div>
      <div>
        url:
        <input
          type='text'
          value={url}
          onChange={(e) => setUrl(e.target.value)} />
      </div>
      <button type='submit'>create</button>
    </form>
  )

  return (
    < div >
      {user ? <h2>blogs</h2> : <h2>log in to application</h2>}
      <Notification message={errorMessage} isError={isError} />
      {!user && <div>
        {loginForm()}</div>}
      {user && <>
        <p>{user.name} logged in
          <button type='submit' onClick={handleLogout}>logout</button>
        </p>
        {addNewNotesForm()}
        {blogs.map(blog => {
          return <Blog key={blog.id} blog={blog} />
        }
        )}
      </>}
    </div >
  )
}

export default App