import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const SimulationGantt = ({ gantt, snapshots }) => {
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const intervalRef = useRef(null);
  const counterRef = useRef({});     // counts per time
  const lastTimeRef = useRef(null);  // to detect time changes

  const totalTime = gantt[gantt.length - 1].end;


  
  const getSnapshot = () => {
    const t = Math.floor(time);

    const snaps = snapshots.filter(s => s.time === t);

    if (snaps.length === 0) {
      return { cpu: "IDLE", ready: [] };
    }

    // If time changed → reset counter for this time
    if (lastTimeRef.current !== t) {
      counterRef.current[t] = 0;
      lastTimeRef.current = t;
    }

    const count = counterRef.current[t];
    const index = Math.min(count, snaps.length - 1);

    return snaps[index];
  };


  // ✅ Advance snapshot counter only when time stays the same
  useEffect(() => {
    const t = Math.floor(time);

    // If time didn't change → show next snapshot
    if (lastTimeRef.current === t) {
      counterRef.current[t]++;
    }
  }, [time]);


  const { cpu, ready } = getSnapshot();


  // ▶ PLAY
  const play = () => {
    if (isPlaying) return;
    setIsPlaying(true);

    intervalRef.current = setInterval(() => {
      setTime(prev => {
        if (prev >= totalTime) {
          clearInterval(intervalRef.current);
          setIsPlaying(false);
          return prev;
        }
        return +(prev + 0.1).toFixed(2);
      });
    }, 150);
  };

  // ⏸ PAUSE
  const pause = () => {
    setIsPlaying(false);
    clearInterval(intervalRef.current);
  };

  // 🔁 RESTART
  const restart = () => {
    setTime(0);
    setIsPlaying(false);
    clearInterval(intervalRef.current);

    counterRef.current = {};
    lastTimeRef.current = null;
  };


  // Cleanup
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);



  return (
    <div className="p-4">
<h2 className="text-xl font-semibold mb-4">Gantt Chart</h2>
      {/* Controls */}
      <div className="flex items-center gap-4 mb-4">
        <button onClick={play} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
          ▶ Play
        </button>
        <button onClick={pause} className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
          ⏸ Pause
        </button>
        <button onClick={restart} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
          🔁 Restart
        </button>
        <p className="font-semibold text-lg ml-4">Time: {time.toFixed(1)}</p>
      </div>


      {/* CPU + Ready Queue */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

        {/* CPU */}
        <motion.div
          key={cpu}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          className="p-4 bg-blue-600 text-white rounded-lg shadow text-center"
        >
          <h3 className="text-lg font-bold mb-2">CPU Running</h3>
          <p className="text-2xl font-bold">
            {cpu === "IDLE" ? "— Idle —" : cpu}
          </p>
        </motion.div>

        {/* Ready Queue */}
        <div className="p-4 bg-gray-100 rounded-lg shadow md:col-span-2">
          <h3 className="font-bold mb-2">Ready Queue</h3>

          {ready.length === 0 ? (
            <p className="text-gray-500">Empty</p>
          ) : (
            <div className="flex gap-2 flex-wrap">
              {ready.map((pid, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="px-3 py-1 bg-purple-500 text-white text-sm rounded-lg"
                >
                  {pid}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>


      {/* Gantt Chart */}

{/* Gantt Chart */}
<div className="relative w-full border h-24 bg-gray-50 rounded-lg overflow-hidden mb-6">
  {gantt
    .filter(slot => slot.start <= time) // show only blocks up to current time
    .map((slot, index) => {
      const width = ((slot.end - slot.start) / totalTime) * 100;
      const isActive = time >= slot.start && time < slot.end;

      return (
        <motion.div
          key={index}
          className="absolute h-full flex items-center justify-center text-white font-bold"
          style={{
            left: `${(slot.start / totalTime) * 100}%`,
            width: `${width}%`,
            backgroundColor: slot.pid === "IDLE"
              ? "#a1a1aa"
              : isActive
              ? "#2563eb"
              : "#60a5fa",
            borderRight: "1px solid white",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {slot.pid}
        </motion.div>
      );
    })}

  {/* Time Cursor */}
  <motion.div
    className="absolute top-0 h-full w-1 bg-red-600"
    animate={{ left: `${(time / totalTime) * 100}%` }}
    transition={{ ease: "linear", duration: 0.1 }}
  />
</div>

{/* Start and End Time Labels */}
<div className="relative w-full h-6 flex justify-between text-xs text-gray-700">
  {gantt
    .filter(slot => slot.start <= time) // 🔥 filter same as bars
    .map((slot, index) => {
      const left = (slot.start / totalTime) * 100;
      const right = (slot.end / totalTime) * 100;
      return (
        <React.Fragment key={index}>
          <span
            className="absolute"
            style={{ left: `${left}%`, transform: 'translateX(-50%)' }}
          >
            {slot.start}
          </span>
          <span
            className="absolute"
            style={{ left: `${right}%`, transform: 'translateX(-50%)' }}
          >
            {slot.end}
          </span>
        </React.Fragment>
      );
    })}
</div>


    </div>
  );
};

export default SimulationGantt;
