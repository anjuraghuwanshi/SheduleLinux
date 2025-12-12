import addToGantt from "../utils/ganttGenerator.js";
import calculateMetrics from "../utils/calculateMetrics.js";

export default function priorityPreemptive(processes) {
  // Sort by arrival time first
  const sorted = [...processes].sort((a, b) => a.arrival - b.arrival);

  let time = 0;
  let gantt = [];
  let snapshots = [];
  let ready = [];
  let i = 0; // arrival pointer
  let current = null; // { pid, remaining, priority }

  const snap = (cpu) => {
    snapshots.push({
      time,
      cpu,
      ready: ready.map(p => p.pid),
    });
  };

  while (i < sorted.length || ready.length > 0 || current !== null) {

    // handle arrivals at exact time
    while (i < sorted.length && sorted[i].arrival === time) {
      const p = { ...sorted[i], remaining: sorted[i].burst };
      ready.push(p);
      snap(current ? current.pid : "IDLE");
      i++;
    }

    // if no current running process → pick highest priority
    if (current === null && ready.length > 0) {
      // pick highest priority (smaller priority value = higher)
      ready.sort((a, b) => a.priority - b.priority);
      current = ready.shift();

      // start gantt segment
      current.startTime = time;
      snap(current.pid);
    }

    // if CPU idle (no ready + no current)
    if (current === null && ready.length === 0) {
      const nextArrival = sorted[i].arrival;

      addToGantt(gantt, "IDLE", time, nextArrival);

      while (time < nextArrival) {
        snap("IDLE");
        time++;

        // arrivals during idle
        while (i < sorted.length && sorted[i].arrival === time) {
          const p = { ...sorted[i], remaining: sorted[i].burst };
          ready.push(p);
          snap("IDLE");
          i++;
        }
      }
      continue;
    }

    // PREEMPTION CHECK
    if (current && ready.length > 0) {
      // highest priority in ready queue
      ready.sort((a, b) => a.priority - b.priority);

      if (ready[0].priority < current.priority) {
        // preempt current
        addToGantt(gantt, current.pid, current.startTime, time);

        ready.push(current); // put current back into ready queue
        current = ready.shift(); // pick new highest priority

        current.startTime = time;
        snap(current.pid);
      }
    }

    // execute current process for 1 time unit
    if (current) {
      current.remaining--;
      snap(current.pid);
      time++;

      // if completed
      if (current.remaining === 0) {
        addToGantt(gantt, current.pid, current.startTime, time);
        current = null;
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
