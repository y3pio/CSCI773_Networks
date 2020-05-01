const data = require('./data.json');

// Maps/augment the weight and shortest_source node
// Index 0 (first element) is assumed to be the source node.
const networkNodes = data.nodes.map((d, i) => ({
  ...d,
  weight: i === 0 ? 0 : Infinity,
  shortest_source: i === 0 ? d.id : undefined,
}));

// Flattens the edges array to a pretty format.
const prettyPrintNetwork = (networkData) => {
  console.clear();
  const detailedTable = networkData.map(d => ({
    ...d,
    edges: d.edges.reduce((acc, e) => {
      acc.push(`{${e.destination}:${e.cost}}`);
      return acc;
    }, []).join()
  }));

  console.table(detailedTable);
}

prettyPrintNetwork(networkNodes);