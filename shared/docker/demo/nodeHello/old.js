const http = require('http');


let count = 0;

http.createServer(function (req, res){
    count++;
    // res.setHeader("Content-Type", "text/plain; charset=utf-8");
    // res.setHeader("Content-Length", "text/html")
    res.write("<h1>你好 --- >" + count + '</h1>')
    res.end()
}).listen(7777, () => {
    console.log('http://localhost:7777')
})