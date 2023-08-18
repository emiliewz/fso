import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
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
      setErrorMessage('Wrong credentials')
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
      await blogService.create({ title, author, url })
      setBlogs(blogs.concat({ title, author, url }))
    } catch (exception) {
      console.log('error adding')
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
      {errorMessage}
      {!user && <div>
        <h2>log in to application</h2>
        {loginForm()}</div>}
      {user && <>
        <h2>blogs</h2>
        <p>{user.name} logged in</p>
        <form onSubmit={handleLogout}>
          <button type='submit'>logout</button>
        </form>
        {addNewNotesForm()}
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </>}
    </div >
  )
}

export default App