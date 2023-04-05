let a = [[1]];
let b = [[2]];

let N = a[0].length;
let M = a.length;
for(let i = 0; i< M; i++){
    for(let j = 0; j < N; j++){
        console.log(i,j)
    a[i].push(b[i][j])
};

}

console.log(a,b)