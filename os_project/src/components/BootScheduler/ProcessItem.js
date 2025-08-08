import React from 'react';
import './ProcessItem.css';

function ProcessItem({ process, currentTime }) {
  const getProgressWidth = () => {
    if (currentTime >= process.endTime) {
      return '100%';
    } else if (currentTime >= process.startTime) {
      return `${((currentTime - process.startTime) / process.burstTime) * 100}%`;
    }
    return '0%';
  };
  
  const getProgressStatus = () => {
    if (currentTime >= process.endTime) {
      return 'completed';
    } else if (currentTime >= process.startTime) {
      return 'running';
    }
    return 'pending';
  };

  return (
    <div className="process-item">
      <div className="process-name">{process.name}</div>
      <div className="progress-bar">
        <div 
          className={`progress ${getProgressStatus()}`}
          style={{ width: getProgressWidth() }}
        ></div>
      </div>
      <span className="burst-time">{process.burstTime}s</span>
    </div>
  );
}

export default ProcessItem;