#!/bin/bash
. ./getpath.sh

if [ -f /usr/local/bin/pm2 ];then

    # 注销当前用户服务, 卸载当前用户服务状态
    `sudo systemctl stop pm2-$USER.service`
    `sudo systemctl kill pm2-$USER.service`
    `sudo systemctl disable pm2-$USER.service`
    `sudo systemctl daemon-reload`
    `sudo systemctl reset-failed`

    sudo rm /usr/local/bin/pm2
	echo "删除现有的pm2链接"
fi

if [ -d $node_modules/pm2 ];then
    sudo rm -r $node_modules/pm2
	echo "删除现有的pm2依赖包"
fi

if [ -d $HOME/.pm2 ]
then 
    sudo rm -r $HOME/.pm2
    echo "删除根目录 .pm2 文件夹"
fi


echo "卸载完成✅"