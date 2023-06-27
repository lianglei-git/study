### 基础知识(use verion: 1.20)

你必须知道，go语言的基本逻辑，当然，这要在我掌握了一定的基础内容后才来重写这里。

##### Hello World
```go
    // hello.go
    package main
    // 双引号注意！！！
    // Go 语言在代码格式上采取了很强硬的态度。gofmt工具把代码格式化为标准格式
    import "fmt"
    // Go 语言不需要在语句或者声明的末尾添加分号
    func main()  {
        // 打印注意！！！
        fmt.Println("hello world")
    }
```

##### 运行
`go run *.go`

##### 二进制输出
`go build *.go`


1. 变量会在声明时直接初始化, 如果变量没有显式初始化,则被隐式地赋予其类型的 零值（zero value），数值类型是 0，字符串类型是空字符串 ""。
    ```go
        var s, sep string
        // s, sep := "", ""
        for i := 1; i < len(os.Args); i++ {
            s += sep + os.Args[i]
            sep = " "
        }
        fmt.Println(s)
    ```
2. for循环的range妙用
    ```go
        // a.go
        func main(){
            fmt.Println(os.Args[1:3]) // [nihao ma]
            // 直接截取到最后的长度，牛的
            fmt.Println(os.Args[1:]) // [nihao ma]
            fmt.Println(os.Args[1]) // nihao
            // 好屌的用法，截取索引1之前所有的子串
            fmt.Println(os.Args[:1]) // [....巴拉巴拉]

            s, sep := "", ""
            // 每次循环迭代，range 产生一对值
            // _也可以是idx，同样是下标
            for _, arg := range os.Args[1:] {
                fmt.Println(arg)
                s += sep + arg
                sep = " "
            }
            
        }
        // go run a.go nihao ma
    ```
3. 短变量声明来声明并初始化
    ```go
    s := "" // 短变量声明，最简洁，但只能用在函数内部
    // s, sep := "", "" 多变量生命
    var s string // 依赖于字符串的默认初始化零值机制，被初始化为 ""
    var s = "" // 用得很少，除非同时声明多个变量
    var s string = ""

    ```