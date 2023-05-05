import { render } from "./ReactFiberWorkLoop"

const App = () => {
    // const useState
    return {
        vdom: (<div>99</div>),
        methods: {
            click() {

            }
        }
    }
}


// 最开始在初次渲染的时候为 未知组件的 tag;
let workInProgess = {
    tag: IndeterminateComponent,
    type: App,
    // stateNode: App, // 在教程文档中的极简示例，我没想用（当然哈 有写），就直接把源码的核心更新逻辑写进来了
    alternate: null // 上一个渲染的fiber
}

render(workInProgess);