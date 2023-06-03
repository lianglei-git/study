


### systemctl 

#### Unit 一共分成12种。
- Service unit：系统服务
- Target unit：多个 Unit 构成的一个组
- Device Unit：硬件设备
- Mount Unit：文件系统的挂载点
- Automount Unit：自动挂载点
- Path Unit：文件或路径
- Scope Unit：不是由 Systemd 启动的外部进程
- Slice Unit：进程组
- Snapshot Unit：Systemd 快照，可以切回某个快照
- Socket Unit：进程间通信的 socket
- Swap Unit：swap 文件
- Timer Unit：定时器


systemctl status [service]
systemctl enable [service]
systemctl is-enable [service]
systemctl stop [service]
systemctl disable [service]
systemctl daemon-reload
systemctl reset-failed
systemctl list-units
systemctl list-units-files

```shell
# 重启系统
$ sudo systemctl reboot

# 关闭系统，切断电源
$ sudo systemctl poweroff

# CPU停止工作
$ sudo systemctl halt

# 暂停系统
$ sudo systemctl suspend

# 让系统进入冬眠状态
$ sudo systemctl hibernate

# 让系统进入交互式休眠状态
$ sudo systemctl hybrid-sleep

# 启动进入救援状态（单用户状态）
$ sudo systemctl rescue


# 查看启动耗时
$systemd-analyze                                                                                       

# 查看每个服务的启动耗时
$ systemd-analyze blame

# 显示瀑布状的启动过程流
$ systemd-analyze critical-chain

# 显示指定服务的启动流
$ systemd-analyze critical-chain atd.service

# 列出正在运行的 Unit
$ systemctl list-units

# 列出所有Unit，包括没有找到配置文件的或者启动失败的
$ systemctl list-units --all

# 列出所有没有运行的 Unit
$ systemctl list-units --all --state=inactive

# 列出所有加载失败的 Unit
$ systemctl list-units --failed

# 列出所有正在运行的、类型为 service 的 Unit
$ systemctl list-units --type=service

```


####  Unit 的状态
```shell

# 显示系统状态
$ systemctl status

# 显示单个 Unit 的状态
$ sysystemctl status bluetooth.service

# 显示远程主机的某个 Unit 的状态
$ systemctl -H root@rhel7.example.com status httpd.service

```

#### Unit 管理
```shell

# 立即启动一个服务
$ sudo systemctl start apache.service

# 立即停止一个服务
$ sudo systemctl stop apache.service

# 重启一个服务
$ sudo systemctl restart apache.service

# 杀死一个服务的所有子进程
$ sudo systemctl kill apache.service

# 重新加载一个服务的配置文件
$ sudo systemctl reload apache.service

# 重载所有修改过的配置文件
$ sudo systemctl daemon-reload

# 显示某个 Unit 的所有底层参数
$ systemctl show httpd.service

# 显示某个 Unit 的指定属性的值
$ systemctl show -p CPUShares httpd.service

# 设置某个 Unit 的指定属性
$ sudo systemctl set-property httpd.service CPUShares=500

```

#### Unit 的配置文件
每一个 Unit 都有一个配置文件，告诉 Systemd 怎么启动这个 Unit 。

Systemd 默认从目录/etc/systemd/system/读取配置文件。但是，里面存放的大部分文件都是符号链接，指向目录/usr/lib/systemd/system/，真正的配置文件存放在那个目录。

systemctl enable命令用于在上面两个目录之间，建立符号链接关系。
```shell
$ sudo systemctl enable clamd@scan.service
# 等同于
$ sudo ln -s '/usr/lib/systemd/system/clamd@scan.service' '/etc/systemd/system/multi-user.target.wants/clamd@scan.service'

```

如果配置文件里面设置了开机启动，systemctl enable命令相当于激活开机启动。

与之对应的，systemctl disable命令用于在两个目录之间，撤销符号链接关系，相当于撤销开机启动。
```shell
$ sudo systemctl disable clamd@scan.service
```
配置文件的后缀名，就是该 Unit 的种类，比如sshd.socket。如果省略，Systemd 默认后缀名为.service，所以sshd会被理解成sshd.service。

#### 配置文件的状态
```shell
# 列出所有配置文件
$ systemctl list-unit-files

# 列出指定类型的配置文件
$ systemctl list-unit-files --type=service
```
这个命令会输出一个列表。
```shell
$ systemctl list-unit-files

UNIT FILE              STATE
chronyd.service        enabled
clamd@.service         static
clamd@scan.service     disabled
```
这个列表显示每个配置文件的状态，一共有四种。

- enabled：已建立启动链接
- disabled：没建立启动链接
- static：该配置文件没有[Install]部分（无法执行），只能作为其他配置文件的依赖
- masked：该配置文件被禁止建立启动链接
注意，从配置文件的状态无法看出，该 Unit 是否正在运行。这必须执行前面提到的systemctl status命令。

一旦修改配置文件，就要让 SystemD 重新加载配置文件，然后重新启动，否则修改不会生效。
```shell
$ sudo systemctl daemon-reload
$ sudo systemctl restart httpd.service
```



#### linux systemctl自启 DEMO
// 在etc/systemd/system/文件夹下建立test.service
```test.service
[Unit]
Description=TEST_LIANGLEI
After=network.target

[Service]
Type=forking
ExecStart=/home/yizhun/nodejs/node-v12.5.0-linux-x64/bin/node /home/yizhun/nodejs/app.js
ExecStop=/usr/bin/pkill node
ExecReload=/home/yizhun/nodejs/node-v12.5.0-linux-x64/bin/node /home/yizhun/nodejs/app.js

[Install]
WantedBy=multi-user.target
```
- 执行 systemctl daemon-reload 重新加载服务文件
- 启动 systemctl start test.service
- 加入开机自启 systemctl enable test.service
- 重启 sudo systemctl reboot



#### 日志管理
Systemd 统一管理所有 Unit 的启动日志。带来的好处就是，可以只用journalctl一个命令，查看所有日志（内核日志和应用日志）。日志的配置文件是/etc/systemd/journald.conf。
`journalctl功能强大，用法非常多。`


```shell

# 查看所有日志（默认情况下 ，只保存本次启动的日志）
$ sudo journalctl

# 查看内核日志（不显示应用日志）
$ sudo journalctl -k

# 查看系统本次启动的日志
$ sudo journalctl -b
$ sudo journalctl -b -0

# 查看上一次启动的日志（需更改设置）
$ sudo journalctl -b -1

# 查看指定时间的日志
$ sudo journalctl --since="2012-10-30 18:17:16"
$ sudo journalctl --since "20 min ago"
$ sudo journalctl --since yesterday
$ sudo journalctl --since "2015-01-10" --until "2015-01-11 03:00"
$ sudo journalctl --since 09:00 --until "1 hour ago"

# 显示尾部的最新10行日志
$ sudo journalctl -n

# 显示尾部指定行数的日志
$ sudo journalctl -n 20

# 实时滚动显示最新日志
$ sudo journalctl -f

# 查看指定服务的日志
$ sudo journalctl /usr/lib/systemd/systemd

# 查看指定进程的日志
$ sudo journalctl _PID=1

# 查看某个路径的脚本的日志
$ sudo journalctl /usr/bin/bash

# 查看指定用户的日志
$ sudo journalctl _UID=33 --since today

# 查看某个 Unit 的日志
$ sudo journalctl -u nginx.service
$ sudo journalctl -u nginx.service --since today

# 实时滚动显示某个 Unit 的最新日志
$ sudo journalctl -u nginx.service -f

# 合并显示多个 Unit 的日志
$ journalctl -u nginx.service -u php-fpm.service --since today

# 查看指定优先级（及其以上级别）的日志，共有8级
# 0: emerg
# 1: alert
# 2: crit
# 3: err
# 4: warning
# 5: notice
# 6: info
# 7: debug
$ sudo journalctl -p err -b

# 日志默认分页输出，--no-pager 改为正常的标准输出
$ sudo journalctl --no-pager

# 以 JSON 格式（单行）输出
$ sudo journalctl -b -u nginx.service -o json

# 以 JSON 格式（多行）输出，可读性更好
$ sudo journalctl -b -u nginx.serviceqq
 -o json-pretty

# 显示日志占据的硬盘空间
$ sudo journalctl --disk-usage

# 指定日志文件占据的最大空间
$ sudo journalctl --vacuum-size=1G

# 指定日志文件保存多久
$ sudo journalctl --vacuum-time=1years

```


### Q&A
1. [2023/4/4] 出现开启自启异常；因为开启注册的service文件命令是不同用户的操作，可能会导致没办法及时运行，所以就添加了一个“RestartSec”的字段，在“pm2源码中systemel.tpl里面”。[具体参考](./linux/service-systemctl-config.md)；

### 参考文献

- [linux systemctl删除失效的服务单元](https://www.cnblogs.com/liwenchao1995/p/16908788.html)
- [systemd官网](https://www.freedesktop.org/software/systemd/man/systemd.unit.html)
- [systemd](https://www.cnblogs.com/zwcry/p/9602756.html)
- [linux下如何删除服务](https://www.yisu.com/zixun/690236.html#:~:text=%E4%B8%8B%E9%9D%A2%E5%B0%B1%E8%AE%A9%E5%B0%8F%E7%BC%96%E6%9D%A5%E5%B8%A6%E5%A4%A7%E5%AE%B6%E5%AD%A6%E4%B9%A0%E2%80%9Clinux%E4%B8%8B%E5%A6%82%E4%BD%95%E5%88%A0%E9%99%A4%E6%9C%8D%E5%8A%A1%E2%80%9D%E5%90%A7%21%20%E5%88%A0%E9%99%A4%E6%9C%8D%E5%8A%A1%E7%9A%84%E6%96%B9%E6%B3%95%EF%BC%9A1%E3%80%81%E4%BD%BF%E7%94%A8%E2%80%9Cservice%20%E6%9C%8D%E5%8A%A1%E5%90%8D,stop%E2%80%9D%E5%91%BD%E4%BB%A4%E5%81%9C%E6%AD%A2%E6%9C%8D%E5%8A%A1%EF%BC%9B2%E3%80%81%E4%BD%BF%E7%94%A8%E2%80%9Crm%20-rf...%E2%80%9D%E5%91%BD%E4%BB%A4%E6%B8%85%E7%90%86%E8%BF%9B%E7%A8%8B%E8%B5%84%E6%BA%90%EF%BC%88%E5%A6%82%E5%AE%89%E8%A3%85%E6%96%87%E4%BB%B6%EF%BC%89%EF%BC%9B3%E3%80%81%E4%BD%BF%E7%94%A8%E2%80%9Cchkconfig%20%E2%80%93del%20%E6%9C%8D%E5%8A%A1%E5%90%8D%E2%80%9D%E5%91%BD%E4%BB%A4%E5%88%A0%E9%99%A4%E6%8C%87%E5%AE%9A%E6%9C%8D%E5%8A%A1%EF%BC%9B4%E3%80%81%E5%88%A0%E9%99%A4%E6%9C%8D%E5%8A%A1%E5%90%AF%E5%8A%A8%E6%96%87%E4%BB%B6%E5%8D%B3%E5%8F%AF%E3%80%82)
