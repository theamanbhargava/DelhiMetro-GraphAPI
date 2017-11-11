var express = require('express');
var router = express.Router();
var metroStations = require('../public/metro.json');

//Require Graph
var Graph = require('../graph');

var graph = new Graph();
var stationData = [];

function graphInit(callback){
    for(var i=0; i<7; i++){
        graph.addVertex(i+1, {name : metroStations[i].name, line: metroStations[i].details.line, latitude: metroStations[i].details.latitude, longitude: metroStations[i].details.longitude})
    }
    // graph.addVertex(1, {name : 'Palika Bazaar', line:'Yellow', latitude:'', longitude: ''});
    // graph.addVertex(2, {name : 'Ram Leela Bazaar', line:'Yellow', latitude:'', longitude: ''});
    // graph.addVertex(3, {name : 'Bura Bazaar', line:'Red', latitude:'', longitude: ''});
    // graph.addVertex(4, {name : 'Kartik Nagar', line:'Red', latitude:'', longitude: ''});
    // graph.addVertex(5, {name : 'Sarojini Nagar', line:'Yellow', latitude:'', longitude: ''});
    // graph.addVertex(6, {name : 'Naidu Nagar', line:'Red', latitude:'', longitude: ''});
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
    console.log('path from 6 to 1:', graph.pathFromTo(6, 1)); // => 6-4-3-2-1
    callback();
}

graphInit(function () {
    graph.vertices.map(function(vertex) {
        var properties = graph.properties[vertex];
        stationData[vertex-1] = {
            name : properties.name,
            line : properties.line,
            index : vertex,
            vertices : graph.edges[vertex].map(Number).join(', ').trim().split(',').map(function(el){ return +el;}),
            latitude : properties.latitude,
            longitude : properties.longitude
        };
    });
});


router.get("/", function (req, res) {
    res.send(stationData);
});

router.get("/get/:id", function (req, res) {
    var path = graph.pathFromTo(parseInt(req.query.from), parseInt(req.query.to));
    path === -1 ? res.status(406).send('Not Acceptable') : res.json(path.split('-').join(', ').trim().split(',').map(function(el){ return +el;}));
});

module.exports = router;