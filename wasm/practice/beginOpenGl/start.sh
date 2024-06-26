emcc main.cc -std=c++11 -s WASM=1 -s USE_SDL=2 -O3 -o index.html
http-server -o index.html