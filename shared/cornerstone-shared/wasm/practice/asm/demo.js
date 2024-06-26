// 大家详情请去参考：（停留在2014年秋天的官网）http://asmjs.org/spec/latest/
// 以及： https://www.cnblogs.com/TO-WW/p/4891953.html
/**-------------------------------  Part 1 ------------------------------ */
var a = 1;

var x = a | 0;  // x 是32位整数
var y = +a;  // y 是64位浮点数

/**
    上面代码中，变量x声明为整数，y声明为浮点数。支持 asm.js 的引擎一看到x = a | 0，
    就知道x是整数，然后采用 asm.js 的机制处理。如果引擎不支持 asm.js 也没关系，
    这段代码照样可以运行，最后得到的还是同样的结果。
 */




/**-------------------------------  Part 2 ------------------------------ */

// 写法一
var first = 5;
var second = first;

// 写法二
var first = 5;
var second = first | 0; // x 是32位整数 --》 减少类型判断

// 上面代码中，写法一是普通的 JavaScript，变量second只有在运行时才能知道类型，这样就很慢了，
// 写法二是 asm.js，second在声明时就知道是整数，速度就提高了。



/**-------------------------------  Part 3 ------------------------------ */

function pow(a, b) {
  a = +a;
  b = b|0; // int 32位整数

  var result = 1.0;// 浮点类型
  for (; b > 0; b = b - 1 | 0) {
    result = result * a; // 累乘
  }

  return +result; // 双精度浮点
}

var result = pow(2, 10);