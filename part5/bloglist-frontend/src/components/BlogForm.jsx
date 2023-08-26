import { useState } from "react"

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        title:
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        author:
        <input
          type='text'
          value={author}
          onChange={(e) => setAuthor(e.target.value)} />
      </div>
      <div>
        url:
        <input
          type='text'
          value={url}
          onChange={(e) => setUrl(e.target.value)} />
      </div>
      <button type='submit'>create</button>
    </form>
  )
}

export default BlogForm