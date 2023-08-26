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
      {blog.title}&nbsp;
      {showDetails ?
        <>
          <button onClick={() => setShowDetails(false)}>hide</button><br />
          {blog.url} <br />
          likes {blog.likes} <br />
          {blog.author}
        </>
        : <button onClick={() => setShowDetails(true)}>view</button>
      }
    </div >
  )
}
export default Blog