

// (function(){
    //     console.log(this == global);
// })()

// export default function(){
//     return 123
// }
// 得学习一下object上的方法
// console.log(process.platform) // 系统
// console.log(process.versions) // 整体版本信息
// console.log(process.version) // node版本信息
// console.log(process.pid) // 进程pid
// console.log(process.uptime()); 进程存活时间

setTimeout(()=> {
    throw Error()
}, 4000)
process.on('exit', (code) => { // 只能执行同步代码
    console.log(code, 'exit')
})
process.on('beforeExit', (code) => {
    console.log(code, 'exit')
})

// process.stdout.write('10000')



// import fs  from 'fs'
// fs.createReadStream('./index.dev.js') // 创建流
// .pipe(process.stdout) // 把读取到的流通过管道传输给 输出流

// 输入流 
// process.stdin.pipe(process.stdout) 输入流
process.stdin.setEncoding('utf-8');
process.stdin.on('readable', () => {
    let chunk = process.stdin.read();
    if(chunk !== null) {
        process.stdout.write(chunk + 'data')
    }
})