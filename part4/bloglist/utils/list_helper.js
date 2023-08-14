var _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null

  const { title, author, likes, ...rest } = blogs.reduce((a, b) => a.likes >= b.likes ? a : b)

  return { title, author, likes }
}

const mostBlogs = (blogs) => {

  if (blogs.length === 0) return null

  // group blogs by author
  const totalBlogs = _.groupBy(blogs, _.iteratee('author'))
  // convert object to array and compare elements array's length, to get the array of most blogs
  const most = _.values(totalBlogs).reduce((a, b) => a.length >= b.length ? a : b)
  // return a new object containing blogs length and author's name
  return { author: most[0]['author'], blogs: most.length }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null

  const totalBlogs = _.groupBy(blogs, _.iteratee('author'))

  const totalLikes = _.values(totalBlogs).map(a => a.length === 1
    ? { author: a[0].author, likes: a[0].likes }
    : { author: a[0].author, likes: a.reduce((b, c) => b + c.likes, 0) }
  )

  const result = totalLikes.reduce((a, b) => a.likes >= b.likes ? a : b)

  return result
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}