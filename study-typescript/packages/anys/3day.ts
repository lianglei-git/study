#! 千万不要尝试去运行代码， 试着边敲边回血

/**
 * 知识点1： 类方法重载   
 */
    class CsJsGo {
        constructor() {}
        // 函数重载
        addNum(num: string): void
        addNum(num: number): void
        addNum(num) {
            console.log(num)
        }
    }
    let csjsgo = new CsJsGo()
    csjsgo.addNum(12)
    csjsgo.addNum('')
    // csjsgo.addNum({}) // error

/**
 * 知识点2： 泛型来吧 泛型！（逗比的存在）最简单的 code ↓
 * 其中 T 代表 Type，在定义泛型时通常⽤作第⼀个类型变量名称。但实际上 T 可以⽤任何有效名称代
 * 替。除了 T 之外，以下是常⻅泛型变量代表的意思
 *  K（Key）：表示对象中的键类型；
 *  V（Value）：表示对象中的值类型；
 *  E（Element）：表示元素类型
 */
    function typeiden<T extends number>(num: T): T { // ???? 逗比的T 有鬼用处？？？ 
        console.log(num)
        return num
    }
    typeiden<number>(123)
/**
 * 2.1 泛型接口
 */
    interface Identype<T> {
        count: T
        name: string
        Func: (key: T) => T // 约束func
    }
    interface IdenFucn<T> { // 泛型接口 
        (args: T): T
    }
/**
 * 2.2 泛型接口约束函数
 */
    function besho<T>(arg: T): T {
        return arg
    }
    (besho as IdenFucn<string>)("asd") // 

    let besheng: IdenFucn<string> = function <T>(arg: T): T {
        return arg
    }
    besheng('Asd')
/**
 * 2.3 泛型类
 */
    class Pro1 { // 这个一直困扰着我啊啊啊啊啊
        constructor(time) {
        }
    }

/**
 * 知识点3：关键字
 * PS: 明白了明白了 这 new() 其实就等于 那个构造函数 也就是那个类 里面就是constructor的参数 后面是返回值
 */

// 3.1 new 关键字
    type ProType<C> = {
        c: new (p: number) => C;
        time: number
    }
    // new Pro1<ProType>({})
    let bbs: ProType<Pro1> = {
        time: 123,
        c: Pro1
    }
    new bbs.c(888)

// 3.2 typeof 关键字
    interface Persons {
        name: string
        age: number
    }
    const obj:Persons & {pps?: string} = {name:'', age:123}
    type obj2 = typeof obj // 钠 就这个作用

// 3.3 keyof 关键字
    type testKeyof = keyof Persons // testKeyof = 'age' || 'name'
    const obj3:testKeyof = 'age' || 'name'

    type testKeyofarr = keyof Persons[] // "length" | "toString" | "pop" | "push" | "concat"| "join"
    const arrs:testKeyofarr = [].length

    type K3 = keyof {[x:string]: Persons} // string | number  取得是索引签名
    type K7 = keyof 123 //  "toString" | "toLocaleString" | "toFixed" | "toExponential" | "toPrecision" | "valueOf"
    type K8 = keyof true //  "valueOf"
    type K9 = keyof null //  never

// 3.3.1 索引签名扩充
    interface StringArray {
    // 字符串索引 -> keyof StringArray => string | number
        [index: string]: string;
    }
    interface StringArray1 {
    // 数字索引 -> keyof StringArray1 => number
        [index: number]: string;
    }

// 3.4 in 关键字 :: 用来遍历枚举类型
    // 比如说我这几天遇见一个可怕的骚操作 完全没头绪 
    interface RequiredTyps {
        border:string,
        width:string,
        height:string
    }
    const width:RequiredTyps['width'] = '123' // 中括号获取详细参数
    // 我的需求是这样的 我想去约束上述类型， 需要是可选的 
    type Partial = {
        [K in keyof RequiredTyps]?: RequiredTyps[K]
    }
    type stringes = 'font-size' | 'font' | 'c3' | '7788989'
    // 参数必选 -? 是移除 ? 这个 也就是必选
    // ? 是可选
    // read
    type StringIn = {
        [P in stringes]-?: string;
    }
    type ll = {
       readonly ko : number;
        oo:string;
        pp?: string
         [y:string]: string | number
    }
    // 这样一来他们就可选了
    let style:Partial = { 
        width: ''
    }

// 3.5 infer 关键字 条件类型的 infer 类型推断能力 学习之前我建议看看 3.6的extends 这个关键字
        // 网上都说通过 内置函数 ReturnType来解释这个  infer 只能用于 extends 语句中。
        let add = (a: number) => a
        // type a = typeof add
        // const abs:a = (a = 123) => 123 // 返回的number 类型
        type t = ReturnType<typeof add> // 这个就表示这个函数的返回类型 // number 类型
        // ReturnType源码
        type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any
        type K11<T> = T extends infer U ? U : T; // 就这种鬼写法 ？？？ 什么玩意 U是哪来的 自定义的 随便命名、
                                                // 概念和T 等同一样 并非完全一样  看例子去理解
        type v5 = K11<string> // v5 == string
        type v6 = K11<() => number> // () => number
        type v7 = K11<Date[]> // Date[]
        type K12<T> = T extends (infer U)[] ? U : T
        type v8 = K12<Date[]> // Date  是不是很奇怪 这时候这个K12 的T变成传入的签名了 没有带上数组是吧 再来看别的
        type K13<T> = T extends {[K:string]: infer J} ? J : T
        type v9 = K13<{a:string, b:number,c:boolean, d: {name: 123}}> // string | number | boolean | { name: 123; } 看这个时候变成了这个 是不是很奇怪 这时候又解析为对象的val为止看
        // 没错 他这个在ts里面的示意就是 类型推断 这下就很清晰明了的知道为什么以此命名了   知道这种特性之后 还有更骚的 
        type K14<T> = T extends {x: infer U, y: infer U} ? U : T
        type v10 = K14<{x:number,y:'778'}> //  number | "778"
        type v11 = K12<Array<{a:'asd'} |'asd' | 123 | void | Set<any>>>// {a:'asd'} | 'asd' | 123 | void | Set<any> 
        type K15<F> = F extends Set<infer M> ? M : F
        type v12 = K15<Set<v11>>// {a:'asd'} | 'asd' | 123 | void | Set<any> 
        // type kasd = Map<v11, any>
        // let b123123:kasd = new Map()
        // b123123.set('asd', {})
        // b123123.set('aasdsd', {}) // Error

// 3.6 extends 关键词 // 可以带有条件判断的 三元  // 参考地址 https://juejin.cn/post/6844904066485583885 
    type K1<X,Y> = X extends Y ? string : number //  X extends Y 这个是判断公式
    type K2 = K1<{}, false>
    const t1:K2 = +'213' 
    // 在此试验一下官方的 候选类型 和 判断联合类型 
    type K4<X> = X extends 'x' ? X : K2 // 这个叫做 判断联合类型
    type K10<T> = T extends number[] ? T : '123' //
    type v4 = K10<number>
    type v1 = K4<'x' | 'y'> // 这个得到的就是 'x' | number::::判断联合类型
    type K5<Y> = Y extends 'y' ? v1 : Y // 候选类型
    type v2 = K5<'bnn' | 'y' | 'c' | 'ppo'> // number | "bnn" | "c" | "ppo" | "x" ::: 候选类型
    const ts1:v2 = 'l' // ERROR
    const ts2:v2 = 'ppo' || 'c' || 'bnn' || 67678 // success

    // 看了上述应该可以分析出来一个大概， 其主要观察 三元运算符的左右侧和是不是联合类型 既满足联合类型和泛型的情况下 
    // 要观察 泛型签名的 三元位置， 在左侧 返回的联合判断条件判断类型（等于匹配签名的类型加上 ":"(冒号) 后面的类型一起返回）
    // 如果冒号后面的类型是 泛型签名的话 ， 就除了等了匹配签名之外所有的类型一同返回 综上。
    // !!! 核心就是找 泛型签名和泛型签名的位置 进行最后的判断 （是在左侧判断为 true 的时候才会走到推迟解析条件类型和候选类型）
    type K6<X,Y,Z> =  Y extends Z ? v2 : Y | Z
    type v3 = K6<{name: string}, false | '-23' | 'asdasd'| '-0', 0 | '-1' | '-992' | 'Array'>
    const tes3:v3 = 'b' // false | 0 | "-23" | "asdasd" | "-0" | "-1" | "-992" | "Array"

    // 这里还有一个奇怪的操作 
    type Filter<T,U> = T extends U ? never : T;
    type v4 = Filter<'x'|'y'|'c'|'z', 'z'>; // = "y" | "c" | "x" 这里没有never类型 也可以说是直接置空了的 什么都没
    // 再补充一句 我个人完全觉得 extends 在类型中使用是 === 的概念

// 3.7 is 关键字 切记 这个玩意返回的是布尔值类型
    const isstring = (x:unknown):x is string => typeof x === 'string'
    const isNumber = (val: unknown): val is number => typeof val === 'number'
    const isSymbol = (val: unknown): val is symbol => typeof val === 'symbol'
    const isFunction = (val: unknown): val is Function => typeof val === 'function'
    const isObject = (val: unknown): val is Record<any, any> => val !== null && typeof val === 'object'

    function isPromise<T = any>(val: unknown): val is Promise<T> {
        return isObject(val) && isFunction(val.then) && isFunction(val.catch)
      }

// ** 内置类型
//    Partial<T> 将类型的属性变成可选
//    Required<T>将类型的属性变成必选
//    Pick 从某个类型中挑出一些属性出来
//    Exclude<T, U> // 排除一个指定类型  type T1 = Exclude<string | number | boolean, boolean> // string | number
//    Extract<T, U> // 与exclude 正好相反 拿到相同的类型  type T1 = Extract<string | number | boolean, boolean> // boolean
//    Record 
//    Omit<T, K extends keyof any> // 排除接口中指定的属性：
        interface I1 {
            a: number;
            b: string;
            c: boolean;
        }

        type AC = Omit<I1, 'b'>;     // { a:number; c:boolean } 
        type C = Omit<I1, 'a' |'b'>  // { c: boolean }
//    NonNullable<T> 过滤掉 联合类型 中的 null 和 undefined 类型：  type T1 = NonNullable<string | null | undefined>; // string
//    Mutable<T> 将类型的属性变成可修改
//    Readonly<T> 类型的属性变成只读 
//    OmitThisParameter< T >移除函数中的 this 数据类型：
//    ThisParameterType< T >获取函数中 this 的数据类型，如果没有则返回 unknown 类型：
//    InstanceType<T extends new (...args: any) => any> 获取 构造函数 的返回类型，如果是多个就以 联合类型 的方式返回，我们借用上面的定义：
//    ReturnType<T extends (...args: any) => any> 用来得到一个函数的返回值类型
        // 上面有解释 
//    ConstructorParameters<T extends new (...args: any) => any> 同上面的类型很相似，只是这里获取的是 构造函数 的全部参数。关于构造函数声明，以及如何使用此 高级类型 的方式：
        interface IEntity {
            count?: () => number
        }
        interface IEntityConstructor {
            new (a: boolean, b: string): IEntity;
        }
        class Entity implements IEntity {
            constructor(a, b) { }
        }
        class Kos {
            constructor(a:'123', b: 98) {

            }
        }
        // type key =  new(a:'123', b: 98) => any
        type key =  typeof Kos // 这样就伪证明 new(a:'123', b: 98):any 这样了 
        
        class l extends Kos  {
            constructor(a,b) {
                super(a,b)
            }
        }
        let a = new( l as key)('123',98)
        type EntityConstructorParamType = ConstructorParameters<(typeof Kos) | IEntityConstructor>; // ['123',98] // 这个Kos 还可以是抽象类 然后也可以直接是interface 或者 type 
        // 这里面的原理还是要归功 infer  其实看看源码就能明白 很简单  
//    Parameters<T extends (...args: any) => any> 获取函数的全部参数类型，以 元组类型 返回：
        type F1 = (a: string, b: number) => void;
        type F1ParamTypes = Parameters<F1>;  // [string, number]
 export {}


// 参考文献 
// extends:  https://juejin.cn/post/6844904066485583885
// is : https://www.wenjiangs.com/doc/typescript-is
// infer : https://juejin.cn/post/6844904067420913678
// 内置类型工具:https://juejin.cn/post/6844904068096196621#heading-2 

// Overview
// ! 断言操作符
// ! 的作用是断言某个变量不会是 null/undefined，告诉编辑器停止报错。
// ?. 链判断运算符
// keyof 可以获取一个对象接口的所有 key 值
// in 可以遍历枚举类型
// typeof 可以获取一个变量的声明类型


// 还有几个要看一下 
type key1 = keyof any //  string | number | symbol
type key2<T extends key1> = T // 看表达数里面的 "key2<T extends key1>"  这个鬼东西什么玩意。 解释一下 这里面extends key1 是要满足key1的类型才能使用
                             // 这时候 key1是string | number | symbol 也就是说 只有key2<string | number | symbol> 这几种情况下才可以使用 反之报错

// let ccc:key2<boolean> = 123 // Error

/**
 * 查看内置工具源码
 */

/**
 * Make all properties in T optional
 */
 type Partial<T> = {
    [P in keyof T]?: T[P];
};

/**
 * Make all properties in T readonly
 */
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};

/**
 * From T, pick a set of properties whose keys are in the union K
 */
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};

/**
 * Construct a type with a set of properties K of type T
 */
type Record<K extends keyof any, T> = {
    [P in K]: T;
};

/*
* Make all properties in T required
*/
type Required<T> = {
   [P in keyof T]-?: T[P];
};

/**
 * Exclude from T those types that are assignable to U
 */
 type Exclude<T, U> = T extends U ? never : T;

 /**
 * Extract from T those types that are assignable to U
 */
type Extract<T, U> = T extends U ? T : never;

/**
 * Construct a type with the properties of T except for those in type K.
 */
 type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

 /**
 * Exclude null and undefined from T
 */
type NonNullable<T> = T extends null | undefined ? never : T;

/**
 * Obtain the parameters of a function type in a tuple
 */
 type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;


 /**
 * Obtain the parameters of a constructor function type in a tuple
 */
type ConstructorParameters<T extends new (...args: any) => any> = T extends new (...args: infer P) => any ? P : never;


/**
 * Obtain the return type of a function type
 */
 type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;

 /**
 * Obtain the return type of a constructor function type
 */
type InstanceType<T extends new (...args: any) => any> = T extends new (...args: any) => infer R ? R : any;


/**
 * Extracts the type of the 'this' parameter of a function type, or 'unknown' if the function type has no 'this' parameter.
 */
 type ThisParameterType<T> = T extends (this: infer U, ...args: any[]) => any ? U : unknown;


 /**
 * Removes the 'this' parameter from a function type.
 */
type OmitThisParameter<T> = unknown extends ThisParameterType<T> ? T : T extends (...args: infer A) => infer R ? (...args: A) => R : T;
