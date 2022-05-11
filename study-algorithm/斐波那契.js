
// o(n^2)
function fib(i) {
    if(i<2) {
        return i;
    }else {
        return fib(i - 1) + fib(i - 2);

    }
}


// o(n)
function fib2(i) {
    if(i< 2) {
        return i;
    }
    let last = 1;
    let nexttolast = 1;
    let fibCurrent = 1;

    for(let j = 2;j<i;j++){
        last = fibCurrent;
        fibCurrent = last + nexttolast;
        nexttolast = last;
    }
    return fibCurrent;
}



console.log(fib2(10))



function* fibs() {
    let a = 0;
    let b = 1;
    while (true) {
      yield a;
      [a, b] = [b, a + b];
    }
  }
  let k = fibs();
  let c=0;
  for(var i = 0;i<11;i++){
    c = k.next().value
  }
  
 console.log(c)