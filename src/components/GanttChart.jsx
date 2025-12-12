import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const GanttChart = ({ gantt }) => {
  if (!gantt || gantt.length === 0) {
    return (
      <p className="text-gray-500 mt-4">
        No Gantt chart to display yet.
      </p>
    );
  }

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Gantt Chart</h2>

      {/* Simple horizontal sequence */}
      <div className="flex space-x-3 mt-4">
        <AnimatePresence>
          {gantt.map((block, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}

              className="
                bg-gray-200  
                px-6 py-4 
                rounded-lg 
                shadow-sm
                text-center 
                border 
                border-gray-300
                min-w-[90px]
              "
            >
              <p className="font-bold text-gray-800">P{block.pid}</p>
              <p className="text-xs text-gray-600 mt-1">
                {block.start} → {block.end}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Optional: Clear labels */}
      <p className="text-sm text-gray-500 mt-3">
        Processes shown in execution order.
      </p>
    </div>
  );
};

export default GanttChart;
