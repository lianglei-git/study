const { createWriteStream, createReadStream } = require("fs");
const myFileReadStream = require('./myFileReadStream')
const myFileWriteStream = require('./myFileWriteStream')
// let rs = createReadStream('./fl1.txt', {
//     highWaterMark: 4 //  默认64kb
// })

let rs = new myFileReadStream('./fl1.txt', {
    highWaterMark: 4 //  默认64kb
})


let ws = new myFileWriteStream('./fl2.txt', {
    highWaterMark: 1 // 默认16kb
})


rs.pipe(ws); // 文件拷贝

