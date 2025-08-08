import React from 'react';
import ProcessItem from './ProcessItem';
import './ProcessList.css';

function ProcessList({ schedule, currentTime }) {
  return (
    <div className="process-list">
      {schedule.map((proc) => (
        <ProcessItem 
          key={proc.id}
          process={proc}
          currentTime={currentTime}
        />
      ))}
    </div>
  );
}

export default ProcessList;