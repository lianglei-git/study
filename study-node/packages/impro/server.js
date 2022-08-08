const {createServer} = require('http')

let GloRes = null;
const server = createServer((req,res) => {
    process.send( req.url)
    GloRes = res
})

console.log(123)

process.on('message', any => {
    GloRes.end(JSON.stringify(any)) 
})

module.exports = server;