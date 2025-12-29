import addToGantt from "../utils/ganttGenerator.js";
import calculateMetrics from "../utils/calculateMetrics.js";

export default function lrjf(processes) {
  const sorted = [...processes].sort((a, b) => a.arrival - b.arrival);

  let time = 0;
  let gantt = [];
  let snapshots = [];
  let ready = [];
  let i = 0;
  let current = null;
  let completed = 0;

  const n = sorted.length;

  const remaining = {};
  sorted.forEach(p => {
    remaining[p.pid] = p.burst;
  });

  // 🔥 Gantt tracking
  let lastPid = null;
  let segmentStart = 0;

  const snap = (cpu) => {
    snapshots.push({
      time,
      cpu,
      ready: ready.map(p => p.pid),
    });
  };

  while (completed < n) {
    // arrivals
    while (i < n && sorted[i].arrival === time) {
      ready.push(sorted[i]);
      snap(current ? current.pid : "IDLE");
      i++;
    }

    // 🔥 preemption check (LONGEST remaining time)
    if (current) {
      for (const p of ready) {
        if (remaining[p.pid] > remaining[current.pid]) {
          ready.push(current);
          current = null;
          break;
        }
      }
    }

    // select process
    if (!current && ready.length > 0) {
      ready.sort(
        (a, b) => remaining[b.pid] - remaining[a.pid]
      );
      current = ready.shift();
    }

    const runningPid = current ? current.pid : "IDLE";

    // 🔥 Gantt boundary detection
    if (runningPid !== lastPid) {
      if (lastPid !== null) {
        addToGantt(gantt, lastPid, segmentStart, time);
      }
      segmentStart = time;
      lastPid = runningPid;
    }

    snap(runningPid);
    time++;

    if (current) {
      remaining[current.pid]--;

      if (remaining[current.pid] === 0) {
        current = null;
        completed++;
      }
    }
  }

  // 🔥 close final segment
  if (lastPid !== null) {
    addToGantt(gantt, lastPid, segmentStart, time);
  }

  const metrics = calculateMetrics(sorted, gantt);

  return {
    gantt,
    snapshots,
    metrics,
  };
}
