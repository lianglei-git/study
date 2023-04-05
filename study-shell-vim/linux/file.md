### 文件系统


#### 远程上传文件或文件夹

- 从服务器下载文件
    `scp username@IP地址:/path/filename /a/b/localdir（本地目录）`
- 上传本地文件到服务器
    `scp /path/filename username@IP地址:/path`
- 从服务器下载整个目录
    `scp -r username@IP地址:/path/remotedir（远程目录） /a/b/localdir（本地目录）`
- 上传目录到服务器
    `scp -r local_dir username@IP地址:/path/remotedir`
/home/yizhun/docker/project/yizhun_web/pacs/www/static/


#### 切换目录 `cd` （change directory）
- 跳转至/usr/bin/ 
    `cd /usr/bin/`
- 跳转至home目录
    `cd ~ ` 或 `cd`
- 跳转至根目录
    `cd /`
- 返回进入当前目录前所在目录
    `cd -`
- 跳转至当前目录的上上层
    `cd ../..`

####  Other

- 通过端口查看进程信息
    `lsof -i:端口号`
- 查看相关应用名称进行信息
    `ps -ef|grep node`
- 杀死进程
    `kill -s 9 PID`
