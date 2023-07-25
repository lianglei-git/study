package main

import (
	"fmt"
)

func delta(old, new int) int {
	return new - old
}
func main() {
	p := new(int)   // p, *int 类型, 指向匿名的 int 变量
	fmt.Println(*p) // "0"
	*p = 2          // 设置 int 匿名变量的值为 2
	fmt.Println(*p) // "2"

	// 内部是这样的操作！！！！！还是比较重要的
	// 用new创建变量和普通变量声明语句方式创建变量没有什么区别，
	// 除了不需要声明一个临时变量的名字外，我们还可以在表达式中使用new(T)。
	// 换言之，new函数类似是一种语法糖，而不是一个新的基础概念。
	// 下面的两个newInt函数有着相同的行为：
	// func newInt() *int {
	// 	return new(int)
	// }

	// func newInt() *int {
	// 	var dummy int
	// 	return &dummy
	// }

	// p = 2          // 设置 int 匿名变量的值为 2
	// fmt.Println(p) // "2"

	// l := 10
	// fmt.Println(**l)

	// 当然也可能有特殊情况：
	// 如果两个类型都是空的，也就是说类型的大小是0，
	// 例如struct{}和[0]int，有可能有相同的地址（依赖具体的语言实现）
	// （译注：请谨慎使用大小为0的类型，因为如果类型的大小为0的话，可能导致Go语言的自动垃圾回收器有不同的行为，
	// 具体请查看runtime.SetFinalizer函数相关文档）。

	// new函数使用通常相对比较少，因为对于结构体来说，直接用字面量语法创建新变量的方法会更灵活

	// 由于new只是一个预定义的函数，它并不是一个关键字，因此我们可以将new名字重新定义为别的类型。例如下面的例子：
	// func delta(old, new int) int { return new - old }
	fmt.Println(delta(10, 9))

}
