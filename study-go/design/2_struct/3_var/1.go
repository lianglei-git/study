// // ----

// var s string
// fmt.Println(s) // ""

// // ----
// var i, j, k int                 // int, int, int
// var b, f, s = true, 2.3, "four" // bool, float64, string

// // ----
// var f, err = os.Open(name) // os.Open returns a file and an error

// // 简短声明
// anim := gif.GIF{LoopCount: nframes}
// freq := rand.Float64() * 3.0
// t := 0.0

// i := 100                  // an int
// var boiling float64 = 100 // a float64
// var names []string
// var err error
// var p Point

// i, j := 0, 1

// i, j = j, i // 交换 i 和 j 的值

// /// -----

// f, err := os.Open(name)
// if err != nil {
//     return err
// }
// // ...use f...
// f.Close()

// /// 指针

// x := 1
// p := &x         // p, of type *int, points to x
// fmt.Println(*p) // "1"
// *p = 2          // equivalent to x = 2
// fmt.Println(x)  // "2"

// var x, y int
// fmt.Println(&x == &x, &x == &y, &x == nil) // "true false false"

package main

import (
	"fmt"
)

// 一个变量对应一个保存了变量对应类型值的内存空间。普通变量在声明语句创建时被绑定到一个变量名，比如叫x的变量，但是还有很多变量始终以表达式方式引入，例如x[i]或x.f变量。所有这些表达式一般都是读取一个变量的值，除非它们是出现在赋值语句的左边，这种时候是给对应变量赋予一个新的值。

// 一个指针的值是另一个变量的地址。一个指针对应变量在内存中的存储位置。并不是每一个值都会有一个内存地址，但是对于每一个变量必然有对应的内存地址。通过指针，我们可以直接读或更新对应变量的值，而不需要知道该变量的名字（如果变量有名字的话）。

// 如果用“var x int”声明语句声明一个x变量，那么&x表达式（取x变量的内存地址）将产生一个指向该整数变量的指针，指针对应的数据类型是*int，指针被称之为“指向int类型的指针”。如果指针名字为p，那么可以说“p指针指向变量x”，或者说“p指针保存了x变量的内存地址”。同时*p表达式对应p指针指向的变量的值。一般*p表达式读取指针指向的变量的值，这里为int类型的值，同时因为*p对应一个变量，所以该表达式也可以出现在赋值语句的左边，表示更新指针所指向的变量的值。
var i = 9

func Add(p *int) int {
	*p++
	return *p
}

func main() {
	Add(&i)
	fmt.Println(i, &i)
}
