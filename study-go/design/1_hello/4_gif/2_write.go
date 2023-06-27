package main

import (
	"fmt"
	"os"
	"io"
)

func main() {
	io.WriteString(os.Stdout, "写入一写东西")
	// .Write()
	// fmt.Print("9999")
	fmt.Fprintln(os.Stdout, "9999")
}

// panic