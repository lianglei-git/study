// Echo1 prints its command-line arguments.
// 1.2. 命令行参数
package main

import (
    "fmt"
    "os"
)

// func main() {
// 	// 变量会在声明时直接初始化
//     var s, sep string
//     for i := 1; i < len(os.Args); i++ {
//         s += sep + os.Args[i]
//         sep = " "
//     }
//     fmt.Println(s)
// }

func main() {
	fmt.Println(os.Args[:1])
    s, sep := "", ""
    for _, arg := range os.Args[1:] {
		fmt.Println(arg)
        s += sep + arg
        sep = " "
    }
}

// go run os.go nihao duima