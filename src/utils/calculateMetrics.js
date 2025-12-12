// frontend/src/utils/calculateMetrics.js
export default function calculateMetrics(processes, timeline) {
  return processes.map((p) => {
    // Find the last execution block for completion time
    const lastBlock = timeline.filter(t => t.pid === p.pid).pop();
    const completion = lastBlock.end;

    const turnaround = completion - p.arrival;
    const waiting = turnaround - p.burst;

    return {
      pid: p.pid,
      arrival: p.arrival,
      burst: p.burst,
      completion: completion,
      turnaround: turnaround,
      waiting: waiting,
    };
  });
}
