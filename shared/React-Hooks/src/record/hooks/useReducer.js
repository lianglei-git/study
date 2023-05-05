import { dispatchAction, getCurrentlyRenderingFiber, mountWorkInProgressHook, resolveDispatcher, updateWorkInProgressHook } from "../ReactFiberHooks";

/** useReducer -- source */
export function mountReducer(reducer, initalArg, init) {
    /** 构建链表 */
    const hook = mountWorkInProgressHook()
    let initialState;
    /** 有个判断， 是不是函数的判断。 */
    // if(是函数) hook.memoizedState = 函数返回值

    if (init !== undefined) {
        initialState = init(initalArg);
    } else {
        initialState = initalArg;
    }

    hook.memoizedState = initalArg;
    const queue = (hook.queue = {
        pending: null,
        /** 派发的函数嘛 */
        lastRenderedReducer: reducer,
        lastRenderedState: initialState
    })
    const dispatch = dispatchAction.bind(null, getCurrentlyRenderingFiber(), queue)
    return [hook.memoizedState, dispatch]
}

export function useReducer(reducer, initalArg, init) {
    const dispatcher = resolveDispatcher();
    return dispatcher.useReducer(reducer, initalArg, init);
}

export function updateReducer(reducer, initialArg, init){
    var hook = updateWorkInProgressHook();
    var queue = hook.queue;
    queue.lastRenderedReducer = reducer;
    // var current = currentHook || {}; // The last rebase update that is NOT part of the base state.
  
    // var baseQueue = current.baseQueue; // The last pending update that hasn't been processed yet.
  
    var pendingQueue = queue.pending;
    var dispatch = queue.dispatch = dispatchAction.bind(null, getCurrentlyRenderingFiber(), queue);

    if(pendingQueue == null) {
        return [hook.memoizedState, dispatch];
    }

    let update = pendingQueue.next

    hook.memoizedState = pendingQueue.eagerState;
    queue.lastRenderedState = pendingQueue.eagerState;

    // console.log(baseQueue, 'baseQueuebaseQueue', pendingQueue,'pendingQueuependingQueue')
    return [hook.memoizedState, dispatch];
}
