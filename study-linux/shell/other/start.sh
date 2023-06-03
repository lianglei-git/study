#!/bin/bash

# linux 安装程序，主要是目录操作，权限操作，问答模式
echo "安装Linux 版本 AI工作站"

appName="AI工作站"
dirName="AI工作站-linux-x64"
base_app_path="$dirName/resources/app"
install_path="$HOME/yzpacs_db"
mvAfter_app_path="$install_path/$base_app_path"
desktop_path="$HOME/Desktop"

iconName=""

# 限于ubuntu 20.04 版本以下使用

# 修改 dirName 权限
if [ -d "$dirName" ];then
# echo $USER $HOME
`sudo chown -R $USER:$USER $dirName`
fi

# 修改config权限
if [ ! -d "$HOME/.config" ];then
`sudo chown -R $USER:$USER $HOME/.config/`
fi

# 创建 yzpacs_db 文件夹
if [ ! -d "$install_path" ];then
`mkdir $install_path`
else
`sudo chown -R $USER:$USER $install_path`
fi

# 删除 AI工作站-linux-x64 文件夹
# if [ -d "$install_path/$dirName" ];then
# `rm -r $install_path/$dirName`
# fi

# 删除桌面软连接
if [ -h "$desktop_path/$appName.desktop" ];then
`rm $desktop_path/$appName.desktop`
fi

writeDesktopFile(){
    content="[Desktop Entry]\nName=$appName\n"
    append="Exec=$install_path/$dirName/$appName\nType=Application\nIcon=$install_path/$base_app_path/$iconName.ico"
    echo -e "$content$append" > $mvAfter_app_path/$appName.desktop
    # if [ ! -f $mvAfter_app_path/$appName.desktop ];then
    # fi
}


function echoHelp(){
    echo -e "linux 配置文件路径: \n $mvAfter_app_path/constant/config-mg-electron.json"
    echo -e "配置文件信息: \n \n"
    # echo "" > $mvAfter_app_path/constant/config-mg-electron.json
    echo -e "$(<$mvAfter_app_path/constant/config-mg-electron.json)"
}

ln_app(){
    `ln -s $mvAfter_app_path/$appName.desktop $desktop_path`
    echo "已输出到桌面"
}

select_ln_app(){
    bol=true
    while "$bol"
    do
        read -r -p "应用是否输出到桌面？[Y/n]" input
        case $input in
            [yY][eE][sS]|[yY])
                bol=false
                ln_app
                echoHelp
                exit 1
                ;;

            [nN][oO]|[nN])
                bol=false
                echoHelp
                exit 1
                ;;
            *)
                echo "输入错误🙅，请重新输入"
                ;;
        esac
    done
}


install(){
    # `sudo chmod -R 777 ./$dirName`
    `sudo chown -R $USER:$USER ./$dirName`
    `cp -r -f ./$dirName/ $install_path/`
    writeDesktopFile
    `sudo chmod a+x $mvAfter_app_path/$appName.desktop`
    select_ln_app
}

install_nova(){
    iconName="favicon-active"
    echo "nova版本"
    # `rm $base_app_path/favicon.ico`
    # `mv $base_app_path/favicon.ico $base_app_path/favicon-activ.ico`
    # `mv $base_app_path/favicon-active.ico $base_app_path/favicon.ico`
    # `mv $base_app_path/favicon-activ.ico $base_app_path/favicon-active.ico`
}

# 只有文件图标不同
install_edison(){
    iconName="favicon"
    echo "edison版本"
}



# edison nova
PS3="选择安装版本（输入序列号）："
store=("edison" "nova")
select ev in "${store[@]}"; do
    case $ev in
        "edison")
            install_edison
            install
            ;;
        "nova")
            install_nova
            install
            ;;
        *) echo "无效选项 $REPLY";;
    esac
done
