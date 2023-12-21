document.addEventListener('DOMContentLoaded', () => {
  let noteForm = document.querySelector('.note-form');
  let noteTitle = document.querySelector('.note-title');
  let noteText = document.querySelector('.note-textarea');
  let saveNoteBtn = document.querySelector('.save-note');
  let newNoteBtn = document.querySelector('.new-note');
  let clearBtn = document.querySelector('.clear-btn');
  let noteList = document.querySelector('.list-container .list-group');

  const show = (elem) => {
      elem.style.display = 'inline';
  };

  const hide = (elem) => {
      elem.style.display = 'none';
  };

  const getNotes = () => 
      fetch('/api/notes', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          },
      }).then(response => response.json());

  const saveNote = (note) =>
      fetch('/api/notes', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(note)
      }).then(response => response.json());

  const handleNoteSave = () => {
      if (!noteTitle.value.trim() || !noteText.value.trim()) {
          alert("Please fill in both title and text for the note.");
          return;
      }

      const newNote = {
          title: noteTitle.value,
          text: noteText.value
      };

      saveNote(newNote).then(() => {
          getAndRenderNotes();
          noteTitle.value = '';
          noteText.value = '';
          hide(saveNoteBtn);
          hide(clearBtn);
      }).catch(error => {
          console.error('Error saving note:', error);
          alert('There was an error saving the note.');
      });
  };

  const handleNewNoteView = () => {
      noteTitle.value = '';
      noteText.value = '';
      activeNote = {};
      show(clearBtn);
  };

  const handleClearForm = () => {
      noteTitle.value = '';
      noteText.value = '';
      hide(saveNoteBtn);
      hide(clearBtn);
  };

  const renderNoteList = (notes) => {
      // Implement the logic to render the list of notes
  };

  const getAndRenderNotes = () => {
      getNotes().then(notes => {
          renderNoteList(notes);
      });
  };

  saveNoteBtn.addEventListener('click', handleNoteSave);
  newNoteBtn.addEventListener('click', handleNewNoteView);
  clearBtn.addEventListener('click', handleClearForm);
  noteForm.addEventListener('input', () => {
      if (noteTitle.value.trim() || noteText.value.trim()) {
          show(saveNoteBtn);
          show(clearBtn);
      } else {
          hide(saveNoteBtn);
      }
  });

  getAndRenderNotes();
});
