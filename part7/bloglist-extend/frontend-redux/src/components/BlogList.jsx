import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)

  const byLikes = (a, b) => b.likes - a.likes

  const style = {
    marginBottom: 2,
    padding: 5,
    borderStyle: 'solid',
  }

  return (
    <div>
      {[...blogs].sort(byLikes).map(blog => (
        <div key={blog.id} style={style} className='blog'>
          <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
        </div>
      ))}
    </div>
  )
}

export default BlogList