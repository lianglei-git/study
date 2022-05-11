
function knapsack(weights,values,totalW) {
    let length = weights.length;

    let f = [];

    for(var w = 0; w <= totalW;w++){
            f[w] = [];
        for(var i = 0; i< length;i++){
            if(w===0) {
                f[w][i] = 0;
            }
            if(weights[i] > w) {
                f[w][i] = f[w][i-1] || 0;
            }else {
                let v1 =(f[w - weights[i]][i-1] || 0) + values[i];
                let v2 =  (f[w][i-1] || 0);
                f[w][i] = Math.max(v1,v2)
            }
        }
    }
    console.log(f);
}

knapsack([2, 2, 6, 5, 4], [6, 3, 5, 4, 6], 10)