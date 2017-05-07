// 1. Keep track of 3 highest positive integers and 2 lowest negative integers
// 2. Check to see if the absolute value of the summation of 2 lowest negative integers is
//    greater than the summation of any of the 2 of the 3 position integers.
// 3. Select either 1) top 3 highest positive integers or
//                  2) top 1 highest positive intger and 2 lowest negative integer
// 4. Return product of the 3 selected numbers


function myFunction(arg) {
    if (arg.length < 3) {
        throw new Error("Cannot have less than 3 integers!")
    }
    if (arg.some(input => typeof input !== 'number')) {
    	throw new Error("All inputs must be integers");
    }

	let highestProductOf3 = arg[0] * arg[1] * arg[2];
    let highestProductOf2 = arg[0] * arg[1];
    let lowestProductOf2 = arg[0] * arg[1];
    let highest = Math.max(arg[0], arg[1]);
    let lowest = Math.min(arg[0], arg[1]);

    for (let i = 2; i < arg.length; i++) {
        let current = arg[i];
        highestProductOf3 = Math.max(highestProductOf3, highestProductOf2 * current, lowestProductOf2 * current)
        highestProductOf2 = Math.max(highestProductOf2, highest * current, lowest * current);
        lowestProductOf2 = Math.min(lowestProductOf2, lowest * current, highest * current);
       	highest = Math.max(highest, current);
        lowest = Math.min(lowest, current);
    }

    return highestProductOf3;
}

// run your function through some test cases here
// remember: debugging is half the battle!
console.log(myFunction([-10, -10, 1, 3, 2])); // 300
console.log(myFunction([2, 5, 3, 8])); // 120
console.log(myFunction([10, -10, 1, 3, 2])); // 60
console.log(myFunction([0, 0, 1, 3, 0])); // 0
console.log(myFunction([0, 1, 1, -3, 0])); // 0
console.log(myFunction([0, 123])); // Exception
