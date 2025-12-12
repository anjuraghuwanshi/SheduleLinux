/* 
Process Data Model:

{
  pid:number,
  arrival:number,
  burst:number,
  remaining:number,
  priority:number,
  io:[{start: time, duration: time}],
  queueLevel:number,
  firstResponse:number,
  completion:number,
  waiting:number,
  turnaround:number,
}
*/

export default function createProcess(p) {
  return {
    pid: p.id,
    arrival: p.arrival,
    burst: p.burst,
    remaining: p.burst,
    priority: p.priority ?? 1,
    io: p.io || [],
    queueLevel: 0,
    firstResponse: -1,
    completion: 0,
    waiting: 0,
    turnaround: 0,
  };
}
