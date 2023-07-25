## 关于Docker应用的临时抱佛脚
**🔜 你需要知道的东西**
> &emsp; 你再次看到的时候，仍旧可以按照下列的步骤在短暂的时间内恢复到入门开发者使用docker的状态。  
> &emsp; First of all, you need to origin knowledge. 这有利于你恢复编程思维和一定程度的编程能力。
> 
**🚗 进入正题** 

&emsp; 你必须要掌握的几个概念和应用： 镜像(Image)、容器(container)、仓库(repository)。与其之产物 --> `Docker Desktop`;  
&emsp; 如果你没有耐心的话，我况且直接把一个项目的基本运用写个逻辑系统：   
- 创建适应的Dockerfile文件「可以在下面看到一些配置和介绍」
- 创建镜像，运行镜像。


> 故事带入🍳: 一个人买了一台电脑，在这台电脑的软件商店上装了很多个不同的软件（chrome、Vmware、Wps等）。当然如果这个人是一个开发者的话，可以用QT（c++、python）来开发属于自己的App程序。
当然，这个人可以买10台、20台更多台。

- 镜像「Image」  
  `代表一个人买了电脑，不唯一性`，下面是一些基本命令
   ```shell
    # 生成镜像
    docker build -t [项目名] .
    ## 查看镜像
    docker images
    ## 删除镜像
    docker rmi [镜像id]
    ```

- 容器「Container」  
  `代表一个人在电脑上装了很多个app`  
    ```shell
    # 生成并启动容器
    docker run -d --name [项目名] -v /home/www[项目名]:/app/[容器静态目录] -p [映射端口号]:3000 [项目名]
    ## 更新一直启动
    docker update --restart=always [项目名]
    ## 查看容器
    docker ps -a
    ## 停止容器
    docker stop [项目名]
    ## 删除容器
    docker rm [项目名]
    ## 进入容器
    docker exec -it [项目名] sh
    ```

- 仓库「Repository」  
  `软件商店,像github一样，有私有，有公共`

------------ 

1. Dockerfile 的本质就是命令集结号
2. 通过一些命令可以运行一个容器，或者镜像。


**🪐 Dockerfile** 

**🍇 docker-compose**  
  可以做到，一个镜像直接打包几个容器!
 ```v
// 工程目录
+ compose 
    + go
        - Dockerfile //可以进入去看看 都在这层目录
        - main.go
    + python
        - requirements.txt
        - app.py
        - Dockerfile //可以进入去看看
    - docker-compose.yml // 也进去看看吧
```

 - 命令
    1. `docker-compose up -d` 运行并后台运行
    2. `docker-compose stop` 停止lo

#### 其他
- 进入镜像命令： `docker run -it 镜像名字 /bin/bash`
- 查看所有镜像： `docker images `; Docker Images 可以被视为固定的 Docker 容器, 用于创建和启动 Docker 容器
- 查看所有镜像   `docker ps `;：Docker Ps 可以帮助您检查正在运行的容器的状态和配置信息以及与之相关联的信息等

1. docker run - 运行一个容器
2. docker stop - 停止一个容器
3. docker ps - 列出所有正在运行的容器
4. docker images - 列出所有镜像
5. docker pull - 从仓库中拉取镜像
6. docker rmi - 删除指定的镜像
7. docker build - 从Dockerfile构建镜像
8. docker inspect - 查看容器的详细信息
9. docker logs - 查看容器的日志
10. docker exec - 在容器中执行命令
11. docker port - 查看容器的端口映射
12. docker rm - 删除指定的容器
13. docker restart - 重启指定的容器
14. docker kill - 强制停止指定的容器
15. docker tag - 给镜像打标签
16. docker push
