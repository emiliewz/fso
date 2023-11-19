const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

const { initialUsers, initialBlogs, blogsInDb } = require('./test_helper')

let token

describe('blogs api', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    // // create a test user and save the corresponding auth header
    const user = initialUsers[0]

    await api.post('/api/users').send(user)
    const response = await api.post('/api/login').send(user)
    token = response.body.token
  })

  describe('when there is initially some blogs saved', () => {
    beforeEach(async () => {
      await Blog.deleteMany({})
      await Blog.insertMany(initialBlogs)
    })

    test('blogs are returned as json', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
      const response = await api.get('/api/blogs')

      expect(response.body).toHaveLength(initialBlogs.length)
    })

    test('the unique identifier property of the blog posts is named id', async () => {
      const blogs = await api.get('/api/blogs')

      expect(blogs.body[0].id).toBeDefined()
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

        await api
          .post('/api/blogs')
          .send(newBlog)
          .set('Authorization', `Bearer ${token}`)
          // .auth(authHeader, { type: 'bearer' })
          .expect(201)
          .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await blogsInDb()
        expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)

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

        const result = await api
          .post('/api/blogs')
          .send(newBlog)
          .expect(401)
          .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('invalid token')

        const blogsAtEnd = await blogsInDb()
        expect(blogsAtEnd).toHaveLength(initialBlogs.length)
      })

      test('likes property default to 0 if missing', async () => {
        const newBlog = {
          title: 'title',
          author: 'author',
          url: 'url'
        }

        const returnedBlog = await api
          .post('/api/blogs')
          .send(newBlog)
          .auth(token, { type: 'bearer' })
          .expect(201)

        expect(returnedBlog.body.likes).toBe(0)
      })

      test('fails with status code 400 if the title or url properties are missing', async () => {
        let newBlog = {
          author: 'author',
          url: 'url',
          likes: 2
        }

        await api
          .post('/api/blogs')
          .send(newBlog)
          .auth(token, { type: 'bearer' })
          .expect(400)

        newBlog = {
          title: 'title',
          author: 'author',
          likes: 2
        }

        await api
          .post('/api/blogs')
          .send(newBlog)
          .auth(token, { type: 'bearer' })
          .expect(400)

        const blogsAtEnd = await blogsInDb()

        expect(blogsAtEnd).toHaveLength(initialBlogs.length)
      })

      test('succeeds with status code 200 if id is valid', async () => {
        const blogsAtStart = await blogsInDb()
        const blogToUpdate = blogsAtStart[0]

        const newBlog = {
          ...blogToUpdate,
          likes: blogToUpdate.likes + 1
        }

        const updatedBlog = await api
          .put(`/api/blogs/${blogToUpdate.id}`)
          .set('Authorization', `Bearer ${token}`)
          .send(newBlog)
          .expect(200)

        expect(updatedBlog.body.likes).toBe(blogToUpdate.likes + 1)
      })
    })
  })

  describe('a blog', () => {
    let id
    beforeEach(async () => {
      await Blog.deleteMany({})

      const blog = {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
      }

      const response = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(blog)

      id = response.body.id
    })

    test('succeeds with status code 204 if id is valid', async () => {
      await api
        .delete(`/api/blogs/${id}`)
        .auth(token, { type: 'bearer' })
        .expect(204)

      const blogsAtEnd = await blogsInDb()

      expect(blogsAtEnd).toHaveLength(0)
    })

    test('can not be deleted without valid auth header', async () => {
      await api
        .delete(`/api/blogs/${id}`)
        .expect(401)

      const blogsAfter = await blogsInDb()

      expect(blogsAfter).toHaveLength(1)
    })
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})


