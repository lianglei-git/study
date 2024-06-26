

console.log("start")


console.log("end")

new Promise((res) => res(1))
.then(r => {
    console.log("promise done")
})

queueMicrotask(() => {
    console.log("run micro task")
})
