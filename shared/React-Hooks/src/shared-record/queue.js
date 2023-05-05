function dispatchAction(queue, action) {
    const update = { // 更新队列
        action,
        next: null
    }

    const pending = queue.pending;
    if (pending === null) {
        update.next = update;
    } else {
        update.next = pending.next;
        pending.next = update;
    }
    queue.pending = update;

}

dispatchAction(queue, 'action1') // pending = null
dispatchAction(queue, 'action2')// pending = {}
dispatchAction(queue, 'action3')