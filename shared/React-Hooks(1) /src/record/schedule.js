import { render } from "./ReactFiberWorkLoop";

let syncQueue = null;
// 在这个版本没有具体应用
let immediateQueueCallbackNode = null;
// 关注一下 源码中 ensureRootIsScheduled 方法，func内在关注下 scheduleSyncCallback 这种核心调度;
// 在scheduleSyncCallback 中呢 会出现syncQuque，数组队列，先进先渲染
// 因为有一些优先级、时间调度等因素的出现，所以代码有些抽象，这里还是简化了一下
function scheduleUpdateOnFiber(root) {

    // 预定一些更新内容
    ensureRootIsScheduled(root);
    // 解除一些事件绑定
}
function ensureRootIsScheduled(root){
    // 一堆关于时间优先级的判断，这里我简单写一下 scheduleSyncCallback 函数
   let newCallbackNode= scheduleSyncCallback(performSyncWorkOnRoot.bind(null, root));
   root.callbackNode = newCallbackNode;
}

// 简单实现一下 scheduleSyncCallback 函数
function scheduleSyncCallback(callback){

    // the next tick, or earlier if something calls `flushSyncCallbackQueue`.
  if (syncQueue === null) {
    syncQueue = [callback]; // Flush the queue in the next tick, at the earliest.

    // 这里callback虽然有被赋值，但是在调度器渲染的时候却取消了这个callback（react-dom.js）11306行
    immediateQueueCallbackNode = Scheduler_scheduleCallback(/** Scheduler_ImmediatePriority 优先级 */ 1, flushSyncCallbackQueueImpl);
  } else {
    // Push onto existing queue. Don't need to schedule a callback because
    // we already scheduled one when we created the queue.
    syncQueue.push(callback);
  }

}

let taskIdCounter = 0;
function Scheduler_scheduleCallback(priorityLevel, callback) {
    var newTask = {
        id: taskIdCounter++,
        callback: callback,
        priorityLevel: priorityLevel,
        startTime: Date.now(),
        expirationTime:  Date.now(),
        sortIndex: -1
      };
      return newTask;
}

// 这个函数最终被event 派发调用，调度callback函数
function flushSyncCallbackQueueImpl() {
    if(syncQueue !== null) {
        syncQueue.map(i => i());
        syncQueue = null; // 临时处理
        return '';
    }
    // 源码
    // if (!isFlushingSyncQueue && syncQueue !== null) {
    //   // Prevent re-entrancy.
    //   isFlushingSyncQueue = true;
    //   var i = 0;
  
    //   {
    //     try {
    //       var _isSync2 = true;
    //       var _queue = syncQueue;
    //       runWithPriority$1(ImmediatePriority$1, function () {
    //         for (; i < _queue.length; i++) {
    //           var callback = _queue[i];
  
    //           do {
    //             callback = callback(_isSync2);
    //           } while (callback !== null);
    //         }
    //       });
    //       syncQueue = null;
    //     } catch (error) {
    //       // If something throws, leave the remaining callbacks on the queue.
    //       if (syncQueue !== null) {
    //         syncQueue = syncQueue.slice(i + 1);
    //       } // Resume flushing in the next tick
  
  
    //       Scheduler_scheduleCallback(Scheduler_ImmediatePriority, flushSyncCallbackQueue);
    //       throw error;
    //     } finally {
    //       isFlushingSyncQueue = false;
    //     }
    //   }
    // }
  }

  // 这玩意就是调用了render方法
function performSyncWorkOnRoot(fiber){

    // 就是render
    render(fiber);
    //核心代码 ->>> renderRootSync 调用重新渲染

    // ⬇️源码
    // if (!((executionContext & (RenderContext | CommitContext)) === NoContext)) {
    //     {
    //       throw Error( "Should not already be working." );
    //     }
    //   }
    
    //   flushPassiveEffects();
    //   var lanes;
    //   var exitStatus;
    
    //   if (root === workInProgressRoot && includesSomeLane(root.expiredLanes, workInProgressRootRenderLanes)) {
    //     // There's a partial tree, and at least one of its lanes has expired. Finish
    //     // rendering it before rendering the rest of the expired work.
    //     lanes = workInProgressRootRenderLanes;
    //     exitStatus = renderRootSync(root, lanes);
    
    //     if (includesSomeLane(workInProgressRootIncludedLanes, workInProgressRootUpdatedLanes)) {
    //       // The render included lanes that were updated during the render phase.
    //       // For example, when unhiding a hidden tree, we include all the lanes
    //       // that were previously skipped when the tree was hidden. That set of
    //       // lanes is a superset of the lanes we started rendering with.
    //       //
    //       // Note that this only happens when part of the tree is rendered
    //       // concurrently. If the whole tree is rendered synchronously, then there
    //       // are no interleaved events.
    //       lanes = getNextLanes(root, lanes);
    //       exitStatus = renderRootSync(root, lanes);
    //     }
    //   } else {
    //     lanes = getNextLanes(root, NoLanes);
    //     exitStatus = renderRootSync(root, lanes);
    //   }
    
    //   if (root.tag !== LegacyRoot && exitStatus === RootErrored) {
    //     executionContext |= RetryAfterError; // If an error occurred during hydration,
    //     // discard server response and fall back to client side render.
    
    //     if (root.hydrate) {
    //       root.hydrate = false;
    //       clearContainer(root.containerInfo);
    //     } // If something threw an error, try rendering one more time. We'll render
    //     // synchronously to block concurrent data mutations, and we'll includes
    //     // all pending updates are included. If it still fails after the second
    //     // attempt, we'll give up and commit the resulting tree.
    
    
    //     lanes = getLanesToRetrySynchronouslyOnError(root);
    
    //     if (lanes !== NoLanes) {
    //       exitStatus = renderRootSync(root, lanes);
    //     }
    //   }
    
    //   if (exitStatus === RootFatalErrored) {
    //     var fatalError = workInProgressRootFatalError;
    //     prepareFreshStack(root, NoLanes);
    //     markRootSuspended$1(root, lanes);
    //     ensureRootIsScheduled(root, now());
    //     throw fatalError;
}


// 注意这里更新了

function scheduleUpdate(){
    // if(immediateQueueCallbackNode) {
    //     immediateQueueCallbackNode.callback();
    // }
    flushSyncCallbackQueueImpl();
}

export {
    scheduleUpdateOnFiber,
    scheduleUpdate
}