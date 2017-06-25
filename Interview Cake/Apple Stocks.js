// Brute force - Try every pair and use 2 nested loops => O(n^2)

// Solution
// We’ll greedily ↴ walk through the array to track the max profit and lowest price so far.
//
// For every price, we check if:
//
// we can get a better profit by buying at minPrice and selling at the currentPrice
// we have a new minPrice
// To start, we initialize:
//
// minPrice as the first price of the day
// maxProfit as the first profit we could get
// We decided to return a negative profit if the price decreases all day and we can't make any money. We could have thrown an exception instead, but returning the negative profit is cleaner, makes our function less opinionated, and ensures we don't lose information.

  function getMaxProfit(stockPricesYesterday) {

    // make sure we have at least 2 prices
    if (stockPricesYesterday.length < 2) {
        throw new Error('Getting a profit requires at least 2 prices');
    }

    // we'll greedily update minPrice and maxProfit, so we initialize
    // them to the first price and the first possible profit
    var minPrice = stockPricesYesterday[0];
    var maxProfit = stockPricesYesterday[1] - stockPricesYesterday[0];

    // start at the second (index 1) time
    // we can't sell at the first time, since we must buy first,
    // and we can't buy and sell at the same time!
    // if we started at index 0, we'd try to buy *and* sell at time 0.
    // this would give a profit of 0, which is a problem if our
    // maxProfit is supposed to be *negative*--we'd return 0.
    for (var i = 1; i < stockPricesYesterday.length; i++) {
        var currentPrice = stockPricesYesterday[i];

        // see what our profit would be if we bought at the
        // min price and sold at the current price
        var potentialProfit = currentPrice - minPrice;

        // update maxProfit if we can do better
        maxProfit = Math.max(maxProfit, potentialProfit);

        // update minPrice so it's always
        // the lowest price we've seen so far
        minPrice = Math.min(minPrice, currentPrice);
    }

    return maxProfit;
}

// Complexity
// O(n)O(n) time and O(1)O(1) space. We only loop through the array once.
//
// What We Learned
// This one's a good example of the greedy ↴ approach in action. Greedy approaches are great because they're fast (usually just one pass through the input). But they don't work for every problem.
//
// How do you know if a problem will lend itself to a greedy approach? Best bet is to try it out and see if it works. Trying out a greedy approach should be one of the first ways you try to break down a new question.
//
// To try it on a new problem, start by asking yourself:
//
// "Suppose we could come up with the answer in one pass through the input, by simply updating the 'best answer so far' as we went. What additional values would we need to keep updated as we looked at each item in our set, in order to be able to update the 'best answer so far' in constant time?"
//
// In this case:
//
// The "best answer so far" is, of course, the max profit that we can get based on the prices we've seen so far.
//
// The "additional value" is the minimum price we've seen so far. If we keep that updated, we can use it to calculate the new max profit so far in constant time. The max profit is the larger of:
//
// The previous max profit
// The max profit we can get by selling now (the current price minus the minimum price seen so far)

// run your function through some test cases here
// remember: debugging is half the battle!
console.log(getMaxProfit([10, 7, 5, 8, 11, 9])); // 6
console.log(getMaxProfit([10, 7, 1, 8, 11, 30])); // 29
console.log(getMaxProfit([2, 7, 1, 8, 11, 30])); // 29
console.log(getMaxProfit([5,4,3,2,1])); // -1
console.log(getMaxProfit([20,15,13,7,1])); // -2
console.log(getMaxProfit([16,15,10,7,1])); // -1
console.log(getMaxProfit([19,15,10,7,6])); // -1
console.log(getMaxProfit([20,15,14,1,1])); // 0
