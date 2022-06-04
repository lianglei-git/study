const { watch, watchFile, read, writeFile, readFile } = require("fs");
const { join, extname, basename } = require("path");
const mdPath = join(__dirname, process.argv[2]);
const htmlPath = mdPath.replace(extname(mdPath), '.html')
const browerSync = require('browser-sync')
const { marked } = require('marked')

const change = () => readFile(mdPath, 'utf-8', (err, data) => {
    if (!err) {
        data = marked(data)
        let str = template.replace("{{content}}", data);
        writeFile(htmlPath, str, err => {
            console.log(err)
        })
    }
})

watchFile(mdPath, (curr, prev) => {
    if (curr.mtime !== prev.mtime) {
        change()
    }
})
change()
const template = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    {{content}}
</body>
</html>`

browerSync.init({
    brower: '',
    server:__dirname,
    index: basename(htmlPath),
    watch: true,
})