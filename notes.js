const fs = require('fs');
const chalk = require('chalk')

// Add note function
const addNote = (title, body) => {
  const notes = loadNotes()

  const duplicateNote = notes.find((note) => note.title === title)

  debugger

  if(!duplicateNote) {
    notes.push({
      title: title,
      body: body
    })
  
    saveNotes(notes);
    console.log('Note added!')
  }else {
    console.log("Title has been taken")
  }
}


// Save notes function
const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
}

// Load notes function
const loadNotes = () => {
  try{
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  }catch(e) {
    return []
  }
}

// Remove note function
const removeNote = (title) => {
  const notes = loadNotes();

  const filterNote = notes.filter((note) => note.title === title);

  if(filterNote.length > 0) {
    const index = notes.lastIndexOf(filterNote);
    notes.splice(index, 1)

    saveNotes(notes);
    console.log(chalk.green.inverse('Note removed!'));
  }else {
    console.log(chalk.red.inverse('Note not found!'))
  }
}

// List note function
const listNotes = (title) => {
  const notes = loadNotes();

  console.log(chalk.green("Your notes"))
  notes.forEach((note) => {
    console.log(note.title)
  })
}

// Read note function
const readNote = (title) => {
  const notes = loadNotes();

  const readNote = notes.find((note) => {
    return note.title === title
  });

  if(readNote) {
    console.log(chalk.blue.bold(readNote.title));
    console.log(chalk.italic(readNote.body))
  }else {
    console.log(chalk.red.italic("No note found"))
  }
}

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
};