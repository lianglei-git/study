### 基于基层系统的命令
如关机、重启什么的



**init runlevel systemctl get-default 区别**
init 可以手动进入系统运行级别
runlevel 可以查看现在运行级别 返回数字
systemctl get-default 是设置 开机后自动进入什么运行级别

**关机命令**
```shell
init 0          # 关机，也就是调用系统的0级别
halt            # 关机
poweroff        # 关机
shutdown -h 0   # 关机
shutdown -h now # 立即关机
shutdown -h +15 # 15分钟后关机
```
**重启命令**
```shell
init 6 # 立即重启，也就是调用系统的6级别
reboot # 立即重启
shutdown -r 0 
shutdown -r now # 立即重启
shutdown -r +15 # 15分钟后重启
shutdown -r 16：30 # 16：30重启，占用前台
shutdown -r 16：30& # 16：30重启，&将重启命令放在后台
```

**取消shutdown关机、重启**
```shell
shutdown -c
```



[systemctl](./service-systemctl.md)
[运行级别](./service-runlevel.md)