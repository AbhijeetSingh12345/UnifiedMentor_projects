import React from 'react';

const SimulationControl = ({ isRunning, isComplete, toggleSimulation }) => {
  return (
    <div className="flex justify-center mb-6">
      <button 
        className={`px-4 py-2 rounded font-medium ${
          isRunning ? 'bg-yellow-500 hover:bg-yellow-600' : 
          isComplete ? 'bg-blue-500 hover:bg-blue-600' : 
          'bg-green-500 hover:bg-green-600'
        } text-white`}
        onClick={toggleSimulation}
      >
        {isRunning ? 'Pause' : isComplete ? 'Reset' : 'Start'} Simulation
      </button>
    </div>
  );
};

export default SimulationControl;