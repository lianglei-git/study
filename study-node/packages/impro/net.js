const net = require('net');

const server = net.createServer();

const port = 8080;

const host = 'localhost';

server.listen(port, host)

server.on('listening', () => {
    console.log('已经连接')
})

server.on('connection', (socket) => {
    socket.on('data', (chunk) => {
        const msg = chunk.toString()
        console.log(msg);
        socket.write(Buffer.from(msg + '   hello'))
    })
})

server.on('close', () => {
    console.log('服务端关闭')
})

server.on('error', (err) => {
    if(err.code == 'EADDRINUSE') {
        console.log('地址正在使用')
    }else {
        console.log(err)
    }
})