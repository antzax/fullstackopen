const mongoose = require('mongoose')

const url = process.env.MONGO_DB_URI

console.log('Connecting to', url)

mongoose.connect(url)
  .then(() => {
    console.log('Connected to mongodb')
  }).catch(error => {
    console.log('Error connecting to mongodb:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: function(v) {
        return (/\d{2,3}-\d{7,8}/.test(v.trim()))
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: true,
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)

