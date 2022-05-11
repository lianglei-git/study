
function sleep(time){
    let end = time * 1000 + Date.now()
    while(Date.now() < end) {}
    return;
} 

export {
    sleep
}