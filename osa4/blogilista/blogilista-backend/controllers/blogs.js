const Blog = require('../models/blog')
const blogRoutes = require('express').Router()

blogRoutes.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRoutes.post('/', async (request, response) => {
  const { title, author, url, likes } = request.body

  const blog = new Blog({ title, author, url, likes })
  
  await blog.save()
  response.status(201).json(blog)
})

blogRoutes.delete('/:id', async (request, response) => {
  const id = request.params.id

  await Blog.findByIdAndDelete(id)

  response.status(204).end()
})

blogRoutes.put('/:id', async (request, response) => {
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

module.exports = blogRoutes