import React, { useState } from 'react';

export const EditPanel = ({ nodeData, edgeData, setNodeData, setEdgeData, toggleEditMode }) => {

  const networkData = {nodes: nodeData, edges: edgeData};

  const validateOnChange = (e) => {
    console.log(JSON.parse(e.target.value));
  };

  return (
    <div id='edit-panel-wrapper'>
      <div id='json-edit-panel'>
        <textarea id='json-edit-textarea' onChange={validateOnChange}>
          {JSON.stringify(networkData, undefined, 4)}
        </textarea>
      </div>
      <div id='sumission-panel'>
        <button onClick={() => {
          document.getElementById('json-edit-textarea').value =
            JSON.stringify(networkData, undefined, 4);
        }}>Reset</button>
        <button id='toggle-edit-mode' onClick={toggleEditMode}>Cancel</button>
      </div>
    </div>
  )
};

export default EditPanel;