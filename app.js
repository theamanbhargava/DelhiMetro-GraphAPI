var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

//Require Graph
var Graph = require('./graph');

function graphPrint(){
    graph = new Graph();
    graph.addVertex({number : 1, name : "Shastri Nagar", line : "Yellow Line"});
    graph.addVertex({number : 2, name : "Adarsh Nagar", line : "Yellow Line"});
    graph.addVertex({number : 3, name : "Dwarka", line : "Blue Line"});
    graph.addVertex({number : 4, name : "Palika Bazzar", line : "Blue Line"});
    graph.addVertex({number : 5, name : "Secretariat", line : "Green Line"});
    graph.addVertex({number : 6, name : "Raisina Hill", line : "Green Line"});
    graph.print(); // 1 -> | 2 -> | 3 -> | 4 -> | 5 -> | 6 ->
    graph.addEdge({number1 : 1, number2 : 2});
    graph.addEdge({number1 : 1, number2 : 5});
    graph.addEdge({number1 : 2, number2 : 3});
    graph.addEdge({number1 : 2, number2 : 5});
    graph.addEdge({number1 : 3, number2 : 4});
    graph.addEdge({number1 : 4, number2 : 5});
    graph.addEdge({number1 : 4, number2: 6});
    graph.print(); // 1 -> 2, 5 | 2 -> 1, 3, 5 | 3 -> 2, 4 | 4 -> 3, 5, 6 | 5 -> 1, 2, 4 | 6 -> 4
    console.log('graph size (number of vertices):', graph.size()); // => 6
    console.log('graph relations (number of edges):', graph.relations()); // => 7
    graph.traverseDFS(1, function(vertex) { console.log(vertex); }); // => 1 2 3 4 5 6
    console.log('---');
    graph.traverseBFS(1, function(vertex) { console.log(vertex); }); // => 1 2 5 3 4 6
    graph.traverseDFS(0, function(vertex) { console.log(vertex); }); // => 'Vertex not found'
    graph.traverseBFS(0, function(vertex) { console.log(vertex); }); // => 'Vertex not found'
    console.log('path from 6 to 1:', graph.pathFromTo(6, 1)); // => 6-4-5-1
    console.log('path from 3 to 5:', graph.pathFromTo(3, 5)); // => 3-2-5
    graph.removeEdge(1, 2);
    graph.removeEdge(4, 5);
    graph.removeEdge(10, 11);
    // console.log('graph relations (number of edges):', graph.relations()); // => 5
    // console.log('path from 6 to 1:', graph.pathFromTo(6, 1)); // => 6-4-3-2-5-1
    graph.addEdge({number1: 1, number2: 2});
    graph.addEdge({number1: 4, number2: 5});
    // console.log('graph relations (number of edges):', graph.relations()); // => 7
    // console.log('path from 6 to 1:', graph.pathFromTo(6, 1)); // => 6-4-5-1
    graph.removeVertex(5);
    // console.log('graph size (number of vertices):', graph.size()); // => 5
    // console.log('graph relations (number of edges):', graph.relations()); // => 4
    // console.log('path from 6 to 1:', graph.pathFromTo(6, 1)); // => 6-4-3-2-1
}

graphPrint();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
