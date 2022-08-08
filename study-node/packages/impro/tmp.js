// const a = require('./tp2')

// const EventEmitter = require('node:events')
// a()

// let ev = new EventEmitter();

// ev.on('ans', () => {
//     console.log('aaa')
// })

// ev.emit('ans')


setTimeout(() => {
    console.log(1);
    Promise.resolve().then(() => {
        console.log('p1')
    });
    process.nextTick(() => {
        console.log('pp1')
    })
})
console.log('start')
Promise.resolve().then(() => {
    console.log('p3')
})
setTimeout(() => {
    console.log(2);
    Promise.resolve().then(() => {
        console.log('p2')
    })
    process.nextTick(() => {
        console.log('pp2')
    })
})

console.log('end')