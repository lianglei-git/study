### React-Hooks

#### 大纲

1. <a href="#Hooks">Hooks 理念</a>
2. 简单的 Hooks 实现
3. Hooks 的数据结构
4. useState 于 useReducer
5. useEffect
6. useRef
7. useMemo 与 useCallback
8. 简单的 Hooks 实现
9. Hooks 的数据结构
10. useState 于 useReducer
11. useEffect
12. useRef
13. useMemo 与 useCallback

#### <p id="Hooks">Hooks 理念</p>


<details>
  <summary>考虑一下怎么出现的？</summary>
  
  *个人见解*
  1. **函数组件出现**,状态内部作用域内管理（猴子最终下了地，为了提高生产力）
  2. 宣扬函数组件的简洁与轻便（复用、嵌套地狱）

> class组件能做到吗，能，为啥不用，他复杂，看起来就多，那么有人说了，我用hoc一样，hoc本质也是函数包裹，这不就间接同意了函数组件的立场，我可不可以理解推崇函数组件呢？函数在现阶段提出来的理念叫“原子”（**参考**网站的介绍），认为component一类（class,func,frag）为react世界中的原子，那么原子不同元素是不是由质子的不同数量来组成的呢？当然，后续发现以更小粒子的质子、电子、中子等成为了原子的构成部分。抽象到React运行中，hook显著扮演的是更小粒子。
</details>

#### 参考

1. [原链接](https://react.iamkasong.com/hooks/prepare.html#%E4%BB%8Elogo%E8%81%8A%E8%B5%B7)
