// Dup1 prints the text of each line that appears more than
// once in the standard input, preceded by its count.
package main
// 1.3. 查找重复的行

// 对文件做拷贝、打印、搜索、排序、统计或类似事情的程序都有一个差不多的程序结构：一个处理输入的循环，在每个元素上执行计算处理，在处理的同时或最后产生输出。我们会展示一个名为 dup 的程序的三个版本；灵感来自于 Unix 的 uniq 命令，其寻找相邻的重复行。该程序使用的结构和包是个参考范例，可以方便地修改

import (
    "bufio"
    "fmt"
    "os"
)

func main() {
	// 会不会是这样子： {[k: string]: int} ???
    counts := make(map[string]int)
	// fmt.Printf(counts)
    input := bufio.NewScanner(os.Stdin)
    for input.Scan() {
        counts[input.Text()]++
    }
    // NOTE: ignoring potential errors from input.Err()
    for line, n := range counts {
        if n > 1 {
			// %d          十进制整数
			// %x, %o, %b  十六进制，八进制，二进制整数。
			// %f, %g, %e  浮点数： 3.141593 3.141592653589793 3.141593e+00
			// %t          布尔：true或false
			// %c          字符（rune） (Unicode码点)
			// %s          字符串
			// %q          带双引号的字符串"abc"或带单引号的字符'c'
			// %v          变量的自然形式（natural format）
			// %T          变量的类型
			// %%          字面上的百分号标志（无操作数）

            fmt.Printf("%d\t%s\n", n, line)
        }
    }
}
// 扫描器的意思
// Scanner
