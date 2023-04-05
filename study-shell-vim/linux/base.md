### 基本


#### 远程连接

- ssh 链接
`ssh username@IP地址`
可以在服务器中使用`echo $USER`查看当前用户，使用`ifconfig`查看当前的IP是什么；
    > 如果出现 `ssh: connect to host localhost port 22: Connection refused `问题，请遵循下列步骤在服务器中查看:
    >   1. sshd 未安装`sudo apt-get install openssh-server`
    >   2. sshd 未启动 `sudo net start sshd`
    >   3. 检查防火墙设置,关闭防火墙 `sudo ufw disable   `
    >   4. 需重新启动ssh 服务 `reboot`
    >   5. 检验方法`ssh localhost`
