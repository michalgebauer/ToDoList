$(document).ready(function() {
    $.ajax({
        url: "todo",
        type: "get",
        dataType: "json"
    }).done(function(todos) {
        $.each(todos, function(i, todo) {
            addTodo(todo);
        })
    });

    $("#addTodo").click(function(e) {
        var $this = $(this);
        $this.prop("disabled", true);
        $this.attr("aria-disabled", true);
        AJS.$('.button-spinner').spin();

        e.preventDefault();

        $.ajax({
            url: "todo",
            type: "post",
            data: {
                text: $("#todoText").val()
            },
            dataType: "json"
        }).done(function(todo) {
            addTodo(todo);

            $("#todoText").val("");

            AJS.flag({
                type: 'success',
                close: 'auto',
                title: 'Todo was created.',
                body: 'ToDo was successfuly created.'
            });
        }).fail(function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.responseText);
            AJS.flag({
                type: 'error',
                close: 'auto',
                title: 'Todo was not created.',
                body: jqXHR.responseText
            });
        }).always(function() {
            $this.removeAttr("disabled");
            $this.removeAttr("aria-disabled");
            AJS.$('.button-spinner').spinStop();
        })
    });

    $("#todoTable").on("click", ".todo-delete", function() {
        var $tr = $(this).closest("tr");
        var todoId = $tr.attr("data-todo-id");

        $.ajax({
            url: "todo" + "?id=" + todoId,
            type: "delete"
        }).done(function() {
            $tr.remove();

            AJS.flag({
                type: 'success',
                close: 'auto',
                title: 'Todo was deleted.',
                body: 'ToDo was successfuly deleted.'
            });
        });
    });

    $("#todoTable").on("click", ".todo-done", function() {
        var $tr = $(this).closest("tr");
        var $tds = $("td", $tr);

        var todo = {
            id: $tr.attr("data-todo-id"),
            text: $tds.eq(1).text(),
            done: $("input", $tds.eq(0)).is(":checked")
        }

        $.ajax({
            url: "todo",
            type: "put",
            data: todo,
            dataType: "json"
        }).done(function() {
            AJS.flag({
                type: 'success',
                close: 'auto',
                title: 'Todo was updated.',
                body: 'ToDo was successfuly updated.'
            });
        });
    });

    function addTodo(todo) {
        var $tr = $("<tr>", {
            "data-todo-id": todo.id
        });
        
        $tr.append("<td><input type='checkbox' class='todo-done' " + (todo.done == 'true' ? "checked" : "") +"></td>");
        $tr.append("<td>" + todo.text + "</td>");
        $tr.append("<td><button class='aui-button aui-button-link todo-delete'>Delete</button></td>");

        $("#todoTable tbody").append($tr);
    }
});