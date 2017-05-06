//optimal solution

function myFunction(arg) {
    if (arg.length < 2) {
        throw new Error("Input array cannot be less than 2");
    }

    const productOfAllOtherNumbers = [];
    let productSoFar = 1;

    for (let i = 0; i < arg.length; i++) {
		productOfAllOtherNumbers[i] = productSoFar;
        productSoFar *= arg[i];
    }

    productSoFar = 1;
    for (let i = arg.length - 1; i >= 0; i--) {
		productOfAllOtherNumbers[i] *= productSoFar;
        productSoFar *= arg[i];
    }

    return productOfAllOtherNumbers;
}

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
console.log(myFunction([1, 7, 3, 4])); // [84, 12, 28, 21]
console.log(myFunction([1, 0, 3, 4])); // [0, 12, 0, 0]
console.log(myFunction([3, 4])); // [4, 3]
console.log(myFunction([3])); // exception
