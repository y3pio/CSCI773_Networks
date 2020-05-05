const { getNetworkNodes, getNetworkEdges, traceShortestPath } = require('./utils.js');
const { bellmanFordNetwork } = require('../bellman-ford.js');

console.clear();
let networkNodes = getNetworkNodes();
let networkEdges = getNetworkEdges();

console.table(networkNodes);
console.table(networkEdges);

const relaxedNetworkNodes = bellmanFordNetwork(networkNodes, networkEdges);

console.table(relaxedNetworkNodes);
//
const shortestPath = traceShortestPath(relaxedNetworkNodes, 'I');
console.log(shortestPath);
