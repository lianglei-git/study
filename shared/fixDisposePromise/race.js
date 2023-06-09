async function limitConcurrency(promises, maxConcurrency) {
    const executing = [];
    const execute = (promise) => {
      executing.push(promise);
      promise.then(() => {
        executing.splice(executing.indexOf(promise), 1);
      });
    };
    const queue = promises.slice();
    while (queue.length) {
      while (executing.length < maxConcurrency) {
        const promise = queue.shift();
        if (!promise) break; // 处理队列为空的情况
        execute(promise);
      }
      await Promise.race(executing); // 等待任意一个 Promise 完成
    }
  }
  

const fn = url => {
    // 实际场景这里用axios等请求库 发请求即可 也不用设置延时
    return new Promise(resolve => {
        setTimeout(() => {
            console.log('完成一个任务', url, new Date());
            resolve({ url, date: new Date() });
        }, 1500);
    })
};

const urls = Array(150).fill(0).map((i, idx) => fn(idx));
console.log(urls);

limitConcurrency(urls, 50)