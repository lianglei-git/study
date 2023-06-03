#!/bin/bash

. ./getpath.sh

# 解压安装包
echo "解压pm2库到npm"
sudo unzip -o ./pm2_pack.zip -d ${node_modules} > /dev/null


echo "链接pm2到全局"
sudo ln -s ${node_modules}/pm2/bin/pm2 /usr/local/bin/

echo "安装完成"

# real_node_path=${arr[${#arr[@]}-1]}
