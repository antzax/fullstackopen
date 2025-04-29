require('dotenv').config()
const express = require("express");
const morgan = require('morgan')
const Person = require('./models/person')

const app = express();

app.use(express.static('dist'))
app.use(express.json())

morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :response-time :body'))

app.get("/info", (req, res) => {
  res.send(`<p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>`);
});

app.get("/api/persons", (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons);
  })
});

app.get("/api/persons/:id", (req, res, next) => {
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

app.post("/api/persons", (req, res, next) => {
  const { name, number } = req.body

  const person = new Person({
    name,
    number,
  })
  person.save().then(person => {
    res.json(person)
  })
  .catch(error => {
    next(error)
  })
})

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndDelete(req.params.id).then(result => {
    res.status(204).end()
  })
  .catch(error => {
    next(error)
  })
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.log(error)
  if (error.name === 'CastError' || error.name === 'ReferenceError') {
    return res.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
