"use strict";

(function ($) {
    const rest = window.services.restClient;
    const handlebars = window.services.handlebarService;

    $(function () {
        "use strict";

        const templateScript = $("#note-item").html(),
            handlebarTemplate = Handlebars.compile(templateScript);

        let orderBy = "sortByDueDate";
        let filter = false;

        function displayNotes() {
            window.services.restClient.getAllNotes(orderBy).then((notes) => {
                const context = {
                        notes: notes ,
                    },
                    compiledHtml = handlebarTemplate(context);
                $(".notes-container").html(compiledHtml);
            })

        }

        //Sort Order while change li element
        $(".sortOrder li" ).click(function() {
            orderBy = $( this ).attr("id");
            displayNotes();
        });

        //Delete note item
        $(document).on("click", ".btn-delete", (event) => {
            window.services.restClient.deleteNote($(event.currentTarget).data("noteid"));
            displayNotes();
        });

        //Complete note item
        $(document).on("click", ".finished", (event) => {
            noteStorage.completeNoteItem($(event.currentTarget).data("noteid"));
            displayNotes()
        });

        //Show completed note items
        $(document).on("click", "#showFinished", (event) => {
            filter = !filter;
            displayNotes();
        });

        //Style changer
        function onStyleChanged() {
            let selectedStyle = $("#styleSwitcher").val();
            activateStyle(selectedStyle);
            setActiveStyle(selectedStyle);
        }

        displayNotes();

    });

}(jQuery));