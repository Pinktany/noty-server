"use strict";

$("#saveNote").click(function() {
    window.services.restClient.addNote($("#title").val(), $("#description").val(), $("#importance").val(), $("#dueDate").val()).then(() =>{
        window.location.replace("index.html");
    } );
   // noteStorage.addOrUpdate(null, $("#title").val(), $("#description").val(), $("#dueDate").val(), $("#creationDate").val(), $("#importance").val());
   // window.location.replace("index.html");
});


//Styleswitcher
function getDefaultStyle() {
    activateStyle(getDefaultStyle());
}