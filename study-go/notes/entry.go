// 作为最快恢复记忆的一个文件，开始吧go

// ----------------------------------------------------------

// 定义包，其他文件， import "notes"
package notes

// 注意双引号,注意引入依赖方式，比较特别，没有逗号
import (
	"fmt" 
	"os"
)

// --------------- length ---------------
// kk.length --> len() 这是个全局函数


// --------------- for ---------------
// for 循环, 结构出来左侧的
// 		for index, arg := range files  {}
// 等价于 js中的
// 		files.map((arg,index) => {})
// 或者迭代器
// 		for(const [arg,index] of files){}


// --------------- null ---------------
// null -> nil (golang)


// --------------- 写入 ---------------
// fmt.Print("9999")
// go build a.go >a.txt // 这样写入真方便

