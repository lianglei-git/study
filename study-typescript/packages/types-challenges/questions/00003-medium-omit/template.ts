type MyOmit<T, K> = Pick<T, Exclude<keyof T, K>>

//   type ant=('a' extends ('a') ? never:'a') | ('b' extends ('a') ? never:'b') | ('c' extends ('a') ? never:'c') ;