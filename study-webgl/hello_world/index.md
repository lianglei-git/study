## 入门
> 都是根据书里面的内容来进行联系


>ps: 这里面看似是c++的代码其实是 `glsl` 语言，里面还有很多内置的变量和方法，至少现在我不清楚，顶点着色器 和 片元着色器 这两个概念理解为物体的顶点在哪里，和物体的面要怎么处理，就此分为两个概念区分。

### 本章学习目录
1. 建立一个简单的`webgl`程序
2. 建立一个webgl画布都需要啥玩意
3. 综上所述介绍


- 建立一个简单的`webgl`程序
因为都是canvas组成的画布，真的通过最下面的文章信以为真，以为是这样创建 “第一个程序”
```js
//canvas画布
const canvas=document.getElementById('canvas');
//三维画笔
const ctx=canvas.getContext('webgl');
//设置画笔的颜色
ctx.fillStyle='red';
//用画笔画一个立方体
ctx.fillBox(20,20,300,200);
```

然后再往下看之后发现其实走了很多的业务看不懂的代码，什么`顶点着色器、片元着色器`；
一个完成的代码结构是这样的
```js
    // 顶点着色器
    const vsSource = 
    `
    void main() {
        gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
        gl_PointSize = 100.0;
    }
    `;
    // 片元着色器
    const fsSource = 
    `
    void main() {
        gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0);
    }
    `

    // canvas 画布
    const canvas = document.getElementById('canvas');
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
    // webgl画笔
    const gl = canvas.getContext('webgl');

    // 初始化着色器
    initShaders(gl, vsSource, fsSource);
    // 指定将要用来清理绘图区的颜色
    gl.clearColor(0., 0.0, 0.0, 1.0);
    // 清理绘图区
    gl.clear(gl.COLOR_BUFFER_BIT);
    // 绘制顶点
    console.log(gl)
    gl.drawArrays(gl.POINTS, 0, 1);

    function initShaders(gl,vsSource,fsSource){
        //创建程序对象
        const program = gl.createProgram();
        //建立着色对象
        const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
        const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
        //把顶点着色对象装进程序对象中
        gl.attachShader(program, vertexShader);
        //把片元着色对象装进程序对象中
        gl.attachShader(program, fragmentShader);
        //连接webgl上下文对象和程序对象
        gl.linkProgram(program);
        //启动程序对象
        gl.useProgram(program);
        //将程序对象挂到上下文对象上
        gl.program = program;
        return true;
    }

    function loadShader(gl, type, source) {
        //根据着色类型，建立着色器对象
        const shader = gl.createShader(type);
        //将着色器源文件传入着色器对象中
        gl.shaderSource(shader, source);
        //编译着色器对象
        gl.compileShader(shader);
        //返回着色器对象
        return shader;
    }
```

哦😯 天呐，小60多行代码，真够看啊。


### 参考
- [知乎-WebGL 入门](https://zhuanlan.zhihu.com/p/470401759)

