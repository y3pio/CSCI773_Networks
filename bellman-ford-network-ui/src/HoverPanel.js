import React from "react";

const renderHoverPanel = ({ type, id, ...data }) => {
  if (type === 'node') {
    return (
      <div className='data'>
        <div>Node ID: <span>{id}</span></div>
        <div>Label: <span>{data.label}</span></div>
        <div>Weight: <span>{data.weight}</span></div>
        <div>Shortest Source: <span>{data.shortest_source} </span></div>
      </div>
    )
  }

  if (type === 'edge') {
    return (
      <div className='data'>
        <div>Edge ID: <span>{id}</span></div>
        <div>From: <span>{data.to}</span></div>
        <div>To: <span>{data.to}</span></div>
        <div>Cost: <span>{data.cost} </span></div>
      </div>
    )
  }
};

export const HoverPanel = ({hoverData}) => {
  if (hoverData === undefined) {
    return null;
  }

  return (
    <div id='hover-data-panel'>
      {renderHoverPanel(hoverData)}
    </div>
  )
};

export default HoverPanel;