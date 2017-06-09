var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var todos = { test: "test" };
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

app.post("/post", function(req, res) {
    console.log(res.body);
    res.end("<h1>haloo</h1>");
});

var server = app.listen(3000, function() {
    console.log("started on port 3000");
});