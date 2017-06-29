"use strict";

let noteStorage = (function () {

    //Notes
    let notes = localStorage.getItem("notes");

    if (!notes) {
        localStorage.setItem("notes", JSON.stringify([]));
        notes = localStorage.getItem("notes");
    }
    notes = JSON.parse(notes);


    function getNotesFromStore() {
        return JSON.parse(localStorage.getItem('notes')) || [];
    }

    //Delete note item
    function deleteNoteItem(id) {
        let index = notes.indexOf(notes.filter(x => x.id === id)[0]);
        if (index > -1) {
            notes.splice(index, 1);
            localStorage.setItem("notes", JSON.stringify(notes));
        }
    }

    //Complete note item
    function completeNoteItem(id) {
        let index = notes.indexOf(notes.filter(x => x.id === id)[0]);
        if (index > -1) {
            notes.splice(index, 1);
            localStorage.setItem("notes", JSON.stringify(notes));
        }
    }

    //Sort functions
    let sortFunctions = {
        'sortByDueDate': function (a, b) {
            let dueDate1 = new Date(a.dueDate),
                dueDate2 = new Date(b.dueDate);
            return dueDate1 - dueDate2;
        },
        'sortByCreationDate': function (a, b) {
            let creationDate1 = new Date(a.creationDate),
                creationDate2 = new Date(b.creationDate);
            return creationDate1 - creationDate2;
        },
        'sortByImportance': function (b, a) {
            let importance1 = new Date(b.importance),
                importance2 = new Date(a.importance);
            return importance1 - importance2;
        }
    };

    //Sort algo
    function sortBy(sortAlg) {
        notes.sort(sortFunctions[sortAlg]);
    }

    //Show completed note items
    function showCompleted() {
        showCompletedNoteItems(); //TODO: Nie vom Storage aufs DOM / View zugreifen! => getNotes benutzen
    }

    function getNotes(sortBy, filter) {
        let notes = getNotesFromStore();
        if (sortBy) {
            notes = notes.sort(sortFunctions[sortBy])
        }

        if (filter) {
            notes = notes.filter(x => !!x.finishDate) // TODO correct filter
        }
        return notes;
    }


    function addOrUpdate(id, title, description, dueDate, importance) {
        let newNote;
        let creationDate = moment().format('YYYY-MM-DD');
        if(!id) {
            newNote = {
                'title': title,
                'description': description,
                'dueDate': dueDate,
                'creationDate': creationDate,
                'importance': $('select[name=importance]').val(),
                'id': Math.floor(Math.random() * 10000),
            };
        }
        else
        {
            //TODO: Change current item
        }

        localStorage.setItem('notes', JSON.stringify([...getNotesFromStore(), newNote]));
        return newNote;
    }

    return {
        notes,
        sortBy,
        showCompleted,
        deleteNoteItem,
        completeNoteItem,
        addOrUpdate,
        getNotes
    };
}());
