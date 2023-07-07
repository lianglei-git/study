package main

// https://gopl-zh.github.io/ch1/ch1-08.html
import (
	"fmt"
	"math/rand"
	"time"
)

func coinflip() string {
	str := "heads"
	if rand.Intn(2) == 1 {
		str = "tails"
	}
	return str
}

// switch 用法
func main() {
	rand.Seed(time.Now().UTC().UnixNano())
	// 1
	switch coinflip() {
	case "heads":
		fmt.Printf("heads")
	case "tails":
		fmt.Printf("tails")
	default:
		fmt.Printf("default")
	}

	//2 命名类型
	type Point struct {
		X, Y int
	}
	// var p Point

}
