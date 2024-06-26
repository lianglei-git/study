# 编译为asm 代码 WASM=0 为 不编译 wasm
emcc hello.cc -s WASM=0 -o asm.js

# 默认编译
emcc hello.cc