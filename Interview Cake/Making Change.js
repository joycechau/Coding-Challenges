// If no coins is less than amount, return 0;
// Case 1 coin => Is it evenly divisible by amount? If so, return 1.
// Case 2 coins => Are any less than amount? If so, is it divisible?  If not, can you add it with the other coin?
// Case 3 coins => For each coin.  Check if it's evenly divisible.  Then subtract that coin from amount.  Now you have new amount with 2 other coins.

function makeChange(amount, coins) {
  if (coins.every(coin => coin > amount) || coins.length === 0) {
    return 0;
  }



  let numberOfWays = 0;

  if (coins.length === 1) {
    if (amount === coins[0] || amount % coins[0] === 0) {
      numberOfWays++;
    }

    return numberOfWays;
  }

  if (coins.length === 2) {
    coins.forEach(coin => numberOfWays += makeChange(amount, [coin]));
  } else {
    coins.forEach(function(coin, index) {
      numberOfWays += makeChange(amount, [coin]);
      let newAmount = amount - coin;
      numberOfWays += makeChange(newAmount, coins.splice(index, 1));
    });
  }


  return numberOfWays;
}


console.log("Test 1: " + makeChange(4, [4])); // 1
console.log("Test 2: " + makeChange(4, [2])); // 1
console.log("Test 3: " + makeChange(8, [2, 4])); // 2
console.log("Test 4: " + makeChange(8, [2, 3])); // 1
console.log("Test 5: " + makeChange(4, [1,2,3])); // 4
console.log("Test 6: " + makeChange(4, [])); // 0
console.log("Test 7: " + makeChange(4, [5,6,7])); // 0
