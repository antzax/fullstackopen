const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test-helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  console.log('cleared database')
  await Blog.insertMany(helper.initialBlogs)
  console.log('initialized database withnote')
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

test('blog likes default to 0', async () => {
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

test('if the title or url is missing respond with status 400', async () => {
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

test('a blog is deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]
  
  await Blog.deleteOne(blogToDelete)

  const blogsAtEnd = await helper.blogsInDb()

  assert.strictEqual(blogsAtStart.length - 1, blogsAtEnd.length)
})

after(async () => {
  await mongoose.connection.close()
})
