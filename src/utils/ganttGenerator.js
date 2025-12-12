// frontend/src/utils/ganttGenerator.js
export default function addToGantt(timeline, pid, start, end) {
  timeline.push({ pid, start, end });
}

