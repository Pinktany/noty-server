const Datastore = require('nedb');
const db = new Datastore({filename: './data/notes.db', autoload: true});
const moment = require("../public/js/libs/moment-v2.18.1");

class Note {
    constructor(title, description, importance, dueDate) {
        this.title = title;
        this.description = description;
        this.importance = importance;
        this.dueDate = dueDate;
        this.creationDate = moment().format('YYYY-MM-DD');
        this.finished = false;
        this.finished_on = false;
        this.id = Math.floor(Math.random() * 10000);
    }
}

function addNote(title, description, importance, dueDate, callback) {
    let note = new Note(title, description, importance, dueDate);

    db.insert(note, function (err, dbNote) {
        if (callback) {
            callback(err, dbNote);
        }
    });
}

function finishNote(id, callback) {
    db.update({_id: id}, {$set: {"finished": true, "finished_on": moment.now()}}, {}, function (err, dbNote) {
        if (callback) {
            callback(err, dbNote);
        }
    })
}

function getNoteById(id, callback) {
    db.findOne({_id: id}, function (err, dbNote) {
        if (callback) {
            callback(err, dbNote);
        }
    })
}

function getNotes(noteSort, noteOrder, noteFilter = "finished", callback) {
    db.find({},function (err, dbNote) {
        if (callback) {
            let filt_notes = dbNote.filter(x => x[noteFilter] ? x[noteFilter] === false : true);

            filt_notes.sort((a, b) => {
                if (typeof(a[noteSort]) === "string") {
                return a[noteSort].localeCompare(b[noteSort]);
            } else {
                return a[noteSort] - b[noteSort]
            }
        });
            if (noteOrder === "desc") {
                filt_notes.reverse();
            }
            callback(err, filt_notes);
        }
    });
}

function editNote(id, title, description, importance, dueDate, callback) {
    db.update({_id: id}, {
        $set: {
            "title": title,
            "description": description,
            "importance": importance,
            "dueDate": dueDate
        }
    }, {}, function (err, dbNote) {
        if (callback) {
            callback(err, dbNote)
        }
    });
}

function deleteNote(id, callback) {
    db.remove({_id: id}, {}, function (err, dbNote) {
        if (callback) {
            callback(err, dbNote)
        }
    });
}

module.exports = {
    addNote: addNote,
    editNote: editNote,
    finishNote: finishNote,
    getNotes: getNotes,
    getNoteById: getNoteById,
    deleteNote: deleteNote
};
