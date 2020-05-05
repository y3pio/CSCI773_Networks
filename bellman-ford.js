/*
  Bellman-Ford algorithm.
  Ensure that networkData is an object of the following shape for the implementation to work

  // Contains data on all the nodes in the networks
  @param nodes = Array<node>
    node = {
      "id": String,
      "label": String
      "weight": Number/Infinity,
      "shortest_source": String<node.id>,
    }

  @param edges = Array<edge>
    edge = {
      "from": node.id
      "to": node.id,
      "cost": Number
    }

    @return: Returns a new array of nodes with their updated weight and shortest path source.
*/
module.exports.bellmanFordNetwork = (nodeData, edgeData) => {
  // Copy construct a new network to prevent mutating the original network.
  let relaxedNodes = [ ...nodeData].map(i => ({ ...i}));

  // Main algorithm loop.
  for(let i=0; i < relaxedNodes.length - 1; i++ ) {
    relaxedNodes.forEach(currentNode => {
      const currentNodeEdge = edgeData.filter(e => e.from === currentNode.id);
      if (currentNodeEdge.length > 0) {
        currentNodeEdge.forEach(edge => {
          const destinationNode = relaxedNodes.find(n => n.id === edge.to);
          if (currentNode.weight + edge.cost < destinationNode.weight) {
            destinationNode.weight = currentNode.weight + edge.cost;
            destinationNode.shortest_source = currentNode.id;
          }
        })
      }
    });
  }

  return relaxedNodes;
};
