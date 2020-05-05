import React from "react";
import { getNodeEdgeData } from './graph-utils';

const renderNetworkData = (nodeData, edgeData) => {
  return (
    <div id='network-data'>
      *Lists the [Node-Weight] and its (Edge, Cost)
      {nodeData.map(node => {
        const nodeEdgeData = getNodeEdgeData(node.id, edgeData);
        const nodeWeight = isFinite(node.weight) ? node.weight : 'Inf';
        return (<div className='node-listing'>[{node.id} - {nodeWeight} ]: {
          nodeEdgeData.map(e => (<div className='edge-listing'>
            ({e.from}:{e.to}, {e.cost})
          </div>))
        }</div>)
      })}
    </div>
  )
};

const renderSelectedData = (nodeData, edgeData, selectedObject) => {
  if (!selectedObject) {
    return (<div id='selected-object-data'>
      <div id='select-instructions'>
        Please select a node/edge to view its data.
      <br/>
        (You can select multiple nodes/edges by holding down control/cmd and clicking)
      <br/><br/>
        Or click <span>here</span> to add/modify the network data JSON. (TODO)
      </div>
    </div>)
  }
  console.log(`Selected Data: ${JSON.stringify(selectedObject.data)}`);
  let objectDataHtml = null;
  if (selectedObject.type === 'node') {
    const { node, edges } = selectedObject.data;
    objectDataHtml = (
      <div id='selected-node-data'>
        <div className='type' >Object Type: <span>Node</span></div>
        <div className='id' >Node ID:
          <span> {node.id}</span>
          {node.is_source_node ? <span> - Source Node</span> : null}
        </div>
        <div className='id' >Label:  <span>{node.label}</span></div>
        <div className='id' >Weight (Bellman-Ford):  <span>{node.weight}</span></div>
      </div>
    )
  }
  return (
    <div id='selected-object-data'>
      {objectDataHtml}
    </div>
  )
};

export const DataPanel = ({ nodeData, edgeData, selectedObject }) => {
  return(
    <div id='data-panel-wrapper'>
      <div className='title'>Current Network Data</div>
      {renderNetworkData(nodeData, edgeData)}
      <div className='title'>Selected Object</div>
      {renderSelectedData(nodeData, edgeData, selectedObject)}
    </div>
  )
};

export default DataPanel;