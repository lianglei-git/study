// 组件更新的时候会用到 
function dispatchAction(queue, action) {
    // 创建update
    const update = {
        action,
        next: null
    }

    // 环状单向链表操作
    if (queue.pending === null) {
        update.next = update;
    } else {
        update.next = queue.pending.next;
        queue.pending.next = update;
    }
    queue.pending = update;

    // 模拟React开始调度更新
    // schedule();
}



// 队列
const queue = {
    pending: null
}

dispatchAction(queue, 'action1')
dispatchAction(queue, 'action2')
dispatchAction(queue, 'action3')


// 循环♻️

const pengdingQueue = queue.pending;

if(pengdingQueue !== null) {
    let first =  pengdingQueue.next;
    let update = first;
    do{
        console.log(update)
        update = update.next;
    }while(first !== update)
}