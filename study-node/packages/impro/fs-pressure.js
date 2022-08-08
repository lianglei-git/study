// 背压机制
// 用水的速度跟不上放水的速度

const { createReadStream, createWriteStream } = require("fs");

const rs = createReadStream('data.txt', { // 最大支持64kb
    highWaterMark: 4
})

const ws = createWriteStream('data1.txt', {// 最大支持 64/4 kb
    highWaterMark: 1
}) 