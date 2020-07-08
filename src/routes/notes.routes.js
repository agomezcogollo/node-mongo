const { Router } = require('express');
const router = Router();

const { renderNoteForm, 
        createNewNote, 
        renderNotes, 
        renderEditNotes, 
        updateNote, 
        deleteNote 
      } = require('../controllers/notes.controller')

const { isAuthenticated } = require('../helpers/auth')

router.get('/notes/new-notes', isAuthenticated, renderNoteForm);
router.post('/notes/add', isAuthenticated, createNewNote);
router.get('/notes', isAuthenticated, renderNotes);
router.get('/notes/edit/:id', isAuthenticated, renderEditNotes);
router.put('/notes/edit/:id', isAuthenticated, updateNote);
router.delete('/notes/delete/:id', isAuthenticated, deleteNote);

module.exports = router;