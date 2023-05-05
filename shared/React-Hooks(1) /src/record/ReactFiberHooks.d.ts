type Update<S, A> = {
    lane: Lane,
    action: A,
    eagerReducer: ((S, A) => S) | null,
    eagerState: S | null,
    next: Update<S, A>,
    priority?: ReactPriorityLevel,
};

type UpdateQueue<S, A> = {
    pending: Update<S, A> | null,
    dispatch: (A) => any | null,
    lastRenderedReducer: ((S, A) => S) | null,
    lastRenderedState: S | null,
};

export type HookType =
    | 'useState'
    | 'useReducer'
    | 'useContext'
    | 'useRef'
    | 'useEffect'
    | 'useLayoutEffect'
    | 'useCallback'
    | 'useMemo'
    | 'useImperativeHandle'
    | 'useDebugValue'
    | 'useDeferredValue'
    | 'useTransition'
    | 'useMutableSource'
    | 'useOpaqueIdentifier';


export type Hook = {
    memoizedState: any,
    baseState: any,
    baseQueue: Update<any, any> | null,
    queue: UpdateQueue<any, any> | null,
    next: Hook | null,
};

type Component = (p: any, arg: any) => any;

type FiberMemoizedState = {
    memoizedState: any,
    next: Hook | null,
    queue: UpdateQueue<any, any> | null,
}

type Fiber = {
    tag: IndeterminateComponent | FunctionComponent | ClassComponent | HostRoot | HostComponent,
    type: Component,
    stateNode: Component, // 在教程文档中的极简示例，我没想用（当然哈 有写），就直接把源码的核心更新逻辑写进来了
    alternate: null // 上一个渲染的fi
    child: any;
    memoizedState: FiberMemoizedState
}

const getCurrentlyRenderingFiber: () => Fiber

function renderWithHooks<Props, SecondArg>(
    current: Fiber | null,
    workInProgress: Fiber,
    Component: (p: Props, arg: SecondArg) => any,
    // props: Props,
    // secondArg: SecondArg,
    // nextRenderLanes: number,
): any

function mountWorkInProgressHook(): Hook

function dispatchAction(fiber: Fiber, queue: FiberMemoizedState['queue'], action: (k1: any, k2: () => any | string) => any)

function resolveDispatcher(): {
    useReducer: (reducer, initalArg, init) => any,
    useState: (k: any) => any
}

function updateWorkInProgressHook(): Hook

export {
    getCurrentlyRenderingFiber,
    renderWithHooks,
    dispatchAction,
    mountWorkInProgressHook,
    resolveDispatcher,
    updateWorkInProgressHook

}