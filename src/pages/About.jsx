import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">

      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
          About Scheduling Simulator
        </h1>
        <p className="text-gray-600 text-sm sm:text-base max-w-3xl mx-auto">
          An interactive CPU scheduling simulator designed to help students
          visually understand Operating System scheduling algorithms.
        </p>
      </div>

      {/* Features */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">

        <FeatureCard
          title="Algorithm-Based Learning"
          desc="Understand how different scheduling algorithms affect CPU execution."
        />

        <FeatureCard
          title="Dynamic Input Fields"
          desc="Input fields adapt automatically based on the selected algorithm."
        />

        <FeatureCard
          title="Visual Gantt Chart"
          desc="See real-time execution flow using an animated Gantt chart."
        />

        <FeatureCard
          title="Student-Friendly UI"
          desc="Built especially for Operating System learners and labs."
        />

      </div>

      {/* How to Use + Tech Stack */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">

        {/* How to Use */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            How to Use This Simulator
          </h2>

          <ol className="list-decimal list-inside text-gray-700 text-sm space-y-2">
            <li>
              <span className="font-semibold">First select the scheduling algorithm</span>{" "}
              you want to learn (FCFS, SJF, Priority, Round Robin).
            </li>
            <li>
              After selecting the algorithm,{" "}
              <span className="font-semibold">
                required input fields (Priority / Quantum)
              </span>{" "}
              will appear automatically.
            </li>
            <li>
              Now add process details such as Process ID, Arrival Time, and Burst Time.
            </li>
            <li>
              Click <span className="font-semibold">Run</span> to view results and simulation.
            </li>
          </ol>

          <p className="text-xs text-gray-500 mt-2">
            ⚠️ Note: If you add processes before selecting an algorithm, required
            fields like Priority or Quantum may not appear.
          </p>
        </div>

        {/* Tech Stack */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Tech Stack Used
          </h2>

          <div className="flex flex-wrap gap-2">
            <TechBadge text="React.js" />
            <TechBadge text="Tailwind CSS" />
            <TechBadge text="Framer Motion" />
            <TechBadge text="JavaScript" />
          </div>
        </div>

      </div>

      {/* Footer */}
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-3 text-center pb-6">

        <p className="text-sm text-gray-600">
          Created with ❤️ for Operating System learners
        </p>

        <Link
          to="/"
          className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
        >
          ← Back to Home
        </Link>

      </div>

    </div>
  );
};

/* ---------- Components ---------- */

const FeatureCard = ({ title, desc }) => (
  <div className="bg-white p-5 rounded-xl shadow">
    <h3 className="text-base font-semibold text-gray-800 mb-1">
      {title}
    </h3>
    <p className="text-gray-600 text-sm">
      {desc}
    </p>
  </div>
);

const TechBadge = ({ text }) => (
  <span className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-xs font-medium">
    {text}
  </span>
);

export default About;


