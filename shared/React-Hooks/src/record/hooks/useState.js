import {
  dispatchAction,
  getCurrentlyRenderingFiber,
  mountWorkInProgressHook,
  resolveDispatcher,
} from "../ReactFiberHooks";
import { updateReducer } from "./useReducer";

/*** usestate */
export function mountState(initialState) {
  var hook = mountWorkInProgressHook();

  if (typeof initialState === "function") {
    // $FlowFixMe: Flow doesn't like mixed types
    initialState = initialState();
  }

  hook.memoizedState = hook.baseState = initialState;
  var queue = (hook.queue = {
    pending: null,
    dispatch: null,
    lastRenderedReducer: basicStateReducer,
    lastRenderedState: initialState,
  });
  var dispatch = (queue.dispatch = dispatchAction.bind(
    null,
    getCurrentlyRenderingFiber(),
    queue
  ));
  return [hook.memoizedState, dispatch];
}

export function useState(initialState) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useState(initialState);
}

export function updateState(initialState) {
  return updateReducer(basicStateReducer);
}

function basicStateReducer(state, action) {
  // $FlowFixMe: Flow doesn't like mixed types
  return typeof action === "function" ? action(state) : action;
}
