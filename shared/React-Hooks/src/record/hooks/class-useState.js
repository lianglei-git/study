// 这是 https://react.iamkasong.com/hooks/create.html#%E8%AE%A1%E7%AE%97state 中的代码粘贴过来的

/// 虽然短短几行，看起来简洁，但是把是否初次，与自己的队列都没有区分来，进而显得复杂
function useState(initialState) {
    let hook;
  
    if (isMount) {
      hook = {
        queue: {
          pending: null
        },
        memoizedState: initialState,
        next: null
      }
      if (!fiber.memoizedState) {
        fiber.memoizedState = hook;
      } else {
        workInProgressHook.next = hook;
      }
      workInProgressHook = hook;
    } else {
      hook = workInProgressHook;
      workInProgressHook = workInProgressHook.next;
    }
  
    let baseState = hook.memoizedState;
    if (hook.queue.pending) {
      let firstUpdate = hook.queue.pending.next;
  
      do {
        const action = firstUpdate.action;
        baseState = action(baseState);
        firstUpdate = firstUpdate.next;
      } while (firstUpdate !== hook.queue.pending.next)
  
      hook.queue.pending = null;
    }
    hook.memoizedState = baseState;
  
    return [baseState, dispatchAction.bind(null, hook.queue)];
  }
  