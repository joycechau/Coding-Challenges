// Brute force - The brute force approach is to try every combination of cakes, but that would take a really long time—you'd surely be captured.

// Solution
// This is a classic computer science puzzle called "the unbounded knapsack problem."
//
// We use a bottom-up ↴ approach to find the max value at our duffel bag's weightCapacity by finding the max value at every capacity from 0 to weightCapacity.
//
// We allocate an array maxValuesAtCapacities where the indices are capacities and each value is the max value at that capacity.
//
// For each capacity, we want to know the max monetary value we can carry. To figure that out, we go through each cake, checking to see if we should take that cake.
//
// The best monetary value we can get if we take a given cake is simply:
//
// that cake's value, plus
// the best monetary value we can carry in our remaining duffel bag capacity after taking the cake—which we'll already have stored in maxValuesAtCapacities
// To handle weights and values of zero, we return infinity only if a cake weighs nothing and has a positive value.

  function maxDuffelBagValue(cakeTypes, weightCapacity) {

    // we make an array to hold the maximum possible value at every
    // duffel bag weight capacity from 0 to weightCapacity
    // starting each index with value 0
    var maxValuesAtCapacities = [];
    for (var i = 0; i <= weightCapacity; i++) {
        maxValuesAtCapacities[i] = 0;
    }

    for (var currentCapacity = 0; currentCapacity <= weightCapacity; currentCapacity++) {

        // set a variable to hold the max monetary value so far for currentCapacity
        var currentMaxValue = 0;

        // we use a for loop here instead of forEach because we return infinity
        // if we get a cakeType that weighs nothing and has a value. but forEach
        // loops always return undefined and you can't break out of them without
        // throwing an exception
        for (var j = 0; j < cakeTypes.length; j++) {
            var cakeType = cakeTypes[j];

            // if a cake weighs 0 and has a positive value the value of our duffel bag is infinite!
            if (cakeType.weight === 0 && cakeType.value !== 0) {
                return Infinity;
            }

            // if the current cake weighs as much or less than the current weight capacity
            // it's possible taking the cake would give get a better value
            if (cakeType.weight <= currentCapacity) {

                // so we check: should we use the cake or not?
                // if we use the cake, the most kilograms we can include in addition to the cake
                // we're adding is the current capacity minus the cake's weight. we find the max
                // value at that integer capacity in our array maxValuesAtCapacities
                var maxValueUsingCake = cakeType.value + maxValuesAtCapacities[currentCapacity - cakeType.weight];

                // now we see if it's worth taking the cake. how does the
                // value with the cake compare to the currentMaxValue?
                currentMaxValue = Math.max(maxValueUsingCake, currentMaxValue);
            }
        }

        // add each capacity's max value to our array so we can use them
        // when calculating all the remaining capacities
        maxValuesAtCapacities[currentCapacity] = currentMaxValue;
    }

    return maxValuesAtCapacities[weightCapacity];
}

// Complexity
// O(n*k) time, and O(k) space, where n is number of types of cake and k is the capacity of the duffel bag. We loop through each cake (n cakes) for every capacity (k capacities), so our runtime is O(n*k), and maintaining the array of k+1 capacities gives us the O(k) space.
//
// Congratulations! Because of dynamic programming, you have successfully stolen the Queen's cakes and made it big.
//
// Keep in mind: in some cases, it might not be worth using our optimal dynamic programming solution. It's a pretty slow algorithm—without any context (not knowing how many cake types we have, what our weight capacity is, or just how they compare) it's easy to see O(n*k)O(n∗k) potentially being as bad as O(n^2)O(n
// ​2
// ​​ ) if nn is close to kk.
//
// If we cared about time, like if there was an alarm in the vault and we had to move quickly, it might be worth using a faster algorithm that gives us a good answer, even if it's not always the optimal answer. Some of our first ideas in the breakdown were to look at cake values or value/weight ratios. Those algorithms would probably be faster, taking O(n\lg{n})O(nlgn) time (we'd have to start by sorting the input).
//
// Sometimes an efficient, good answer might be more practical than an inefficient, optimal answer.
//
// Bonus
// We know the max value we can carry, but which cakes should we take, and how many? Try adjusting your answer to return this information as well.
// What if we check to see if all the cake weights have a common denominator? Can we improve our algorithm?
// A cake that's both heavier and worth less than another cake would never be in the optimal solution. This idea is called dominance relations. Can you apply this idea to save some time? Hint: dominance relations can apply to sets of cakes, not just individual cakes.
// What if we had an object for every individual cake instead of types of cakes? So now there's not an unlimited supply of a type of cake—there's exactly one of each. This is a similar but harder problem, known as the 0/1 Knapsack problem.
// What We Learned
// This question is our spin on the famous "unbounded knapsack problem"—a classic dynamic programming question.
//
// If you're struggling with dynamic programming, we have reference pages for the two main dynamic programming strategies: memoization and going bottom-up.

let cakeTypes = [
  {weight: 7, value: 160},
  {weight: 3, value: 90},
  {weight: 2, value: 15},
];

let capacity = 20;

console.log(maxDuffelBagValue(cakeTypes, capacity)); // 555
console.log(maxDuffelBagValue(cakeTypes, 0)); // 0
console.log(maxDuffelBagValue(cakeTypes, 1)); // 0
console.log(maxDuffelBagValue(cakeTypes, 2)); // 15
console.log(maxDuffelBagValue(cakeTypes, 3)); // 90
console.log(maxDuffelBagValue(cakeTypes, 4)); // 90
console.log(maxDuffelBagValue(cakeTypes, 5)); // 105
console.log(maxDuffelBagValue(cakeTypes, 6)); // 180
console.log(maxDuffelBagValue(cakeTypes, 7)); // 180
console.log(maxDuffelBagValue(cakeTypes, 8)); // 195
console.log(maxDuffelBagValue(cakeTypes, 9)); // 270
