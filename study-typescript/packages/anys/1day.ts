// unknown 可以被定义为任何类型， 雷同any一样的顶级类型，但仅仅可以被类型约束， 
// 不能被定义和复制其他类型 除了（any类型）

let typeunkown: unknown = 1

// let num1: number = typeunkown
// let str1: string = typeunkown
// let bol1: boolean = typeunkown
// let obj1: object = typeunkown
let any1: any = typeunkown // 只有any才可以被赋值


// 所谓元组 就是数组的没项类型被定义 
type tuple = [string, boolean]

let tuplearr: tuple = ['', false]
// void 类型 证明永远没有返回值
function voidFunc(): void {
    throw Error('face ')
}
// 枚举编译成对象
// （无特殊定义时）按照数字索引依次排序 遇见数字重新计算下一个并加一
// 特殊定义， 单纯特殊定义 获取 key ： value 形式
enum EnumOne {
    Pipe = 9,
    Face,
    Fokenba = 2,
    Locner = 'A'
}

// object 类型
let obj2: object = [] // object 就是约束非原始类型的 // 数组 方法 等等

let obj3: object = new Array()

let obj4: object = Object.create({ a: 123 }) // 这个是原型的 



// object.create new Object {} 区别 
// Object.create({}).__proto__.__proto__ = {}.__proto__ = Object.prototype
// var test = Object.create({x:123,y:345});
// console.log(test);//{}
// console.log(test.x);//123
// console.log(test.__proto__.x);//123
// console.log(test.__proto__.x === test.x);//true

// var test1 = new Object({x:123,y:345});
// console.log(test1);//{x:123,y:345}
// console.log(test1.x);//123
// console.log(test1.__proto__.x);//undefined
// console.log(test1.__proto__.x === test1.x);//false

// var test2 = {x:123,y:345};
// console.log(test2);//{x:123,y:345};
// console.log(test2.x);//123
// console.log(test2.__proto__.x);//undefined
// console.log(test2.__proto__.x === test2.x);//false


// Object 类型 这个是实例的类型 
class Anc implements Object {
    constructor() {

    }

}


// nerver //类型表示的是那些永不存在的值的类型。

// 返回never的函数必须存在⽆法达到的终点
function error(message: string): never {
    throw new Error(message);
}
function infiniteLoop(): never {
    while (true) { }
}



type Tts = string | number

function ll(jj: Tts) {
    // let a
    if (typeof jj === 'number') {
        // a = jj
    } else if (typeof jj === 'string') {
        // a = jj
    }else {
        const check:never = jj // 这时候 这个就会触发
        console.log('这个是传错值的时候触发', check)
    }
}

ll(true as any)

interface Duanyan {
    count:number
    str?:undefined | null
}
function Obja(parasms:Duanyan)
 {
    console.log(parasms.str!) 
 }


 let x!:number // 在声明后面加上 "!" 是确定此声明肯定会被赋值
 changeX()
 console.log(x + '123')
 function changeX() {
     x = 10
 }


 // is 是硬伤啊 
 function kasjh(x:any): x is number {
     return typeof x === 'number'
 }


 export {}