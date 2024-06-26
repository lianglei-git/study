emcc hello.c -s WASM=1 -o hello.html
open http://localhost:8080
http-server