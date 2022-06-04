"use strict";

var _require = require("fs"),
    createWriteStream = _require.createWriteStream,
    createReadStream = _require.createReadStream;

var myFileReadStream = require('./myFileReadStream');

var myFileWriteStream = require('./myFileWriteStream'); // let rs = createReadStream('./fl1.txt', {
//     highWaterMark: 4 //  默认64kb
// })


var rs = new myFileReadStream('./fl1.txt', {
  highWaterMark: 4 //  默认64kb

});
var ws = new myFileWriteStream('./fl2.txt', {
  highWaterMark: 1 // 默认16kb

});
rs.pipe(ws); // 文件拷贝