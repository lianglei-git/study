let ReactCurrentDispatcher = {
    current: null
}

let currentlyRenderingFiber = null;

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


export function renderWithHooks (current, workInProgress, Component){
    // {
    //     if (current !== null && current.memoizedState !== null) {
    //       ReactCurrentDispatcher.current = HooksDispatcherOnUpdateInDEV;
    //     } else if (hookTypesDev !== null) {
    //       // This dispatcher handles an edge case where a component is updating,
    //       // but no stateful hooks have been used.
    //       // We want to match the production code behavior (which will use HooksDispatcherOnMount),
    //       // but with the extra DEV validation to ensure hooks ordering hasn't changed.
    //       // This dispatcher does that.
    //       ReactCurrentDispatcher.current = HooksDispatcherOnMountWithHookTypesInDEV;
    //     } else {
    //       ReactCurrentDispatcher.current = HooksDispatcherOnMountInDEV;
    //     }
    //   }
    currentlyRenderingFiber = workInProgress

    if(isMount) {
      ReactCurrentDispatcher.current = HookDispatchOnMount;
      isMount = false
  } else {
      ReactCurrentDispatcher.current = HookDispatchOnUpdate;
  }

  let children = Component();

  currentlyRenderingFiber = null;
  // workInProgressHook = null

  return children;

}