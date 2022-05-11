package main

import "fmt"

func main() {
   fmt.Println("Hello, World!")

   // var a = 1
   // var b = 2 
   // var c = 5
   // // var _b = "爱得深见";
   // var (
   //    _a int = 989
   //    _c bool = false
   // )
   // fmt.Println("a=",a,"b=",b,"c=",c)
   // fmt.Printf("a=%v b=%v c=%v",a,b,c)
   // fmt.Println(_a,_c)
   // fmt.Printf("_a %T", _a)


   const (
      a = iota 
      b = 3 
      c = iota
      d = "哇哈哈哈哈"
      e = iota
   )
   fmt.Printf("a: %v b: %v c: %v d: %v e: %e",a,b,c,d,e)
}