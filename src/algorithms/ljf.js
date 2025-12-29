import addToGantt from "../utils/ganttGenerator.js";
import calculateMetrics from "../utils/calculateMetrics.js";

export default function ljf(processes) {
  const sorted = [...processes].sort((a, b) => a.arrival - b.arrival);

  let time = 0;
  let gantt = [];
  let snapshots = [];
  let ready = [];
  let i = 0;
  let completed = 0;

  const n = sorted.length;

  const snap = (cpu) => {
    snapshots.push({
      time,
      cpu,
      ready: ready.map(p => p.pid),
    });
  };

  while (completed < n) {
    // handle arrivals
    while (i < n && sorted[i].arrival <= time) {
      ready.push(sorted[i]);
      snap("IDLE");
      i++;
    }

    // CPU idle
    if (ready.length === 0) {
      const nextArrival = sorted[i]?.arrival ?? time + 1;

      addToGantt(gantt, "IDLE", time, nextArrival);

      while (time < nextArrival) {
        snap("IDLE");
        time++;
      }
      continue;
    }

    // pick longest burst job
    ready.sort((a, b) => b.burst - a.burst);
    const current = ready.shift();

    snap(current.pid);

    addToGantt(
      gantt,
      current.pid,
      time,
      time + current.burst
    );

    // run fully
    for (let t = 0; t < current.burst; t++) {
      snap(current.pid);
      time++;

      // arrivals while running (no preemption)
      while (i < n && sorted[i].arrival === time) {
        ready.push(sorted[i]);
        snap(current.pid);
        i++;
      }
    }

    completed++;
  }

  const metrics = calculateMetrics(sorted, gantt);

  return {
    gantt,
    snapshots,
    metrics,
  };
}
