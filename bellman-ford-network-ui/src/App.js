import React from "react";
import Graph from "react-graph-vis";
import './App.css'

export const App = () => {
  const graph = {
    nodes: [
      { id: 1, label: "Node 1", title: "node 1 tootip text", color: 'red' },
      { id: 2, label: "Node 2", title: "node 2 tootip text", color: 'grey' },
      { id: 3, label: "Node 3", title: "node 3 tootip text" },
      { id: 4, label: "Node 4", title: "node 4 tootip text" },
      { id: 5, label: "Node 5", title: "node 5 tootip text" }
    ],
    edges: [
      { from: 1, to: 2, label: 'Hello', color: "lime" },
      { from: 1, to: 3 },
      { from: 2, to: 4 },
      { from: 2, to: 5 }
    ]
  };

  const options = {
    layout: {
      hierarchical: false
    },
    edges: {
      color: "#000000"
    },
    height: "500px"
  };

  const events = {
    select: function(event) {
      // TODO: Read up on API to figure out how to use event data to get node/edge info.
      var { nodes, edges } = event;
      console.log(`${JSON.stringify(event)}`);
    }
  };
  return (
    <div id='graph-canvas-wrapper' >
      <Graph
        graph={graph}
        options={options}
        events={events}
      />
    </div>
  );
};

export default App;