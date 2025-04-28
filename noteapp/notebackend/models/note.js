const mongoose = require('mongoose')
const dotenv = require('dotenv')

const mongoUri = dotenv.env.MONGODB_URI

mongoose.connect(mongoUri)
  .then(result => {
    console.log('connected to MongoDB')
  }).catch(error => {
    console.log('error connection to MongoDB: ', error.message)
  })

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

// delete _id and __v fields for serving an api
noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Note = mongoose.model('Note', noteSchema)

module.exports = Note