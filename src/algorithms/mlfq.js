
import processModel from "../utils/processModel.js";
import ganttGenerator from "../utils/ganttGenerator.js";
import calculateMetrics from "../utils/calculateMetrics.js";

export default function mlfq(processes) {
    // Create deep copies with process model
    const readyQueue = processes.map(processModel);

    // Sort by arrival time
    readyQueue.sort((a, b) => a.arrival - b.arrival);

    let time = 0;
    let timeline = [];

    for (let p of readyQueue) {
        // CPU idle before this process arrives
        if (time < p.arrival) {
            timeline.push({
                pid: "IDLE",
                start: time,
                end: p.arrival
            });
            time = p.arrival;
        }

        // Execute process
        let start = time;
        let end = start + p.burst;

        timeline.push({
            pid: p.pid,
            start,
            end
        });

        time = end;
    }

    return {
        gantt: ganttGenerator(timeline),
        ...calculateMetrics(readyQueue, timeline),
    };
}
