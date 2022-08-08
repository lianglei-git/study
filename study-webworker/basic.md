### &nbsp; PWA渐进式应用
---
>概念：  
&emsp; PWA 是 Google 于 2016 年提出的概念，于 2017 年正式落地，于 2018 年迎来重大突破，全球顶级的浏览器厂商，Google、Microsoft、Apple 已经全数宣布支持 PWA 技术。  
&emsp; PWA 全称为 Progressive Web App，中文译为渐进式 Web APP，其目的是通过各种 Web 技术实现与原生 App 相近的用户体验。  
&emsp; 纵观现有 Web 应用与原生应用的对比差距，如离线缓存、沉浸式体验等等，可以通过已经实现的 Web 技术去弥补这些差距，最终达到与原生应用相近的用户体验效果。  

单独提起`PWA`、或`serive worker`概念时，往往都不能独善其身，而双方些许有些藕断丝连。尝试理清二者关系


### PWA
&emsp;Web 应用和 Native 应用有着各自不同的优势和使用场景  PWA 结合了二者的优势  
&emsp;Web 应用的资源存储在服务器，Native 的资源存储在本地。所以 Native 会比 Web 应用的加载速度和流畅性方面获得更好地表现；  
&emsp;PWA旨在创造拥有更加流畅的用户体验的 Web 应用，和创建类 Native App 的沉浸式效果，而非浏览器端那样的外观和体验；   
&emsp;在各种网络和数据加载的条件下仍然可用－它可以在网络不稳定或者没有网络的情况下使用。


`Service Worker` 是PWA的关键技术，可以支持一些原生应用的功能
1. 友好的弱网和离线体验
2. 定期的后台同步
3. 推送通知


### 建立第一个PWA应用
必须要满足几个条件
1. 必须注册了service worker (service 请参考下列文档；)
2. 必须引入 manifest.json 文件 
   ```json
        {
    "short_name": "Dispose",
    "name": "AI 技术分析",
    "icons": [
      {
        "src": "/source/serviceworker/img/48.png",
        "type": "image/png",
        "sizes": "48x48"
      },
      {
        "src": "/source/serviceworker/img/96.png",
        "type": "image/png",
        "sizes": "96x96"
      },
      {
        "src": "/source/serviceworker/img/192.png",
        "type": "image/png",
        "sizes": "192x192"
      },
      {
        "src": "/source/serviceworker/img/512.png",
        "type": "image/png",
        "sizes": "512x512"
      }
    ],
    "start_url": "/?launcher=true",
    "display": "standalone",
    "background_color": "#287fc5",
    "theme_color": "#fff"
  }
   ```
   在html中引用
   ```html
        <head>
            <link rel="manifest" href="./manifest.json">
        </head>
   ```
然后等页面把service worker 注册完之后，就会出现一个小按钮（右上角）；点击之后就会安装了；



### 启动
- `npm run http-server`;
- `http-server`
请使用 127.0.0.1 打开或者是 localhost 打开 （注意： 请在<font color='red' size=4>study-webworker</font>这个目录下面运行）
### 文档
- [Web Worker](./source/webworker/README.md)
- [Service Worker](source/serviceworker/README.md)


### orther 
1. 关于 https ssl 证书问题 （chrome）
   - mac 使用http-server https 服务
     1. `openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem`
     2.  `sudo http-server -S -C cert.pem -o`
   - 证书无效  
      如果提示证书无效，请暴力解决 参考 [本地证书过期处理](https://blog.csdn.net/qq_42359718/article/details/109033560)
   - 如果出现 `An SSL certificate error occurred when fetching the script.`  
     请参考 [关于ssl：您可以使用带有自签名证书的服务人员吗？](https://www.codenong.com/38728176/)    
     MAC情况下： `/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --user-data-dir=/tmp/foo --ignore-certificate-errors --unsafely-treat-insecure-origin-as-secure=https://127.0.0.1:8080`  通过命令行启动chrome
   - [http-server](https://github.com/http-party/http-server) 