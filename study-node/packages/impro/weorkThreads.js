const {
    Worker,
    parentPort
} = require('worker_threads')

function timou() {
    return new Promise(res => {
        setTimeout(res)
    })
}

 async function fo() {
    for (let i = 0; i < 1000; i++) {
         await timou(i)
    }
}

 async function step() {

    let worker = new Worker(`
    const {
        parentPort
    } = require('worker_threads')
    parentPort.on('message', message => {
        console.log(message, 'kkkk')
        console.time()
        parentPort.postMessage({
            pong: message
        })
        console.timeEnd()
        console.log('1--⬆️');
    })
    `, {eval: true})
    worker.on('message', message => {
        console.log(message)
    })

    worker.postMessage('999')
    await fo();
    // worker.unref()
    worker.terminate()
    worker.postMessage('0000')

    console.time()
    await fo();
    console.timeEnd()
    console.log('2--⬆️')

}

step()