const fs = require('fs')
const validator = require('validator')
const chalk = require('chalk')
const yargs = require('yargs')
const {
  addNote,
  removeNote,
  listNotes,
  readNote,
} = require('./notes')

yargs.version('1.1.0')

// create add command
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string',
    },
  },
  handler: addNote,
})

// create remove command
yargs.command({
  command: 'remove',
  describe: 'Remove a new note by title',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler: removeNote,
})

// create list command
yargs.command({
  command: 'list',
  describe: 'List your notes',
  handler: listNotes,
})

// create read command
yargs.command({
  command: 'read',
  describe: 'read notes',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler: readNote,
})

yargs.parse()
