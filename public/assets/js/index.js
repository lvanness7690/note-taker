document.addEventListener('DOMContentLoaded', () => {
  // Define all variables at the top
  let noteForm = document.querySelector('.note-form');
  let noteTitle = document.querySelector('.note-title');
  let noteText = document.querySelector('.note-textarea');
  let saveNoteBtn = document.querySelector('.save-note');
  let newNoteBtn = document.querySelector('.new-note');
  let clearBtn = document.querySelector('.clear-btn');
  let noteList = document.querySelector('.list-container .list-group'); // Assuming there's only one list-group

  // Show an element
  const show = (elem) => {
    elem.style.display = 'inline';
  };

  // Hide an element
  const hide = (elem) => {
    elem.style.display = 'none';
  };

  // ... (other helper functions like getNotes, saveNote, deleteNote)

  const handleNoteSave = () => {
    console.log('Attempting to save note.'); // Debug log
    // Add a check to prevent empty notes from being saved
    if (!noteTitle.value.trim() || !noteText.value.trim()) {
      alert("Can't save an empty note.");
      return;
    }

    const newNote = {
      title: noteTitle.value,
      text: noteText.value
    };

    saveNote(newNote).then(() => {
      getAndRenderNotes();
      renderActiveNote();
    }).catch(error => {
      console.error('Failed to save the note:', error);
    });
  };

  const handleNewNoteView = () => {
    console.log('New note view triggered.'); // Debug log
    // Logic to handle creating a new note view
    noteTitle.value = '';
    noteText.value = '';
    noteTitle.focus(); // Focus on the new title input
    activeNote = {};
    show(clearBtn);
  };

  const handleClearForm = () => {
    console.log('Clear form triggered.'); // Debug log
    noteTitle.value = '';
    noteText.value = '';
    activeNote = {};
    hide(saveNoteBtn);
    hide(newNoteBtn);
  };

  // ... (other event handlers)

  if (window.location.pathname === '/notes') {
    saveNoteBtn.addEventListener('click', handleNoteSave);
    newNoteBtn.addEventListener('click', handleNewNoteView);
    clearBtn.addEventListener('click', handleClearForm);
    noteForm.addEventListener('input', handleRenderBtns);
  }

  // ... (rest of your code, including getAndRenderNotes call)
});
