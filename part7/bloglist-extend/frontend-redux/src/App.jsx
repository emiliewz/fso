import { useEffect } from 'react'
import LoginForm from './components/LoginForm'
import LogoutForm from './components/LogoutForm'
import NewBlog from './components/NewBlog'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import UserList from './components/UserList'
import User from './components/User'

import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeLogin } from './reducers/loginReducer'
import { initializeUsers } from './reducers/usersReducer'
import { Routes, Route, useMatch } from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()
  const loggedin = useSelector(state => state.login)
  const match = useMatch('/users/:/id')

  useEffect(() => {
    dispatch(initializeLogin())
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [])

  if (!loggedin) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  const singleUser = match
    ? []
    : null

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <LogoutForm />
      <NewBlog />
      <BlogList />

      <Routes>
        <Route path='/users' element={< UserList />} />
        <Route path='/users/:id' element={<User user={singleUser} />} />
      </Routes>


    </div>
  )
}

export default App
