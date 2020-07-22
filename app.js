const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes');

//Customize yargs version
yargs.version('1.2.3')

//Create add command
yargs.command({
  command: 'add',
  describe: 'Add new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: 'Note content',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    notes.addNote(argv.title, argv.body)
  }
})

//Create remove command
yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    notes.removeNote(argv.title)
  }
})

//Create list command
yargs.command({
  command: 'list',
  describe: 'List out all the notes',
  handler() {
    notes.listNotes()
  }
})

//Create read command
yargs.command({
  command: 'read',
  describe: 'Read out a note',
  builder: {
    title: {
      describe: "Read note",
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    notes.readNote(argv.title)
  }
})

yargs.parse()

// console.log(yargs.argv);