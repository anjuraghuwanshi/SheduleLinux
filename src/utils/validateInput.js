// backend/utils/validateInput.js

module.exports = function validateInput(processes, algorithm, quantum) {
  if (!Array.isArray(processes) || processes.length === 0)
    return "Process list cannot be empty.";

  for (let p of processes) {
    if (!p.pid) return "Each process must have a pid.";
    if (p.arrival < 0 || isNaN(p.arrival))
      return `Invalid arrival time for ${p.pid}.`;
    if (p.burst <= 0 || isNaN(p.burst))
      return `Invalid burst time for ${p.pid}.`;
    if (p.priority !== undefined && isNaN(p.priority))
      return `Invalid priority value for ${p.pid}.`;
  }

  if (algorithm === "rr" && (!quantum || quantum <= 0))
    return "Time quantum must be a positive number for Round Robin.";

  return null; // All good
};
