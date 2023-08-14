const blog = require("../models/blog")

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  } else {
    const { title, author, likes, ...rest } = blogs.reduce((a, b) => a.likes >= b.likes ? a : b)
    return { title, author, likes }
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}