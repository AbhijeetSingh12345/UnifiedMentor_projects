import React from 'react';


export default function ProcessTable({ bootProcesses, schedule, currentTime, runningProcess, algorithm, getProcessColor }) {
  return (
    <div className="process-table-container">
      <h2 className="table-title">Process Information</h2>
      <div className="table-wrapper">
        <table className="process-table">
          <thead>
            <tr>
              <th>Process</th>
              <th>Burst Time</th>
              {algorithm === 'priority' && <th>Priority</th>}
              <th>Progress</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bootProcesses.map((proc) => {
              // Calculate progress for this process
              const processSlots = schedule.filter(s => s.id === proc.id);
              const completedTime = processSlots
                .filter(s => s.endTime <= currentTime)
                .reduce((total, s) => total + (s.endTime - s.startTime), 0);
                
              const inProgressTime = processSlots
                .filter(s => s.startTime <= currentTime && s.endTime > currentTime)
                .reduce((total, s) => total + (currentTime - s.startTime), 0);
                
              const totalCompletedTime = completedTime + inProgressTime;
              let progressPercent = (totalCompletedTime / proc.burstTime) * 100;
              progressPercent = Math.min(100, progressPercent); // Cap at 100%
              
              // Determine process status
              let status = 'Waiting';
              let statusClass = 'status-waiting';
              
              if (runningProcess && runningProcess.id === proc.id) {
                status = 'Running';
                statusClass = 'status-running';
              } else if (currentTime > 0) {
                if (progressPercent >= 100) {
                  status = 'Completed';
                  statusClass = 'status-completed';
                } else if (progressPercent > 0) {
                  status = `Partially Completed`;
                  statusClass = 'status-partial';
                } else {
                  const nextSlot = schedule.find(s => s.id === proc.id && s.startTime > currentTime);
                  if (nextSlot) {
                    status = `Waiting (at ${nextSlot.startTime}s)`;
                  }
                }
              }
              
              return (
                <tr key={proc.id} className={runningProcess && runningProcess.id === proc.id ? 'row-active' : ''}>
                  <td className="process-name">
                    <div className="process-indicator">
                      <div className={`color-dot ${getProcessColor(proc.id)}`}></div>
                      {proc.name}
                    </div>
                  </td>
                  <td className="burst-time">{proc.burstTime}s</td>
                  {algorithm === 'priority' && <td className="priority">{proc.priority}</td>}
                  <td className="progress-cell">
                    <div className="progress-bar-bg">
                      <div 
                        className={`progress-bar-fill ${getProcessColor(proc.id)}`} 
                        style={{ width: `${progressPercent}%` }}
                      >
                        {progressPercent > 20 && `${Math.round(progressPercent)}%`}
                      </div>
                    </div>
                  </td>
                  <td className={`process-status ${statusClass}`}>
                    {status}
                    {runningProcess && runningProcess.id === proc.id && (
                      <span className="status-icon">⚙️</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}