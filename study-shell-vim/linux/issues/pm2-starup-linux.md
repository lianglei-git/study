## pm2在服务器相关问题汇总


### TODO
1. 如何在服务器环境下检测是否有注册开机自动启动?
    - 查看是否注册到系统运行中 -- 通过 pm2-root.service查看,但由于版本不同
    - 查看是否与pm2启动而启动


### pm2的基本概况
1. pm2 startup [script] PS: 可以查看 此处定义[pm2 startup](https://pm2.keymetrics.io/docs/usage/startup/)

如果是 Ubuntu 上，使用后会注册到 `pm2-root.service `里，通过



#### 测试
> 注意：此项内容均在服务器`Ubuntu`中运行，均使用管理员身份运行。


1. 测试1：使用 `pm2` 启动项目并执行 `pm2 startup`，并进行重启 执行 `systemctl status pm2-root.service`返回结果是什么？
   - 结论1: 使用sudo执行startup且直接重启后，项目仍然保留，但是保留的文件仍是上上次（两次重启前）的文件执行列表
   - 结论2: 目前看来无需执行 ` pm2 save `也可以保留当前服务列表到系统服务里
   - 结论3: 在重启后，`.pm2/dump.pm2`中会自动更新重启前一次的最新服务列表信息

2. 测试2: 基于上述结论使用（在执行`pm2 startup`后） ` pm2 save ` 会产生的返回结果是什么?
   - 结论： 会直接更新 `.pm2/dump.pm2` 文件下服务进程信息列表

#### 理论上删除

```shell
systemctl stop xxx
systemctl disable xxx
rm /etc/systemd/system/xxx
rm /etc/systemd/system/xxx symlinks that might be related
systemctl daemon-reload
systemctl reset-failed
```


#### 综上结论如下
*在特定的环境下 `Ubuntu >= 16, CentOS >= 7, Arch, Debian >= 7`*

1. 区分系统，只能在特定的系统里面使用
2. 
3. 通过执行 `systemctl status pm2-root.service` 查看进程信息
4. 根据返回结果查看是否存在 
5. 检测pm2是否安装在 yizhun 下面
6. 区分不同的username； pm2-${username}.service；
7. 

#### 参考命令代码
- 查看系统 `Unit` 所有服务项目
    ` systemctl list-unit-files`
- 查看系统已经启动的状态
    `systemctl list-unit-files |grep enabled`
- 查看单个服务状态
    ` systemctl status pm2-root.service `


### 其他

Ubuntu 中 chkconfig 已经被 sysv-rc-conf 所替代；

```shell
    apt-get update
    apt-get install sysv-rc-conf
    sysv-rc-conf --list
```


系统服务请参考[systemctl](../service-systemctl.md)