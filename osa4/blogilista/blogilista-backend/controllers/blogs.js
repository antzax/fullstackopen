const Blog = require('../models/blog')
const blogsRouter = require('express').Router()
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  await Blog.deleteMany({})
  
  const { title, author, url, likes, userId } = request.body

  const user = await User.findById(userId)

  const blog = new Blog({ title, author, url, likes, user: user._id })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(blog)
  await user.save()
  
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id

  await Blog.findByIdAndDelete(id)

  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { author, title, url, likes } = request.body
  const id = request.params.id

  const doc = await Blog.findById(id)

  doc.title = title
  doc.author = author
  doc.url = url
  doc.likes = likes

  const savedDoc = await doc.save()

  response.status(201).json(savedDoc)
})

module.exports = blogsRouter