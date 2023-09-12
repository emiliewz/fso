import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'
import Blog from './Blog'
import { useInfo } from '../InfoContext'

const BlogList = ({ user, blogs }) => {
  const queryClient = useQueryClient()
  const notify = useInfo()

  const likeBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData({ queryKey: ['blogs'] })
      queryClient.setQueryData({ queryKey: ['blogs'] }, blogs.map(b =>
        b.id !== updatedBlog.id ? b : updatedBlog))
      notify(`A like for the blog '${updatedBlog.title}' by '${updatedBlog.author}'`)
    },
    onError: (error) => notify(error.response.data.error)
  })

  const like = (blog) => {
    const blogToUpdate = { ...blog, likes: blog.likes + 1 }
    likeBlogMutation.mutate(blogToUpdate)
  }

  const removeBlogMutation = useMutation({
    mutationFn: blogService.deleteOne,
    onSuccess: ({ deletedBlog }) => {
      const blogs = queryClient.getQueryData({ queryKey: ['blogs'] })
      queryClient.setQueryData({ queryKey: ['blogs'] }, blogs.filter(b => b.id !== deletedBlog.id))
      notify(`The blog' ${deletedBlog.title}' by '${deletedBlog.author} removed`)
    },
    onError: (error) => notify(error.response.data.error)
  })

  const remove = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlogMutation.mutate(blog)
    }
  }

  const byLikes = (a, b) => b.likes - a.likes

  return (
    <div>
      {blogs.sort(byLikes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          like={() => like(blog)}
          remove={() => remove(blog)}
          canRemove={user && blog.user.username === user.username}
        />
      )}
    </div>
  )
}

export default BlogList