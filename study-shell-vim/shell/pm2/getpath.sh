#!/bin/bash
nodepath=`which node`
const_connect="/lib/node_modules/"

if [ ${#nodepath} -lt 2 ]
then
 echo "错误：请先安装node后尝试!"
 exit 1
fi

if [ ! -f ./pm2_pack.zip ];then
	echo "!错误：没有找到文件 [pm2_pack.zip] 请确认!"
	exit 1
fi


lnpath=`ls -l $nodepath`
real_node_path=''
arr=${lnpath//->/ }

for var in ${arr[@]}
do
  real_node_path=$var
done

node_modules=${real_node_path:0:${#real_node_path}-9}${const_connect}


