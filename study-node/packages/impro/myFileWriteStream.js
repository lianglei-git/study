const { Queue } = require('./queue.js')
const fs = require('fs');
const EventEmitter = require('events')

class MyFileStream extends EventEmitter {
    fd = null;


    constructor(path, options = {}) {
        super()
        this.flags = options.flag || 'w';
        this.mode = options.mode || 438;
        this.autoClose = options.autoClose || true;
        this.start = options.start || 0;
        this.encoding = options.encoding || 'utf8';
        this.highWaterMark = options.highWaterMark || 16 * 1024;
        this.path = path;
        this.open();

        // 偏移量
        this.wirteOffset = this.start;
        // 是否写入中
        this.writing = false;
        // 写入长度
        this.writeLen = 0;
        this.needDrain = false;
        this.cache = new Queue();
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

    write(chunk, encoding, cb) {
        chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
        this.writeLen += chunk.length
        let flag = this.writeLen < this.highWaterMark;
        this.needDrain = !flag;
        if (this.writing) {
            this.cache.enQueue({ chunk, encoding, cb })
        } else {
            this.writing = true;
            this._write(chunk, encoding, (...anys) => {
                this.writing = false;
                cb && cb(...anys);
                this._clearBuffer()
            })
        }
        return flag;
    }

    _clearBuffer() {
        let cacheShift = this.cache.unQueue();
        if(cacheShift) {
            this._write(cacheShift.data.chunk,cacheShift.data.encoding,(...anys) => {
                cacheShift.data.cb(...anys);
                this._clearBuffer();
            })
        }else {
            if(this.needDrain) {
                this.needDrain = false;
            this.emit('drain')

            }
        }
    }


    _write(chunk, encoding, cb) {
        if(typeof this.fd !== 'number') {
            return this.once('open', () => this._write(chunk, encoding, cb))
        }
        fs.write(this.fd, chunk,this.start, chunk.length,this.wirteOffset, (err, written, _chunk) => {
            this.writeLen -= written;
            this.wirteOffset += written;
            cb(err, written, _chunk);
        });
    }


}


/**   ============ demo =========== */

// let rs = new MyFileStream('./fl1.txt', {
//     highWaterMark: 1
// });


// rs.on('open', fd => {
//     // console.log(fd)
// })


// let flag = rs.write('坎坎坷坷开始', 'utf8', () => {})

// flag = rs.write('啦开始觉得离开咖喱金德拉克', 'utf8', () => {})
// flag = rs.write('阿莱克斯就到了卡家卡利久里卡是几点', 'utf8', () => {})

// rs.on('drain', () => { // 缓存中里面没有了才会触发
//     console.log(123)
// })
// console.log(flag);

// let entrlying = fs.createWriteStream('./abs.txt', {
//     highWaterMark: 1
// })


// entrlying.write('19199191991',() => {
// });
// entrlying.on('drain',() => {
//     console.log(11)
// })
/**   ============ demo =========== */

module.exports = MyFileStream