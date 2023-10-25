'use strict';

const jadGraph = require('./JADgraph');
const KruskalMST = require('./KruskalMST');
const PrimMST = require('./PrimMST');
const BoruvkaMST = require('./BoruvkaMST');
const DijkstraSP = require('./Dijkstra');
const tsp = require('./travellingSalesmanProblem');

const fs = require('fs');

function generateSVG(fileName, nodes, edges, allEdges = null) {
    let svg = '';
    svg += '<svg width="700px" height="446px" version="1.1" xmlns="http://www.w3.org/2000/svg">\n';
    svg += '<rect x="0" width="700" height="446" fill="cornsilk" rx="0" />\n';
    if (allEdges !== null) {
        svg += jadGraph.edgesTolineSvg(nodes, allEdges, "lightgrey");
        svg += jadGraph.edgesTolineSvg(nodes, edges, "blue", true);
    } else {
        svg += jadGraph.edgesTolineSvg(nodes, edges, "blue");
    }
    svg += jadGraph.nodesToNamedCirclesSvg(nodes);
    svg += '</svg>\n';
    fs.writeFile(fileName, svg, (errno) => {
        if (errno) {
            throw errno;
        }
        console.log(fileName + ' saved');
    })
}

let allNodes = require('./allNodes.json');
let europePaths = require('./AventuriersDuRailEurope.json');
console.log("Initial tree's weight : " + jadGraph.getTotalWeight(europePaths));
console.log("Initial tree's edges : " + Array.from(europePaths).length);
generateSVG('img/AventuriersDuRailEurope.svg', allNodes, europePaths);

let kruskalTree = KruskalMST.getKruskalTree(europePaths);
console.log("\nKruskal MST's weight : " + jadGraph.getTotalWeight(kruskalTree));
console.log("Kruskal MST's edges : " + kruskalTree.length);
generateSVG('img/KruskalMST.svg', allNodes, kruskalTree, europePaths);

let primTree = PrimMST.getPrimTree(europePaths);
console.log("\nPrim MST's weight : " + jadGraph.getTotalWeight(primTree));
console.log("Prim MST's edges : " + primTree.length);
generateSVG('img/PrimMST.svg', allNodes, primTree, europePaths);

let boruvkaTree = BoruvkaMST.getBoruvkaTree(europePaths);
console.log("\nBoruvka MST's weight : " + jadGraph.getTotalWeight(boruvkaTree));
console.log("Boruvka MST's edges : " + boruvkaTree.length);
generateSVG('img/BoruvkaMST.svg', allNodes, boruvkaTree, europePaths);

let dijkstraSP = DijkstraSP.getDijkstraShortestPaths(europePaths);
fs.writeFile('dijkstraSP.json', JSON.stringify(dijkstraSP, null, 4), (errno) => {
    if (errno) {
        throw errno;
    }
    console.log("Dijkstra's shortest paths saved in dijkstraSP.json");
})
//const nodes = ['Edinburch', 'Berlin', 'Danzic','Petrograd', 'Moskva', 'Constantinople', 'Palermo' ];
const nodes = ['Edinburch', 'Berlin', 'Danzic','Petrograd', 'Moskva', 'Constantinople', 'Palermo', 'Venezia', 'Kobenhavn', 'Cadiz' ,'Sevastopol', 'Pamplona', 'Budapest'];
const t0 = new Date().getTime();
/*let robotShortest = tsp.TSPRobotMethod(europePaths,  nodes);
const t1 = new Date().getTime();
console.log("shortestPath() with 11 nodes takes " + (t1 - t0) + " ms.");
generateSVG('img/robotShortestCompletePath.svg', allNodes, robotShortest.complete, europePaths);
generateSVG('img/robotShortestBriefPath.svg', allNodes, robotShortest.brief, europePaths);
console.log('Robot : ' + robotShortest.pathLength);
*/
let monkeyShortest = tsp.TSPMonkeyMethod(europePaths,  nodes, 30000);
generateSVG('img/monkeyShortestCompletePath.svg', allNodes, monkeyShortest.complete, europePaths);
generateSVG('img/monkeyShortestBriefPath.svg', allNodes, monkeyShortest.brief, europePaths);
console.log('Monkey : ' + monkeyShortest.pathLength);
