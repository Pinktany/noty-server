;(function (services,$) {
    const dataContent = 'dataType: "json",contentType: "application/json",';

    function addNote(title,description,importance,dueDate){
       return $.ajax({
            dataContent,
            method: "POST",
            url: "/notes/add/",
            data: {title,description,importance,dueDate}
        });
    }

    function editNote(id,title,description,importance,dueDate){
        return $.ajax({
            dataContent,
            method: "PUT",
            url: "/notes/edit/"+id,
            data: {title,description,importance,dueDate}
        });
    }

    function checkNote(id){
        return $.ajax({
            dataContent,
            method: "PUT",
            url: "/notes/check/"+id
        });
    }

    function getNotes(noteSort, noteOrder, noteFilter){
      return $.ajax({
            dataContent,
            method: "GET",
            url: "/notes/",
            data: {noteSort,noteOrder,noteFilter}
        });
    }

    function getNoteById(id){
       return $.ajax({
            dataContent,
            method: "GET",
            url: "/notes/"+id
        });
    }

    function deleteNote(id) {
        return $.ajax({
            dataContent,
            method: "DELETE",
            url: "/notes/"+id
        });
    }

    services.restClient = {
        addNote : addNote,
        editNote : editNote,
        checkNote : checkNote,
        getAllNotes : getNotes,
        getNoteById : getNoteById,
        deleteNote: deleteNote
    };

}(window.services = window.services || { }, jQuery));


