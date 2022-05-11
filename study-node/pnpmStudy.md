 ### pnpm 学习（workspace）

 我的掌握，还没有认真的读他的问题当，目前用法也和其他人有所不同,我至死简单的了解，并非全都概括。我并不想搞什么步骤，我把我觉得重要的东西拉出来； 嗯.... 就这样

 需要一个 `pnpm-workspace.yaml`的文件。

在最外层启动所有的项目（md也就这么说吧，没有那么智能）【2种办法】：
**单个**
1. pnpm -C [路径] [cmd] `🌰 pnpm -C ./packages/core start`
2. pnpm --filter=[子包] [cmd]  `🌰 pnpm --filter=core start`

> ps:  package.json中script中 '&&' 和 '&'； 前者先后执行， 后者并行
**多个**
1. pnpm -C [路径] [cmd] & pnpm -C [路径] [cmd]  & pnpm -C [路径] [cmd] 
2. pnpm --filter='*' [cmd] 或 pnpm --filter=core start --filter=ttt dev --filter=modules build

命令：
`pnpm i vue --filter=core` // 根目录往子项目中添加依赖包
`pnpm add 其他子包名称(是package.json中的name)` 在子项目的文件夹中加入其它的子项目；上面的套路同样适合添加子依赖包；

pnpm会先找寻本地的所有依赖项（当前根目录下）；然后没有再去找远程。

`pnpm link`的意思就是链接（类似快捷方式）一份其它的项目包进来自己项目， 硬连接;
这几个就够了




