// 虽然可以在里边为所欲为地写任何js代码，或者也可以什么都不写，
// 都不妨碍这是一个Service Worker，但还是举一个微小的例子：

console.log("初始化才可以看到。");
const CACHE_NAME = 'cache-v1';
const urlsToCache = [
    '/source/serviceworker/img/long.png',
  ];

self.addEventListener('activate', event => {
  console.log('被激活');
});

self.oninstall = (event) => {
    event.waitUntil(
      caches
        .open(CACHE_NAME) // 这返回的是promise
        .then(function (cache) {
          return cache.addAll(urlsToCache); // 这返回的是promise
        })
    );
  };

  // globalThis.postMessage('','')

// 1. 做一个图片拦截
// self.addEventListener('fetch', function (event) {
//     console.log(event.request)
//     if (/\.png$/.test(event.request.url)) {
//         event.respondWith(fetch('/img/long.png'));
//     }
// });

self.addEventListener("fetch", function(event) {
  console.log('请求拦截！', event)
  if(event.request.url.indexOf('.vue') !== -1) {
    // event.request.headers.set('Content-Type', 'text/plain;charset=UTF-8');
    // event.request.headers['Content-Type'] = 'text/plain;charset=UTF-8'
    return  new Promise((res) => {
      fetch(event.request).then(res => res.text()).then(r => {
        const regTmpl = /<template[^>]*>([\s\S]*)<\/template[*>]*>/;
        const result = regTmpl.exec(content)[1];
        res(result);
      });
    })

  }
  event.respondWith(
    caches
      .match(event.request) // 此方法从服务工作线程所创建的任何缓存中查找缓存的结果
      .then(function (response) {
        // response为匹配到的缓存资源，如果没有匹配到则返回undefined，需要fetch资源
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});


self.addEventListener("message", function(event) {
    console.log(event.data);
    console.log(event);
    var port = event.ports[0]
    setTimeout(() => {
        port.postMessage('？？？？？')
    }, 3000)
  });
