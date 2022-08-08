globalThis.postMessage("开始加载数据...")
console.log("开始加载数据");
let now = new Date().getTime();
    while(new Date().getTime() - now <= 5000 ) {}
globalThis.postMessage("数据加载完成");
// setTimeout(() => {
//     globalThis.postMessage("数据加载完成")
// },5000)




/** ============= 引入其他文件 ========== */


importScripts('./constant.js'); // 等同于 <script src="路径"></script>


b();