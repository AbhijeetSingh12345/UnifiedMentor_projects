import React from 'react';
import './StatusDisplay.css';

function StatusDisplay({ currentTime, runningProcess }) {
  return (
    <div className="status-display">
      <p className="current-time">Current Time: {currentTime}s</p>
      {runningProcess ? (
        <p className="process-status running">Running: {runningProcess.name}</p>
      ) : (
        <p className="process-status idle">System Idle</p>
      )}
    </div>
  );
}

export default StatusDisplay;