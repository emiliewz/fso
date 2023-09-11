import { useEffect } from 'react'

import LoginForm from './components/LoginForm'
import LogoutForm from './components/LogoutForm'
import NewBlog from './components/NewBlog'
import BlogList from './components/BlogList'
import Notification from './components/Notification'

import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initializeUser())
    dispatch(initializeBlogs())
  }, [dispatch])

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
