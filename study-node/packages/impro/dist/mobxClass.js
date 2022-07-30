// import { isObservable } from "mobx";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// import { observe, observable } from "mobx";
var _a = require('mobx'), autorun = _a.autorun, observable = _a.observable, makeObservable = _a.makeObservable, makeAutoObservable = _a.makeAutoObservable, action = _a.action, isObservableProp = _a.isObservableProp, extendObservable = _a.extendObservable;
var A = /** @class */ (function () {
    function A() {
        var _this = this;
        this.state = {
            key: 10
        };
        this.kk = 12;
        this.lia = function () {
            console.log(1111);
        };
        makeObservable(this);
        autorun(function () {
            console.log(_this.kk);
        });
    }
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], A.prototype, "state", void 0);
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], A.prototype, "kk", void 0);
    return A;
}());
var B = /** @class */ (function () {
    function B() {
        var _this = this;
        this.stat2 = {
            name: 'ps'
        };
        makeObservable(this);
        autorun(function () {
            console.log(_this.stat2.name);
        });
    }
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], B.prototype, "stat2", void 0);
    return B;
}());
var C = mix(A, B);
var copy = new C();
copy.sourceProxy.kk = 100;
console.log(copy.sourceProxy);
// setTimeout(() => {
// copy.kk = 9999
// }, 1000);
function mix() {
    var mixins = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        mixins[_i] = arguments[_i];
    }
    var Mix = /** @class */ (function () {
        function Mix() {
            this.sourceProxy = null;
            var sources = [];
            for (var _i = 0, mixins_1 = mixins; _i < mixins_1.length; _i++) {
                var mixin = mixins_1[_i];
                // let source =  new mixin();
                // this[mixin.name] = source;
                sources.push(new mixin());
            }
            this.sourceProxy = new Proxy(this, {
                get: function (t, k) {
                    var v = null;
                    for (var i = 0; i < sources.length; i++) {
                        if (sources[i][k])
                            v = sources[i][k];
                    }
                    return v;
                },
                set: function (t, k, v) {
                    for (var i = 0; i < sources.length; i++) {
                        if (sources[i][k])
                            sources[i][k] = v;
                    }
                    ;
                    return true;
                }
            });
        }
        return Mix;
    }());
    ;
    return Mix;
}
// function mix<T>(...mixins):any {
//     class Mix {
//       constructor() {
//         makeObservable(this);
//         for (let mixin of mixins) {
//           let nes = new mixin()
//           // setTimeout(() => {
//             copyProperties(this, nes); // 拷贝实例属性
//           // })
//         }
//       }
//     }
//     for (let mixin of mixins) {
//       copyProperties(Mix, mixin); // 拷贝静态属性
//       copyProperties(Mix.prototype, mixin.prototype); // 拷贝原型属性
//     }
//     return Mix;
//   }
//   function copyProperties(target, source) {
//     for (let key of Reflect.ownKeys(source)) {
//       if ( key !== 'constructor'
//         && key !== 'prototype'
//         && key !== 'name'
//       ) {
//         // console.log(key)
//         let excludes = ['Symbol(mobx administration)', 'length', 'Symbol(mobx-stored-annotations)']
//         let desc = Object.getOwnPropertyDescriptor(source, key);
//        if(isObservableProp(source, 'state')) {
//         extendObservable(target, {
//           [key]: source[key]
//         })
//        } else {
//         Object.defineProperty(target, key, desc);
//        }
//         // if(!excludes.includes(key) && typeof source[key] == 'object'){
//         //   target[key] = source[key];
//         // }else {
//       // }
//       }
//     }
//   }
