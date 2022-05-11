type MyReturnType<T extends (...args:any) => any> = T extends (...args:any) => infer F ? F : T

function abs() {
    return {
        k: String
    }
}
type ans = typeof abs;
type returns = ReturnType<typeof abs>
const a = (v: boolean) => 1
type as = MyReturnType<typeof a>