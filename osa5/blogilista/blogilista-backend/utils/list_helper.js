const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null
  const mostLikes = Math.max(...blogs.map(blog => blog.likes))
  return blogs.find(blog => blog.likes === mostLikes)
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  const authorBlogs = _.countBy(blogs, 'author')

  const mostBlogsAuthor = _.maxBy(_.keys(authorBlogs), author => authorBlogs[author])

  return {
    author: mostBlogsAuthor,
    blogs: authorBlogs[mostBlogsAuthor]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
}