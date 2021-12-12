import React from 'react';

const EventPhase = (props) => {
  const { currentEventPhase } = props;

  if (currentEventPhase === 1) {
    return (
      <div>Minting not started</div>
    )
  } else if (currentEventPhase === 2) {
    return (
      <div>Mint your own now</div>
    )
  } else {
    return (
      <div>Minting ended</div>
    )
  }

};

export default EventPhase;
