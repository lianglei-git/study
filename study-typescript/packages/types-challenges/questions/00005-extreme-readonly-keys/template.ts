type GetReadonlyKeys<T> = {
    readonly[P in keyof T]: T[P]
}


type a = GetReadonlyKeys<{
    readonly til: ''
    k:string
}>
type GetReadonlyKeys<T> =
 {[K in keyof T]-?: (<U>() => U extends {-readonly [P in K]: T[K]} ? 1 : 2) extends (<U>() => U extends {[P in K]: T[K]} ? 1 : 2) ? never : K}[keyof T];
type a =  intrinsic 
type A = <T>() => T extends string ? 1 : 2

type SsS = A

let a:SsS = 1