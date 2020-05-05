import React from "react";
import { getNodeEdgeData } from './graph-utils';

const renderNetworkData = (nodeData, edgeData) => {
  return (
    <div id='network-node-data'>
      {nodeData.map(node => {
        const nodeEdgeData = getNodeEdgeData(node.id, edgeData);

        return (<div className='node-listing'>{node.id}: {
          nodeEdgeData.map(e => `{${e.from}:${e.to}:${e.cost}} `)
        }</div>)
      })}
    </div>
  )
};

const renderSelectedData = (nodeData, edgeData, selectedNode, selectedEdge) => {
  const selectedNodeData = nodeData.find(node => node.id === selectedNode);
  const selectedEdgeData = edgeData.find(edge => edge.id === selectedEdge);

  console.log(`Selected: ${selectedNode}`);

  return (
    <div id='selected-node-data'>
    </div>
  )
};

export const DataPanel = ({ nodeData, edgeData, selectedNode, selectedEdge }) => {
  return(
    <div id='data-panel-wrapper'>
      {renderNetworkData(nodeData, edgeData)}
      {renderSelectedData(nodeData, edgeData, selectedNode, selectedEdge)}
    </div>
  )
};

export default DataPanel;