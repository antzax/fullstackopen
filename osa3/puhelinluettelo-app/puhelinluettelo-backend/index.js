require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()

app.use(express.static('dist'))
app.use(express.json())

morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :response-time :body'))

app.get('/info', (req, res, next) => {
  Person.find({}).then(persons => {
    res.send(
      `<p>Phonebook has info for
      ${persons.length} people</p>
      <p>${new Date()}</p>`)
  })
    .catch(error => next(error))
})

app.get('/api/persons', (req, res, next) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
    .catch(error => {
      next(error)
    })
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(400).end()
      }
    })
    .catch(error => {
      next(error)
    })
})

app.post('/api/persons', (req, res, next) => {
  const { name, number } = req.body

  const person = new Person({
    name,
    number,
  })

  person.save().then(person => {
    res.json(person)
  })
    .catch(error => {
      console.log('POST ERROR')
      next(error)
    })
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id).then(() => {
    res.status(204).end()
  })
    .catch(error => {
      next(error)
    })
})

app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body

  Person.findById(req.params.id).then(person => {
    person.name = name
    person.number = number

    person.save().then(updatedPerson => {
      res.status(200).json(updatedPerson)
    })
      .catch(error => {
        next(error)
      })
  })
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  if (error.name === 'CastError' || error.name === 'ReferenceError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).send({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`)
})
