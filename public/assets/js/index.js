document.addEventListener('DOMContentLoaded', () => {
  let noteTitle = document.querySelector('.note-title');
  let noteText = document.querySelector('.note-textarea');
  let saveNoteBtn = document.querySelector('.save-note');
  let noteList = document.querySelector('.list-container .list-group');

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
      notes.forEach((note, index) => {
          const noteItem = document.createElement('li');
          noteItem.classList.add('list-group-item');
          noteItem.textContent = note.title;
          noteList.appendChild(noteItem);
      });
  };

  const handleNoteSave = () => {
      if (!noteTitle.value.trim() || !noteText.value.trim()) {
          alert("Both title and text are required for the note.");
          return;
      }

      const newNote = {
          title: noteTitle.value,
          text: noteText.value
      };

      saveNoteToLocal(newNote);
      renderNoteList(loadNotes());
      noteTitle.value = '';
      noteText.value = '';
  };

  saveNoteBtn.addEventListener('click', handleNoteSave);

  renderNoteList(loadNotes());
});
