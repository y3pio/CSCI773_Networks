const { getNetworkData, prettyPrintNetwork, traceShortestPath } = require('./utils.js');
const { bellmanFordNetwork } = require('./bellman-ford.js');

console.clear();
let networkData = getNetworkData();

const relaxedNetwork = bellmanFordNetwork(networkData);
prettyPrintNetwork(relaxedNetwork);

const shortestPath = traceShortestPath(relaxedNetwork, 'I');
console.log(shortestPath);
