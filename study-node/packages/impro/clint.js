const net = require('net');


let client = net.createConnection({
    port: 8080,
    host: 'localhost'
})

client.on('connect', () => {
    client.write('这是很饿吗？')
})

client.on('error', err => {
    console.log(err)
})

client.on('data', data => {
    console.log(data.toString(), '接收到了数据')
})

client.on('close', () => {
    console.log('挂；1')
})