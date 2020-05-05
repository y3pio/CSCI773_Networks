import React, { useState } from "react";
import Graph from "react-graph-vis";
import DataPanel from './DataPanel';
import HoverPanel from './HoverPanel';
import networkData from './test_data';
import { augmentEdgeData, augmentNodeDate, GRAPH_OPTIONS } from './graph-utils';

export const App = () => {

  const [nodeData, setNodeData] = useState(augmentNodeDate(networkData.nodes));
  const [edgeData, setEdgeData] = useState(augmentEdgeData(networkData.edges));

  const [selectedObject, setSelectedObject] = useState(undefined);
  const [hoverData, setHoverData] = useState(undefined);

  const events = {
    select: (event) => {
      const { nodes, edges } = event;
      if (nodes.length > 0 || edges.length > 0) {
        console.log(`Nodes:: ${JSON.stringify(nodes)}`);
        setSelectedObject({
          data: {
            nodes: nodeData.filter(n => nodes.includes(n.id)),
            edges: edgeData.filter(e => edges.includes(e.id))
          }
        })
      } else {
        setSelectedObject(undefined);
      }
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
        selectedObject={selectedObject}
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