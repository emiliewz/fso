import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import storageService from './services/storage'

import LoginForm from './components/LoginForm'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'

import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/infoReducer'
import { setBlogs } from './reducers/blogSlice'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const [user, setUser] = useState('')

  useEffect(() => {
    blogService.
      getAll()
      .then((blogs) => dispatch(setBlogs(blogs)))
  }, [])

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
      dispatch(setNotification('Welcome!'))
    } catch (exception) {
      dispatch(setNotification('wrong username or password', 'error'))
    }
  }

  const logout = (event) => {
    storageService.removeUser()
    setUser(null)
    dispatch(setNotification('logged out'))
  }

  const like = async (blog) => {
    const blogToUpdate = { ...blog, likes: blog.likes + 1 }
    try {
      const updatedBlog = await blogService.update(blogToUpdate)
      dispatch(setNotification(`A like for the blog '${blog.title}' by '${blog.author}'`))
      setBlogs(blogs.map((b) => (b.id !== blog.id ? b : updatedBlog)))
    } catch (exception) {
      dispatch(setNotification('error liking', 'error'))
    }
  }

  const remove = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.remove(blog.id)
        dispatch(setNotification(`The blog' ${blog.title}' by '${blog.author} removed`))
        setBlogs(blogs.filter((b) => b.id !== blog.id))
      } catch (exception) {
        dispatch(setNotification('error deleting', 'error'))
      }
    }
  }

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
        {[...blogs].sort(byLikes).map(blog =>
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
