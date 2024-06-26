emcc main.cc -std=c++11 -s WASM=1 -s USE_SDL=2 -o index.js --js-library ./lib/di.js
http-server -o index.html