可以先来回顾一下： 无向图、有向图、无权图、有向有权图;

### 图的基本知识

- 图
  有节点或有节点有连接的组成就是图，
- 术语image.png
  - V(vertex) {v1,v2,v3,...n} -> 顶点
  - E(edge)   {e1,e2,e3,...n}   -> 边
- 临接表
  ```js
    /* 无向图的邻接表 */
    const adjacencyList = {
        1: [2, 3, 4],
        2: [1, 4],
        3: [1, 4, 6],
        4: [1, 2, 3],
        5: [],
        6: [3, 7],
        7: [6]
    }
  ```
    [adjacency-list](./imgs/adjacency-list.png)
- 邻接矩阵
    ```js
    /* 无向图的邻接矩阵 */
    /* 0代表正无穷 或者 没有边 */ 
    /* 无向都是对称的 */
    const adjacencyMatrix = [
        [0, 1, 1, 1, 0, 0, 0],
        [1, 0, 0, 1, 0, 0, 0],
        [1, 0, 0, 1, 0, 1, 0],
        [1, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 1, 0]
    ]
    ```
    [adjacency-matrix](./imgs/adjacency-matrix.png)





### 有向图

#### [有向无权图](imgs/DirectedUnweighted.png)

```js
const adjacencyList = {
    1: [2, 4],
    2: [4, 5],
    3: [1, 6],
    4: [5],
    5: [],
    6: [7],
    6: [6]
}
```

#### [有向有权图](imgs/DirectedWeighted.png)

