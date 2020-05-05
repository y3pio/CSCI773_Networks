export const GRAPH_OPTIONS = {
  interaction: { hover:true },
  nodes: {
    color: {
      background: 'white',
      border: 'black',
      highlight: {
        background: 'white',
        border: 'red'
      },
      hover: 'red'
    },
    font: {
      size: 16,
      color: 'black',
    }
  },
  edges: {
    hover: 'red',
    font: {
      color: 'white',
      size: 18
    },
    color: {
      color: 'white',
      highlight: 'red',
      hover: 'red',
    },
    length: 170
  },

  physics: {
    enabled: true,
    hierarchicalRepulsion: {
      nodeDistance: 400,
      springLength: 500,
    },
  }
};

export const addEdgeLabel = (edgeData) => edgeData.map(edge => ({
  ...edge,
  label: edge.cost.toString()
}));

export default { addEdgeLabel, GRAPH_OPTIONS };