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

  const removeButton = () => {
    if (JSON.parse(window.localStorage.getItem('loggedBlogappUser')).username === blog.user.username) {
      return <button id='remove-button' onClick={() => removeBlog(blog)}>remove</button>
    }
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}&nbsp;
      {showDetails ?
        <div className='blogDetails'>
          <button onClick={() => setShowDetails(false)}>hide</button><br />
          {blog.url} <br />
          likes {blog.likes}&nbsp;
          <button onClick={() => increaseLikes(blog)} className='likes'>likes</button><br />
          {blog.user.name ? blog.user.name : JSON.parse(window.localStorage.getItem('loggedBlogappUser')).name}<br />
          {removeButton()}
        </ div>
        : <button onClick={() => setShowDetails(true)}>view</button>
      }
    </div >
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  increaseLikes: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default Blog