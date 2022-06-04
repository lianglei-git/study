const { Queue } = require('./queue.js')
const fs = require('fs');
const EventEmitter = require('events')

class MyFileStream extends EventEmitter {
    fd = null;


    constructor(path, options = {}) {
        super()
        this.flags = options.flag || 'r';
        this.mode = options.mode || 438;
        this.autoClose = options.autoClose || true;
        this.start = options.start || 0;
        this.end = options.end || 0
        this.encoding = options.encoding || 'utf8';
        this.highWaterMark = options.highWaterMark || 64 * 1024;
        this.path = path;
        this.readOffset = 0;
        this.pauseFlag = false
        this.open();
        this.read()
        this.on('newListener', type => {
            console.log(type); // 每个 on 监听的方法都会触发 newListener type返回监听的name
        })
    }
    open() {
        fs.open(this.path, this.flags, this.mode, (err, fd) => {
            if (err) {
                this.emit('error', err);
            }
            this.fd = fd;
            this.emit('open', fd);
        })
    }

    read() {
        if(this.pauseFlag) return;
        if (typeof this.fd !== 'number') {
            return this.once('open', this.read)
        }
        let buf = Buffer.alloc(this.highWaterMark);

        let howMuchToRead;
        if (this.end) {
            // 读取是end + 1 个字节
            howMuchToRead = Math.min(this.end - this.readOffset + 1, this.highWaterMark)
        } else {
            howMuchToRead = this.highWaterMark

        }
        fs.read(this.fd, buf, 0, howMuchToRead, this.readOffset, (err, buytes) => {
            if (buytes) {
                this.readOffset += buytes
                this.emit('data', buf.slice(0, buytes));
                this.read();
            } else {
                this.emit('end');
                this.close()
            }
        })
    }

    close() {
        fs.close(this.fd, () => {
            this.emit('close')
        })
    }

    pause(){
        this.pauseFlag = true;
    }

    resume(){
        this.pauseFlag = false;
        this.read()
    }
    pipe(ws){
        this.on('data', data => {
            let flag = ws.write(data);
            if(!flag) {
                this.pause()
            }
        })

        ws.on('drain',() => {
            this.resume()
        })
    }

}


//  ============ demo ===========
// let rs = new MyFileStream('./fl1.txt', {
//     highWaterMark: 3,
//     end: 7
// });

// rs.on('fn', () => {
// })

// rs.on('data', (buf) => {
//     console.log(buf.toString(), 123)
// })

// const buffer = Buffer.alloc(5);
// fs.open('abs.txt',(err,fd) => {
//     console.log(fd)
//     fs.read(fd, buffer, 0, 5, 0, () => {
//         console.log(buffer.toString())
//     })
// })
//  ============ demo ===========

module.exports = MyFileStream
