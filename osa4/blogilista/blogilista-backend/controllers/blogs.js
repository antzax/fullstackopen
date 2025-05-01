const Blog = require('../models/blog')
const User = require('../models/user')
const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const { title, author, url, likes } = request.body

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if(!decodedToken.id){
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({ title, author, url, likes, user: user._id })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(blog)
  await user.save()
  
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if(!decodedToken.id) {
    return response.status(401).json({ error: 'token invaid' })
  }

  const user = await User.findById(decodedToken.id)
  const blog = await Blog.findById(id)

  console.log(blog.user)
  console.log(user)

  if(blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndDelete(id)
  }

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