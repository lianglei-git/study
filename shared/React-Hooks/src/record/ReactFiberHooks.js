import { render } from "./ReactFiberWorkLoop";
import { mountReducer, updateReducer } from "./hooks/useReducer";
import { mountState, updateState } from "./hooks/useState";
import {
    scheduleUpdateOnFiber,
    scheduleUpdate
} from "./schedule";

// 当前使用的派发器，个人理解：因为有不同清咖滚下 HookDispatchOnMount、 HookDispatchOnUpdate、HookDispatchOnWarning等
let ReactCurrentDispatcher = {
    current: null
}
// 每个fiber都会有一个单项hooks链表，这个指的是当前应用到的hook。在于更新时候使用
let currentHook =null;

// 比如这个初始化构建中的啦 mountState、mountReducer
let workInProgressHook = null; // 当前正在工作的hook
let currentlyRenderingFiber; // 当前工作（使用）的fiber

export const getCurrentlyRenderingFiber = () => currentlyRenderingFiber;

let isMount = true;

// mount时候的hook
const HookDispatchOnMount = {
    useReducer: mountReducer,
    useState: mountState
}

// update时候的hook
const HookDispatchOnUpdate = {
    useReducer: updateReducer,
    useState: updateState,
}

// Warning时候的hook
const HookDispatchOnWarning = {
  useReducer: () => console.warn('这次可以，下次这么搞就要注意了'),
}

// Error时候的hook
const HookDispatchOnContextOnly = {
  useReducer: () => console.warn('拜托，你嵌套hook谁教你的，文西嘛？ （我叫达文西啦）'),
}

export function renderWithHooks(current, workInProgess, Component) {

    // 这个可以在 dispatchAction 函数中有体现，初始化情况下，或者相同的fiber渲染，alternate替换都在这里
    // 
    // if (didScheduleRenderPhaseUpdateDuringThisPass) {
    currentlyRenderingFiber = workInProgess
    if(isMount) {
        ReactCurrentDispatcher.current = HookDispatchOnMount;
        isMount = false
    } else {
        ReactCurrentDispatcher.current = HookDispatchOnUpdate;
    }

    let children = Component();
    currentlyRenderingFiber = null;
    workInProgressHook = null
    // }
    return children;
}
/** 相当于构建链表 */
export function mountWorkInProgressHook() /**return -> Hook */ {
    const hook = {
        memoizedState: null, // 自己的状态 数据
        // baseState: null,
        // baseQueue: null,
        queue: null, // 自己的环形链表
        next: null // 下一个更新
    }

    if (workInProgressHook == null) {
        currentlyRenderingFiber.memoizedState = workInProgressHook = hook;
    } else {
        workInProgressHook = workInProgressHook.next = hook
    }
    return workInProgressHook;
}



export function dispatchAction(currentlyRenderingFiber, queue, action) {
    if (typeof arguments[3] === 'function') {
        console.error("State updates from the useState() and useReducer() Hooks don't support the " + 'second callback argument. To execute a side effect after ' + 'rendering, declare it in the component body with useEffect().');
    }
    const update = {
        action,
        next: null,
        // lane: lane,
        eagerReducer: null,
        eagerState: null,
    }

    // 环状单向链表操作
    if (queue.pending == null) {
        update.next = update;
    } else {
        update.next = queue.pending.next;
        queue.pending.next = update;
    }
    queue.pending = update;
    // console.log(currentlyRenderingFiber, 'currentlyRenderingFibercurrentlyRenderingFiber')
    // action(workInProgressHook, ...args)
    // didScheduleRenderPhaseUpdateDuringThisPass
    // didScheduleRenderPhaseUpdate
    if (false /** 16091行，fiber.lanes === NoLanes && (alternate === null || alternate.lanes === NoLanes) */ ) {
        // 当前刷新的fiber是不是使用的fiber，就不用刷新，而是重新启动，替换 alternate 就中了
        // 可以在这个App.js 里面，直接点击按钮尝试一下，
        // didScheduleRenderPhaseUpdateDuringThisPass = didScheduleRenderPhaseUpdate = true
        // 这个 在renderWithHooks这函数里面有判断，到时候记得找一下（全局搜索一下）
    }

    var prevDispatcher; // 这玩意是一个警告的，因为全局会有好几个dispatch的派发映射表，这里代表 一个是正常运作的，另一个是发出警告提示，告诉你异常操作的。
    // {
    //     prevDispatcher = ReactCurrentDispatcher$1.current;
    //     ReactCurrentDispatcher$1.current = InvalidNestedHooksDispatcherOnUpdateInDEV;
    //   }
    console.log(queue,'queuequeue')

    /** 要调用派发函数了 */

    /** ------- */
    var lastRenderedReducer = queue.lastRenderedReducer;
    if (lastRenderedReducer !== null) {
        try {
            var currentState = queue.lastRenderedState;
            var eagerState = lastRenderedReducer(currentState, action); // Stash the eagerly computed state, and the reducer used to compute
            // it, on the update object. If the reducer hasn't changed by the
            // time we enter the render phase, then the eager state can be used
            // without calling the reducer again.

            update.eagerReducer = lastRenderedReducer;
            update.eagerState = eagerState;
        } finally {
            // 还原 ReactCurrentDispatcher 的正常情况。上面 prevDispatcher 在
        }
    }

    /** ------- */
    /** 更新 -- 学习文档 */
    // schedule(currentlyRenderingFiber)

    /** 更新 -- 模拟调度器 */
    scheduleUpdateOnFiber(currentlyRenderingFiber);

    // /** 使用  setTimeout 模拟调度器派发更新, 优先级及同时调度多个任务*/
    setTimeout(() => {
        scheduleUpdate();
    })

}

/** 我们学习文档的示例 */
function schedule(_currentFiber) {


    // // 更新前将workInProgressHook重置为fiber保存的第一个Hook
    // workInProgressHook = _currentFiber.memoizedState;
    // // 触发组件render
    // _currentFiber.stateNode();
    // // 组件首次render为mount，以后再触发的更新为update
    // isMount = false;


    // 官网的教程，因为他没有前置的工作流程，所以就不能直接调用 stateNode 函数。
    // so, let's run "render"
    render(_currentFiber);
}


export function resolveDispatcher() {
    const dispatcher = ReactCurrentDispatcher.current;

    return dispatcher;
}


export function updateWorkInProgressHook() {
    // This function is used both for updates and for re-renders triggered by a
    // render phase update. It assumes there is either a current hook we can
    // clone, or a work-in-progress hook from a previous render pass that we can
    // use as a base. When we reach the end of the base list, we must switch to
    // the dispatcher used for mounts.
    var nextCurrentHook;
  
    if (currentHook === null) {
      var current = currentlyRenderingFiber //.alternate;
  
      if (current !== null) {
        nextCurrentHook = current.memoizedState;
      } else {
        nextCurrentHook = null;
      }
    } else {
      nextCurrentHook = currentHook.next;
    }
  
    var nextWorkInProgressHook;
  
    if (workInProgressHook === null) {
      nextWorkInProgressHook = currentlyRenderingFiber.memoizedState;
    } else {
      nextWorkInProgressHook = workInProgressHook.next;
    }
  
    if (nextWorkInProgressHook !== null) {
      // There's already a work-in-progress. Reuse it.
      workInProgressHook = nextWorkInProgressHook;
      nextWorkInProgressHook = workInProgressHook.next;
      currentHook = nextCurrentHook;
    } else {
      // Clone from the current hook.
      if (!(nextCurrentHook !== null)) {
        {
          throw Error( "Rendered more hooks than during the previous render." );
        }
      }
  
      currentHook = nextCurrentHook;
      var newHook = {
        memoizedState: currentHook.memoizedState,
        baseState: currentHook.baseState,
        baseQueue: currentHook.baseQueue,
        queue: currentHook.queue,
        next: null
      };
  
      if (workInProgressHook === null) {
        // This is the first hook in the list.
        currentlyRenderingFiber.memoizedState = workInProgressHook = newHook;
      } else {
        // Append to the end of the list.
        workInProgressHook = workInProgressHook.next = newHook;
      }
    }
  
    return workInProgressHook;
  }
  