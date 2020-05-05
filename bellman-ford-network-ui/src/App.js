import React, { useState } from "react";
import Graph from "react-graph-vis";
import DataPanel from './DataPanel';
import networkData from './test_data';
import { augmentEdgeData, GRAPH_OPTIONS } from './graph-utils';

export const App = () => {

  const [nodeData, setNodeData] = useState(networkData.nodes);
  const [edgeData, setEdgeData] = useState(augmentEdgeData(networkData.edges));

  const [selectedNode, setSelectedNode] = useState(undefined);
  const [selectedEdge, setSelectedEdge] = useState(undefined);

  const events = {
    select: (event) => {
      const { nodes, edges } = event;
      console.log(`Select nodes: ${JSON.stringify(nodes)}`);
      console.log(`Select edges: ${JSON.stringify(edges)}`);
    },
    hoverNode: (event) => {
      const { node } = event;
      console.log(`Hover Node: ${JSON.stringify(node)}`);
    },
    hoverEdge: (event) => {
      const { edge } = event;
      console.log(`Hover Edge: ${JSON.stringify(edge)}`);
    }
  };
  return (
    <div id='app-wrapper'>
      <DataPanel
        nodeData={nodeData}
        edgeData={edgeData}
        selectedNode={selectedNode}
        selectedEdge={selectedEdge}
      />
      <div id='graph-canvas-wrapper' >
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