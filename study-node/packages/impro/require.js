const {
    readSync,
    readFile,
    existsSync,
    readFileSync
} = require("fs")
const {
    resolve,
    extname,
    dirname
} = require("path");
const {
    isExternal
} = require("util/types");
const vm = require('vm');


class Module {
    id = null;
    exports = {};
    static
    catch = new Map();

    static extensions = {
        '.js'(module) {
            let code = readFileSync(module.id).toString();
            let content = '(function (module,exports, require, __dirname, __filename){\n' + code + '\n})'
            const func = vm.runInThisContext(content);
            const exports = module.exports;
            func.call(exports, module, exports, require, dirname(module.id), module.id)
        },
        '.json'(code) {

        }
    }

    static _resolvePathName(filenmae) {
        let id = null;
        if (existsSync(filenmae)) {
            id = filenmae
        } else {
            let extensions = Object.keys(Module.extensions);
            id = extensions.reduce((_id, item) => {
                existsSync(filenmae + item) && (_id = filenmae + item);
                return _id;
            }, null);
            if (!id) {
                throw Error('没有此文件')
            }
        }
        return id
    }

    load() {
        let _extname = extname(this.id)

        Module.extensions[_extname](this);
    }

}

function reRequire(path) {
    // 后缀名判断
    let resolvePath = Module._resolvePathName(resolve(__dirname, path));

    // 缓存
    let catchData = Reflect.get(Module.catch, resolvePath) || null;
    if (catchData) return catchData[resolvePath].exports

    const module = new Module();
    module.id = resolvePath;
    Reflect.set(Module.catch, resolvePath, module);

    module.load();
    return module.exports

}

let anys = reRequire('./server')
console.log(anys);