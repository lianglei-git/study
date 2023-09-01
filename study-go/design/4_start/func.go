package main

// 这里可以看到一些方法的使用，也有类似this的用法
import (
	"fmt"
	"math"
)

type Point struct{ X, Y float64 }

// A Path is a journey connecting the points with straight lines.
type Path []Point

// traditional function
func Distance(p, q Point) float64 {
	return math.Hypot(q.X-p.X, q.Y-p.Y)
}

// same thing, but as a method of the Point type
func (this Point) Distance(q Point) float64 {
	return math.Hypot(q.X-this.X, q.Y-this.Y)
}

// Distance returns the distance traveled along the path.
func (path Path) Distance() float64 {
	sum := 0.0
	for i := range path {
		if i > 0 {
			sum += path[i-1].Distance(path[i])
		}
	}
	return sum
}

func (this Path) Log(str string) {
	fmt.Println(this[0], "  <<<-  path中的log用法  ->> "+str)
}

func main() {

	// 包括这样定义函数

	func1 := func() {
		fmt.Println("你好吗")
	}

	perim := Path{
		{X: 1, Y: 1},
		{5, 1},
		{5, 4},
		{1, 1},
	}
	fmt.Println(perim.Distance()) // "12"

	func1()

	// 或者表达式可以分为两步骤

	fun222 := perim.Log
	fun222("这你受的了吗")

	// 还可以直接调用某个结构体的方法
	// 例如这样
	rLog := (Path).Log

	rLog(Path{{1999, 2018}}, "\n 这你受不了了吧！, 要通过第一个参数的变更来去传递原本的this")

	// 可以选择函数去赋值，
	// _ := func()  {

	// 	func (p Point) Add(q Point) Point { return Point{p.X + q.X, p.Y + q.Y} }
	// 	func (p Point) Sub(q Point) Point { return Point{p.X - q.X, p.Y - q.Y} }

	// 	type Path []Point

	// 	func (path Path) TranslateBy(offset Point, add bool) {
	// 		var op func(p, q Point) Point
	// 		if add {
	// 			op = Point.Add
	// 		} else {
	// 			op = Point.Sub
	// 		}
	// 		for i := range path {
	// 			// Call either path[i].Add(offset) or path[i].Sub(offset).
	// 			path[i] = op(path[i], offset)
	// 		}
	// 	}

	// }

}
