package main

import (
	"context"
	"fmt"
	"time"
)

func main() {
	go func() {
		SetTimeout(func() {
			fmt.Println("SetTimeout")
		}, 5)

		interval := SetInterval(func() {
			fmt.Println("SetInterval")
		}, 2)
		time.Sleep(5 * time.Second)
		interval()
		time.Sleep(10 * time.Second)
	}()
	fmt.Println("11ll1l1l")
	time.Sleep(10 * time.Second)

}

func SetTimeout(f func(), timeout int) context.CancelFunc {
	ctx, cancelFunc := context.WithCancel(context.Background())
	go func() {
		select {
		case <-ctx.Done():
		case <-time.After(time.Duration(timeout) * time.Second):
			f()
		}
	}()
	return cancelFunc
}

func SetInterval(f func(), timeout int) context.CancelFunc {
	ctx, cancelFunc := context.WithCancel(context.Background())
	go func() {
		for {
			time.Sleep(time.Duration(timeout) * time.Second)
			select {
			case <-ctx.Done():
				return
			default:
				f()
			}
		}
	}()
	return cancelFunc
}
