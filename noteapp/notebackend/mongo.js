const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://anton:${password}@cluster0.fxkgccg.mongodb.net/testNoteApp?retryWrites=true&w=majority&appName=Cluster0`

console.log('connecting to mongodb:', url)
mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

if(process.argv.length === 3){
  Note.find({}).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })
}

if(process.argv.length === 5){
  const note = new Note({
    content: process.argv[3],
    important: process.argv[4]
  })

  note.save().then(() => {
    console.log('note saved!')
    mongoose.connection.close()
  })
}
