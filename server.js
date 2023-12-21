// server.js
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

// Placeholder for notes (in a real app, you would use a database)
let notes = [];

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

app.get('/api/notes', (req, res) => {
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  newNote.id = Date.now(); // Assign a unique ID to each note
  notes.push(newNote);
  res.json(newNote);
});

app.delete('/api/notes/:id', (req, res) => {
  const noteId = parseInt(req.params.id);
  notes = notes.filter(note => note.id !== noteId);
  res.json({ message: 'Deleted' });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
