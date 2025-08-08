import React, { useState, useEffect } from 'react';
import ProcessList from './ProcessList';
import StatusDisplay from './StatusDisplay';
import './BootScheduler.css';

const bootProcesses = [
  { id: 1, name: 'Initialize Kernel', burstTime: 5 },
  { id: 2, name: 'Mount File Systems', burstTime: 3 },
  { id: 3, name: 'Load Device Drivers', burstTime: 4 },
  { id: 4, name: 'Start Services', burstTime: 2 },
  { id: 5, name: 'Launch Login Manager', burstTime: 3 },
];

function BootScheduler() {
  const [schedule, setSchedule] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [runningProcess, setRunningProcess] = useState(null);

  useEffect(() => {
    let time = 0;
    const fcfsSchedule = bootProcesses.map((proc) => {
      const startTime = time;
      const endTime = time + proc.burstTime;
      time = endTime;
      return { ...proc, startTime, endTime };
    });
    setSchedule(fcfsSchedule);
  }, []);

  useEffect(() => {
    if (schedule.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        const newTime = prev + 1;
        const current = schedule.find((p) => p.startTime <= newTime && p.endTime > newTime);
        setRunningProcess(current || null);
        
        if (newTime >= schedule[schedule.length - 1].endTime) {
          clearInterval(interval);
        }
        
        return newTime;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [schedule]);

  return (
    <div className="boot-scheduler">
      <h1>OS Boot Process - CPU Scheduling</h1>
      
      <StatusDisplay 
        currentTime={currentTime} 
        runningProcess={runningProcess} 
      />
      
      <ProcessList 
        schedule={schedule} 
        currentTime={currentTime} 
      />
    </div>
  );
}

export default BootScheduler;