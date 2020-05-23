import React from "react";

const renderSelectedNodeData = (nodeData) => {
  if (nodeData.length === 0 ) {
    return null;
  }

  return (<div className='selected-data-nodes'>
    <div className='selected-title'>Nodes</div>
    {nodeData.map(n => (
      <div className='selected-object'>
        <div>Node ID: <span>{n.id}</span></div>
        <div>Label: <span>{n.label}</span></div>
        <div>Cost: <span>{n.cost}</span></div>
        <div>Shortest Source: <span>{n.shortest_source} </span></div>
        <hr/>
      </div>
    ))}
  </div>)
};

const renderSelectedEdges = (edgeData) => {
  if (edgeData.length === 0 ) {
    return null;
  }

  return (<div className='selected-data-edges'>
    <div className='selected-title'>Edges</div>
    {edgeData.map(e => (
      <div className='selected-object'>
        <div>Edge ID: <span>{e.id}</span></div>
        <div>From: <span>{e.from}</span></div>
        <div>To: <span>{e.to}</span></div>
        <div>In Shortest Network: <span>{e.isPartOfShortestPath ? 'Yes' : 'No'} </span></div>
        <div>Weight: <span>{e.weight} </span></div>
        <hr/>
      </div>
    ))}
  </div>)
};

const renderSelectedData = (nodeData, edgeData, selectedObject, toggleEditMode) => {
  if (!selectedObject) {
    return (<div id='selected-object-data'>
      <div id='select-instructions'>
        Select a node/edge to view its data.
      <br/>
        (You can select multiple nodes/edges by holding down control/cmd and clicking)
      <br/><br/>
        Shortest network path will be highlighted in <span style={{color: '#ff6f7a'}}>pink</span>, source node will be highlighted in
        <span style={{color: '#ff0000'}}> red</span>
      <br/><br/>
        Non shortest path edges will be displayed in <span style={{color: '#ffffff', backgroundColor: '#2d3436'}}>white</span> and in
        <span style={{color: '#008ac9' }}> blue</span> when selected.
      <hr/>
        Or click edit below to add/modify the network JSON data.
      <br/><br/>
        *Note: Bellman-Ford is automatically ran on adding/modifying the network JSON data.
      </div>
      <button id='toggle-edit-button' onClick={toggleEditMode}>Edit JSON Data</button>
    </div>)
  }

  const { nodes, edges } = selectedObject.data;

  return (
    <div id='selected-object-data'>
      {renderSelectedNodeData(nodes)}
      {renderSelectedEdges(edges)}
    </div>
  )
};

export const DataPanel = ({ nodeData, edgeData, selectedObject, toggleEditMode }) => {
  return(
    <div id='data-panel-wrapper'>
      {/*<div className='title'>Current Network Data</div>*/}
      {/*{renderNetworkData(nodeData, edgeData)}*/}
      <div className='title'>Network Info</div>
      {renderSelectedData(nodeData, edgeData, selectedObject, toggleEditMode)}
    </div>
  )
};

export default DataPanel;