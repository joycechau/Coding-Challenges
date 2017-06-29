// Solution
// We maintain the maxTemp, minTemp, mean, and mode as temperatures are inserted, so that each getter function simply returns a property.
//
// To maintain the mean at each insert, we track the totalNumbers and the totalSum of numbers inserted so far.
//
// To maintain the mode at each insert, we track the total occurrences of each number, as well as the maxOccurrences we've seen so far.

  function TempTracker() {

    // for mode
    this.occurrences = []; // array of 0s at indices 0..110
    for (var i = 0; i < 111; i++) {
        this.occurrences[i] = 0;
    }
    this.maxOccurrences = 0;
    this.mode = null;

    // for mean
    this.totalNumbers = 0;
    this.totalSum = 0;
    this.mean = null;

    // for min and max
    this.minTemp = null;
    this.maxTemp = null;
}

TempTracker.prototype.insert = function(temperature) {

    // for mode
    this.occurrences[temperature]++;
    if (this.occurrences[temperature] > this.maxOccurrences) {
        this.mode = temperature;
        this.maxOccurrences = this.occurrences[temperature];
    }

    // for mean
    this.totalNumbers++;
    this.totalSum += temperature;
    this.mean = this.totalSum / this.totalNumbers;

    // for min and max
    if (this.maxTemp === null || temperature > this.maxTemp) {
        this.maxTemp = temperature;
    }
    if (this.minTemp === null || temperature < this.minTemp) {
        this.minTemp = temperature;
    }
};

TempTracker.prototype.getMax = function() {
    return this.maxTemp;
};

TempTracker.prototype.getMin = function() {
    return this.minTemp;
};

TempTracker.prototype.getMean = function() {
    return this.mean;
};

TempTracker.prototype.getMode = function() {
    return this.mode;
};

// We don't really need the getter functions since they all return properties. We could directly access the properties!
//
//   // function
// tempTracker.getMean();
//
// // property
// tempTracker.mean;
// JavaScript
// We'll leave the getter functions in our solution because the question specifically asked for them.
//
// But otherwise, we probably would use properties instead of functions. In JavaScript we usually don't make getters if we don't have to, to avoid unnecessary layers of abstraction. But in Java we would use getters because they give us flexibility—if we wanted to change how we calculate values (for example, we might want to calculate a value just-in-time ↴ ), it won't change how other people interact with our class—they wouldn't have to switch from using a property to using a getter method. Different languages, different conventions.
//
// Complexity
// O(1)O(1) time for each function, and O(1)O(1) space related to input! (Our occurrences array's size is bounded by our range of possible temps, in this case 0-110)
//
// What We Learned
// This question brings up a common design decision: whether to do work just-in-time or ahead-of-time.
//
// Our first thought for this question might have been to use a just-in-time approach: have our insert() function simply put the temperature in a list, and then have our getters compute e.g. the mode just-in-time, at the moment the getter is called.
//
// Instead, we used an ahead-of-time approach: have our insert function compute and store our mean, mode, max, and min ahead of time (that is, before they're asked for). So our getter just returns the pre-computed value in O(1)O(1) time.
//
// In this case, the ahead-of-time approach doesn't just speed up our getters...it also reduces our space cost. If we tried to compute each metric just-in-time, we'd need to store all of the temperatures as they come in, taking O(n)O(n) space for nn insert()s.
//
// As an added bonus, the ahead-of-time approach didn't increase our asymptotic time cost for inserts, even though we added more work. With some cleverness (channeling some greedy ↴ thinking to figure out what we needed to store in order to update the answer in O(1)O(1) time), we were able to keep it at O(1)O(1) time.
//
// It doesn't always happen this way. Sometimes there are trade-offs between just-in-time and ahead-of-time. Sometimes to save time in our getters, we have to spend more time in our insert.
//
// In those cases, whether we should prefer a just-in-time approach or an ahead-of-time approach is a nuanced question. Ultimately it comes down to your usage patterns. Do you expect to get more inserts than gets? Do slow inserts have a stronger negative effect on users than slow gets?
//
// We have some more questions dealing with this stuff coming up later.
//
// Whenever you're designing a data structure with inserts and getters, think about the advantages and disadvantages of a just-in-time approach vs an ahead-of-time approach.

//Initial Solution:

// class TempTracker {
//   constructor() {
//     this.temperatures = [];
//     this.temperatureCounter = {};
//   }
//
//   insert(temp) {
//     this.temperatures.push(temp);
//     if (!this.temperatureCounter[temp]) {
//       this.temperatureCounter[temp] = 1;
//     } else {
//       this.temperatureCounter[temp]++;
//     }
//   }
//
//   getMax() {
//     return Math.max.apply(null, this.temperatures);
//   }
//
//   getMin() {
//     return Math.min.apply(null, this.temperatures);
//   }
//
//   getMean() {
//     let total = 0;
//     this.temperatures.forEach(function(temp) { total += temp; });
//     return total / this.temperatures.length;
//   }
//
//   getMode() {
//     let sortedTemperatures = [];
//     for (let temp in this.temperatureCounter) {
//       sortedTemperatures.push([temp, this.temperatureCounter[temp]]);
//     }
//     sortedTemperatures.sort((a, b) => b[1] - a[1]);
//     return sortedTemperatures[0][0];
//   }
// }

let tempTracker = new TempTracker();
tempTracker.insert(5);
console.log(tempTracker.getMode());
tempTracker.insert(50);
console.log(tempTracker.getMax());
tempTracker.insert(100);
console.log(tempTracker.getMode());
tempTracker.insert(100);
tempTracker.insert(123.2342);
console.log(tempTracker.getMin());
console.log(tempTracker.getMean());
// console.log(tempTracker);
