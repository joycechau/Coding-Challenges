//Input - array of stock prices; Output - best profit
//Edge cases - 1. no profit (return negative profit or 0),
//             2. ensure array is all positive integers
//             3. check array length > 1
//Variables needed: 1. bestProfit (initialize to 0)
//					2. currentProfit (initialize to 0)
//					3. currentTotal (initialize to 0)
//                  4. startIndex (initialize to 0)
//                  5. endIndex
//Steps: 1. Iterate over array, keep track of starting and ending index.
//       2. Keep track of current profit. If current profit is less than previous,
//	   	    reset start index only if current index is less than start index and continue,
//          comparing current profit to best profit
//       3. Change best profit to current profit if current profit is greater than best
//       4. Return best profit
function myFunction(arg) {

    // write the body of your function here
    if (arg.length < 2) {
        return 0
    };
    if (!arg.every(el => typeof el === 'number')) {
        return 0
    }
    let bestProfit = arg[1] - arg[0];
  	let minPrice = arg[0];
	  for (let i = 1; i < arg.length; i++) {
        let currentPrice = arg[i];
        let potentialProfit = currentPrice - minPrice
        bestProfit = Math.max(bestProfit, potentialProfit)
        minPrice = Math.min(minPrice, currentPrice)
    }
    return bestProfit
}

// run your function through some test cases here
// remember: debugging is half the battle!
console.log(myFunction([10, 7, 5, 8, 11, 9])); // 6
console.log(myFunction([])); // 0
console.log(myFunction([10])); // 0
console.log(myFunction([10, 7, "a", 8, 11, 9])); // 0
console.log(myFunction([10, 7, 1, 8, 11, 30])); // 29
console.log(myFunction([2, 7, 1, 8, 11, 30])); // 29
console.log(myFunction([5,4,3,2,1])); // -1
console.log(myFunction([20,15,13,7,1])); // -2
console.log(myFunction([16,15,10,7,1])); // -1
console.log(myFunction([19,15,10,7,6])); // -1
console.log(myFunction([20,15,14,1,1])); // 0
