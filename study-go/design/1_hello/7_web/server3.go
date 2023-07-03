// Server2 is a minimal "echo" and counter server.
package main

import (
    "fmt"
    "log"
    "net/http"
    "sync"
)



import (
    "image"
    "image/color"
    "image/gif"
    "io"
    "math"
    "math/rand"
	"time"
)



var palette = []color.Color{color.White, color.RGBA{0, 0xff, 0, 0xff},
color.RGBA{0, 0, 0xff, 0xff}, color.RGBA{0xff, 0, 0, 0xff},
color.RGBA{0x22, 0x22, 0x22, 0xff}, color.RGBA{0xff, 0x44, 0x15, 0xff},
color.RGBA{0x44, 0x62, 0x12, 0xff}, color.RGBA{0xff, 0xff, 0x15, 0xff}}

const (
    whiteIndex = 0 // first color in palette
    blackIndex = 1 // next color in palette
)


func lissajous(out io.Writer) {
    const (
        cycles  = 5     // number of complete x oscillator revolutions
        res     = 0.001 // angular resolution
        size    = 100   // image canvas covers [-size..+size]
        nframes = 64    // number of animation frames
        delay   = 8     // delay between frames in 10ms units
    )
    colorIndex:=1
    freq := rand.Float64() * 3.0 // relative frequency of y oscillator
    anim := gif.GIF{LoopCount: nframes}
    phase := 0.0 // phase difference
    for i := 0; i < nframes; i++ {
        rect := image.Rect(0, 0, 2*size+1, 2*size+1)
        img := image.NewPaletted(rect, palette)
        for t := 0.0; t < cycles*2*math.Pi; t += res {
            x := math.Sin(t)
            y := math.Sin(t*freq + phase)
            img.SetColorIndex(size+int(x*size+0.5), size+int(y*size+0.5),
            uint8(colorIndex))
        }
        colorIndex = (colorIndex % 7) + 1
        phase += 0.1
        anim.Delay = append(anim.Delay, delay)
        anim.Image = append(anim.Image, img)
    }
    gif.EncodeAll(out, &anim) // NOTE: ignoring encoding errors
}

// 嗯哼？
// 这个服务器有两个请求处理函数，根据请求的url不同会调用不同的函数：对/count这个url的请求会调用到counter这个函数，其它的url都会调用默认的处理函数。如果你的请求pattern是以/结尾，那么所有以该url为前缀的url都会被这条规则匹配。在这些代码的背后，服务器每一次接收请求处理时都会另起一个goroutine，这样服务器就可以同一时间处理多个请求。然而在并发情况下，假如真的有两个请求同一时刻去更新count，那么这个值可能并不会被正确地增加；这个程序可能会引发一个严重的bug：竞态条件（参见9.1）。为了避免这个问题，我们必须保证每次修改变量的最多只能有一个goroutine，这也就是代码里的mu.Lock()和mu.Unlock()调用将修改count的所有行为包在中间的目的。第九章中我们会进一步讲解共享变量。
var mu sync.Mutex
var count int

func main() {
rand.Seed(time.Now().UTC().UnixNano())
    http.HandleFunc("/", handler)
    http.HandleFunc("/count", counter)
	http.HandleFunc("/gif", func(w http.ResponseWriter, r *http.Request){
		lissajous(w)
	})
    log.Fatal(http.ListenAndServe("localhost:9000", nil))
}


/// js

// for(let i = 0; i< 1500;i++){
//     if(i<300 && i>200){

//     }
// }

///



// handler echoes the HTTP request.
func handler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "%s %s %s\n", r.Method, r.URL, r.Proto)
    for k, v := range r.Header {
        fmt.Fprintf(w, "Header[%q] = %q\n", k, v)
    }
    fmt.Fprintf(w, "Host = %q\n", r.Host)
    fmt.Fprintf(w, "RemoteAddr = %q\n", r.RemoteAddr)
    if err := r.ParseForm(); err != nil {
        log.Print(err)
    }
    for k, v := range r.Form {
        fmt.Fprintf(w, "Form[%q] = %q\n", k, v)
    }
}


// counter echoes the number of calls so far.
func counter(w http.ResponseWriter, r *http.Request) {
    mu.Lock()
    fmt.Fprintf(w, "Count %d\n", count)
    mu.Unlock()
}

