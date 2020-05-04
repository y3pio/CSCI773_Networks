/*
  Bellman-Ford algorithm.
  Ensure that networkData is an object of the following shape for the implementation to work

  @param nodes = Array<node>
    -  Contains the array of all the nodes in the network, along with all their data.
    - node object structure below.

    node = Object({
      "id": String,
      "weight": Number/Infinity,
      "shortest_source": String<node.id>,
      "edges": Array<Object({ "destination": String<node.id>, "cost": Number })>
    })
      - Every node entry in the nodes Array should follow this pattern.
      - id: *UNIQUE* identifier for the node in the network
      - weight: current shortest path value to get to this node. Infinity by default at the start.
      - shortest_source: the previous node/hop that gets to this node for its shortest path. Used
                              to keep track of the shortest path.
      - edges: Array of destination/cost pair for all outgoing edges from this node.

    @return: Returns a new array of the network graph
                with the node's weight relaxed to its shortest path.
*/
module.exports.bellmanFordNetwork = (networkData) => {
  // Copy construct a new network to prevent mutating the original network.
  let relaxedNetwork = [ ...networkData].map(i => ({ ...i}));

  // Main algorithm loop.
  for(let i=0; i < relaxedNetwork.length - 1; i++ ) {
    relaxedNetwork.forEach(currentNode => {
      if (currentNode.edges.length > 0) {
        currentNode.edges.forEach(edge => {
          const destinationNode = relaxedNetwork.find(n => n.id === edge.destination);
          if (currentNode.weight + edge.cost < destinationNode.weight) {
            destinationNode.weight = currentNode.weight + edge.cost;
            destinationNode.shortest_source = currentNode.id;
          }
        })
      }
    });
  }

  return relaxedNetwork;
};
