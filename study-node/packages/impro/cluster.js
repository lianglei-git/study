const { spawn, exec } = require('node:child_process');
const cluster = require('node:cluster');
const { cpus } = require('node:os');



const numCpus = cpus().length;
console.log(numCpus);

if(cluster.isPrimary) {
    console.log('worker running', process.pid)
    for(let i = 0; i< numCpus; i++){
        cluster.fork()
    }
    for (const id in cluster.workers){
        const worker = cluster.workers[id]
        worker.on('message', m => {
            const pid = worker.process.pid;
            const _id = worker.id;
            worker.send({
                pid,
                id: _id
            })
            console.log(m, cluster.workers[id].id,cluster.workers[id].process.pid )
        })
    }
    
    cluster.on('exit', (worker, code, signal) => {
        console.log(worker, code, signal, 'process.id ==> ', worker.pid)
    })
}else {
    let server = require('./server')
    server.listen(8080);
    console.log('worker Started', process.pid)
}