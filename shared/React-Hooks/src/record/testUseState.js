import {IndeterminateComponent} from './ReactWorkTags'
import { render } from './ReactFiberWorkLoop'
import { useState } from './hooks/useState'

let a = 0;
function App() {
  let [count, setCount] = useState(0)
  // debugger
  console.log('App - 刷新 :::: count 值为：：：', count)
  // 忘记直接渲染jsx的babel api了，就简单写走一下window调用吧😁
  return {
    vdom: (
      <>
        <div className="card">
          <button onClick={() => {
            setCount(count)
          }}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </>
    ),
    methods: {
      click(){

        debugger
        setCount(count+1)
      }
    }
  }
}



// 最开始在初次渲染的时候为 未知组件的 tag;
let workInProgess = {
    tag: IndeterminateComponent,
    type: App,
    startNode: App, // 在教程文档中的极简示例，我没想用（当然哈 有写），就直接把源码的核心更新逻辑写进来了
    alternate: null // 上一个渲染的fiber
}

render(workInProgess);

export default App
