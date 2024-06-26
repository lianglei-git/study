const wasmMemory = new WebAssembly.Memory({
    initial: 256
})

var HEAPU32 = new Uint32Array(wasmMemory);
var _fd_write = (fd, iov, iovcnt, pnum) => {
    // hack to support printf in SYSCALLS_REQUIRE_FILESYSTEM=0
    var num = 0;
    for (var i = 0; i < iovcnt; i++) {
        var ptr = HEAPU32[((iov) >> 2)];
        var len = HEAPU32[(((iov) + (4)) >> 2)];
        iov += 8;
        for (var j = 0; j < len; j++) {
            printChar(fd, HEAPU8[ptr + j]);
        }
        num += len;
    }
    HEAPU32[((pnum) >> 2)] = num;
    return 0;
};

const imports = {
    // memory: wasmMemory,
    args_get: (n, m) => n + m,
    args_sizes_get: (n, m) => n + m,
    proc_exit: () => 0,
    custom_add: (a, b) => a - b,
    _emscripten_memcpy_js: (dest, src, num) => new Uint8Array(wasmMemory).copyWithin(dest, src, src + num),
    fd_write: _fd_write,
    imported_func: function (arg) {
        console.log(arg);
    },
    wasi_unstable: () => {}
}
const importObject = {
    env: imports,
    wasi_snapshot_preview1: imports
}



fetch("./fibonacci.wasm", {
        credentials: 'same-origin'
    })
    .then(res => {
        const result = WebAssembly.instantiateStreaming(res, importObject)
        return result
    })
    .then(module => {
        console.log(module, "module");
    })

