// index.js
document.addEventListener('DOMContentLoaded', () => {
  const noteForm = document.querySelector('.note-form');
  const noteTitle = document.querySelector('.note-title');
  const noteText = document.querySelector('.note-textarea');
  const saveNoteBtn = document.querySelector('.save-note');
  const newNoteBtn = document.querySelector('.new-note');
  const clearBtn = document.querySelector('.clear-btn');
  const noteList = document.querySelector('.list-container .list-group');

  let activeNote = {};

  const getNotes = () => fetch('/api/notes').then(response => response.json());

  const saveNote = (note) =>
    fetch('/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    }).then(response => response.json());

  const renderNoteList = (notes) => {
    // Implementation to render notes goes here
  };

  const handleNoteSave = () => {
    const newNote = {
      title: noteTitle.value,
      text: noteText.value,
    };
    saveNote(newNote).then(addNote => {
      activeNote = {};
      renderNoteList([...notes, addNote]);
      noteTitle.value = '';
      noteText.value = '';
    });
  };

  const handleNoteView = (e) => {
    // Implementation to view a note goes here
  };

  const handleNewNoteView = () => {
    activeNote = {};
    noteTitle.value = '';
    noteText.value = '';
  };

  const handleClearForm = () => {
    handleNewNoteView();
  };

  saveNoteBtn.addEventListener('click', handleNoteSave);
  newNoteBtn.addEventListener('click', handleNewNoteView);
  clearBtn.addEventListener('click', handleClearForm);

  getNotes().then(notes => {
    renderNoteList(notes);
  });
});
