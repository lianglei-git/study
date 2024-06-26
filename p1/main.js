// import cheerio  from "cheerio";
// import chalk from "chalk";
const methods = require("methods");
const http = require("http");
const { fork } = require("child_process");

fork("./p2/index.js")
http.createServer((req,res) => {
    res.end("hello");

}).listen(2222, () => {
    console.log("父进程 ----- 2222:", methods[1])
})