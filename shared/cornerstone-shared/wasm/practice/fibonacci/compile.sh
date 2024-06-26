#sh
# emcc main.cc -s WASM=1 -O3 --no-entry -o fibonacci.wasm
emcc --std=c++17 main.cc -s WASM=1 -s "EXPORTED_RUNTIME_METHODS=['ccall']" --no-entry -01 -o fibonacci.wasm --js-library ./lib/di.js



# emcc --std=c++17 main.cc -s WASM=1 -s "EXTRA_EXPORTED_RUNTIME_METHODS=['ccall']" --shell-file templates/shell_minimal.html -o sayhello3.js --js-library test_js_library.js
# emcc --std=c++17 main.cc -s WASM=1 -s "EXPORTED_RUNTIME_METHODS=['ccall']" --no-entry -o fibonacci2.wasm --js-library library.js


emcc --std=c++17 main.cc -s WASM=1 -s "EXTRA_EXPORTED_RUNTIME_METHODS=['ccall']" -o sayhello3.js --js-library ./lib/di.js