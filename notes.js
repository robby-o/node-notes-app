const fs = require('fs')
const chalk = require('chalk')

function listNotes() {
  const notes = loadNotes()
  console.log(chalk.magenta(`Your notes are:`))
  notes.forEach((note) => console.log(note.title))
}

function readNote({ title }) {
  const notes = loadNotes()
  const note = notes.find((note) => note.title === title)

  if (!note) {
    return console.log(
      chalk.red.inverse(`Note "${title} does not exist`)
    )
  }

  console.log(chalk.magenta(`Title: "${note.title}`))
  console.log(`Title: "${note.body}`)
}

function addNote({ title, body }) {
  const notes = loadNotes()
  const duplicateNote = notes.find(
    (note) => note.title === title
  )

  if (duplicateNote) {
    return console.log(
      chalk.red.inverse('Note title already exists')
    )
  }

  notes.push({
    title,
    body,
  })

  saveNotes(notes)
  console.log(chalk.green.inverse('new note added'))
}

function removeNote({ title }) {
  const notes = loadNotes()
  const notesToKeep = notes.filter(
    (note) => note.title !== title
  )

  if (notes.length === notesToKeep.length) {
    return console.log(
      chalk.red.inverse(`Note "${title}" not found`)
    )
  }

  saveNotes(notesToKeep)
  console.log(
    chalk.green.inverse(`Note "${title}" removed`)
  )
}

function saveNotes(notes) {
  const jsonedNotes = JSON.stringify(notes)
  fs.writeFileSync('notes.json', jsonedNotes)
}

function loadNotes() {
  try {
    const notesData = fs.readFileSync('notes.json')
    return JSON.parse(notesData)
  } catch (e) {
    return []
  }
}

module.exports = {
  listNotes,
  addNote,
  removeNote,
  readNote,
}
