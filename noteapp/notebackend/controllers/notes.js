const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', async (req,res) => {
  const notes = await Note.find({})
  res.json(notes)
})

notesRouter.get('/:id', (req, res, next) => {
  Note.findById(req.params.id).then(note => {
    if(note) {
      res.json(note)
    } else {
      res.status(404).end()
    }
  })
    .catch(error => next(error))
})

notesRouter.post('/', async (req, res, next) => {
  const body = req.body

  const note = new Note({
    content: body.content,
    important: body.important || false
  })
  try {
    const savedNote = await note.save()
    res.status(201).json(savedNote)
  } catch (exception) {
    next(exception)
  }
})

notesRouter.delete('/:id', (req, res, next) => {
  Note.findByIdAndDelete(req.params.id).then(() => {
    res.status(204).end()
  })
    .catch(error => next(error) )
})

notesRouter.put('/:id', (req, res, next) => {
  const { content, important } = req.body

  Note.findById(req.params.id).then(note => {
    if (!note) {
      return res.status(400).end()
    }

    note.content = content
    note.important = important

    return note.save().then(updatedNote => {
      res.status(200).json(updatedNote)
    })
  })
    .catch(error => next(error))
})

module.exports = notesRouter