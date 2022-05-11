// 函数重载

function add(a: number, b: string): string;
function add(a: string, b: number): number;
function add(a, b) {
    console.log(a, b)
    return a + b
}

add(1, '1')
// add('2', 123)

// 只读number 
const arr: number[] = [1, 2, 3, 4, 5, 65]


const readonlyNumber: ReadonlyArray<number> = arr
// readonlyNumber[0] = 123 // 报错

// 接⼝与类型别名的区别
interface A {
    age: string;
    arr: [string, number]
}
type B = {
    sex: number
}

// primitive
type Name = string;
// object
type PartialPointXs = { x: number; };
type PartialPointYs = { y: number; };
// union
type PartialPoints = PartialPointXs | PartialPointYs;
// tuple
type Data = [number, string];


// 接口合并接口
interface PartialPointXss { x: number; }
interface Points extends PartialPointXss {
    y: number;
}

// 联合类型声明
type PartialPointXz = { x: number; };
type Pointz = PartialPointXz & { y: number; };

// 接口合并类型声明
type PartialPointXa = { x: number; };
interface Pointa extends PartialPointXa { y: number; }

// 类型声明合并接口、
interface PartialPointXn { x: number; }
type Pointn = PartialPointXn & { y: number; };

// Implements 特殊繼承


interface Point {
    x: number;
    y: number;
}

class SomePoint implements Point {
    x = 1;
    y = 2;
}
type Point2 = {
    x: number;
    y: number;
};
class SomePoint2 implements Point2 {
    x = 1;
    y = 2;
}
type PartialPoint = { x: number; } | { y: number; };
// A class can only implement an object type or
// intersection of object types with statically known members.
// class SomePartialPoint implements PartialPoint { // Error
//     x = 1;
//     y
// }

// 重复声明 接口
// 与类型别名不同，接⼝可以定义多次，会被⾃动合并为单个接⼝。
interface Point { x: number; }
interface Point { y: number; }
const point: Point = { x: 1, y: 2 };


// 类(class)


class DomKact {
    static _name:string = 'tom'
    #name: string // #私有字段
    #age:number
    constructor() {
        this.#name = '123'
        this.#age = 888
    }
    getThis() {
        console.log(this)
    }

    get name() { // ts专属·1
        return this.name
    }
}
// console.log(DomKact._name)
let nbs = new DomKact()


// 狗币抽象类来了 他妈的 我来挑战

abstract class Person { // 说白了就是定义接口的类 “形态”  // 不能被实例化
    constructor(time:Date){
        console.log('抽象类进化')
    }
    abstract getname(str?:string):number
    
}
 
// ...额 比如说 下面这个好像也可以实现哈
interface PPer {
    new(time:Date): Muste;
     getname():string
}

class Muste extends Person {
    constructor(time) {
        super(time)
        console.log(time)
    }
    getname() {
        return 123
    }
}

let meuas = new (Muste as PPer)(new Date()) 



function abb(c: new() => any) {

}

function anc(c:{new(names:number):any}) {
    new c(123)
}

anc(Muste)


export {}
