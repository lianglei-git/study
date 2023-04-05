## 介绍

Systemctl是linux系统继init.d之后的一个systemd工具，主要负责控制systemd系统和管理系统服务

systemd即为system daemon,是linux下的一种init软件

有时我们将自定义程序注册为systemd service 进程管理交由系统管理，可以方便启动停止，亦可以实现
服务异常退出重启,开机自启动。 减少自定义程序服务管理的时间消耗。

## 参数

了解systemctl service自定义注册服务的一些参数：  
`systemctl管理的服务脚本存放在/usr/lib/systemd/ 有user与systemd区分需要开机自启动存放在system目录下：/usr/lib/systemd/system
并且服务的脚本一般以.service结尾`

例如：
*sshd 登录系统服务， 查看定义systemctl cat sshd*

```shell
# /usr/lib/systemd/system/sshd.service

[Unit]
Description=OpenSSH server daemon
Documentation=man:sshd(8) man:sshd_config(5)
After=network.target sshd-keygen.service
Wants=sshd-keygen.service
 
[Service]
EnvironmentFile=/etc/sysconfig/sshd
ExecStart=/usr/sbin/sshd -D $OPTIONS
ExecReload=/bin/kill -HUP $MAINPID
KillMode=process
Restart=on-failure
RestartSec=42s
 
[Install]
WantedBy=multi-user.target
```

可以看到service文件一般由：**[Unit]、[Service]和[Install]** 三部分组成  

> 官方分为：**[Unit]、[unit type] 和[Install]**
unit type 如果一个单元具有特殊类型定义则将它们定义在类型命名之后，比如Service定义为[Service]

1. [Unit]
主要是对这个服务的说明，内容， 文档介绍以及对一些依赖服务定义

2. [Service]
服务的主体定义，主要定义服务的一些运行参数，及操作动作

3. [Install]
服务安装的相关设置，一般可设置为多用户的

#### 具体参数：
**[Unit]**
- Description 服务描述，作为systemctl status 命令输出的一个介绍  
- Documentation 一个url 定义服务的具体介绍网址  
- After 在什么服务启动之后  
- Before 在什么服务启动之前启动  
- Requires 依赖其他的单元服务， 需要与列出的服务一起激活，若任何服务无法启动，则该单元不会被激活  
- Wants 比Requires依赖性弱，弱其他服务没有启动成功，该服务也不受影响，只是表示一种推荐  

**[Service]**
Type
1. simple默认参数，进程作为主进程
2. forking是后台运行的形式，主进程退出，os接管子进程
3. oneshot 类似simple，在开始后续单元之前，过程退出
4. DBUS 类似simple，但随后的单元只在主进程获得D总线名称之后才启动
5. notify 类似simple，但是随后的单元仅在通过sd_notify()函数发送通知消息之后才启动
6. idle类似simple，服务二进制文件的实际执行被延迟到所有作业完成为止，不与其他服务的输出相混合,如状态输出与服务的shell输出混合

>以上的类似simple指的是类似simple将启动进程作为主进程进行运行

- User设置服务运行的用户,
- Group 设置服务运行的用户组,
-  PIDFile
    - 为存放PID的文件路径, 对于type设置为forking建议使用该项。 systemd will read
    - the PID of the main process of the daemon after start-up of the service. systemd will not write to the file configured here,
    - although it will remove the file after the service has shut down if it still exists.
- ExecStart
    - 服务的具体运行命令,ExecStartPre和ExecStartPost指定在ExecStart前后执行的自定义命令。
    - 若使用Type = OnHead可以指定多个自定义命令，将依次执行这些命令。
- ExecReload 为重启命令，重新加载的动作， 重新加载时执行的命令或者脚本
- ExecStop 为停止命令，停止时要执行的命令或脚本

- ExecStartPre：启动服务之前执行的命令
- ExecStartPost：启动服务之后执行的命令
- ExecStopPost：停止服务之后执行的命令

- Restart
    - 定义何种情况Systemd会自动重启当前服务，值：
    - 包括always（总是重启）、no 、on-success、on-failure、on-abnormal、on-abort、on-watchdog
    - 对于守护进程，推荐设为on-failure。对于那些允许发生错误退出的服务，可以设为on-abnormal

- RestartSec
    - 设置在重启服务(Restart=)前暂停多长时间。 默认值是100毫秒(100ms)。 如果未指定时间单位，那么将视为以秒为单位。 例如设为"20"等价于设为"20s"。


- TimeoutStartSec
    - 等待启动的时间。如果守护进程服务没有在配置的时间内发送启动完成的信号，则该服务将被认为失败， 服务将退出。
    - 以秒为单位， “0”来禁用。默认为， 默认使用DefaultTimeoutStartSec，
    - 若使用Type=oneshot，则该模式默认情况下超时是禁用的

- TimeoutStopSec:等待关闭的超时时间

- TimeoutSec=快速配置TimeoutStartSec和TimeoutStopSec时间

- KillMode
    - control-group（默认值）：当前控制组里面的所有子进程，都会被杀掉
    - process：只杀主进程
    - mixed：主进程将收到 SIGTERM 信号，子进程收到 SIGKILL 信号
    - none：没有进程会被杀掉，只是执行服务的 stop 命令。

- Environmen: 指定环境变量
- PrivateTmp=True
    - 表示给服务分配独立的临时空间
    - 注意：[Service]部分的启动、重启、停止命令必须使用绝对路径，使用相对路径则会报错

- KillSignal
    - 服务的所有进程都将会根据 KillSignal= 的设置被立即全部杀死。 与 ExecReload= 一样

**[Install]**
- RequiredBy 依赖该服务的服务列表
- WantedBy 表示该服务所在的 Target， multi-user.target 可以设置为多用户模式具体参考手册systemd.unit(5)

服务状态列表：
- loaded 系统服务已经初始化完成，加载过配置
- actvie(running) 正常运行
- actvie(exited) 正常结束的服务，
- active(waitting) 正在执行当中， 等待其他的事件才继续处理
- inactive 服务关闭
- enabled 服务开机启动
- disabled 服务开机不自启
- static 服务开机启动项不可被管理
- falied 系统配置错误

>Systemd 统一管理所有 Unit 的启动日志。
journalctl命令查看所有日志(内核日志和应用日志)
日志的配置文件是/etc/systemd/journald.conf

---------

##### 示例

运行shell的一个示例：

```shell
# .service文件：
[Unit]
Description=my test service
After=network.target remote-fs.target nss-lookup.target
 
[Service]
Type=simple
PIDFile=/tmp/my.pid
ExecStartPre=/usr/bin/rm -f /tmp/my.pid
ExecStart= /usr/sbin/test.sh
KillSignal=SIGQUIT
TimeoutStopSec=5
KillMode=process
PrivateTmp=true
 
#[Install]
#WantedBy=multi-user.target
```



```sh
# .shell文件test.sh：
#!/bin/bash
while true
do
   echo `date`,"ok" >>/tmp/result.log
done
```

> 注意#!/bin/bash是必须的，否则会提示203错误异常，服务启动失败

 

**SYSTEMCTL设置自动重启
1.最简单的自动重启范例**
```shell
[Unit]
Description=mytest
 
[Service]
Type=simple
ExecStart=/root/mytest.sh
Restart=always
RestartSec=5
StartLimitInterval=0
 
[Install]
WantedBy=multi-user.target
```

**重点参数详解**

- Restart=always: 只要不是通过systemctl stop来停止服务，任何情况下都必须要重启服务，默认值为no

- RestartSec=5: 重启间隔，比如某次异常后，等待5(s)再进行启动，默认值0.1(s)

- StartLimitInterval: 无限次重启，默认是10秒内如果重启超过5次则不再重启，设置为0表示不限次数重启

**2.案例需求**
需求：有个业务，当程序因受到OOM而退出的时候，不希望自动重启（此时需要人工介入排查），其他情况下可以自动重启

分析：OOM就是通过kill -9来杀进程，因此只要找到方法，告诉systemd当该服务遇到kill -9时候不自动重启即可

**3.RestartPreventExitStatus参数**
查询man systemd.service发现，systemd的[Service]段落里支持一个参数，叫做RestartPreventExitStatus

该参数从字面上看，意思是当符合某些退出状态时不要进行重启。

该参数的值支持exit code和信号名2种，可写多个，以空格分隔，例如

RestartPreventExitStatus=143 137 SIGTERM SIGKILL

表示，当退出情况只要符合以下4种情况中任意一种时候，则不再进行重启

exit code为143

exit code为137

信号为TERM

信号为KILL

但具体如何使用，请继续往下看

**4.测试方法**
/usr/lib/systemd/system/mytest.service
```shell
[Unit]
Description=mytest
 
[Service]
Type=simple
ExecStart=/root/mem
Restart=always
RestartSec=5
StartLimitInterval=0
RestartPreventExitStatus=SIGKILL
 
[Install]
WantedBy=multi-user.target
 ```

```c

/root/mem.c（不断消耗内存直至发生OOM）

#include <stdio.h>
#include <malloc.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
 
  int main ()
  {
      char *p = NULL;
      int count = 1;
      while(1){
          p = (char *)malloc(1024*1024*100);
          if(!p){
              printf("malloc error!n");
              return -1;
          }
          memset(p, 0, 1024*1024*100);
          printf("malloc %dM memoryn", 100*count++);
          usleep(500000);
      }
   }
```
编译及执行

- `gcc -o /root/mem /root/mem.c`
- `systemctl daemon-reload`
- `systemctl start mytest`
 

**5.测试结果**
```log
[root@fzxiaomange ~]# systemctl status mytest  
● mytest.service - mytest
    Loaded: loaded (/usr/lib/systemd/system/mytest.service; disabled; vendor preset: disabled)
    Active: failed (Result: signal) since Sat 2018-10-20 23:32:24 CST; 45s ago
Process: 10555 ExecStart=/root/mem (code=killed, signal=KILL)
Main PID: 10555 (code=killed, signal=KILL)


Oct 20 23:31:55 fzxiaomange.com systemd[1]: Started mytest.
Oct 20 23:31:55 fzxiaomange.com systemd[1]: Starting mytest...
Oct 20 23:32:24 fzxiaomange.com systemd[1]: mytest.service: main process exited, code=killed, status=9/KILL
Oct 20 23:32:24 fzxiaomange.com systemd[1]: Unit mytest.service entered failed state.
Oct 20 23:32:24 fzxiaomange.com systemd[1]: mytest.service failed.
```

重点看上面第6行 MainPID:10555(code=killed,signal=KILL)，这行表示主进程的状态，常见有2种情况

code=exited, status=143：表示systemd认为主进程自行退出的，exit code为143

code=killed, signal=KILL：表示systemd认为主进程是被kill的，接收到的信号是SIGKILL

等待5秒后，并没有自动重启，符合预期

此时将RestartPreventExitStatus=SIGKILL改为RestartPreventExitStatus=SIGTERM

执行systemctl restart mytest，再进行一次观察，等待5秒后，服务自动重启，符合预期

**6.注意事项**
6.1.RestartPreventExitStatus与Restart的关系
配置RestartPreventExitStatus=后，并没有完全忽略Restart=，而是指当退出情况与RestartPreventExitStatus=匹配的时候，才忽略Restart=，若没有匹配，根据Restart=该怎么样还怎么样（具体详见后面的详细测试数据）

6.2.kill子进程会是什么情况
若systemd启动的不是一个简单进程，而是会派生子进程的情况（比如执行shell脚本，shell脚本里启动多个程序），那么当另外开一个窗口通过 kill-信号测试时，会是什么情况呢，先贴出测试方法

ExecStart=/root/mem改为ExecStart=/root/mytest.sh

/root/mytest.sh内容为

 #!/bin/bash

 sleep 100000 &

 sleep 200000

测试结果

若kill 主进程PID（kill不带参数），则主进程状态为 code=killed,signal=TERM

若kill -9 主进程PID，则主进程状态为 code=killed,signal=KILL

若kill 最后一个子进程PID（kill不带参数），则systemd不认为是接收到信号，而是根据最后一个进程的exit code进行处理，此时主进程状态为 code=exited,status=143

若kill -9 最后一个子进程PID，此时主进程状态为 code=exited,status=137

7.详细测试数据
上面有提到RestartPreventExitStatus和Restart的关系，但没有数据说明

另外，kill和kill -9的区别，也需要有一份数据说明

因此做了一个详细对比，这里附上详细数据



 

systemd 日志重定向
```shell
[Unit]
Description=agent server daemon
After=network.target
[Service]
Type=simple
ExecStart=/bin/sh -c '/usr/local/artifacts/agent/bin/-agent -c /usr/local/artifacts/agent/conf/cfg.agent.json 1>>/usr/local/artifacts/agent/logs/out.log 2>&1'
Restart=on-failure
 
[Install]
WantedBy=multi-user.target
```
注意文件夹事先实现创建！！