import React, { useState } from 'react';

const example_node = {
  "nodes(1...n)": [{
      "id": "Unique<String>",
      "label": "<String>",
      "is_source_node": "<Boolean>"
    },
    {
      "id": "Unique<String>",
      "label": "<String>",
    }]
};

const example_edge = {
  "edges(1...n)": [{
    "from": "<node.id>",
    "to": "<node.id>",
    "cost": "<Number>",
  }]
};

export const EditPanel = ({ nodeData, edgeData, setNodeData, setEdgeData, toggleEditMode }) => {

  // TODO: Turn this into a validation object
  const [ isValidJSON, setIsValidJSON ] = useState(true);

  const networkData = {nodes: nodeData.map(n => ({
      ...n,
      shortest_source: undefined,
      weight: undefined,
      color: undefined,
      hover: undefined
    })), edges: edgeData.map(e => ({
      ...e,
      id: undefined,
      label: undefined,
      isPartOfShortestPath: undefined,
      color: undefined,
    }))};

  const validateOnChange = (e) => {
    let onChangeJSON;
    try {
      onChangeJSON = JSON.parse(e.target.value);
      setIsValidJSON(true);
    } catch (e) {
      console.log(`Error parsing JSON: ${e}`);
      setIsValidJSON(false);
    }
  };

  return (
    <div id='edit-view-wrapper'>
      <div id='json-edit-panel'>
        <textarea
          id='json-edit-textarea'
          onChange={validateOnChange}
          defaultValue={JSON.stringify(networkData, undefined, 4)}
        />
      </div>
      <div id='submission-panel'>
        <div id='instructions'>
          <div id='title'>JSON Structure Info/Example</div>
          <div id='example'>
            <textarea id='node-example' rows={13}>{JSON.stringify(example_node, undefined, 2)}</textarea>
            <textarea id='edge-example'>{JSON.stringify(example_edge, undefined, 2)}</textarea>
          </div>
        </div>
        <div id='validation-status'>
          <div className='validation'>
            <div className='validation-name'>Is a valid JSON structure</div>
            <div className='validation-status'>Ok</div>
          </div>
          <div className='validation'>
            <div className='validation-name'>Nodes array is valid</div>
            <div className='validation-status'>Ok</div>
          </div>
          <div className='validation'>
            <div className='validation-name'>Contains EXACTLY ONE is_source_node</div>
            <div className='validation-status invalid'>No</div>
          </div>
        </div>
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