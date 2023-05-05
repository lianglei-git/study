import { FunctionComponent, IndeterminateComponent } from "./ReactWorkTags";


/**
 * 我这里直接就不考虑双缓存替换渲染的了，直接使用正在构建中的为例子。
 * @param {*} current 上次Fiber
 * @param {*} workInProgress 构建中的Fiber
 */
export function beginWork(current, workInProgress){
    switch (workInProgress.tag) {
        case IndeterminateComponent:
            return mountIndeterminateComponent(current, workInProgress, workInProgress.type)
        case FunctionComponent:
            return updateFunctionComponent(current, workInProgress, workInProgress.type)
        default:
            break;
    }
}

function mountIndeterminateComponent(current, workInProgress, Component) {
    let children = renderWithHooks(current, workInProgress, Component)
    console.log(children, 'children')
    {
        window.App = children
    }
    workInProgress.tag = FunctionComponent
    // 构建子树
    reconcileChildren(current, workInProgress, children);
    return null // children; //workInProgress.child
}
