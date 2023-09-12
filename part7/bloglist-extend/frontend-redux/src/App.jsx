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
import { Routes, Route, useMatch, Link } from 'react-router-dom'
import Blog from './components/Blog'

const App = () => {
  const dispatch = useDispatch()
  const loggedin = useSelector(state => state.login)
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)
  const matchUser = useMatch('/users/:id')
  const matchBlog = useMatch('/blogs/:id')

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

  const singleUser = matchUser
    ? users.find(u => u.id === matchUser.params.id)
    : null

  const singleBlog = matchBlog
    ? blogs.find(b => b.id === matchBlog.params.id)
    : null

  return (
    <div>
      <div>
        <Link className='nav' to='/'>blogs</Link>
        <Link className='nav' to='/users'>users</Link>
        <Notification />
        <LogoutForm />
      </div>
      <h2>blog app</h2>

      <NewBlog />

      <Routes>
        <Route path='/users' element={< UserList />} />
        <Route path='/users/:id' element={<User user={singleUser} />} />

        <Route path='/' element={<BlogList />} />
        <Route path='/blogs/:id' element={<Blog blog={singleBlog} />} />
      </Routes>
    </div>
  )
}

export default App
