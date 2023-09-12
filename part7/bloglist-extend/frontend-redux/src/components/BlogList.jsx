import Blog from './Blog'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/infoReducer'
import { removeBlog, updateBlog } from '../reducers/blogReducer'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const dispatch = useDispatch()

  const byLikes = (a, b) => b.likes - a.likes

  const remove = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        dispatch(removeBlog(blog.id))
        dispatch(setNotification(`The blog' ${blog.title}' by '${blog.author} removed`))
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

  return (
    <div>
      {
        [...blogs].sort(byLikes).map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            like={() => like(blog)}
            canRemove={user && blog.user.username === user.username}
            remove={() => remove(blog)}
          />)
      }
    </div>
  )
}

export default BlogList