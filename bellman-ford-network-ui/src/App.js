import React, { useState } from "react";
import Graph from "react-graph-vis";
import DataPanel from './DataPanel';
import HoverPanel from './HoverPanel';
import networkData from './test_data';
import { augmentEdgeData, augmentNodeDate, GRAPH_OPTIONS } from './graph-utils';

export const App = () => {

  const [nodeData, setNodeData] = useState(augmentNodeDate(networkData.nodes));
  const [edgeData, setEdgeData] = useState(augmentEdgeData(networkData.edges));

  const [selectedNode, setSelectedNode] = useState(undefined);
  const [selectedEdge, setSelectedEdge] = useState(undefined);

  const [hoverData, setHoverData] = useState(undefined);

  const events = {
    select: (event) => {
      const { nodes, edges } = event;
      // console.log(`Select nodes: ${JSON.stringify(nodes)}`);
      // console.log(`Select edges: ${JSON.stringify(edges)}`);
    },
    hoverNode: (event) => {
      const { node } = event;
      const hoveredNode = nodeData.find(n => n.id === node);
      // console.log(`Hover Node: ${JSON.stringify(hoveredNode)}`);
      setHoverData({
        type: 'node',
        ...hoveredNode
      });
    },
    hoverEdge: (event) => {
      const { edge } = event;
      const hoveredEdge = edgeData.find(e => e.id === edge);
      // console.log(`Hover Edge: ${JSON.stringify(edge)}`);
      setHoverData({
        type: 'edge',
        ...hoveredEdge
      })
    }
  };
  return (
    <div id='app-wrapper' onMouseOver={() => {
      setHoverData(undefined);
    }}>
      <DataPanel
        nodeData={nodeData}
        edgeData={edgeData}
        selectedNode={selectedNode}
        selectedEdge={selectedEdge}
      />
      <div id='graph-canvas-wrapper' >
        <HoverPanel hoverData={hoverData} />
        <Graph
          graph={{ nodes: nodeData, edges: edgeData, }}
          options={GRAPH_OPTIONS}
          events={events}
        />
      </div>
    </div>
  );
};

export default App;