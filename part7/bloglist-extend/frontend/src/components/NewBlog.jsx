import { useState, useRef } from 'react'
import Togglable from './Togglable'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/infoReducer'
import blogService from '../services/blogs'
import { createBlog } from '../reducers/blogSlice'

const BlogForm = (props) => {
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    try {
      const object = {
        title: event.target.title.value,
        author: event.target.author.value,
        url: event.target.url.value
      }
      const newBlog = await blogService.createNew(object)
      dispatch(createBlog(newBlog))
      dispatch(setNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`))
    } catch (exception) {
      dispatch(setNotification('error adding', 'error'))
    }
    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
  }


  return (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <h4>Create a new blog</h4>

      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input
            id='blog-title'
            placeholder='title'
            name='title'
          />
        </div>
        <div>
          author:
          <input
            id='blog-author'
            placeholder='author'
            name='author'
          />
        </div>
        <div>
          url:
          <input
            id='blog-url'
            placeholder='url'
            name='url'
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </Togglable>
  )
}

export default BlogForm
