import React from "react";

const GuideModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-11/12 max-w-lg p-6 rounded-xl shadow-lg animate-fadeIn">

        <h2 className="text-2xl font-bold text-blue-700 mb-3 text-center">
          👋 Welcome to the Scheduling Simulator!
        </h2>

        <p className="text-gray-700 mb-3 text-center">
          Follow these steps to use the simulator:
        </p>

        <ul className="text-gray-800 leading-relaxed list-disc pl-5 space-y-2">
          <li>Select a scheduling algorithm first (FCFS, SJF, Priority, RR) before adding process.</li>
          <li>Add processes one-by-one using IDs like <b>P1, P2, P3...</b></li>
          <li>
            Process IDs can be written in <b>upper or lower case</b> (P1/p1),
          </li>
          <li>Enter arrival time & burst time correctly.</li>
          <li>Click <b>Run</b> to view results, table & Gantt chart.</li>
        </ul>

        <div className="text-center mt-5">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Got it 👍
          </button>
        </div>

      </div>
    </div>
  );
};

export default GuideModal;
