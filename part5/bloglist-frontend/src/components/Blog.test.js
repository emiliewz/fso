import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('<Blog /> renders the blog title and author, without render its URL or number of likes', async () => {
  const blog = {
    title: 'today is a sunny day',
    author: 'Emilie',
    URL: 'localhost: 3157',
    likes: 2
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('today is a sunny day', { exact: false })
  expect(element).toBeDefined()
  expect(screen.getByText('Emilie', { exact: false })).toBeDefined()
  
  expect(screen.queryByText('localhost: 3157', { exact: false })).toBeNull()
  expect(screen.queryByText('likes', { exact: false })).toBeNull()
})