import addToGantt from "../utils/ganttGenerator.js";
import calculateMetrics from "../utils/calculateMetrics.js";

export default function fcfs(processes) {
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

    // ARRIVALS AT EXACT TIME
    while (i < sorted.length && sorted[i].arrival === time) {
      ready.push(sorted[i].pid);
      snap("IDLE");  // <-- record that it arrived to READY queue
      i++;
    }

    // IF READY QUEUE EMPTY → CPU IDLE
    if (ready.length === 0) {
      const nextArrival = sorted[i].arrival;

      // add IDLE segment
      addToGantt(gantt, "IDLE", time, nextArrival);

      // simulate every idle time unit
      while (time < nextArrival) {
        snap("IDLE");
        time++;

        // mid-idle arrivals
        while (i < sorted.length && sorted[i].arrival === time) {
          ready.push(sorted[i].pid);
         snap("IDLE");
          i++;
        }
      }
      continue;
    }

    // GET FIRST PROCESS FROM READY QUEUE
    const pid = ready.shift();
    const proc = sorted.find(p => p.pid === pid);

    // before running, snapshot CPU will take this process
    snap(pid);

    addToGantt(gantt, pid, time, time + proc.burst);

    // RUN PROCESS COMPLETELY (NON-PREEMPTIVE)
    for (let t = 0; t < proc.burst; t++) {
      snap(pid);
      time++;

      // if any process arrives while CPU is busy:
      while (i < sorted.length && sorted[i].arrival === time) {
        ready.push(sorted[i].pid);
        snap(pid); // CPU still running current proc
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


