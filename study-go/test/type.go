package main 

import (
	"fmt" 
    "unsafe"
)


func main(){
	var a int64 = 888
	fmt.Println(unsafe.Sizeof(a))
	
	var b uint8 = 210
	fmt.Printf("b=%v 类型=%T",b,b)
	
}