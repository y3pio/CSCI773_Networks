const { getNetworkData, prettyPrintNetwork, traceShortestPath } = require('./utils.js');

let networkData = getNetworkData();

// Bellman-Ford algorithm. Iterate n-1 times, where n is the # of nodes (networkData.length)
for(let i=0; i < networkData.length - 1; i++ ) {
  // For each node, we will check it's edges and destination node and relax them.
  networkData.forEach(currentNode => {
    // If current node does not have any outgoing edges, no need to relax destination nodes
    if (currentNode.edges.length > 0) {
      currentNode.edges.forEach(edge => {
        const destinationNode = networkData.find(n => n.id === edge.destination);
        // If destination node weight is more than what it took to get to current node
        // Plus the edge cost, then we have a new shortest cost
        if (currentNode.weight + edge.cost < destinationNode.weight) {
          // Update the cost, and the source node so we can trace back the routes.
          destinationNode.weight = currentNode.weight + edge.cost;
          destinationNode.shortest_source = currentNode.id;
        }
      })
    }
  });
}
prettyPrintNetwork(networkData);

const shortestPath = traceShortestPath(networkData, 'I');
console.log(shortestPath);
