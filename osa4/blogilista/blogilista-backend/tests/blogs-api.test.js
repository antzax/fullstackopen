const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test-helper')

const api = supertest(app)

describe('when initial notes are loaded to db', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    console.log('cleared database')
    await Blog.insertMany(helper.initialBlogs)
    console.log('initialized database with notes')
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect('Content-Type', /json/)
      .expect(200)
  })

  test('GET /api/blogs', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('blog _id is changed to id', async () => {
    const { body } = await api.get('/api/blogs')
    const firstBlog = body[0]

    assert(Object.keys(firstBlog).includes('id'))
  })

  test('blog default likes is 0', async () => {
    const blogWithoutLikes = {
      title: 'Something',
      author: 'Somebody',
      url: 'www.somewebsite.com',
    }

    const savedBlog = await api
      .post('/api/blogs')
      .send(blogWithoutLikes)
      .expect(201)
      .expect('Content-Type', /json/)

    assert.strictEqual(savedBlog.body.likes, 0)
  })

  test('missin url or title results status 400', async () => {
    const blogWithoutTitle = {
      author: 'Somebody',
      url: 'www.somewebsite.com',
      likes: 0,
    }

    await api
      .post('/api/blogs')
      .send(blogWithoutTitle)
      .expect(400)
    
    const blogWithoutAuthor = {
      title: 'Something',
      url: 'www.somewebsite.com',
      likes: 0,
    }

    await api
      .post('/api/blogs')
      .send(blogWithoutAuthor)
      .expect(400)
  })
  
  describe('when blog is deleted', () => {
    test('DELETE /blog/api/:id', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]
      
      await Blog.deleteOne(blogToDelete)

      const blogsAtEnd = await helper.blogsInDb()

      assert.strictEqual(blogsAtStart.length - 1, blogsAtEnd.length)
    })
  })

  describe('when blog is saved', () => {
    test('POST /api/blogs', async () => {
      const newBlog = {
        title: 'Something',
        author: 'Somebody',
        url: 'www.somewebsite.com',
        likes: 0,
      }

      const savedBlog = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /json/)

      const blogsAfterSave = await helper.blogsInDb()

      assert(savedBlog.body.title.includes('Something'))
      assert.strictEqual(helper.initialBlogs.length + 1, blogsAfterSave.length)
    })
  })
  
  describe('when blog is updated', () => {
    test('PUT /api/blogs/:id', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const originalBlog = blogsAtStart[0]

      const newBlog = {
        title: 'new title',
        author: 'new author',
        url: 'new url',
        likes: 10
      }

      const response = await api
        .put(`/api/blogs/${originalBlog.toJSON().id}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(response.body.title, newBlog.title)
      assert.strictEqual(response.body.author, newBlog.author)
      assert.strictEqual(response.body.url, newBlog.url)
      assert.strictEqual(response.body.likes, newBlog.likes)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})
