const http = require('http');

const app = http.createServer((req,res) =>{
    res.end("childnrend")
})


app.listen(8898, () => {
    console.log("你好 8898")
})