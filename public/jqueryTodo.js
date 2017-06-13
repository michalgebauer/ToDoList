window.addEventListener("load", function() {
    console.log("window loaded");

    $("#addTodo").click(function(e) {
        e.preventDefault();

        var $input = $("input.text");
        // input= $("[type='text']");
        // input= $("form input");

        var todoText = $input.val();
        // $input.val("nejake todo");

        if(todoText == "") {
                var myFlag = AJS.flag({
                type: 'error',
                title: 'Chyba.',
                body: 'Todo text nemoze byt prazdny',
                close: "auto"
            });
            return;
        }

        AJS.$('.button-spinner').spin();

        $.ajax({
            url: "todo",
            type: "post",
            data: {
                text: todoText
            },
            dataType: "json"
        }).done(function(todo) {
            console.log(todo);

            var $table = $("#todoTable tbody");

            // var $tr = $("<tr class='nieco' id='tr'></tr>");
            $tr = $("<tr>", {
                "data-todo-id": todo.id
            });

            $tr.append("<td><input type='checkbox'></td>");
            $tr.append("<td>" + todo.text + "</td>");
            $tr.append("<td><button class='todo-delete aui-button aui-button-link'>Vymaz</button></td>");

            $table.append($tr);
            //$tr.appendTo($table);
        }).always(function() {
            AJS.$('.button-spinner').spinStop();
        });

        
        // console.log(e.originalEvent);
    });

    $("#todoTable").on("click", "button.todo-delete", function(e) {
        e.preventDefault();
        // closest.("tr") - najblizsi rodic typu tr
        var $tr = $(this).closest("tr");
        var todoId = $tr.attr("data-todo-id");
        
        $.ajax({
            url: "todo" + "?id=" + todoId,
            type: "delete"
        }).done(function() {
            $tr.remove();
        })
    });
});

$(document).ready(function() {
    console.log("document ready");
});
