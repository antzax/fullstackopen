const express = require('express')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const blogRoutes = require('./controllers/blogs')

const app = express()

logger.info('connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI).then(() => {
  logger.info('Connected to MongoDb')
}).catch(error => {
  logger.error('Error connecting to MongoDb', error.message)
})

app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogRoutes)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app