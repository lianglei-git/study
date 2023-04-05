// 引入内置模块
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var querystring = require('querystring');
const {
    resolve
} = require('path');
//导入配置
const {
    entry,
    output,
    imgPrefix,
    imgUrl
} = require('./clip-config.js');
// 配置路径
const entryPath = __dirname + "/" + entry
const outputPath = __dirname + "/" + output

// 引入自定义模块
var clip_images = require('./clip.js');

// 创建端口
var port = 3000;
// 创建服务
var server = http.createServer();

console.log(imgUrl)
// 监听服务
server.on("request", function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    if (req.url !== "/favicon.ico") {
        var urlObj = url.parse(req.url, true);
        var pathname = urlObj.pathname;
        if (pathname == "/" && req.method == "GET") {
            resHead(".html")
            res.end("<h1>请进入images目录</h1>");
            return;
        }
        if (pathname == "/images" && req.method == "GET") {
            let saveImageName = ''; //原名
            let currentImageName = '';
            fs.readdir(entryPath, function (err, files) {
                console.log('fs.readdir')
                if (files.length) {
                    files.forEach((file, index) => {
                        saveImageName = entryPath + "/" + file;
                        currentImageName = entryPath + "/aaa" + getExtname(file);
                        fs.rename(saveImageName, currentImageName, (err) => {
                            console.log('clip_images -- start')
                            if (err) throw err;
                            clip_images("aaa" + getExtname(file))
                            console.log('clip_images -- end')
                            fs.rename(currentImageName, saveImageName, (err) => {
                                if (err) throw err;
                            })
                        })
                    })
                } else {
                    throw err;
                }
            })

            if (isDir(outputPath)) {
                console.log('isdir')
                rDir(outputPath);
            } else {

            }

            //配置静态图片
        } else if (pathname == "/static/img/file.jpg" && req.method == "GET") {
            fs.readFile("./static/img/file.jpg", function (err, data) {
                resHead(".jpg");
                res.end(data);
            })
        } else if (pathname == "/static/img/css.jpg" && req.method == "GET") {
            fs.readFile("./static/img/css.jpg", function (err, data) {
                resHead(".jpg");
                res.end(data);
            })
        } else if (pathname == "/static/img/html.jpg" && req.method == "GET") {
            fs.readFile("./static/img/html.jpg", function (err, data) {
                resHead(".jpg");
                res.end(data);
            })
        } else if (pathname == "/static/img/js.jpg" && req.method == "GET") {
            fs.readFile("./static/img/js.jpg", function (err, data) {
                resHead(".jpg");
                res.end(data);
            })
        } else if (pathname == "/static/img/json.jpg" && req.method == "GET") {
            fs.readFile("./static/img/json.jpg", function (err, data) {
                resHead(".jpg");
                res.end(data);
            })
        } else if (pathname == "/static/img/txt.jpg" && req.method == "GET") {
            fs.readFile("./static/img/txt.jpg", function (err, data) {
                resHead(".jpg");
                res.end(data);
            })
        }
        fs.readFile("." + pathname, function (err, data) {
            fs.stat("." + pathname, function (err, stats) {
                if (err) {
                    resHead(".html");
                    res.end("<h1>No file or No dir");
                    return;
                }
                if (stats.isDirectory()) {
                    rDir("." + pathname)
                } else {
                    var mine = getExtname(pathname);
                    resHead(mine);
                    res.end(data)
                }
            })
        });

        function isDir(p) { //判断是否是文件夹，如果是文件夹返回true，如果不是返回false
            var stats = fs.statSync(p);
            var flag = stats.isDirectory();
            return flag;
        }

        function rFile(p) { //如果不是文件夹，读取对应的文件，并展示
            fs.readFile(p, "utf8", function (err, data) {
                var mine = getExtname(pathname);
                resHead(mine);
                res.end(data);
            })
        }

        function compareFiles(a, b) {
            console.log(a, b)
            return 1
        }

        function rDir(p) { //如果是文件夹，读取对应的文件夹，并展示
            var str = "";
            fs.readdir(p, function (err, files) {
                if (files.length) { //files获取出来的
                    var data = fs.readFileSync("./static/index.html", "utf8");
                    str += data;
                    //排序
                    var lastNumRes = /\d{1,3}\.(png|jpg|gif|jpeg|webp)$/g;
                    var filesArr = [];
                    files.forEach((file, i) => {
                        filesArr[i] = file.replace(lastNumRes, (i + 1) + getExtname(file));
                    })
                    str += '<div style="width:300px;height:300px;display: flex;flex-direction: column;">'
                    for (var i = 0; i < filesArr.length; i++) {
                        var extname = getExtname(filesArr[i]); //后缀

                        if (extname == ".jpeg") {
                            str += `<img src="${req.url}/${filesArr[i]}" alt="">`
                        }
                    }
                    str += '</div>'
                    //渲染
                    for (var i = 0; i < filesArr.length; i++) {
                        var extname = getExtname(filesArr[i]); //后缀
                        str += setHtml(extname, filesArr[i], req.url); //渲染函数
                    }
                    str += `
                        <script>
                            function fun(a,b){
                                window.location.href = a + "/" + b;
                            }
                        </script>
                        </body></html>`;
                    resHead(".html");
                    res.end(str);
                } else {
                    resHead(".html");
                    str += "<h1>This folder has no content</h1>";
                    res.end(str);
                }
            })
        }

        function getExtname(p) { //获取文件的后缀名
            var ext = path.extname(p);
            return ext;
        }

        function setHtml(extname, p, q) { //渲染HTML模板
            var extname = extname.slice(1)
            if (extname == "html") {
                return `<div class="cell" onclick=fun('${req.url}','${p}')>
                    <img src="/static/img/${extname}.jpg" alt="">
                    <span>${p}</span>
                </div>`
            } else if (extname == "css") {
                return `<div class="cell" onclick=fun('${req.url}','${p}')>
                    <img src="/static/img/${extname}.jpg" alt="">
                    <span>${p}</span>
                </div>`
            } else if (extname == "js") {
                return `<div class="cell" onclick=fun('${req.url}','${p}')>
                    <img src="/static/img/${extname}.jpg" alt="">
                    <span>${p}</span>
                </div>`
            } else if (extname == "json") {
                return `<div class="cell" onclick=fun('${req.url}','${p}')>
                    <img src="/static/img/${extname}.jpg" alt="">
                    <span>${p}</span>
                </div>`
            } else if (extname == "txt") {
                return `<div class="cell" onclick=fun('${req.url}','${p}')>
                    <img src="/static/img/${extname}.jpg" alt="">
                    <span>${p}</span>
                </div>`
            } else if (extname == "png") {
                return `<img src="${imgUrl?imgUrl:q}/${p}" alt="">`
            } else if (extname == "jpg") {
                return `<img src="${imgUrl?imgUrl:q}/${p}" alt="">`
            } else if (extname == "jpeg") {
                return`<div class="cell" onclick=fun('${req.url}','${p}')>
                    <img src="${imgUrl?imgUrl:q}/${p}" alt="">
                    <span>${p}</span>
                </div>`
            } else if (extname == "png") {
                return `<img src="${imgUrl?imgUrl:q}/${p}" alt="">`
            } else if (extname == "") {
                return `<div class="cell" onclick=fun('${req.url}','${p}')>
                    <img src="/static/img/file.jpg" alt="">
                    <span>${p}</span>
                </div>`
            } else {
                return `<h1>不支持该文件类型</h1>`
            }
        }

        function resHead(p) { //根据文件类型设置请求头
            if (p == "") {
                return res.writeHead(200, {
                    'Content-Type': 'image/jpg'
                });
            } else if (p == ".css") {
                return res.writeHead(200, {
                    'Content-Type': 'text/css; charset=utf-8'
                });
            } else if (p == ".js") {
                return res.writeHead(200, {
                    'Content-Type': 'text/javascript; charset=utf-8'
                });
            } else if (p == ".html") {
                return res.writeHead(200, {
                    'Content-Type': 'text/html; charset=utf-8'
                });
            } else if (p == ".json") {
                return res.writeHead(200, {
                    'Content-Type': 'text/json; charset=utf-8'
                });
            } else if (p == ".txt") {
                return res.writeHead(200, {
                    'Content-Type': 'text/plain; charset=utf-8'
                });
            } else if (p == ".png") {
                return res.writeHead(200, {
                    'Content-Type': 'image/png'
                });
            } else if (p == ".jpg") {
                return res.writeHead(200, {
                    'Content-Type': 'image/jpg'
                });
            } else if (p == ".jpeg") {
                return res.writeHead(200, {
                    'Content-Type': 'image/jpg'
                });
            } else if (p == ".gif") {
                return res.writeHead(200, {
                    'Content-Type': 'image/gif'
                });
            }
        }
    }
})

// 监听端口
server.listen(port);
console.log("server running in 127.0.0.1:" + port);