

// 权限位 标识符 、操作符
// 标识符
// r: 可读
// w： 可写
// s： 同步
// +：表示执行相反操作
// x： 拍它操作
// a： 追加操作

const {open, readFile, watch, watchFile, writeFile, unwatchFile } = require("fs");
const path = require("path");

// fd是操作系统分配给打开文件的标识符


// API
// readFile// 读取数据
// writeFile // 写入数据
// appendFile // 写入数据
// copyFile // 将某个文件的数据拷贝到另一个文件
// watchFile // 对文件进行监控

watchFile(path.resolve('./file-tests/a.txt'), {interval: 20}, (current, prev) => {
    console.log(current, prev)
    if(current.mtime !== prev.mtime) {
        unwatchFile(path.resolve('./file-tests/a.txt'))
    }
})
readFile(path.resolve('./file-tests/a.txt'), 'utf8', (err, data) => {
    console.log(err, data)
})

// fs.open()
// fs.close()

// writeFile(path.resolve('./file-tests/a.txt'), )