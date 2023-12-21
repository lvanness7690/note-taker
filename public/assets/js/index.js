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

  const loadNotes = () => {
      const storedNotes = localStorage.getItem('notes');
      return storedNotes ? JSON.parse(storedNotes) : [];
  };

  const saveNoteToLocal = (newNote) => {
      const notes = loadNotes();
      notes.push(newNote);
      localStorage.setItem('notes', JSON.stringify(notes));
  };

  const renderNoteList = (notes) => {
      noteList.innerHTML = '';
      notes.forEach((note) => {
          const li = document.createElement('li');
          li.classList.add('list-group-item');
          li.innerText = note.title;
          li.addEventListener('click', () => {
              noteTitle.value = note.title;
              noteText.value = note.text;
              activeNote = note;
              show(clearBtn);
          });
          noteList.appendChild(li);
      });
  };

  const handleNoteSave = () => {
      if (!noteTitle.value.trim() || !noteText.value.trim()) {
          alert("Please fill in both title and text for the note.");
          return;
      }

      const newNote = {
          title: noteTitle.value,
          text: noteText.value,
          id: Date.now()
      };

      saveNoteToLocal(newNote);
      renderNoteList(loadNotes());
      noteTitle.value = '';
      noteText.value = '';
      hide(saveNoteBtn);
      hide(clearBtn);
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
      activeNote = {};
      hide(saveNoteBtn);
      hide(clearBtn);
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

  renderNoteList(loadNotes());
});
