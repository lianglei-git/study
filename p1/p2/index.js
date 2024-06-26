
const methods = require("methods");
const http = require("http");
const boolbase = require("boolbase");
const bol = boolbase.trueFunc()

http.createServer((req,res) => {
    res.end(bol);
}).listen(3333,() => {
    console.log("子进程 3333 ==== ",methods[0])
});


console.log(process.env)
