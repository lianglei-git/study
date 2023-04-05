import Worker from 'worker-loader!./dispose.worker';


const worker = new Worker()

worker.postMessage('9999')