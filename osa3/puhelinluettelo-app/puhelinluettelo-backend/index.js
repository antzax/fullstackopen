require('dotenv').config()
const express = require("express");
const morgan = require('morgan')
const Person = require('./models/person')

const app = express();

app.use(express.static('dist'))
app.use(express.json())

morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :response-time :body'))

let persons = [
  {
    name: "Arto Hellas",
    number: "12-43-321122",
    id: "1",
  },
  {
    name: "Ada Lovelace",
    number: "12-43-12321",
    id: "2",
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: "3",
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: "4",
  },
]

app.get("/info", (req, res) => {
  res.send(`<p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>`);
});

app.get("/api/persons", (req, res) => {
  const persons = Person.find({}).then(persons => {
    console.log(persons)
    res.json(persons);
  })
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id
  Person.findById(id).then(person => {
    res.json(person)
  })
})

app.post("/api/persons", (req, res) => {
  const id = req.params.id
  const person = new Person({
    name: req.body.name,
    number: req.body.number,
  })
  person.save().then(person => {
    res.json(person)
  })
})

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id
  persons = persons.filter(person => person.id !== id)

  res.status(204).end()
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
