import React, { useState, useEffect } from 'react';
import '../styles/BootScheduler.css';
import SimulationControl from './SimulationControl';
import ProcessTable from './ProcessTable';
import GanttChart from './GanttChart';
import Statistics from './Statistics';
import AlgorithmSelector from './AlgorithmSelector';

// Sample boot processes with added priority field
const initialBootProcesses = [
  { id: 1, name: 'Initialize Kernel', burstTime: 5, priority: 2 },
  { id: 2, name: 'Mount File Systems', burstTime: 3, priority: 3 },
  { id: 3, name: 'Load Device Drivers', burstTime: 4, priority: 1 },
  { id: 4, name: 'Start Services', burstTime: 2, priority: 4 },
  { id: 5, name: 'Launch Login Manager', burstTime: 3, priority: 5 },
];

const BootScheduler = () => {
  const [bootProcesses, setBootProcesses] = useState(initialBootProcesses);
  const [schedule, setSchedule] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [runningProcess, setRunningProcess] = useState(null);
  const [algorithm, setAlgorithm] = useState('fcfs');
  const [timeQuantum, setTimeQuantum] = useState(2);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Reset simulation
  const resetSimulation = () => {
    setCurrentTime(0);
    setRunningProcess(null);
    setIsRunning(false);
    setIsComplete(false);
    
    // Reset remaining time for processes
    const resetProcesses = initialBootProcesses.map(proc => ({
      ...proc,
      remainingTime: proc.burstTime,
      startTime: null,
      endTime: null,
      completionTime: null,
      turnaroundTime: null,
      waitingTime: null,
      responseTime: null,
      executed: false
    }));
    setBootProcesses(resetProcesses);
    
    // Generate schedule based on current algorithm
    generateSchedule(resetProcesses, algorithm);
  };

  // Generate schedule based on selected algorithm
  const generateSchedule = (processes, selectedAlgorithm) => {
    let newSchedule = [];
    const processesClone = JSON.parse(JSON.stringify(processes));
    
    switch (selectedAlgorithm) {
      case 'fcfs':
        newSchedule = generateFCFSSchedule(processesClone);
        break;
      case 'sjf':
        newSchedule = generateSJFSchedule(processesClone);
        break;
      case 'rr':
        newSchedule = generateRRSchedule(processesClone, timeQuantum);
        break;
      case 'srtf':
        newSchedule = generateSRTFSchedule(processesClone);
        break;
      case 'priority':
        newSchedule = generatePrioritySchedule(processesClone);
        break;
      default:
        newSchedule = generateFCFSSchedule(processesClone);
    }
    
    setSchedule(newSchedule);
    return newSchedule;
  };

  // First-Come, First-Served (FCFS)
  const generateFCFSSchedule = (processes) => {
    let time = 0;
    const timeline = [];
    
    processes.forEach(proc => {
      const startTime = time;
      const endTime = time + proc.burstTime;
      
      timeline.push({
        id: proc.id,
        name: proc.name,
        startTime,
        endTime,
        burstTime: proc.burstTime
      });
      
      time = endTime;
    });
    
    return timeline;
  };

  // Shortest Job First (SJF)
  const generateSJFSchedule = (processes) => {
    let time = 0;
    const timeline = [];
    const sorted = [...processes].sort((a, b) => a.burstTime - b.burstTime);
    
    sorted.forEach(proc => {
      const startTime = time;
      const endTime = time + proc.burstTime;
      
      timeline.push({
        id: proc.id,
        name: proc.name,
        startTime,
        endTime,
        burstTime: proc.burstTime
      });
      
      time = endTime;
    });
    
    return timeline;
  };

  // Round Robin (RR)
  const generateRRSchedule = (processes, quantum) => {
    let time = 0;
    const timeline = [];
    const queue = [...processes];
    const processMap = {};
    
    // Initialize remaining times
    processes.forEach(proc => {
      processMap[proc.id] = { ...proc, remainingTime: proc.burstTime };
    });
    
    while (queue.length > 0) {
      const proc = queue.shift();
      const procState = processMap[proc.id];
      
      if (procState.remainingTime <= 0) continue;
      
      const startTime = time;
      const executionTime = Math.min(quantum, procState.remainingTime);
      const endTime = time + executionTime;
      
      timeline.push({
        id: proc.id,
        name: proc.name,
        startTime,
        endTime,
        burstTime: executionTime
      });
      
      procState.remainingTime -= executionTime;
      time = endTime;
      
      if (procState.remainingTime > 0) {
        queue.push(proc);
      }
    }
    
    return timeline;
  };

  // Shortest Remaining Time First (SRTF)
  const generateSRTFSchedule = (processes) => {
    const timeline = [];
    let time = 0;
    const remaining = processes.map(p => ({ ...p, remainingTime: p.burstTime }));
    let currentProc = null;
    
    while (remaining.some(p => p.remainingTime > 0)) {
      // Find process with shortest remaining time
      const readyProcesses = remaining.filter(p => p.remainingTime > 0);
      const nextProc = readyProcesses.reduce(
        (min, p) => p.remainingTime < min.remainingTime ? p : min,
        readyProcesses[0]
      );
      
      // If process changes, add to timeline
      if (!currentProc || currentProc.id !== nextProc.id) {
        if (currentProc) {
          // End previous process segment
          timeline.push({
            id: currentProc.id,
            name: currentProc.name,
            startTime: currentProc.segmentStart,
            endTime: time,
            burstTime: time - currentProc.segmentStart
          });
        }
        
        // Start new process segment
        nextProc.segmentStart = time;
        currentProc = nextProc;
      }
      
      // Simulate one time unit
      time++;
      const proc = remaining.find(p => p.id === nextProc.id);
      proc.remainingTime--;
      
      // If process completes, reset current process
      if (proc.remainingTime === 0) {
        timeline.push({
          id: currentProc.id,
          name: currentProc.name,
          startTime: currentProc.segmentStart,
          endTime: time,
          burstTime: time - currentProc.segmentStart
        });
        currentProc = null;
      }
    }
    
    return timeline;
  };

  // Priority Scheduling
  const generatePrioritySchedule = (processes) => {
    let time = 0;
    const timeline = [];
    // Higher number = higher priority
    const sorted = [...processes].sort((a, b) => b.priority - a.priority);
    
    sorted.forEach(proc => {
      const startTime = time;
      const endTime = time + proc.burstTime;
      
      timeline.push({
        id: proc.id,
        name: proc.name,
        startTime,
        endTime,
        burstTime: proc.burstTime,
        priority: proc.priority
      });
      
      time = endTime;
    });
    
    return timeline;
  };

  // Start or pause simulation
  const toggleSimulation = () => {
    if (isComplete) {
      resetSimulation();
    }
    setIsRunning(!isRunning);
  };

  // Change scheduling algorithm
  const changeAlgorithm = (newAlgorithm) => {
    setAlgorithm(newAlgorithm);
    resetSimulation();
  };

  // Initialize schedule on component mount
  useEffect(() => {
    resetSimulation();
  }, [algorithm, timeQuantum]);

  // Run simulation clock
  useEffect(() => {
    if (!isRunning || schedule.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        const newTime = prev + 1;
        const current = schedule.find((p) => p.startTime <= newTime && p.endTime > newTime);
        setRunningProcess(current || null);
        
        // Check if simulation is complete
        if (newTime >= schedule[schedule.length - 1].endTime) {
          clearInterval(interval);
          setIsRunning(false);
          setIsComplete(true);
        }
        
        return newTime;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isRunning, schedule]);

  // Calculate statistics for each process
  // const calculateStatistics = () => {
  //   if (schedule.length === 0) return { avgTurnaround: 0, avgWaiting: 0 };
    
  //   const processStats = {};
  //   const originalProcesses = {};
    
  //   // Create map of original processes
  //   bootProcesses.forEach(proc => {
  //     originalProcesses[proc.id] = proc;
  //   });
    
  //   // Find completion times
  //   schedule.forEach(slot => {
  //     if (!processStats[slot.id]) {
  //       processStats[slot.id] = {
  //         firstStart: slot.startTime,
  //         lastEnd: slot.endTime,
  //       };
  //     } else {
  //       if (slot.startTime < processStats[slot.id].firstStart) {
  //         processStats[slot.id].firstStart = slot.startTime;
  //       }
  //       if (slot.endTime > processStats[slot.id].lastEnd) {
  //         processStats[slot.id].lastEnd = slot.endTime;
  //       }
  //     }
  //   });
    
  //   // Calculate turnaround and waiting times
  //   let totalTurnaround = 0;
  //   let totalWaiting = 0;
    
  //   Object.keys(processStats).forEach(id => {
  //     const stats = processStats[id];
  //     const proc = originalProcesses[id];
      
  //     // Turnaround time = completion time - arrival time (0 in our case)
  //     const turnaround = stats.lastEnd;
  //     // Waiting time = turnaround time - burst time
  //     const waiting = turnaround - proc.burstTime;
      
  //     totalTurnaround += turnaround;
  //     totalWaiting += waiting;
      
  //     processStats[id].turnaround = turnaround;
  //     processStats[id].waiting = waiting;
  //   });
    
  //   return {
  //     avgTurnaround: totalTurnaround / Object.keys(processStats).length,
  //     avgWaiting: totalWaiting / Object.keys(processStats).length,
  //     processStats
  //   };
  // };

  // const stats = calculateStatistics();

  // Get color based on process ID for consistent coloring
  const getProcessColor = (procId) => {
    const colors = [
      'bg-blue-400',
      'bg-green-400',
      'bg-yellow-400',
      'bg-purple-400',
      'bg-red-400',
      'bg-pink-400',
      'bg-indigo-400'
    ];
    
    return colors[(procId - 1) % colors.length];
  };
  
  // Get border color matching the process fill color
  const getProcessBorderColor = (procId) => {
    const colors = [
      'border-blue-400',
      'border-green-400',
      'border-yellow-400',
      'border-purple-400',
      'border-red-400',
      'border-pink-400',
      'border-indigo-400'
    ];
    
    return colors[(procId - 1) % colors.length];
  };

  // Format algorithm name for display
  const getAlgorithmName = (alg) => {
    switch (alg) {
      case 'fcfs': return 'First-Come, First-Served (FCFS)';
      case 'sjf': return 'Shortest Job First (SJF)';
      case 'rr': return 'Round Robin (RR)';
      case 'srtf': return 'Shortest Remaining Time First (SRTF)';
      case 'priority': return 'Priority Scheduling';
      default: return alg.toUpperCase();
    }
  };

  return (
    <div className="boot-scheduler">
      <h1 className="title">OS Boot Process - CPU Scheduling Simulation</h1>
      
      <AlgorithmSelector 
        algorithm={algorithm}
        timeQuantum={timeQuantum}
        isRunning={isRunning}
        changeAlgorithm={changeAlgorithm}
        setTimeQuantum={setTimeQuantum}
      />
      
      <SimulationControl 
        isRunning={isRunning}
        isComplete={isComplete}
        toggleSimulation={toggleSimulation}
        currentTime={currentTime}
        algorithm={algorithm}
        getAlgorithmName={getAlgorithmName}
        runningProcess={runningProcess}
        schedule={schedule}
        getProcessBorderColor={getProcessBorderColor}
      />
      
      <ProcessTable 
        bootProcesses={bootProcesses}
        schedule={schedule}
        currentTime={currentTime}
        runningProcess={runningProcess}
        algorithm={algorithm}
        getProcessColor={getProcessColor}
      />
      
      <GanttChart 
        schedule={schedule}
        currentTime={currentTime}
        getProcessColor={getProcessColor}
      />
      
      {/* {isComplete && (
        <Statistics stats={stats} />
      )} */}

      <Statistics
  processes={initialBootProcesses}
  schedule={schedule}
  isComplete={isComplete}
/>
    </div>
  );
};

export default BootScheduler;