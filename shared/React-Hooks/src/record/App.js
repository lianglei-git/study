import * as React from 'react'

const action = (state, action) => {
  console.log(99199919)
  if(action.type == 'add') {
    return state+1
  }

  return state
}
// global.__DEV__=true

const Control = () => {
  debugger
  const [count, setCount] = React.useReducer(action, 0)

  

  return <button onClick={() => {
    debugger
    setCount({type: 'add'})
    // setCount({type: 'add'})
    // setCount({type: 'add'})
  }}>Control {count}</button>
}

function App() {
  debugger
  // fiber = {
  //   memoizedState: {

  //     next: null
  //   }
  // }

  // const [count, setCount] = React.useState(0) // 
  // fiber = {
  //   memoizedState: {

  //     next: {
  //       value: 'React.useState(0)',
  //       next
  //     }
  //   }
  // }
  React.useEffect(() => {
    console.log('jjjj')
  }, [])

  const [count, setCount] = React.useReducer(action, 0)
  // fiber = {
  //   memoizedState: {

  //     next: {
  //       value: 'React.useState(0)',
  //       next: {
  //       value: ' React.useReducer(action, 0)',

  //       }
  //     }
  //   }
  // }

  return (
    <>
      <div className="card">
        <button onClick={() => {
          debugger
          setCount({type: 'add'})
          // setCount(count+1) 
        }}>
          count is {count}
        </button>
        {/* <Control /> */}
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}


export default App
