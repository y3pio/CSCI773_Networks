import React from "react";
import Graph from "react-graph-vis";
import './index.css'
import DataPanel from './DataPanel';
import networkData from './test_data';
import { addEdgeLabel, GRAPH_OPTIONS } from './graph-utils';

export const App = () => {
  const graphData = {
    nodes: networkData.nodes,
    edges: addEdgeLabel(networkData.edges)
  };

  const events = {
    select: function(event) {
      // TODO: Read up on API to figure out how to use event data to get node/edge info.
      var { nodes, edges } = event;
      console.log(`${JSON.stringify(event)}`);
    }
  };
  return (
    <div id='app-wrapper'>
      <DataPanel/>
      <div id='graph-canvas-wrapper' >
        <Graph
          graph={graphData}
          options={GRAPH_OPTIONS}
          events={events}
        />
      </div>
    </div>
  );
};

export default App;