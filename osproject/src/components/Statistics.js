// import React from 'react';
// import '../styles/Statistics.css';

// const Statistics = ({ isComplete, stats }) => {
//   if (!isComplete) {
//     return null;
//   }
  
//   return (
//     <div className="statistics-container">
//       <h2 className="statistics-title">Performance Statistics</h2>
//       <div className="statistics-grid">
//         <div className="statistic-box">
//           <p className="statistic-label">Average Turnaround Time</p>
//           <p className="statistic-value">{stats.avgTurnaround.toFixed(2)}s</p>
//         </div>
//         <div className="statistic-box">
//           <p className="statistic-label">Average Waiting Time</p>
//           <p className="statistic-value">{stats.avgWaiting.toFixed(2)}s</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Statistics;

// src/components/Statistics.js
import React from 'react';

const Statistics = ({ processes, schedule, isComplete }) => {
  if (!isComplete) return null;

  // Map to store first and last time for each process
  const statsMap = {};
  schedule.forEach(({ id, startTime, endTime }) => {
    if (!statsMap[id]) {
      statsMap[id] = { startTime, endTime };
    } else {
      statsMap[id].startTime = Math.min(statsMap[id].startTime, startTime);
      statsMap[id].endTime = Math.max(statsMap[id].endTime, endTime);
    }
  });

  let totalTurnaround = 0;
  let totalWaiting = 0;

  const rows = processes.map((proc) => {
    const { burstTime, id, name } = proc;
    const completionTime = statsMap[id]?.endTime ?? 0;
    const turnaroundTime = completionTime; // assuming arrival time is 0
    const waitingTime = turnaroundTime - burstTime;

    totalTurnaround += turnaroundTime;
    totalWaiting += waitingTime;

    return (
      <tr key={id} className="border-t">
        <td className="p-2">{name}</td>
        <td className="p-2 text-center">{burstTime}</td>
        <td className="p-2 text-center">{completionTime}</td>
        <td className="p-2 text-center">{turnaroundTime}</td>
        <td className="p-2 text-center">{waitingTime}</td>
      </tr>
    );
  });

  const avgTurnaround = (totalTurnaround / processes.length).toFixed(2);
  const avgWaiting = (totalWaiting / processes.length).toFixed(2);

  return (
    <div className="mt-6 p-4 border rounded bg-white shadow">
      <h2 className="text-xl font-bold mb-4">Statistics</h2>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Process</th>
            <th className="p-2 text-center">Burst Time</th>
            <th className="p-2 text-center">Completion Time</th>
            <th className="p-2 text-center">Turnaround Time</th>
            <th className="p-2 text-center">Waiting Time</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
        <tfoot>
          <tr className="font-semibold border-t">
            <td className="p-2">Average</td>
            <td className="p-2"></td>
            <td className="p-2"></td>
            <td className="p-2 text-center">{avgTurnaround}</td>
            <td className="p-2 text-center">{avgWaiting}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Statistics;
