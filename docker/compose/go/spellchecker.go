package main

import (
	"fmt"
	"regexp"
)

var (
	NWORDS map[string]int
)

const (
	alphabet = "abcdefghijklmnopqrstuvwxyz"
)

func words(text string) []string {
	regex, _ := regexp.Compile("[a-z]+")
	return regex.FindAllString(text, -1)
}
func train(features []string) map[string]int {
	result := make(map[string]int)
	for i := range features {
		_, isexist := result[features[i]]
		if !isexist {
			result[features[i]] = 1
		} else {
			result[features[i]] += 1
		}
	}
	return result
}
func edit1(word string) []string {
	type tuple struct{ a, b string }
	var splits []tuple
	for i := 0; i < len(word)+1; i++ {
		splits = append(splits, tuple{word[:i], word[i:]})
	}
	var deletes []string
	for _, t := range splits {
		if len(t.b) > 0 {
			deletes = append(deletes, t.a+t.b[1:])
		}
	}
	var transposes []string
	for _, t := range splits {
		if len(t.b) > 1 {
			transposes = append(transposes, t.a+string(t.b[1])+string(t.b[0])+t.b[2:])
		}
	}
	var replaces []string
	for _, c := range alphabet {
		for _, t := range splits {
			if len(t.b) > 0 {
				replaces = append(replaces, t.a+string(c)+t.b[1:])
			}
		}
	}
	var inserts []string
	for _, c := range alphabet {
		for _, t := range splits {
			inserts = append(inserts, t.a+string(c)+t.b)
		}
	}
	//concat this slice
	deletes = append(deletes, transposes...)
	deletes = append(deletes, replaces...)
	deletes = append(deletes, inserts...)
	return set(deletes)
}
func known_edits2(word string) []string {
	var arr []string
	for _, e1 := range edit1(word) {
		for _, e2 := range edit1(e1) {
			if _, ok := NWORDS[e2]; ok {
				arr = append(arr, e2)
			}
		}
	}
	return set(arr)
}
func known(words []string) []string {
	var knows []string
	for _, value := range words {
		if _, ok := NWORDS[value]; ok {
			knows = append(knows, value)
		}
	}
	return knows
}
func appendIfMissing(slice []string, i string) []string {
	for _, ele := range slice {
		if ele == i {
			return slice
		}
	}
	return append(slice, i)
}
func set(arr []string) []string {
	var result []string
	for _, ele := range arr {
		result = appendIfMissing(result, ele)
	}
	return result
}
func correct(word string) string {
	candidates := known([]string{word})
	if len(candidates) <= 0 {
		candidates = known(edit1(word))
		if len(candidates) <= 0 {
			candidates = known(known_edits2(word))
		}
	}
	return max(candidates, NWORDS)
}
func max(arr []string, dict map[string]int) string {
	flag := 0
	index := 0
	for ix, value := range arr {
		if v, ok := dict[value]; ok {
			if v > flag {
				flag = v
				index = ix
			}
		}
	}
	fmt.Println(arr[index])
	return arr[index]
}
func main() {
	NWORDS = train(words("how are yu?"))
	word := "beford"
	fmt.Println("input:", word, "correct word:", correct(word))
}

// 不好使啊🫤
