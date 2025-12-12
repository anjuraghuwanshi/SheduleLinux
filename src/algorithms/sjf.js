import addToGantt from "../utils/ganttGenerator.js";
import calculateMetrics from "../utils/calculateMetrics.js";

export default function sjf(processes) {
  const sorted = [...processes].sort((a, b) => a.arrival - b.arrival);

  let time = 0;
  let gantt = [];
  let snapshots = [];
  let ready = [];
  let i = 0; // arrival pointer

  const snap = (cpu) => {
    snapshots.push({
      time,
      cpu,
      ready: [...ready],
    });
  };

  while (i < sorted.length || ready.length > 0) {
    // Add arrivals at current time
    while (i < sorted.length && sorted[i].arrival <= time) {
      ready.push(sorted[i].pid);
      snap("IDLE"); // record snapshot for new arrivals
      i++;
    }

    // If no process ready → CPU idle
    if (ready.length === 0) {
      const nextArrival = i < sorted.length ? sorted[i].arrival : time + 1;

      addToGantt(gantt, "IDLE", time, nextArrival);

      while (time < nextArrival) {
        snap("IDLE");
        time++;

        // Mid-idle arrivals
        while (i < sorted.length && sorted[i].arrival <= time) {
          ready.push(sorted[i].pid);
          snap("IDLE");
          i++;
        }
      }
      continue;
    }

    // Pick the process with the shortest burst in ready queue
    let shortestProc = null;
    let shortestBurst = Infinity;
    ready.forEach(pid => {
      const proc = sorted.find(p => p.pid === pid);
      if (proc.burst < shortestBurst) {
        shortestBurst = proc.burst;
        shortestProc = proc;
      }
    });

    const pid = shortestProc.pid;

    // Remove it from ready queue
    ready = ready.filter(p => p !== pid);

    // Snapshot before running
    snap(pid);

    addToGantt(gantt, pid, time, time + shortestProc.burst);

    // Run the process completely (non-preemptive)
    for (let t = 0; t < shortestProc.burst; t++) {
      snap(pid);
      time++;

      // Handle arrivals while CPU busy
      while (i < sorted.length && sorted[i].arrival <= time) {
        ready.push(sorted[i].pid);
        snap(pid); // CPU still running
        i++;
      }
    }
  }

  const metrics = calculateMetrics(sorted, gantt);

  return {
    gantt,
    snapshots,
    metrics,
  };
}
