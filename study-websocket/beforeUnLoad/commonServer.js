const { createServer } = require('http');
const io = require('socket.io');
const { readFileSync, readdirSync } = require('fs');
const { join } = require('path');

function readHtml(txt) {
    let connect = readFileSync(join(__dirname, './clint.html'))
    connect += txt;
    connect += `
        </script>
     </body>   
    `
    return connect
}

function readDir() {
    return readdirSync(join(__dirname, '.'))
}


class CommonServer {
    constructor({ mountedCal = () => { }, port }) {
        this.create(mountedCal);
        this.run(port);
        this.port = port;

    }


    // 处理get请求
    methodGET(req, res) {
        // 进来一次就是打开一个新的进程。。。
        res.writeHead(200, { 'Content-type': 'text/html' });
        res.write('<h1>Node.js</h1>');
        res.end(readHtml('<p id="port">' + this.port + '</p>'));

    }

    staticFile(req, res) {
        let dir = readDir();
        let enFileName = req.url.slice(1);
        dir.includes(enFileName) && res.end(readFileSync(join(__dirname, '.' + req.url)))
    }
    create(mountedCal) {
        this.app = createServer((req, res) => {
            this.staticFile(req, res);
            if (req.url.indexOf('/a') > -1) {
                if(this.port > 3002) {
                    setTimeout(() => {
                        abs()
                    }, 5 * 1000)
                }
                this['method' + req.method](req, res);
                if (process.send) { // 如果是子进程通信的话 
                    process.send('openNew')
                    return
                }
                mountedCal('run'); // 第一次初始化
            }
        });

    }

    run(port) {
        this.app.listen(port, '0.0.0.0', () => {
            console.log(port);

        })

        this.socket = io(this.app, {
            serveClient: false,
            cors: {
                credentials: true
            }
        });
        const log = (...args) => console.log(port, '--io--', ...args)
        this.socket.on('connection', socket => {
            log('connection')
            socket.on('init', () => {
                log('init')
            })

            socket.on('unload', () => {
                this.socket.close();
                log('before-unload---');
                process.exit(1);;
            })
            socket.on('disconnect', function(reson){
                log('user disconnected', reson);
                if(reson == 'transport close') {
                    process.exit(1)
                }
              });
              socket.on('disconnecting', function(reson){
                log('disconnecting', reson, socket.rooms);
              });
        })

    }


}
process.on('message', (childs) => {
    new CommonServer({ port: childs.pidIdx })
})

module.exports = CommonServer;
