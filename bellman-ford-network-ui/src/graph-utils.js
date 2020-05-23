const node_background = '#008ac9';
const node_border = '#6488db';
const node_highlight_bg = '#006c9e';
const node_highlight_border = '#ffffff';
const node_hover_bg = '#006c9e';
const node_font_color = '#ffffff';

const edge_color = '#ffffff';
const edge_font_color = '#ffffff';
const edge_highlight_color = '#008ac9';
const edge_hover_color = '#ffffff';

const shortest_path_color = '#ff6f7a';

export const GRAPH_OPTIONS = {
  interaction: { hover:true, multiselect: true },
  nodes: {
    color: {
      background: node_background,
      border: node_border,
      highlight: {
        background: node_highlight_bg,
        border: node_highlight_border
      },
      hover: node_hover_bg
    },
    font: {
      size: 16,
      color: node_font_color,
    }
  },
  edges: {
    font: {
      color: edge_font_color,
      size: 14
    },
    color: {
      color: edge_color,
      highlight: edge_highlight_color,
      hover: edge_hover_color,
    },
    smooth: {type: "curvedCCW", roundness: 0.1}
  },
  physics: {
    enabled: false,
    hierarchicalRepulsion: {
      nodeDistance: 400,
    },
    solver: 'hierarchicalRepulsion'
  }
};

export const augmentNodeDate = (nodeData) => nodeData.map(node => ({
  ...node,
  cost: node.is_source_node ? 0 : Infinity,
  shortest_source: node.is_source_node ? node.id : undefined,
  color: {
    background: node.is_source_node ? '#ff0000' : undefined,
    highlight: {
      background: node.is_source_node ? '#ff0000' : undefined,
      border: node_highlight_border
    },
    hover: node.is_source_node ? '#ff0000' : undefined
  },
}));

export const augmentEdgeData = (edgeData) => edgeData.map(edge => ({
  ...edge,
  id: `${edge.from}:${edge.to}`,
  // label: edge.weight.toString(),
}));

export const highlightShortestPath = (edgeData, relaxedNode) => {
  return edgeData.map(edge => {
    let isPartOfShortestPath = false;
    const destinationNode = relaxedNode.find(n => n.id === edge.to);
    // If the destination node (to) has the same shortest_source (from) as the edge.
    // Then this edge (to - from) is on the shortest network path.
    if (destinationNode.shortest_source === edge.from) {
      isPartOfShortestPath = true;
    }

    return {
      ...edge,
      isPartOfShortestPath,
      color: isPartOfShortestPath ? shortest_path_color : undefined
    }
  })
};

export const getNodeEdgeData = (nodeId, edgeData) => edgeData.filter(e => e.from === nodeId);

export default {
  getNodeEdgeData,
  augmentNodeDate,
  augmentEdgeData,
  highlightShortestPath,
  GRAPH_OPTIONS
};