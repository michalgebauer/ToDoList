var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var todos = [];
var increment = 0;

var todosArray = ["todo1", "todo2", "todo3"];

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/todos", function(req, res) {
    res.end(JSON.stringify(todosArray));
});

app.post("/add", function(req, res) {
    todos.new = req.body.text;
    res.end(JSON.stringify(todos));
});

app.post("/todo", function(req, res) {
    // for(var i = 0; i < 5000000000; i++) {}

    var todo = {
        id: ++increment,
        text: req.body.text,
        done: false
    }

    if(!todo.text.trim()) {
        res.status(409); // 409 conflict
        res.end("Empty todo text");
        return;
    }

    todos.push(todo);

    res.status(201); // 201 created
    res.end(JSON.stringify(todo));
});

app.delete("/todo", function(req, res) {
    var id = req.query.id;

    var todo = todos.find(todo => todo.id == id);

    if(todo) {
        var index = todos.indexOf(todo);
        todos.splice(index, 1);

        res.end();
        return;
    }

    res.status(404);
    res.send("Todo not found");
});

app.put("/todo", function(req, res) {
    var id = req.body.id;

    var todo = todos.find(todo => todo.id == id);

    if(todo) {
        var index = todos.indexOf(todo);
        todos[index] = req.body;

        res.end();
        return;
    }

    res.status(404);
    res.send("Todo not found");
});

app.get("/todo", function(req, res) {
    res.end(JSON.stringify(todos));
});



app.post("/post", function(req, res) {
    console.log(res.body);
    res.end("<h1>haloo</h1>");
});

var server = app.listen(3000, function() {
    console.log("started on port 3000");
});