// buffer 是node里面的内置类
const b1 = Buffer.alloc(10); // // 创建长度为 10 的以零填充的缓冲区。
const b2 = Buffer.allocUnsafe(10); // <Buffer 00 00 00 00 00 00 00 00 00 00>
console.log(b1)
console.log(b2)


// 我自己的理解 buffer 是进制的缓冲区。 计算机最基础的运作是通过进制的方式去计算，那么我可以理解为 这是开拓了底层的
// 的块读写区域，然后搞事儿！！！

// 中文
const b3 = Buffer.from('中文');
console.log(b3) //  <Buffer e4 b8 ad e6 96 87>
const b4 = Buffer.from([0xe4,0xb8,0xad,0xe6])
console.log(b4.toString())


// 拷贝空间
const b5= Buffer.alloc(2);
const b6 = Buffer.from(b5);
b5[0] = 1;
b6 !== b5 // 拷贝了一份内存


// buffer --- API

// buffer -- fill
var buf1 = Buffer.alloc(6);
buf1.fill('123456789');
console.log(buf1.toString()) // 只能填充到6 ==> buf1 = 123456
buf1.fill('9876',2,3)
console.log(buf1.toString()) // 只能填充到2到3的距离，其他舍去 ==> buf1 = 129456

// buffer -- write
var buf2 = Buffer.alloc(6);
buf2.write('qwert', 0, 2); 
console.log(buf2.toString()) // qw
buf2.write('mnbv', 0); 
console.log(buf2.toString()) // mnbv


// buffer -- toString

var buf3 = Buffer.from('中文文字');
console.log(buf3.toString('utf-8', 6)) // 中文字节为 3  ==>  文字

// buffer --slice

var buf4 = buf3.slice(3, 6)
console.log(buf4.toString('utf-8')) // 中文字节为 3  ==>  文


// buffer -- indexOf 

var buf5 = Buffer.from('阿拉山口多久');
console.log(buf5.indexOf('山')) // =》 6

// buffer -- copy
var buf6 = Buffer.alloc(9);
var buf7 = Buffer.from('阿拉山口多久');
buf7.copy(buf6, 0, 3, 12);
console.log(
    buf6.toString(), buf7.toString()
    )

// 静态buffer

// isbuffer

console.log(Buffer.isBuffer(buf1))

let concat = Buffer.concat([buf1, buf7], 9)
console.log(concat.toString())
