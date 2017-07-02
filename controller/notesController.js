const noteStorage = require("../services/notesStorage.js");


module.exports.addNote = function(req, res){
    const pre = req.body;
    noteStorage.addNote(pre.title,pre.description,pre.importance,pre.dueDate,(err,dbNote)=>{
        res.json(dbNote);
    })
};

module.exports.editNote = function(req, res){
    const pre = req.body;
    noteStorage.editNote(req.params.id, pre.title,pre.description,pre.importance,pre.dueDate,(err,dbNote)=>{})
};

module.exports.finishNote = function(req, res){
    noteStorage.finishNote(req.params.id,(err,dbNote)=>{})
};

module.exports.getNotes = function(req, res){
    const pre = req.query;
    noteStorage.getNotes(pre.noteSort, pre.noteOrder, pre.noteFilter,(err,dbNote)=>{
        res.json(dbNote);
    })
};

module.exports.getNoteById = function(req, res){
    noteStorage.getNoteById(req.params.id,(err,dbNote)=>{
        res.json(dbNote);
    })
};

module.exports.deleteNote = function(req, res){
    noteStorage.deleteNote(req.params.id,(err,dbNote)=>{
        res.json(dbNote);
    })
};