"use strict";

var net = require('net');

var server = net.createServer();
var port = 8080;
var host = 'localhost';
server.listen(port, host);
server.on('listening', function () {
  console.log('已经连接');
});
server.on('connection', function (socket) {
  socket.on('data', function (chunk) {
    var msg = chunk.toString();
    console.log(msg);
    socket.write(Buffer.from(msg + '   hello'));
  });
});
server.on('close', function () {
  console.log('服务端关闭');
});
server.on('error', function (err) {
  if (err.code == 'EADDRINUSE') {
    console.log('地址正在使用');
  } else {
    console.log(err);
  }
});