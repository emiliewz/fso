import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/infoReducer'
import { removeBlog, updateBlog } from '../reducers/blogReducer'
import { useNavigate } from 'react-router-dom'

const Blog = ({ blog }) => {
  const loggedin = useSelector(state => state.login)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  if (!blog) return null


  const remove = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        dispatch(removeBlog(blog.id))
        dispatch(setNotification(`The blog' ${blog.title}' by '${blog.author} removed`))
        navigate('/')
      } catch (exception) {
        dispatch(setNotification('error deleting', 'error'))
      }
    }
  }

  const like = async (blog) => {
    const blogToUpdate = { ...blog, likes: blog.likes + 1 }
    try {
      dispatch(updateBlog(blogToUpdate))
      dispatch(setNotification(`A like for the blog '${blog.title}' by '${blog.author}'`))
    } catch (exception) {
      dispatch(setNotification('error liking', 'error'))
    }
  }

  const canRemove = loggedin && blog.user.username === loggedin.username

  return (
    <div>
      <h2>{blog.title}</h2>
      <div>
        <div>
          <a href={blog.url}>
            {blog.url}
          </a>
        </div>

        <div>
          {blog.likes} likes <button onClick={() => like(blog)}>like</button>
        </div>

        <div>
          {blog.user && <div>added by {blog.user.name}</div>}
        </div>

        {canRemove &&
          <button onClick={() => remove(blog)}>delete</button>
        }

        <h3>comments</h3>
        <ul>
          {blog.comments.map((c, i) => <li key={i}>{c}</li>)}
        </ul>
      </div>
    </div>
  )
}

export default Blog