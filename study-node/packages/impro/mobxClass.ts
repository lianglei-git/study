// import { isObservable } from "mobx";

// import { observe, observable } from "mobx";

const {autorun, observable , makeObservable, makeAutoObservable, action, isObservableProp, extendObservable} = require('mobx');

class A{
    @observable state = {
        key:10
    }

    @observable kk = 12
    constructor(){
      makeObservable(this)
      autorun(() => {
        console.log(this.kk);
      })
    }

    private lia = () => {
      console.log(1111)
    }

}

class B {
    @observable stat2 = {
        name: 'ps'
    }
    constructor(){
      makeObservable(this)
      autorun(() => {
        console.log(this.stat2.name);
      })
    }
}

type K = typeof A
const C= mix(A, B);
let copy:any = new C();
copy.sourceProxy.kk = 100;
console.log(copy.sourceProxy)
// setTimeout(() => {
// copy.kk = 9999
// }, 1000);

function mix(...mixins) {
  class Mix {
    sourceProxy = null;
    constructor() {
      let sources = [];
      for (let mixin of mixins) {
        // let source =  new mixin();
        // this[mixin.name] = source;
        sources.push(new mixin())
      }
      this.sourceProxy = new Proxy(this, {
        get(t, k) {
          let v = null;
          for(let i = 0; i< sources.length; i++){
            if(sources[i][k]) v = sources[i][k]
          }
          return v;
        },
        set(t, k ,v) {
          for(let i = 0; i< sources.length; i++){
            if(sources[i][k]) sources[i][k] = v
          };
          return true;
        }
      })
    }
  };

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