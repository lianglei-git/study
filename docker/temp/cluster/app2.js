const http = require('http');

const os = require("os")
const cluster = require("cluster")
const {spawn, exec} = require("child_process")

const app = http.createServer((req,res) =>{
    res.end("你好祝进程")
})



    // app.listen(3210, () => {
    //     console.log("nihao1 3210")
    // })
    exec("node ./child.js")

