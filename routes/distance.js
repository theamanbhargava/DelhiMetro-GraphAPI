var express = require('express');
var router = express.Router();

//Require Graph
var Graph = require('../graph');

var graph = new Graph();
var stationData = [];

function graphInit(callback){
    graph.addVertex(1, {name : 'Palika Bazaar', line:'Yellow', latitude:'', longitude: ''});
    graph.addVertex(2, {name : 'Ram Leela Bazaar', line:'Yellow', latitude:'', longitude: ''});
    graph.addVertex(3, {name : 'Bura Bazaar', line:'Red', latitude:'', longitude: ''});
    graph.addVertex(4, {name : 'Kartik Nagar', line:'Red', latitude:'', longitude: ''});
    graph.addVertex(5, {name : 'Sarojini Nagar', line:'Yellow', latitude:'', longitude: ''});
    graph.addVertex(6, {name : 'Naidu Nagar', line:'Red', latitude:'', longitude: ''});
    // graph.print(); // 1 -> | 2 -> | 3 -> | 4 -> | 5 -> | 6 ->
    graph.addEdge(1, 2);
    graph.addEdge(1, 5);
    graph.addEdge(2, 3);
    graph.addEdge(2, 5);
    graph.addEdge(3, 4);
    graph.addEdge(4, 5);
    graph.addEdge(4, 6);
    // graph.print(); // 1 -> 2, 5 | 2 -> 1, 3, 5 | 3 -> 2, 4 | 4 -> 3, 5, 6 | 5 -> 1, 2, 4 | 6 -> 4
    // console.log('graph size (number of vertices):', graph.size()); // => 6
    // console.log('graph relations (number of edges):', graph.relations()); // => 7
    // graph.traverseDFS(1, function(vertex) { console.log(vertex); }); // => 1 2 3 4 5 6
    // console.log('---');
    // graph.traverseBFS(1, function(vertex) { console.log(vertex); }); // => 1 2 5 3 4 6
    // graph.traverseDFS(0, function(vertex) { console.log(vertex); }); // => 'Vertex not found'
    // graph.traverseBFS(0, function(vertex) { console.log(vertex); }); // => 'Vertex not found'
    // console.log('path from 6 to 1:', graph.pathFromTo(6, 1)); // => 6-4-5-1
    // console.log('path from 3 to 5:', graph.pathFromTo(3, 5)); // => 3-2-5
    graph.removeEdge(1, 2);
    graph.removeEdge(4, 5);
    graph.removeEdge(10, 11);
    // console.log('graph relations (number of edges):', graph.relations()); // => 5
    // console.log('path from 6 to 1:', graph.pathFromTo(6, 1)); // => 6-4-3-2-5-1
    graph.addEdge(1, 2);
    graph.addEdge(4, 5);
    // console.log('graph relations (number of edges):', graph.relations()); // => 7
    // console.log('path from 6 to 1:', graph.pathFromTo(6, 1)); // => 6-4-5-1
    // graph.removeVertex(5);
    // console.log('graph size (number of vertices):', graph.size()); // => 5
    // console.log('graph relations (number of edges):', graph.relations()); // => 4
    // console.log('path from 6 to 1:', graph.pathFromTo(6, 1)); // => 6-4-3-2-1
    callback();
}

graphInit(function () {
/*    graph.vertices.map(function (vertex) {
        console.dir(graph.properties);
        // stationData[vertex].stationName = graph.properties[vertex].name;
        // stationData[vertex].stationLine = graph.properties[vertex].line;
        // stationData[vertex].stationNumber = vertex;
    });*/
    graph.vertices.map(function(vertex) {
        stationData[vertex] = {name : graph.properties[vertex].name, line : graph.properties[vertex].line, index : vertex};
    });
});


router.all("/", function (req, res) {
    res.send(stationData.filter(function(n){ return n != undefined }));
});

router.get("/", function (req, res) {

});

module.exports = router;