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

console.log("Test 1: " + changePossibilitiesBottomUp(4, [4])); // 1
console.log("Test 2: " + changePossibilitiesBottomUp(4, [2])); // 1
console.log("Test 3: " + changePossibilitiesBottomUp(8, [2, 4])); // 2
console.log("Test 4: " + changePossibilitiesBottomUp(8, [2, 3])); // 1
console.log("Test 5: " + changePossibilitiesBottomUp(4, [1,2,3])); // 4
console.log("Test 6: " + changePossibilitiesBottomUp(4, [])); // 0
console.log("Test 7: " + changePossibilitiesBottomUp(4, [5,6,7])); // 0
