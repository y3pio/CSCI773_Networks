const data = require('./data.json');

// Maps/augment the cost to infinity and shortest_source node to undefined
// Index 0 (first element) is assumed to be the source node.
module.exports.getNetworkData = () => data.nodes.map((d, i) => ({
  ...d,
  weight: i === 0 ? 0 : Infinity,
  shortest_source: i === 0 ? d.id : undefined,
}));

// Flattens the edges array to a pretty format.
module.exports.prettyPrintNetwork = (networkData) => {
  // console.clear();
  const detailedTable = networkData.map(d => ({
    ...d,
    edges: d.edges.reduce((acc, e) => {
      acc.push(`{${e.destination}:${e.cost}}`);
      return acc;
    }, []).join()
  }));
  console.table(detailedTable);
};

// Outputs the shortest path from node to S,
module.exports.traceShortestPath = (networkData, destinationNodeId) => {
  let currentNode = networkData.find(n => n.id === destinationNodeId);
  const shortestPath = [];

  while (currentNode.id !== 'S' && !!currentNode.shortest_source) {
    shortestPath.push(currentNode);
    currentNode = networkData.find(n => n.id === currentNode.shortest_source);
  }

  if (currentNode.id === 'S') {
    shortestPath.push(currentNode);
    return shortestPath.reverse().map(path => path.id).join(' -> ');
  }

  return `No shortest path from S to ${destinationNodeId} found! `;
};

