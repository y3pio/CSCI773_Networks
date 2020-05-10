import React, { useState, useEffect } from 'react';
import {augmentEdgeData} from './graph-utils';

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

  const [ isValidJON, setIsValidJSON ]= useState(true);
  const [ validationStatus, setValidationStatus ] = useState([
    { id: 'nodes', name: 'Nodes array is valid', isValid: true },
    { id: 'uniqueNodes', name: 'Nodes all have unique IDs', isValid: true },
    { id: 'sourceNode', name: 'Contains EXACTLY ONE "is_source_node"', isValid: true },
    { id: 'edges', name: 'Edges array is valid', isValid: true },
    { id: 'toFromValid', name: 'Edges all point to/from valid nodes', isValid: true}
  ]);

  // Redundant (?)
  useEffect(() => {
    const JSONtextArea = document.getElementById('json-edit-textarea');
    validateNetworkData(JSONtextArea.value);
  }, [nodeData, edgeData]);

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

  const saveNewGraph= () => {
    const newJSONData = JSON.parse(document.getElementById('json-edit-textarea').value);
    setEdgeData(augmentEdgeData(newJSONData.edges));
  };

  const validateNetworkData = (inputValue) => {
    let newValidation = {
      nodes: false,
      uniqueNodes: false,
      sourceNode: false,
      edges: false,
      toFromValid: false
    };

    let newJSONData;
    try {
      newJSONData = JSON.parse(inputValue);
    } catch (e) {
      console.log(`Error parsing JSON: ${e}`);
      setIsValidJSON(newValidation.JSON);
      return;
    }

    if (newJSONData) {
      newValidation.JSON = true;

      if (Array.isArray(newJSONData.nodes)) {
        newValidation.nodes = true;

        if (newJSONData.nodes.filter(n => n.is_source_node === true).length === 1) {
          newValidation.sourceNode = true;
        }

        if (newJSONData.nodes.every((n, _, src) => src.filter(s => s.id === n.id).length === 1)) {
          newValidation.uniqueNodes = true;
        }

        const newNodes = newJSONData.nodes;
        const hasValidEdges = newJSONData.edges.every(e => {
          return (newNodes.filter(n => n.id === e.from).length === 1 &&
            newNodes.filter(n => n.id === e.to).length === 1)
        });

        if (hasValidEdges) {
          newValidation.toFromValid = true;
        }
      }

      if (Array.isArray(newJSONData.edges)) {
        newValidation.edges = true;
      }
    }

    setIsValidJSON(newValidation.JSON);
    setValidationStatus(validationStatus.map(s => ({
      ...s,
      isValid: newValidation[s.id]
    })));
  };

  return (
    <div id='edit-view-wrapper'>
      <div id='json-edit-panel'>
        <textarea
          id='json-edit-textarea'
          onChange={e => validateNetworkData(e.target.value)}
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
            <div className='validation-name'>Is JSON Valid</div>
            <div className={`validation-status ${isValidJON ? null : 'invalid'}`}>
              {isValidJON ? 'Ok' : 'No'}
            </div>
          </div>
          {!isValidJON ? <div>
            Please ensure JSON data is valid:
            <ul>
              <li>JSON key/value objects are encapsulated in double quotes.</li>
              <li>No trailing commas (on last child objects, array elements)</li>
              <li>Encapsulated in a parent object ('{ }') at the top level.</li>
            </ul>
            Click reset below to reset data back to the last valid JSON data.
          </div> : null}
          {isValidJON && validationStatus.map(s => (
            <div className='validation'>
              <div className='validation-name'>{s.name}</div>
              <div className={`validation-status ${s.isValid ? null : 'invalid'}`}>
                {s.isValid ? 'Ok' : 'No'}
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => {
          const JSONtextArea = document.getElementById('json-edit-textarea');
          JSONtextArea.value = JSON.stringify(networkData, undefined, 4);
          validateNetworkData(JSONtextArea.value);
        }}>Reset</button>
        <button id='toggle-edit-mode' onClick={toggleEditMode}>Cancel</button>
        <button id='save-new-graph' onClick={saveNewGraph}>Save</button>
      </div>
    </div>
  )
};

export default EditPanel;