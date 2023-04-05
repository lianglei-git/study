class A {
    log() {
        console.log(1)
    }
}

class B {
    log2() {
        console.log(2)
    }
}

class C {
    log3() {
        console.log(3)
    }
}


let _extends = [C, A, B];

/**
 * @param  {...any} cls mixins-class
 * @returns {new()} 新的class
 */
function mixins(...cls) {
    class Mixin {
        constructor() {
            // eslint-disable-next-line no-restricted-syntax
            for (const cl of cls) copyProto(this, new cl());
        }
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const cl of cls) {
        copyProto(Mixin, cl);
        copyProto(Mixin.prototype, cl.prototype);
    }
    /**
     * 拷贝
     * @param {new() => T} target 目标对象
     * @param {new() => T} source 被拷贝源
     */
    function copyProto(target, source) {
        // eslint-disable-next-line no-restricted-syntax
        for (const key of Reflect.ownKeys(source)) {
            if (key !== 'constructor' && key !== 'prototype' && key !== 'name') {
                const desc = Object.getOwnPropertyDescriptor(source, key);
                Object.defineProperty(target, key, desc);
            }
        }
    }
    return Mixin;
}


/**
 * 合并默认对象
 * @param {Array<new()>} anyClassList 需要合并的顺序数组
 * @param {any} defauleValue 被合并对象
 */
function mergeDefaultValue(anyClassList, _default) {
    // if (defaultValue) return defaultValue;
    let defaultValue = null;
    // eslint-disable-next-line no-unused-expressions
    !anyClassList.map && (anyClassList = [anyClassList]);
    // eslint-disable-next-line no-const-assign
    defaultValue = new(class extends mixins(...anyClassList) {
        constructor() {
            super();
            this.default = _default;
        }

        copyMergeProps(traget) {
            for (const key in traget) {
                this[key] = _.cloneDeep(traget[key]);
            }
        }

        pointMergeProps(...args) {
            args.forEach((traget) => {
                for (const key in traget) {
                    this[key] = traget[key];
                }
            });
        }
    })();
    return defaultValue;
}

let value = mergeDefaultValue(_extends)
value.log();
value.log2();
value.log3();

console.log('完美继承')