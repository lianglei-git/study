"use strict";

var net = require('net');

var client = net.createConnection({
  port: 8080,
  host: 'localhost'
});
client.on('connect', function () {
  client.write('这是很饿吗？');
});
client.on('error', function (err) {
  console.log(err);
});
client.on('data', function (data) {
  console.log(data.toString(), '接收到了数据');
});
client.on('close', function () {
  console.log('挂；1');
});