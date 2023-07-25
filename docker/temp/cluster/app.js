const http = require('http');

const os = require("os")
const cluster = require("cluster")
const {fork} = require("child_process")

const app = http.createServer((req,res) =>{
    res.end("你好祝进程")
})


console.log(cluster.isMaster,'cluster.isMaster')
if(cluster.isMaster) {
    os.cpus().map((item, idx) => {
        cluster.fork()
        console.log("你好哇 cluster ",item, idx)
    })
}else {
    app.listen(3210, () => {
        console.log("nihao1 3210")
    })
// fork("./child.js")

}


