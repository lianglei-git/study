package main

import (
    "fmt"
    "io/ioutil"
    "os"
    "strings"
)

func main() {
	// 理解到ts -> const counts=Object() as {[string]: int}
	// c++ -> map<string, int> counts;
    counts := make(map[string]int)
    for _, filename := range os.Args[1:] {
        data, err := ioutil.ReadFile(filename)
        if err != nil {
            fmt.Fprintf(os.Stderr, "dup3: %v\n", err)
            continue
        }
        for _, line := range strings.Split(string(data), "\n") {
            counts[line]++
        }
    }
    for line, n := range counts {
        if n > 1 {
            fmt.Printf("%d\t%s\n", n, line)
        }
    }
}
