import React, { useState, useEffect } from "react";
import ProcessForm from "../components/ProcessForm";
import OutputTable from "../components/OutputTable";
import SimulationGantt from "../components/SimulationGantt";
import GuideModal from "../components/GuideModal";

const Scheduler = () => {
  const [processes, setProcesses] = useState([]);
  const [results, setResults] = useState(null);
  const [algorithm, setAlgorithm] = useState("FCFS");
  const [showGuide, setShowGuide] = useState(false);

  // ⭐ Show guide only on FIRST visit
  useEffect(() => {
    const visited = localStorage.getItem("guideShown");
    if (!visited) {
      setShowGuide(true);
      localStorage.setItem("guideShown", "true");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-3 py-4 sm:p-6">

      {/* ⭐ FIRST-TIME GUIDE MODAL */}
      {showGuide && <GuideModal onClose={() => setShowGuide(false)} />}

      {/* Heading */}
      <h1 className="text-2xl sm:text-4xl font-bold text-center text-gray-800 mb-6 sm:mb-8 flex items-center justify-center gap-2 sm:gap-3">
        <span className="text-blue-600">⚙️</span>
        Scheduling Simulator
      </h1>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">

        {/* Process Form */}
        <div className="p-3 sm:p-4 bg-white shadow rounded-xl">
          <ProcessForm
            processes={processes}
            setProcesses={setProcesses}
            algorithm={algorithm}
            setAlgorithm={setAlgorithm}
            setResults={setResults}
          />
        </div>

        {/* Output Table */}
        <div className="p-3 sm:p-4 bg-white shadow rounded-xl">
          {results ? (
            <OutputTable results={results} />
          ) : (
            <p className="text-gray-400 text-center text-sm sm:text-base">
              Run an algorithm to see results.
            </p>
          )}
        </div>

      </div>

      {/* GANTT CHART SECTION */}
      <div className="mt-5 sm:mt-6 p-3 sm:p-4 bg-white shadow rounded-xl">
        {results ? (
          <SimulationGantt
            gantt={results.gantt}
            snapshots={results.snapshots}
          />
        ) : (
          <p className="text-gray-400 text-center text-sm sm:text-base">
            Gantt Chart will appear here.
          </p>
        )}
      </div>

    </div>
  );
};

export default Scheduler;
