import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, increaseLikes, removeBlog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}&nbsp;
      {showDetails ?
        <>
          <button onClick={() => setShowDetails(false)}>hide</button><br />
          {blog.url} <br />
          likes {blog.likes}&nbsp;
          <button onClick={() => increaseLikes(blog)}>likes</button><br />
          {blog.user.name ? blog.user.name : JSON.parse(window.localStorage.getItem('loggedBlogappUser')).name}<br />
          <button onClick={() => removeBlog(blog)}>remove</button>
        </>
        : <button onClick={() => setShowDetails(true)}>view</button>
      }
    </div >
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  // increaseLikes: PropTypes.func.isRequired,
  // removeBlog: PropTypes.func.isRequired
}

export default Blog