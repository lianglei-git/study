

fn main(){
  // `n` 将在每次迭代中分别取 1, 2, ..., 100
  for n in 1..101 {
    if n % 15 == 0 {
        println!("fizzbuzz");
    } else if n % 3 == 0 {
        println!("fizz");
    } else if n % 5 == 0 {
        println!("buzz");
    } else {
        println!("{}", n);
    }
}
}