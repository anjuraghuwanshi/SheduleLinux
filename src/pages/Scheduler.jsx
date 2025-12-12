import React, { useState } from "react";
import ProcessForm from "../components/ProcessForm";
import OutputTable from "../components/OutputTable";
import GanttChart from "../components/GanttChart";
import SimulationGantt from "../components/SimulationGantt";

const Scheduler = () => {
  const [processes, setProcesses] = useState([]);
  const [results, setResults] = useState(null);
  const [algorithm, setAlgorithm] = useState("FCFS");

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">CPU Scheduler</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="p-4 bg-white shadow rounded-xl">
          <ProcessForm
            processes={processes}
            setProcesses={setProcesses}
            algorithm={algorithm}
            setAlgorithm={setAlgorithm}
            setResults={setResults}
          />
        </div>

        <div className="p-4 bg-white shadow rounded-xl">
          {results ? (
            <OutputTable results={results} />
          ) : (
            <p className="text-gray-400 text-center">Run an algorithm to see results.</p>
          )}
        </div>

      </div>

      {results && (
        
        <div className="mt-6 p-4 bg-white shadow rounded-xl">
<SimulationGantt gantt={results.gantt} snapshots={results.snapshots} />

        </div>
      )}
    </div>
  );
};

export default Scheduler;
