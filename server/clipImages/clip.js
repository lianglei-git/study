// 创建写入流
const {
    createWriteStream
} = require("fs");
const fs = require('fs');
const path = require('path')
var images = require("images");
// 导入canvas库，用于裁剪图片
const {
    createCanvas,
    loadImage
} = require("canvas");
//导入配置
let {
    entry,
    output,
    imgPrefix,
    imgHeight
} = require('./clip-config.js');

// 配置路径
const entryPath = __dirname + "/" + entry
const outputPath = __dirname + "/" + output



module.exports = async function clip_images(imgName) {
    //删除输出路径下的所有文件
    function deleteFolder(path) {
        let files = [];
        if (fs.existsSync(path)) {
            files = fs.readdirSync(path);
            files.forEach(function (file, index) {
                let curPath = path + "/" + file;
                if (fs.statSync(curPath).isDirectory()) {
                    deleteFolder(curPath);
                } else {
                    fs.unlinkSync(curPath);
                }
            });
            //  fs.rmdirSync(path);
        }
    }
    deleteFolder(outputPath)
    // 加载图片
    const image = await loadImage(entryPath + '/' + imgName);
    // 获取图片宽高
    const {
        width,
        height
    } = image;
    // 创建等宽登高的canvas
    const mainCanvas = createCanvas(width, height);
    // 获取canvas上下文
    const ctx = mainCanvas.getContext("2d");
    // 绘图
    ctx.drawImage(image, 0, 0);
    // oneHeight 获取一份的高度,   canvasX: canvas中的 X , 从哪里开始画
    let canvasX, oneHeight;
    canvasX = oneHeight = imgHeight;
    // 明确我们需要垂直分割成几份
    const num = (height / oneHeight) > Math.floor(height / oneHeight) ? //总张数
        Math.floor(height / oneHeight) + 1 : height / oneHeight;
    const lastHeight = (1 + (height / oneHeight - num)) * oneHeight; //最后一张的高度
    let imgUrl = '';

    for (let i = 0; i < num; i++) {
        if (i == (num - 1)) {
            oneHeight = lastHeight;
        }
        // 创建一份裁剪的canvas
        let clipCanvas = createCanvas(width, oneHeight);
        // 获取canvas上下文
        const clipCtx = clipCanvas.getContext("2d");
        // 通过 clipCtx 裁剪 mainCanvas
        clipCtx.drawImage(
            mainCanvas,
            0,
            canvasX * i,
            width,
            oneHeight,
            0,
            0,
            width,
            oneHeight
        );

        imgUrl = outputPath + `/${imgPrefix+(i + 1)}` + path.extname(imgName);
        fs.writeFileSync(imgUrl, clipCanvas.toBuffer(), 'binary', function (err) {

        })
        images(imgUrl)
            .save(imgUrl, {
                quality: 95 //保存图片到文件,图片质量为50
            });
        // 主动释放内存
        clipCanvas = null;
    }
};