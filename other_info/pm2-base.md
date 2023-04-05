## 服务端(pm2)相关操作

### 相关路径标准

- pm2 工具存放位置
  `~/home/yizhun/.pm2/~`
- logs 存放地址
  1. 默认存放 `~/home/yizhun/.pm2/logs/~`
  2. 此项目存放 `~/home/yizhun/yzpacs_db/server-render/logs/~`

### 项目以及 pm2 相关命令

1. 生成配置  
    `pm2 init simple` 执行此命令将会生成一个文件如:
    目前仅应用下列条件。如需更多请参考[PM2](https://pm2.keymetrics.io/docs/usage/application-declaration/)
   ```js
   module.exports = {
     apps: [
       {
         name: "main", // 进程名称
         script: "./main.js", // 入口
         out_file: "./logs/main-out.log", // 日志配置文件
         pid_file: "./logs/main-pid.log", // pid配置文件
         error_file: "./logs/main-error.log", // error配置文件
         min_uptime: "60s", // 最小运行时间， 60s内无故停止，认为异常退出，会触发 max_restarts 设置数量
         max_restarts: 15,// 默认15 重启次数。
         watch: false, // 监控 文件变动默认重载
         cwd: '', // 默认的项目启动路径
       },
     ],
   };
   ```

2. 启动
>PS:   
  delete与stop区别：stop和delete都会停止,stop不会完全删除启动记录，下次会走缓存，delete会删除此进程； 可通过pm2 show [进程名称] 来查看详细信息。  
  restart和reload： 同上。

   - pm2 默认支持  
      &emsp; `pm2 start [文件名]`  
      &emsp; `pm2 start [文件名] --name [进程名称自定义]`  
      &emsp; `pm2 start [文件名] -i [数字]` 根据 CPU 核数启动进程个数  
      &emsp; `pm2 start [文件名] --watch` 根据文件变动 自动 reload
      &emsp; `pm2 updatePM2` 升级Pm2  
      &emsp; `pm2 --help`  
      &emsp; `pm2 delete [all]` 删除全部进程  
      &emsp; `pm2 monit` 监控  
      &emsp; `pm2 stop [all]` 停止  
      &emsp; `pm2 flush` 清空日志 
      &emsp; `pm2 list` 查看进程 
      &emsp; `pm2 show [进程名字]` 展示进程详细信息.

   - 项目配置（自定义启动）：  
     &emsp; `pm2 start ecosytem.config.js`  启动全部的配置项内容  
     &emsp; `pm2 stop ecosytem.config.js`    
     &emsp; `pm2 restart ecosytem.config.js`  
     &emsp; `pm2 reload ecosytem.config.js`  
     &emsp; `pm2 delete ecosytem.config.js`  
     &emsp; `pm2 start ecosytem.config.js --only main`  仅启动一个  
     &emsp; `pm2 start ecosytem.config.js --only "main, main2"`  同时启动几个  



### 此项目应用
1. `pm2 start ecosystem.config.js --only main `
2. `pm2 restart ecosystem.config.js --only main `
3. `pm2 stop ecosystem.config.js --only main `
4. `pm2 delete ecosystem.config.js --only main `


### Other  
- `lsof -i:端口` 用以显示符合条件的进程情况
- `ps -ef | grep 进程名称` 查看相关进程的信息 🌰：`ps -ef|grep node` 查看node相关进程信息
- `kill pid` 杀死进程
- `kill 9  pid` 彻底杀死进程
- `kill -KILL pid` 强制杀死进程
- `kill -9 $(ps -ef | grep hnlinux)`  过滤出hnlinux用户进程并杀死
- `kill -u hnlinux` 过滤出hnlinux用户进程并杀死
- `htop` 是Linux系统中的一个互动的进程查看器 如果没有就用`top`
- `top`  性能分析工具,能够实时显示系统中各个进程的资源占用状况 
- `as` 二进制工具集 
- `nvidia-smi` 显示GPU当前的状态


### 其他入口
- [测试工具](http://10.2.112.138:9292/test)
- [日志文件](http://10.2.112.138:9292/logs) （参数：type： error ｜ pid ｜ out）默认out

### 参考
- [PM2官方简介](https://pm2.keymetrics.io/docs/usage/application-declaration/)  
- [PM2常用命令](https://wenku.baidu.com/view/842b60cd82c758f5f61fb7360b4c2e3f56272574.html)
- [lsof](http://www.ha97.com/1029.html)
- [linux--top命令](https://www.cnblogs.com/baichunyu/p/15356162.html)
- [linux--as命令](https://blog.csdn.net/K346K346/article/details/89088671)
- [linux教程](https://www.runoob.com/linux/linux-command-manual.html)
