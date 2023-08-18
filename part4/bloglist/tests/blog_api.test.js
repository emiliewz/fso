const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('../utils/list_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('the unique identifier property of the blog posts is named id', async () => {
    const blogs = await api.get('/api/blogs')

    expect(blogs.body[0].id).toBeDefined()
  })
})

describe('addition of a new blog', () => {
  test('succeeds with valid data', async () => {
    const newBlog = {
      title: 'title',
      author: 'author',
      url: 'url',
      likes: 5,
      userId: '64de472a4527a597117affd3'
    }

    const userForLogin = {
      username: 'root',
      password: 'sekret'
    }

    const loginResult = await api
      .post('/api/login')
      .send(userForLogin)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    await api
      .post('/api/blogs')
      .send(newBlog)
      .auth(loginResult.body.token, { type: 'bearer' })
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).toContain('title')
  })

  test('fails with status code 401 if a token is not provided', async () => {
    const newBlog = {
      title: 'title',
      author: 'author',
      url: 'url',
      likes: 5,
      userId: '64de472a4527a597117affd3'
    }

    const userForLogin = {
      username: 'root',
      password: 'sekret'
    }

    await api
      .post('/api/login')
      .send(userForLogin)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const result = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('invalid token')

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('likes property default to 0 if missing', async () => {
    const newBlog = {
      title: 'title',
      author: 'author',
      url: 'url'
    }

    const userForLogin = {
      username: 'root',
      password: 'sekret'
    }

    const loginResult = await api
      .post('/api/login')
      .send(userForLogin)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const returnedBlog = await api
      .post('/api/blogs')
      .send(newBlog)
      .auth(loginResult.body.token, { type: 'bearer' })
      .expect(201)

    expect(returnedBlog.body.likes).toBe(0)
  })

  test('fails with status code 400 if the title or url properties are missing', async () => {
    let newBlog = {
      author: 'author',
      url: 'url',
      likes: 2
    }

    const userForLogin = {
      username: 'root',
      password: 'sekret'
    }

    const loginResult = await api
      .post('/api/login')
      .send(userForLogin)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    await api
      .post('/api/blogs')
      .send(newBlog)
      .auth(loginResult.body.token, { type: 'bearer' })
      .expect(400)

    newBlog = {
      title: 'title',
      author: 'author',
      likes: 2
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .auth(loginResult.body.token, { type: 'bearer' })
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const newBlog = {
      title: 'title',
      author: 'author',
      url: 'url',
      likes: 5,
      userId: '64de472a4527a597117affd3'
    }

    const userForLogin = {
      username: 'root',
      password: 'sekret'
    }

    const loginResult = await api
      .post('/api/login')
      .send(userForLogin)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const result = await api
      .post('/api/blogs')
      .send(newBlog)
      .auth(loginResult.body.token, { type: 'bearer' })
      .expect(201)

    await api
      .delete(`/api/blogs/${result.body.id}`)
      .auth(loginResult.body.token, { type: 'bearer' })
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)

    const titles = blogsAtEnd.map(blog => blog.title)

    expect(titles).not.toContain('title')
  })
})

describe('updation of a blog', () => {
  test('succeeds with status code 200 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const newBlog = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1
    }

    const updatedBlog = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(newBlog)
      .expect(200)

    expect(updatedBlog.body.likes).toBe(blogToUpdate.likes + 1)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})


