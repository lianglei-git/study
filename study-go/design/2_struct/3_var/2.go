// Echo4 prints its command-line arguments.
package main

import (
	"flag"
	"fmt"
	"strings"
)

// 调用flag.Bool函数会创建一个新的对应布尔型标志参数的变量。它有三个属性：第一个是命令行标志参数的名字“n”，然后是该标志参数的默认值（这里是false），最后是该标志参数对应的描述信息。
var n = flag.Bool("n", false, "omit trailing newline")

// 类似的，调用flag.String函数将创建一个对应字符串类型的标志参数变量，同样包含命令行标志参数对应的参数名、默认值、和描述信息。
var sep = flag.String("s", " ", "separator")

// ----
// 程序中的sep和n变量分别是指向对应命令行标志参数变量的指针，因此必须用*sep和*n形式的指针语法间接引用它们。
// ----

// 如果用户在命令行输入了一个无效的标志参数，或者输入-h或-help参数，那么将打印所有标志参数的名字、默认值和描述信息。
func main() {
	// a := 10
	// fmt.Println(*&a, "flag你永远都是对的")
	// 当程序运行时，必须在使用标志参数对应的变量之前先调用flag.Parse函数，用于更新每个标志参数对应变量的值（之前是默认值）。
	flag.Parse()
	// 对于非标志参数的普通命令行参数可以通过调用flag.Args()函数来访问，返回值对应一个字符串类型的slice。
	fmt.Print(strings.Join(flag.Args(), *sep))

	if !*n {
		fmt.Println()
	}

	// 如果在flag.Parse函数解析命令行参数时遇到错误，默认将打印相关的提示信息，然后调用os.Exit(2)终止程序。
}

// go run 2.go -help
// -n    omit trailing newline
// -s string
// 	  separator (default " ")
