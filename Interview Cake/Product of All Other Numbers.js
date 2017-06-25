// Brute force - A brute force approach would use two loops to multiply the integer at every index by the integer at every nestedIndex, unless index === nestedIndex.
//
// This would give us a runtime of O(n^2)O(n
// ​2
// ​​ ). Can we do better?

// Solution
// To find the products of all the integers except the integer at each index, we'll go through our array greedily ↴ twice. First we get the products of all the integers before each index, and then we go backwards to get the products of all the integers after each index.
//
// When we multiply all the products before and after each index, we get our answer—the products of all the integers except the integer at each index!

  function getProductsOfAllIntsExceptAtIndex(intArray) {

    if (intArray.length < 2) {
        throw new Error('Getting the product of numbers at other indices requires at least 2 numbers');
    }

    var productsOfAllIntsExceptAtIndex = [];

    // for each integer, we find the product of all the integers
    // before it, storing the total product so far each time
    var productSoFar = 1;
    for (var i = 0; i < intArray.length; i++) {
        productsOfAllIntsExceptAtIndex[i] = productSoFar;
        productSoFar *= intArray[i];
    }

    // for each integer, we find the product of all the integers
    // after it. since each index in products already has the
    // product of all the integers before it, now we're storing
    // the total product of all other integers
    productSoFar = 1;
    for (var j = intArray.length - 1; j >= 0; j--) {
        productsOfAllIntsExceptAtIndex[j] *= productSoFar;
        productSoFar *= intArray[j];
    }

    return productsOfAllIntsExceptAtIndex;
}

// Complexity
// O(n)O(n) time and O(n)O(n) space. We make two passes through our input an array, and the array we build always has the same length as the input array.
//
// Bonus
// What if you could use division? Careful—watch out for zeroes!
//
// What We Learned
// Another question using a greedy ↴ approach. The tricky thing about this one: we couldn't actually solve it in one pass. But we could solve it in two passes!
//
// This approach probably wouldn't have been obvious if we had started off trying to use a greedy approach.
//
// Instead, we started off by coming up with a slow (but correct) brute force solution and trying to improve from there. We looked at what our solution actually calculated, step by step, and found some repeat work. Our final answer came from brainstorming ways to avoid doing that repeat work.
//
// So that's a pattern that can be applied to other problems:
//
// Start with a brute force solution, look for repeat work in that solution, and modify it to only do that work once.

//original solution

// 1. Iterate through array.
// 2. Keep product of all other integers
// 3. Return new array

//function myFunction(arg) {
//    const productOfAllOtherNumbersList = [];
//    for (let i = 0; i < arg.length; i++) {
//        let allOtherIntegers = arg.slice(0, i).concat(arg.slice(i + 1))
//        let productOfAllOtherNumbers = 1;
//		allOtherIntegers.forEach((num) => {
//        	productOfAllOtherNumbers *= num;
//        })
//        productOfAllOtherNumbersList.push(productOfAllOtherNumbers)
//    }
//    return productOfAllOtherNumbersList;
//}

// run your function through some test cases here
// remember: debugging is half the battle!
console.log(getProductsOfAllIntsExceptAtIndex([1, 7, 3, 4])); // [84, 12, 28, 21]
console.log(getProductsOfAllIntsExceptAtIndex([1, 0, 3, 4])); // [0, 12, 0, 0]
console.log(getProductsOfAllIntsExceptAtIndex([3, 4])); // [4, 3]
console.log(getProductsOfAllIntsExceptAtIndex([3])); // exception
