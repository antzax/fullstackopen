const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')

notesRouter.get('/', async (req,res) => {
  const notes = await Note.find({}).populate('user', { 'username': 1, 'name': 1 })
  res.json(notes)
})

notesRouter.get('/:id', async (req, res) => {
  const note = await Note.findById(req.params.id)
  if (note) {
    res.json(note)
  } else {
    res.status(404).end()
  }
})

notesRouter.post('/', async (req, res) => {
  const body = req.body

  const note = new Note({
    content: body.content,
    important: body.important || false
  })
  
  const savedNote = await note.save()
  res.status(201).json(savedNote)
})

notesRouter.delete('/:id', async (req, res) => {
  await Note.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

notesRouter.put('/:id', async (req, res, next) => {
  const { content, important } = req.body

  const noteToEdit = await Note.findById(req.params.id)

  if (!noteToEdit) {
    return res.status(400).end()
  }

  noteToEdit.content = content
  noteToEdit.important = important

  try {
    const updatedNote = await noteToEdit.save()
    res.status(200).json(updatedNote)
  } catch (exception) {
    next(exception)
  }
})

module.exports = notesRouter