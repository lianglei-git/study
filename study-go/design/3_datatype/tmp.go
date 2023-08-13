package datatype

import (
	"fmt"
)

// 数组
var a [3]int        
fmt.Println(a[0])        // print the first element
fmt.Println(a[len(a)-1])     
var q [3]int = [3]int{1, 2, 3}
fmt.Println(q[4]) // "0"
for i, v := range a {
    fmt.Printf("%d %d\n", i, v)
}
