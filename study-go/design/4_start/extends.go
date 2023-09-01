package main

import "sync"

// 比较特殊的继承吧算是，
var cache = struct {
	sync.Mutex
	mapping map[string]string
}{
	mapping: make(map[string]string),
}

func Lookup(key string) string {
	cache.Lock() // 这里直接继承了 sync.Mutex 方法看见了吗
	v := cache.mapping[key]
	cache.Unlock()
	return v
}
