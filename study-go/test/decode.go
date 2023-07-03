package main

import (
	"crypto/md5"
	"fmt"
	"net/url"
	"regexp"
	"strings"
	// "unicode/utf8"
)

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
func MD5(str string) string {
	data := []byte(str) //切片
	has := md5.Sum(data)
	md5str := fmt.Sprintf("%x", has) //将[]byte转成16进制
	return md5str
}

func createSign(p string) string {
	var y2 = Decode("z%C3%8F%C3%87%C3%8F%C3%A7%C3%A2%C3%A0%C3%9C%C3%87%C2%9A%C2%A0%C3%8B%C2%9C%C2%AC%C2%ACq%C2%9D")
	var head = "6key_web_fanyi"
	sampleRegexp := regexp.MustCompile(`(^\s*)|(\s*$)`)
	inputHEX := head + "" + y2 + "" + p
	input := sampleRegexp.ReplaceAllString(inputHEX, "")
	sign := MD5(input)
	sign = sign[0:16]
	// fmt.Println(sign, y2, inputHEX)
	return sign
}

// createTranBasicParams
func main() {

}
