const express = require("express");
const morgan = require('morgan')
const app = express();

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
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id
  const person = persons.find(person => person.id === id)

  if(person){
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.post("/api/persons", (req, res) => {
  const { name, number } = req.body
  const id = String(Math.floor(Math.random() * 1000 * 1000))

  if(!name || !number) return res.status(400).json({
    error: 'content missing'
  })

  if(persons.map(person => person.name).includes(name)){
    return res.status(400).json({ error: 'name must be unique' })
  }

  const person = {
    name,
    number,
    id,
  }

  persons = persons.concat(person)

  res.json(person)
})

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id
  persons = persons.filter(person => person.id !== id)

  res.status(204).end()
})

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
