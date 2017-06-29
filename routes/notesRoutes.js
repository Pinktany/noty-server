const express = require('express');
const router = express.Router();
const notes = require('../controller/notesController.js');

router.post("/add/", notes.addNote);
router.put("/edit/:id/", notes.editNote);
router.put("/check/:id/",notes.checkNote);
router.get("/",notes.getNotes);
router.get("/:id/",notes.getNoteById);
router.delete("/notes/:id/",notes.deleteNote);



module.exports = router;