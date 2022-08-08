const fs = require('fs');

let rs = fs.createReadStream('news.txt',{
    encoding: null,
    flags: 'r',
    fs: null,
    mode: 438,
    autoClose: true,
    start: 0,
    // end: 3,// 
    highWaterMark: 4 // 每次读取的字节限制,或者说每次读取缓存区的大小（length）rs._readableState.length
})


// 读取文件的数据
// rs.on('data', (chunk) => {
//     console.log(chunk.toString());
//     rs.pause(); // 暂停流
//     setTimeout(() => {
//         console.log(' < --- >继续输出')
//         rs.resume()
//     }, 2000)
// })


// read(size) ==>  size =》 每次读取的大小
// 
rs.on('readable', () => {
    let data;
    // 上面的 highWaterMark 如果设置成4的情况下，说明每次读取的缓存区为4个长度，然后现在目标文件的里面的数据是"responce"长度是8个字节（十进制情况下）
    // 然后下面调用read方法是每次取一个字节的长度， 下面的 rs._readableState.length 输出是这样子的 ⬇️⬇️
    // r  第一次取的r字节
    // ----- 3  可用空间为3个长度  highWaterMark 减去 read参数的size 所以剩下的是3
    // e // 在读取一个 
    // ----- 2 // 剩下空间为2 循环下去，
    // s
    // ----- 1
    // p
    // ----- 0
    // o
    // ----- 3
    // n
    // ----- 2
    // c
    // ----- 1
    // e
    // ----- 0
    while((data = rs.read(1)) !== null) {
        // console.log(data.toString());
        // console.log('-----',rs._readableState.length)
    }
})


// process.stdout.on('data', () => {
// })



// process.stdout.on("pause", () => {
//     console.log('我停止了')
// })


// setTimeout(() => {
//     process.stdout.pause()
// },2000)


process.stdin.on("pipe", () => {
    console.log(12312312312)
})

/// https://cnodejs.org/  nodejs中文社区

// 带观看 https://live.juejin.cn/4354/898051?utm_source=shouxin10&utm_medium=shouxin&utm_campaign=zhibo

// fs.writeFile('writeFileStream.txt', '999')

const writeFs = fs.createWriteStream('writeFileStream.txt', {
    encoding:"utf-8",
    // flags:'r+',
    highWaterMark: 2,
})
writeFs.on('drain',() => {
    console.log(123)
    dream(true)
})
let str = 'lakslkdjakldjl';
let num = 0;

// 一点一点的传输
function dream(flag) {
    if(flag && num<str.length) {
        flag = writeFs.write(str[num]);
        num++;
        dream(flag)
    }
}

dream(true);


 