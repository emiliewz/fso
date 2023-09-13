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
import { Routes, Route, useMatch, Link, Navigate } from 'react-router-dom'
import Blog from './components/Blog'

const App = () => {
  const dispatch = useDispatch()
  const loggedin = useSelector(state => state.login)
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)
  const matchUser = useMatch('/users/:id')
  const matchBlog = useMatch('/blogs/:id')

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
    dispatch(initializeLogin())
  }, [])

  const singleUser = matchUser
    ? users.find(u => u.id === matchUser.params.id)
    : null

  const singleBlog = matchBlog
    ? blogs.find(b => b.id === matchBlog.params.id)
    : null

  return (
    <div className='container'>
      <div>
        <Link style={{ padding: 5 }} to='/'>blogs</Link>
        <Link style={{ padding: 5 }} to='/users'>users</Link>
        {loggedin
          ? <LogoutForm />
          : <Link style={{ padding: 5 }} to='/login'>login</Link>
        }
      </div>

      <Notification />
      <h2>blog app</h2>

      <Routes>
        <Route path='/' element={<div><NewBlog /><BlogList /></div>} />
        <Route path='/blogs/:id' element={<Blog blog={singleBlog} />} />

        <Route path='/users' element={loggedin ? <UserList /> : <Navigate replace to='/login' />} />
        <Route path='/users/:id' element={<User user={singleUser} />} />

        <Route path='/login' element={<LoginForm />} />
      </Routes>
    </div>
  )
}

export default App
