// fs 文件流

const fs = require('fs');
const { Duplex, Transform } = require('stream');

let rsFile = fs.createReadStream('./data.txt');
let wsFile = fs.createWriteStream('./news.txt');

rsFile.pipe(wsFile)
// console.log(rsFile, wsFile)

// fs.writeFile('./nes.txt', '1230', () => {

// })

// console.log(fs.existsSync('./nes.txt'))

// Duplex 双工流 
// class MyDuplex extends Duplex {
//     constructor(source){
//         super();
//         this.source = source;
//     }
//     _read(){
//         let data = this.source.shift() || null;
//         this.push(data)

//     }

//     _write(chunk, en, next) {
//         process.stdout.write(chunk)
//         process.nextTick(next)
//     }
// }

// const  source = ['a', 'b', 'c'];

// let duplex = new MyDuplex(source);
// // duplex.on('data', (chunk) => {
// //     console.log(chunk.toString())
// // })

// duplex.write('9988811')



 // Transform 转换流


 class MyTransform extends Transform {

    _transform(chunk, en, next){
        // process.stdout.write(chunk)
        this.push(chunk.toString().toUpperCase())
        // process.nextTick(next)
        next()

    }
 }


 const transform = new MyTransform();

 transform.write('9999')

 transform.on('data', (chunk) => {
     console.log(chunk.toString())
 })