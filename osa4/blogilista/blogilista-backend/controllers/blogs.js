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

module.exports = blogRoutes