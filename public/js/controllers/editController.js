"use strict";

let notes = localStorage.getItem("notes");

if( !notes )
{
    localStorage.setItem("notes", JSON.stringify([]));
    notes = localStorage.getItem("notes");
}

notes = JSON.parse(notes);
console.log(notes);


if (window.location.hash) {

    const id = window.location.hash.substr(1);
    const index = notes.findIndex(x => x.id === id);

    $("#title").val(notes[index].title);
    $("#description").val(notes[index].description);
    $("#dueDate").val(notes[index].dueDate);
    $("#importance").val(notes[index].importance);
}

//Update Note
$(".update").click(function() {
    updateNote();
});

function updateNote() {
notes.updateNote($("#title").val(), $("#description").val(), $("#dueDate").val(), $("#creationDate").val(), $("#importance").val());
    window.location.replace("index.html");
}