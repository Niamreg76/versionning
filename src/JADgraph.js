/**
 * @file Functions to manipulate graph.
 * @author Jean-Aymeric DIET jeanaymeric@gmail.com
 */

/**
 * Function to obtain the total weight of a graph.
 * @function getTotalWeight
 * @param {object[]} graph
 * @param {number} graph[].weight
 * @param {string[]} graph[].nodes
 * @returns {number}
 */
exports.getTotalWeight = function (graph) {
    let totalWeight = 0;
    for (const edge of graph) {
        totalWeight += edge.weight;
    }
    return totalWeight;
}

/**
 * Function to obtain an array of all name's nodes contained in the graph.
 * @function getAllNodes
 * @param {object[]} graph
 * @param {number} graph[].weight
 * @param {string[]} graph[].nodes
 * @returns {string[]}
 */
exports.getAllNodes = function (graph) {
    let allNodes = [];
    for (const edge of graph) {
        if (!allNodes.includes(edge.nodes[0])) {
            allNodes.push(edge.nodes[0]);
        }
        if (!allNodes.includes(edge.nodes[1])) {
            allNodes.push(edge.nodes[1]);
        }
    }
    return allNodes;
}

/**
 * Function to obtain an array of all nodes contained in the graph.
 * @function getAllNodesObjects
 * @param {object[]} graph
 * @param {number} graph[].weight
 * @param {string[]} graph[].nodes
 * @returns {object[]}
 */
exports.getAllNodesObjects = function (graph) {
    let allNodesObjects = [];
    for (const edge of graph) {
        if (!allNodesObjects.find(node => node.name === edge.nodes[0])) {
            allNodesObjects.push({ 'name': edge.nodes[0] });
        }
        if (!allNodesObjects.find(node => node.name === edge.nodes[1])) {
            allNodesObjects.push({ 'name': edge.nodes[1] });
        }

    }
    return allNodesObjects;
}

/**
 * Function to compare two elements by their weight. Use it in array.sort().
 * @function compareByWeight
 * @param {object} a
 * @param {number} a.weight
 * @param {string[]} a.nodes
 * @param {object} b
 * @param {number} b.weight
 * @param {string[]} b.nodes
 * @return {number}
 */
exports.compareByWeight = function (a, b) {
    if (a.weight < b.weight) {
        return -1;
    }
    if (a.weight > b.weight) {
        return 1;
    }
    return 0;
}

/**
 * Function to find if a edge contains one and only one node from nodesToInclude
 * @function filterByIncludingNodesPath
 * @param {object[]} graph
 * @param {number} graph[].weight
 * @param {string[]} graph[].nodes
 * @param {string[]} nodesToInclude
 * @return {object[]}
 */
exports.filterByIncludingNodesPath = function (graph, nodesToInclude) {
    return graph.filter(function (element) {
        return nodesToInclude.includes(element.nodes[0]) ^ nodesToInclude.includes(element.nodes[1]);
    })
}

/**
 * Function to construct SVG circles from nodes
 * @function nodesToNamedCirclesSvg
 * @param {object[]} nodes
 * @param {string} nodes[].name
 * @param {number} nodes[].x
 * @param {number} nodes(].y
 * @param {string} [color=red]
 * @return {string}
 */
exports.nodesToNamedCirclesSvg = function (nodes, color = 'red') {
    let svg = '';
    for (const node of nodes) {
        svg += '<circle cx="' + node.x + '" cy="' + node.y + '" r="5" fill="red" />\n';
        svg += '<text x="' + (node.x + 7) + '" y="' + node.y + '" fill="red">' + node.name +'</text>\n';
    }
    return svg;
}

/**
 * Function to construct SVG lines from edges and nodes
 * @function edgesTolineSvg
 * @param {object[]} nodes
 * @param {string} nodes[].name
 * @param {number} nodes[].x
 * @param {number} nodes(].y
 * @param {object[]} edges
 * @param {string[]} edges[].nodes
 * @param {string} [color=red]
 * @param {boolean} [animated=false]
 * @return {string}
 */
exports.edgesTolineSvg = function (nodes, edges, color = 'blue', animated = false) {
    let svg = '';
    let i = 1;
    for (const edge of edges) {
        let node1Index = nodes.findIndex(node => node.name === edge.nodes[0]);
        let node2Index = nodes.findIndex(node => node.name === edge.nodes[1]);

        svg += '<line' +
            ' x1="' + nodes[node1Index].x + '" y1="' + nodes[node1Index].y + '"' +
            ' x2="' + nodes[node2Index].x + '" y2="' + nodes[node2Index].y + '"' +
            ' stroke="' + color + '" stroke-width=' + (animated?'"0"':'"5"') + '>';
        if (animated) {
            svg += '\n\t<animate attributeName="stroke-width" from="10" to="0" dur="4s" begin="edge' + (edges.length) +'.end" fill="freeze"/>';
            svg += '\n\t<animate id="edge' + i + '"' +
                ' attributeName="stroke-width" from="0" to="5" dur="0.2s" fill="freeze"' +
                ' begin=' + ((i == 1) ? '"0s;edge' + (edges.length) +'.end + 4s"' : '"edge' + (i-1) + '.end"') +
                ' />';
            i++;
        }
        svg += '\n</line>\n';
        if (edge.hasOwnProperty("weight")) {
            svg += '<text text-anchor="middle" x="' + (nodes[node1Index].x + nodes[node2Index].x)/2 + '" y="' + (nodes[node1Index].y + nodes[node2Index].y)/2 + '" fill="red">' + edge.weight +'</text>\n';

        }
    }
    return svg;
}