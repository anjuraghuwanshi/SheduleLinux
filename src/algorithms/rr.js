import addToGantt from "../utils/ganttGenerator.js";
import calculateMetrics from "../utils/calculateMetrics.js";

export default function rr(processes, quantum) {
  if (!quantum || quantum <= 0) {
    throw new Error("Please provide a valid quantum (>0) for RR scheduling.");
  }

  const sorted = [...processes].sort((a, b) => a.arrival - b.arrival);

  let time = 0;
  let gantt = [];
  let snapshots = [];
  let ready = [];
  let i = 0; // pointer for arrivals

  // Track remaining burst for each process
  const remaining = {};
  sorted.forEach(p => {
    remaining[p.pid] = p.burst;
  });

  const snap = (cpu) => {
    snapshots.push({
      time,
      cpu,
      ready: [...ready],
    });
  };

  while (i < sorted.length || ready.length > 0) {
    // Handle arrivals at current time
    while (i < sorted.length && sorted[i].arrival === time) {
      ready.push(sorted[i].pid);
      snap("IDLE"); // snapshot arrival
      i++;
    }

    // If ready queue empty → CPU idle
    if (ready.length === 0) {
      const nextArrival = i < sorted.length ? sorted[i].arrival : time + 1;

      addToGantt(gantt, "IDLE", time, nextArrival);

      while (time < nextArrival) {
        snap("IDLE");
        time++;

        // Mid-idle arrivals
        while (i < sorted.length && sorted[i].arrival === time) {
          ready.push(sorted[i].pid);
          snap("IDLE");
          i++;
        }
      }
      continue;
    }

    // Get first process from ready queue
    const pid = ready.shift();
    const proc = sorted.find(p => p.pid === pid);

    // Determine run time: min(quantum, remaining burst)
    const runTime = Math.min(quantum, remaining[pid]);

    snap(pid); // snapshot before running

    addToGantt(gantt, pid, time, time + runTime);

    // Run process for runTime units
    for (let t = 0; t < runTime; t++) {
      snap(pid);
      time++;
      remaining[pid]--;

      // Handle arrivals while CPU is busy
      while (i < sorted.length && sorted[i].arrival === time) {
        ready.push(sorted[i].pid);
        snap(pid); // CPU still running
        i++;
      }
    }

    // If process not finished, push back to end of ready queue
    if (remaining[pid] > 0) {
      ready.push(pid);
    }
  }

  const metrics = calculateMetrics(sorted, gantt);

  return {
    gantt,
    snapshots,
    metrics,
  };
}
