# Mysql从删库到跑路

## 什么是Mysql

mysql是一个`开源`的`关系型数据库`。

[mysql维基百科](https://zh.wikipedia.org/wiki/MySQL)

[关系型数据库维基百科](https://zh.wikipedia.org/zh-hans/%E9%97%9C%E8%81%AF%E5%BC%8F%E8%B3%87%E6%96%99%E5%BA%AB)

[NoSQL维基百科](https://zh.wikipedia.org/zh-hans/NoSQL)

[面向文档的数据库维基百科](https://zh.wikipedia.org/zh-hans/%E9%9D%A2%E5%90%91%E6%96%87%E6%AA%94%E7%9A%84%E6%95%B8%E6%93%9A%E5%BA%AB)

`MongoDB`就是一种典型的`面向文档数据库`，比起常规的键值对型数据库，这类数据库有着更为复杂的数据结构，对于层级数据的操作也有相应的优化。

## Mysql的安装

各个环境下mysql的安装方法各有不同，这里不做说明，可以各自查看自己对应系统的mysql安装方法。

windows下对于mysql的学习，可以下载phpStudy来省去环境搭建的繁琐过程，可以一键启动php+mysql+apache环境。本次分享也使用该工具作为演示环境。

## Mysql的可视化工具

我们刚开始接触mysql，可以从可视化界面开始使用，逐渐熟悉mysql的各项功能。避免从建表、索引等部分就需要查询大量代码的情况。

常用的可视化工具有：

#### Navicat

一个非常专业的关系型数据库可视化管理工具，支持6个常见的关系型数据库的可视化管理。功能非常丰富，甚至包括数据库同步、数据库格式转换、数据库模型图的生成和搭建等。

该工具是一个收费工具。

#### PHPMyAdmin

一个非常老牌的mysql可视化管理工具，拥有丰富的可视化管理功能。是一个基于PHP环境运行的web项目，免费且开源。

如果大家以前有购买过虚拟主机，应该很熟悉后台面板里的PHPMyAdmin。

本次大家实践过程中可以使用任何自己喜欢的可视化工具进行尝试，不过为了方便不能下载其他工具的同学，本次我演示过程中会使用PHPMyAdmin进行可视化操作。

## 数据库的基本使用

由于初学，我们使用可视化界面进行来熟悉基本的使用

## 数据导入导出

## nodejs中使用mysql

nodejs中可以使用`mysql2`作为mysql的连接、查询工具。如果在正式项目中使用，则可以考虑使用`sequelize`，对于应用层面数据库的相关功能都有优秀的封装（连阶层也是基于`mysql2`，支持对接各种关系型数据库的连阶层）。

## 实例演示

## SQL注入

[SQL注入维基百科](https://zh.wikipedia.org/zh-cn/SQL%E6%B3%A8%E5%85%A5)

## 服务端鉴权

服务端鉴权的方式有很多，常见的是使用`token`或者`session`来鉴权。由于`session`的使用比较简单，这里我们使用session来进行演示。

[session原理及实现共享](https://zhuanlan.zhihu.com/p/47072519)

[Token令牌的原理](https://blog.csdn.net/aaqingying/article/details/118103326)

[各种认证方式的区别](https://www.51cto.com/article/675946.html)

## 构建索引

## 分页查询

## 分组查询

## 关联查询