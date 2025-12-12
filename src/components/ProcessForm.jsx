import React, { useState } from "react";
import fcfs from "../algorithms/fcfs";
import sjf from "../algorithms/sjf";
import rr from "../algorithms/rr";
import priorityAlgo from "../algorithms/priority";
import mlfq from "../algorithms/mlfq";

const ProcessForm = ({ processes, setProcesses, algorithm, setAlgorithm, setResults }) => {
  const [form, setForm] = useState({
    pid: "",
    arrival: "",
    burst: "",
    priority: "",

  });
  const [quantum,setQuantum] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const addProcess = () => {
  // Allow p1 or P1 (letter p/P followed by digits)
  const pidPattern = /^[pP][0-9]+$/;

  if (!pidPattern.test(form.pid)) {
    alert("PID must be like p1 or P1 (letter p/P followed by a number)");
    return;
  }

  if (!form.arrival || !form.burst) {
    alert("Arrival time and Burst time are required!");
    return;
  }

  setProcesses([
    ...processes,
    {
      ...form,
      pid: form.pid.toLowerCase(), 
      arrival: +form.arrival,
      burst: +form.burst,
      priority: +form.priority
    }
  ]);

  setForm({ pid: "", arrival: "", burst: "", priority: "" });
};


  const runAlgorithm = () => {
    if (processes.length === 0) return alert("Add at least 1 process.");

    let result;
    switch (algorithm) {
      case "FCFS":
        result = fcfs(processes);
        break;
      case "SJF":
        result = sjf(processes);
        break;
      case "RR":
        result = rr(processes, +quantum); // default quantum
        break;
      case "PRIORITY":
        result = priorityAlgo(processes);
        break;
      case "MLFQ":
        result = mlfq(processes);
        break;
      default:
        break;
    }
console.log(result);
    setResults(result);
  };

  return (
    <div>
      {/* Algorithm Selection */}
      <h3 className="text-lg font-semibold mt-6">Select Algorithm</h3>
      <select
        value={algorithm}
        onChange={(e) => setAlgorithm(e.target.value)}
        className="border p-2 rounded w-full mt-2"
      >
        <option>FCFS</option>
        <option>SJF</option>
        <option>RR</option>
        <option>PRIORITY</option>
        <option>MLFQ</option>
      </select>
      <h2 className="text-xl font-semibold mb-4">Add Process</h2>

      <div className="grid grid-cols-2 gap-3">
        
        <input
          name="pid"
          value={form.pid}
          onChange={handleChange}
          placeholder="PID"
          className="border p-2 rounded"
        />

        <input
          name="arrival"
          type="number"
          value={form.arrival}
          onChange={handleChange}
          placeholder="Arrival Time"
          className="border p-2 rounded"
        />

        <input
          name="burst"
          type="number"
          value={form.burst}
          onChange={handleChange}
          placeholder="Burst Time"
          className="border p-2 rounded"
        />

        {(algorithm === "PRIORITY" || algorithm === "MLFQ") && (
          <input
            name="priority"
            type="number"
            value={form.priority}
            onChange={handleChange}
            placeholder="Priority"
            className="border p-2 rounded"
          />
        )}

{algorithm === "RR"  && processes.length == 0 &&(
  <input 
    name="quantum"
    type="number"
    value={quantum}
    onChange={(e)=>setQuantum(e.target.value)}
    placeholder="Quantum (only once)"
    className="border p-2 rounded"
  />
)}

      </div>

      <button
        onClick={addProcess}
        className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        Add Process
      </button>


      {/* Run Button */}
      <button
        onClick={runAlgorithm}
        className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
      >
        Run Scheduler
      </button>

    </div>
  );
};

export default ProcessForm;
