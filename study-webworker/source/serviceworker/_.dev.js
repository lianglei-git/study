"use strict";

var msgChan = new MessageChannel();
var on = msgChan.port1;

if ('serviceWorker' in navigator) {
  console.log(2222); // 所以Service Worker只是一个挂在navigator对象上的HTML5 API而已
  // const url = `https://127.0.0.1:8080/source/serviceworker/_sw.js`

  var url = "sw.js"; //注意下 这里直接是根目录的sw.js
  // import.meta.url.replace('_', '_sw')

  navigator.serviceWorker.register(url).then(function (registration) {
    // registration.update();
    console.log('注册成功了', registration);
    registration.active.postMessage({
      'userName': 'kongzhi',
      'age': 31,
      'sex': 'men',
      'marriage': 'single'
    }, [msgChan.port2]);

    p1.onmessage = function (msg) {
      console.log('接收到的消息：' + msg.data);
    };
  }, function (err) {
    console.log('注册失败了');
  });
}