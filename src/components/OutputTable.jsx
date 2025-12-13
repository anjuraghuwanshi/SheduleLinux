import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const OutputTable = ({ results }) => {
  if (!results || !results.metrics || results.metrics.length === 0) {
    return (
      <p className="text-gray-500 mt-4 text-center">
        No results to display yet. Run a scheduling algorithm first.
      </p>
    );
  }

  const processes = results.metrics;

  const avgWaiting = (
    processes.reduce((a, b) => a + b.waiting, 0) / processes.length
  ).toFixed(2);

  const avgTurnaround = (
    processes.reduce((a, b) => a + b.turnaround, 0) / processes.length
  ).toFixed(2);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-center">
        Process Results
      </h2>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-center">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-2 font-semibold">PID</th>
              <th className="p-2 font-semibold">Arrival</th>
              <th className="p-2 font-semibold">Burst</th>
              <th className="p-2 font-semibold">Completion</th>
              <th className="p-2 font-semibold">Turnaround</th>
              <th className="p-2 font-semibold">Waiting</th>
            </tr>
          </thead>

          <tbody>
            <AnimatePresence>
              {processes.map((p) => (
                <motion.tr
                  key={p.pid}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="border-b hover:bg-blue-50"
                >
                  <td className="p-2 font-semibold text-blue-600">
                    {p.pid}
                  </td>
                  <td className="p-2">{p.arrival}</td>
                  <td className="p-2">{p.burst}</td>
                  <td className="p-2">{p.completion}</td>
                  <td className="p-2">{p.turnaround}</td>
                  <td className="p-2">{p.waiting}</td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="p-4 bg-green-100 rounded-xl shadow text-center"
        >
          <p className="text-gray-600 text-sm">Avg Waiting Time</p>
          <p className="text-2xl font-bold">{avgWaiting}</p>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="p-4 bg-yellow-100 rounded-xl shadow text-center"
        >
          <p className="text-gray-600 text-sm">Avg Turnaround Time</p>
          <p className="text-2xl font-bold">{avgTurnaround}</p>
        </motion.div>
      </div>
    </div>
  );
};

export default OutputTable;
