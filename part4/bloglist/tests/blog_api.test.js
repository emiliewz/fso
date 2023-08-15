const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('../utils/list_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.blogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned the correct amount of blogs posts as json', async () => {
  const blogsAtStart = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(blogsAtStart.body).toHaveLength(helper.blogs.length)
}, 100000)

test('the unique identifier property of the blog posts is named id', async () => {
  const blogs = await api.get('/api/blogs')

  expect(blogs.body[0].id).toBeDefined()
})



afterAll(async () => {
  await mongoose.connection.close()
})


