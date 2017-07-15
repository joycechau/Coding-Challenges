//Brute force - can do bottom-up iteratively in O(n) time or recursively but that's O(2^n) which is exponential

// Solution
// We use a bottom-up ↴ approach, starting with the 0th fibonacci number and iteratively computing subsequent numbers until we get to nn.

  function fib(n) {

    // edge cases:
    if (n < 0) {
        throw new Error('Index was negative. No such thing as a negative index in a series.');
    } else if (n === 0 || n === 1) {
        return n;
    }

    // we'll be building the fibonacci series from the bottom up
    // so we'll need to track the previous 2 numbers at each step
    var prevPrev = 0;  // 0th fibonacci
    var prev = 1;      // 1st fibonacci
    var current;       // Declare current

    for (var i = 1; i < n; i++) {

        // Iteration 1: current = 2nd fibonacci
        // Iteration 2: current = 3rd fibonacci
        // Iteration 3: current = 4th fibonacci
        // To get nth fibonacci ... do n-1 iterations.
        current = prev + prevPrev;
        prevPrev = prev;
        prev = current;
    }

    return current;
}

// Complexity
// N time and O(1) space.
//
// Bonus
// If you're good with matrix multiplication you can bring the time cost down even further, to O(\lg{n})O(lgn). Can you figure out how?
//
// What We Learned
// This one's a good illustration of the tradeoff we sometimes have between code cleanliness and efficiency.
//
// We could use a cute, recursive function to solve the problem. But that would cost O(2^n)O(2
// ​n
// ​​ ) time as opposed to NN time in our final bottom-up solution. Massive difference!
//
// In general, whenever you have a recursive solution to a problem, think about what's actually happening on the call stack. An iterative solution might be more efficient.
//
//


// Initial Solution
// function fib(n) {
//   let fibs = [0,1];
//   if (n < 2) {
//     return fibs[n];
//   }
//   // Iterative
//   // for (let i = 2; i <= n; i++) {
//   //   fibs.push(fibs[fibs.length - 1] + fibs[fibs.length - 2]);
//   // }
//   //
//   // return fibs[n];
//
//   // Recursive
//   return fib(n - 1) + fib(n - 2);
// }


console.log(fib(0)); // => 0
console.log(fib(1)); // => 1
console.log(fib(2)); // => 1
console.log(fib(3)); // => 2
console.log(fib(4)); // => 3
console.log(fib(5)); // => 5
console.log(fib(6)); // => 8
console.log(fib(7)); // => 13
