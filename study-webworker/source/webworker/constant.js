// 可以在 Worker 中使用
const a = 111;


// 可以在 Worker 中使用
function b() {
   globalThis.postMessage('调用 constant 文件 ->> ' + arguments.callee.name + ' 函数');
}

