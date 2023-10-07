import { useRef } from 'react'
import blogService from '../services/blogs'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Togglable from './Togglable'
import { useInfo } from '../InfoContext'

const BlogForm = () => {
  const blogFormRef = useRef()
  const queryClient = useQueryClient()
  const notify = useInfo()

  const newBlogMutation = useMutation({
    mutationFn: blogService.createNew,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData({ queryKey: ['blogs'] })
      queryClient.setQueryData({ queryKey: ['blogs'] }, blogs.concat(newBlog))
      notify(`a new blog ${newBlog.title} by ${newBlog.author} added`)
    },
    onError: (error) => notify(error.response.data.error)
  })

  const onCreate = (event) => {
    event.preventDefault()

    blogFormRef.current.toggleVisibility()

    const blog = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
    }

    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''

    newBlogMutation.mutate(blog)
  }

  return (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <h4>Create a new blog</h4>

      <form onSubmit={onCreate}>
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