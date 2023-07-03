package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"strings"
)
const (
	y2 = "ifanyiweb8hc9s98e"
)


const BaseURL string = "https://ifanyi.iciba.com/index.php?c=trans&m=fy&client=6&auth_user=key_web_fanyi&sign=9713c83d2609d42b"
const r = u()("6key_web_fanyi".concat(s.y2).concat("hello".replace(/(^\s*)|(\s*$)/g, ""))).toString().substring(0, 16);
var payload = strings.NewReader("from=en&to=zh&q=how are you%0A%0A")

// js
// o = (0,
// 	n.e$)("U%C2%9C%C3%88%C3%88%C2%9Em%C2%98%C2%9D%C2%9F%C2%9F%C2%9C%C2%95bb%C2%94%C2%92%C2%94%C2%96%C2%97%C3%88%C2%98jl%C2%9B%C3%8B%C2%9B%C2%A6%C2%AB%C2%9B%C3%85")
// 	  , i = (0, // 这个是 加密名字
// 	n.e$)("z%C3%8F%C3%87%C3%8F%C3%A7%C3%A2%C3%A0%C3%9C%C3%87%C2%9A%C2%A0%C3%8B%C2%9C%C2%AC%C2%ACq%C2%9D")
// 	  , a = (0,
// 	n.e$)("%C2%82%C2%98%C2%98%C3%88%C3%88%C3%88%C3%9C%C3%AE%C3%9F%C3%8D%C3%9A%C3%96%C3%94%C3%99%C3%8A%C3%8A%C3%89%C2%9C%C2%9E%C3%8B%C2%9Epqro%C2%9C%C3%8A%C2%94%C2%94%C2%9Ch")
// 	  , u = (0,
// 	n.e$)("Ghede%C2%A6%C3%97%C3%8A%C2%99g%C2%95%C3%94%C3%97%C3%8A%C2%99imk")

//

// func decodeURIComponent(e string) string{
	
// }
func Decode(str string) string {
	deo, _ := url.QueryUnescape(str)
	t := []string{}
	length := 0
	for range deo {
		length += 1
	}
	for idx, v := range deo {
		if idx == 0 {
			t = append(t, string(int(v)-length))
			fmt.Println(t, v, length)
			continue
		}
		t = append(t, string(int(v)-int(t[len(t)-1][0])))
	}
	return strings.Join(t, "")
}

func PostTrans() {
	fmt.Printf("%s", payload)
	res, err := http.Post(BaseURL, "application/x-www-form-urlencoded", payload)
	if err != nil {
		// panic(err)
		fmt.Fprintf(os.Stderr, "fetch: %v\n", err)
		os.Exit(1)
	}
	b, err := ioutil.ReadAll(res.Body)
	res.Body.Close()
	if err != nil {
		// panic(err)
		fmt.Fprintf(os.Stderr, "fetch: %v\n", err)
		os.Exit(1)
	}
	fmt.Printf("%s", b)
}

func main() {
	// resp, err := http.Get("http://www.baidu.com")
	// if err != nil {
	// 	fmt.Fprintf(os.Stderr, "fetch: %v\n", err)
	// 	os.Exit(1)
	// }
	// b, err := ioutil.ReadAll(resp.Body)
	// resp.Body.Close()
	// if err != nil {
	// 	fmt.Fprintf(os.Stderr, "fetch: %v\n", err)
	// 	os.Exit(1)
	// }
	// fmt.Println(string(b))
	PostTrans()
}
