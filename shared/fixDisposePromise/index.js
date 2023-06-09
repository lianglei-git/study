const fn = url => {
    const delay = (Math.floor(Math.random() * 10) + 1) * 100
    // 实际场景这里用axios等请求库 发请求即可 也不用设置延时
    return new Promise(resolve => {
        setTimeout(() => {
            console.log('完成一个任务', url, delay);
            resolve({
                url,
                date: new Date()
            });
        }, delay);
    })
};

/** @param {() => Promise[]} promises  */
function limitQueue(promises, limit) {
    let RunTabskIndex = 0,
        RunLimitMaxIndex = 0,
        RunTaskFullIndex = 0,
        isStartTaks = true,
        promisesLength = promises.length,
        currentRunTaks = promises.splice(0, limit);
    let PromiseResult = null;
    if (promisesLength < limit) {
        limit = promisesLength - 1;
    }

    function runLimitTask() {
        while (isStartTaks) {
            setup(currentRunTaks[RunLimitMaxIndex]);
        }
    }

    function setup(promise) {
        if (RunTabskIndex > promisesLength -1) {
            isStartTaks = false;
            return;
        }
        if (RunLimitMaxIndex >= limit) {
            isStartTaks = false;
            return;
        }
        RunLimitMaxIndex++;
        RunTabskIndex++;
        console.log(RunTabskIndex)
        promise().then(() => {
            RunTaskFullIndex++;
            if (RunTaskFullIndex >= promisesLength) {
                PromiseResult();
                return;
            }
            currentRunTaks.splice(RunLimitMaxIndex, 1);
            const nexttask = promises.shift()
            currentRunTaks.push(nexttask);
            RunLimitMaxIndex--;
            setup(nexttask);
        })
    }


    runLimitTask();

    return new Promise(res => {
        PromiseResult = res;
    })
};


const urls = Array(30).fill(0).map((i, idx) => () => fn(idx));

(async _ => {
    await limitQueue(urls, 5);
})()