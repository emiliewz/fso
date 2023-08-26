import { useState } from 'react'

const Blog = ({ blog }) => {
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
          <button>likes</button><br />
          {blog.user.name ? blog.user.name : JSON.parse(window.localStorage.getItem('loggedBlogappUser')).name}
        </>
        : <button onClick={() => setShowDetails(true)}>view</button>
      }
    </div >
  )
}
export default Blog