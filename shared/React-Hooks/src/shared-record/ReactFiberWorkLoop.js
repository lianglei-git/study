import { beginWork } from "./ReactFiberBeginWork";

// 当前进行构建中的fiber
let workInProgess = null;



// 工作
function performUnitWork(unitOfWork) {
    const current = unitOfWork.alternate
    return beginWork(current, unitOfWork )
}


// 循环工作，子树
function workLoop() {
    while(workInProgess != null) {
        workInProgess = performUnitWork(workInProgess)
    }
}
export function render(fiber){
    workInProgess = fiber;
    workLoop();
}