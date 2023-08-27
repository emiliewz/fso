import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let container

  beforeEach(() => {
    const blog = {
      title: 'today is a sunny day',
      author: 'Emilie',
      URL: 'localhost: 3157',
      likes: 2
    }
    container = render(<Blog blog={blog} />).container
  })

  test('<Blog /> renders the blog title and author, without render its URL or number of likes', async () => {
    const element = screen.getByText('today is a sunny day', { exact: false })
    expect(element).toBeDefined()
    expect(screen.getByText('Emilie', { exact: false })).toBeDefined()

    expect(screen.queryByText('localhost: 3157', { exact: false })).toBeNull()
    expect(screen.queryByText('likes', { exact: false })).toBeNull()
  })

  test('after clicking the button, url and number of likes are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.blogDetails')
    expect(div).not.toHaveStyle('display:none')
  })

})

