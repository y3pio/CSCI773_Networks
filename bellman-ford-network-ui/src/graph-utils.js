const node_background = '#008ac9';
const node_border = '#6488db';
const node_highlight_bg = '#b04675';
const node_highlight_border = '#ff6f7a';
const node_hover_bg = '#ff69a6';
const node_font_color = '#ffffff';

const edge_color = '#ffffff';
const edge_font_color = '#ffffff';
const edge_highlight_color = '#ff6f7a';
const edge_hover_color = '#ff6f7a';

export const GRAPH_OPTIONS = {
  interaction: { hover:true },
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
      size: 18
    },
    color: {
      color: edge_color,
      highlight: edge_highlight_color,
      hover: edge_hover_color,
    },
    length: 200
  },
  physics: {
    enabled: false,
    hierarchicalRepulsion: {
      nodeDistance: 400,
      springLength: 500,
    },
  }
};

export const augmentNodeDate = (nodeData) => nodeData.map(node => ({
  ...node,
  weight: Infinity,
  shortest_source: undefined
}));

export const augmentEdgeData = (edgeData) => edgeData.map(edge => ({
  ...edge,
  label: edge.cost.toString()
}));

export const getNodeEdgeData = (nodeId, edgeData) => edgeData.filter(e => e.from === nodeId);

export default {
  getNodeEdgeData,
  augmentNodeDate,
  augmentEdgeData,
  GRAPH_OPTIONS
};