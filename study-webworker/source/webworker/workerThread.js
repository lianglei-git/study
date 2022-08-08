import * as ESM from './esm.js';

globalThis.postMessage("ESModule 引入  esm.js")
ESM.doRequest();

globalThis.postMessage("开始加载数据...")

let now = new Date().getTime();
while(new Date().getTime() - now <= 5000 ) {}
globalThis.postMessage("数据加载完成");

// let i = 1
// function simpleCount() {
//   i++
//   globalThis.postMessage(i)
//   setTimeout(simpleCount, 3000)
// }
// globalThis.postMessage("开始计时: ")

// simpleCount()

// self.onmessage = ev => {
//   globalThis.postMessage(ev.data + ' ~🫥~')
// }
