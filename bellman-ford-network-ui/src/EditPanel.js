import React, { useState, useEffect } from 'react';
import {augmentEdgeData, augmentNodeDate, highlightShortestPath} from './graph-utils';
import bellmanFordNetwork from './bellman-ford-ui';

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

  const [ isValidJSON, setIsValidJSON ]= useState(true);
  const [ validationStatus, setValidationStatus ] = useState([
    { id: 'nodes', name: 'Nodes array is valid', isValid: true },
    { id: 'uniqueNodes', name: 'Nodes all have unique IDs', isValid: true },
    { id: 'sourceNode', name: 'Contains EXACTLY ONE "is_source_node"', isValid: true },
    { id: 'edges', name: 'Edges array is valid', isValid: true },
    { id: 'toFromValid', name: 'Edges all point to/from valid nodes', isValid: true}
  ]);

  // Redundant (?)
  useEffect(() => {
    validateNetworkData();
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
    if (isValidJSON && validationStatus.every(s => s.isValid)) {
      const newNodesJSON = JSON.parse(document.getElementById('nodes-json-edit-textarea').value);
      const newEdgesJSON = JSON.parse(document.getElementById('edges-json-edit-textarea').value);

      const newNodeData = augmentNodeDate(newNodesJSON);
      const newEdgeData = augmentEdgeData(newEdgesJSON);
      setNodeData(newNodeData);
      setEdgeData(newEdgeData);
      const bfResults = bellmanFordNetwork(newNodeData, newEdgeData);
      setNodeData(bfResults);
      setEdgeData(highlightShortestPath(newEdgeData, bfResults));
    }
  };

  const validateNetworkData = () => {
    let newValidation = {
      nodes: false,
      uniqueNodes: false,
      sourceNode: false,
      edges: false,
      toFromValid: false
    };

    const nodesTextArea = document.getElementById('nodes-json-edit-textarea').value;
    const edgesTextArea = document.getElementById('edges-json-edit-textarea').value;

    let jsonValid = true;

    // Node Data Validation

    let newNodeJSON;
    try {
      newNodeJSON = JSON.parse(nodesTextArea);
    } catch (e) {
      console.log (`Error parsing Node JSON ${e}`);
      jsonValid = false;
    }

    if (Array.isArray(newNodeJSON)) {
      newValidation.nodes = true;

      if (newNodeJSON.filter(n => n.is_source_node === true).length === 1) {
        newValidation.sourceNode = true;
      }

      if (newNodeJSON.every((n, _, src) => src.filter(s => s.id === n.id).length === 1)) {
        newValidation.uniqueNodes = true;
      }
    }

    // Edge Data Validation

    let newEdgeJSON;
    try {
      newEdgeJSON = JSON.parse(edgesTextArea);
    } catch (e) {
      console.log (`Error parsing Edge JSON ${e}`);
      jsonValid = false;
    }

    if (Array.isArray(newEdgeJSON)) {
      newValidation.edges = true;

      const hasValidEdges = newNodeJSON && newEdgeJSON.every(e => {
        return (newNodeJSON.filter(n => n.id === e.from).length === 1 &&
          newNodeJSON.filter(n => n.id === e.to).length === 1)
      });

      if (hasValidEdges) {
        newValidation.toFromValid = true;
      }
    }

    setIsValidJSON(jsonValid);
    setValidationStatus(validationStatus.map(s => ({
      ...s,
      isValid: newValidation[s.id]
    })));
  };

  return (
    <div id='edit-view-wrapper'>
      <div id='json-edit-panel'>
        <div id='nodes-edit-section'>
          <div className='edit-panel-title'>nodes:</div>
          <textarea
            id='nodes-json-edit-textarea'
            onChange={validateNetworkData}
            defaultValue={JSON.stringify(networkData.nodes, undefined, 4)}
          />
        </div>

        <div id='edges-edit-section'>
          <div className='edit-panel-title'>edges:</div>
          <textarea
            id='edges-json-edit-textarea'
            onChange={validateNetworkData}
            defaultValue={JSON.stringify(networkData.edges, undefined, 4)}
          />
        </div>
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
            <div className={`validation-status ${isValidJSON ? null : 'invalid'}`}>
              {isValidJSON ? 'Ok' : 'No'}
            </div>
          </div>
          {!isValidJSON ? <div>
            Please ensure JSON data is valid:
            <ul>
              <li>JSON key/value objects are encapsulated in double quotes.</li>
              <li>No trailing commas (on last child objects, array elements)</li>
              <li>Objects are encapsulated in matching {'{ }'} at the top level.</li>
            </ul>
            Click reset below to reset data back to the last valid JSON data.
          </div> : null}
          {isValidJSON && validationStatus.map(s => (
            <div className='validation'>
              <div className='validation-name'>{s.name}</div>
              <div className={`validation-status ${s.isValid ? null : 'invalid'}`}>
                {s.isValid ? 'Ok' : 'No'}
              </div>
            </div>
          ))}
        </div>
        <div id='submission-control'>
          <button onClick={() => {
            const nodesJSONTextArea = document.getElementById('nodes-json-edit-textarea');
            const edgesJSONTextArea = document.getElementById('edges-json-edit-textarea');
            nodesJSONTextArea.value = JSON.stringify(networkData.nodes, undefined, 4);
            edgesJSONTextArea.value = JSON.stringify(networkData.edges, undefined, 4);

            validateNetworkData();
          }}>Reset</button>
          <button id='toggle-edit-mode' onClick={toggleEditMode}>Cancel</button>
          <button
            id='save-new-graph'
            onClick={saveNewGraph}
            disabled={!isValidJSON || !validationStatus.every(s => s.isValid)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
};

export default EditPanel;