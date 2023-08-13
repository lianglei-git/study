// 作为最快恢复记忆的一个文件，开始吧go

// ----------------------------------------------------------

// 定义包，其他文件， import "notes"
package notes

// 注意双引号,注意引入依赖方式，比较特别，没有逗号
import (
	"fmt" 
	"os"
)


// --------------- 随机数 ---------------
// 心里种下一颗种子 达拉第大啦 rand.Seed(time.Now().UTC().UnixNano()) 
// 使用种子 rand.Intn(2) 0～2的随机数哦

// --------------- length ---------------
// kk.length --> len() 这是个全局函数


// --------------- for ---------------
// for 循环, 结构出来左侧的
		for index, arg := range files  {}
// 等价于 js中的
		files.map((arg,index) => {})
// 或者迭代器
		for(const [arg,index] of files){}


// --------------- null ---------------
null -> nil (golang)


// --------------- 写入 ---------------
fmt.Print("9999")
go build a.go >a.txt // 这样写入真方便
// 或者
fmt.Fprintf(a.out,"kakaka")

// --------------- 关键字 ---------------
break      default       func     interface   select
case       defer         go       map         struct
chan       else          goto     package     switch
const      fallthrough   if       range       type
continue   for           import   return      var

// 你需要掌握的
defer go goto fallthrough

内建常量: true false iota nil

内建类型: int int8 int16 int32 int64
          uint uint8 uint16 uint32 uint64 uintptr
          float32 float64 complex128 complex64
          bool byte rune string error

内建函数: make len cap new append copy close delete
          complex real imag
          panic recover
