// Brute force - compare every time to every other time and see if it adds up to flight time. Would take O(n^2)

// Solution
// We make one pass through movieLengths, treating each item as the firstMovieLength. At each iteration, we:
//
// See if there's a matchingSecondMovieLength we've seen already (stored in our movieLengthsSeen set) that is equal to flightLength - firstMovieLength. If there is, we short-circuit and return true.
// Keep our movieLengthsSeen set up to date by throwing in the current firstMovieLength.
  function canTwoMoviesFillFlight(movieLengths, flightLength) {

    // movie lengths we've seen so far
    var movieLengthsSeen = new Set();

    for (var i = 0; i < movieLengths.length; i++) {
        var firstMovieLength = movieLengths[i];

        var matchingSecondMovieLength = flightLength - firstMovieLength;
        if (movieLengthsSeen.has(matchingSecondMovieLength)) {
            return true;
        }

        movieLengthsSeen.add(firstMovieLength);
    }

    // we never found a match, so return false
    return false;
}

// We know users won't watch the same movie twice because we check movieLengthsSeen for matchingSecondMovieLength before we've put firstMovieLength in it!
//
// Complexity
// O(n)O(n) time, and O(n)O(n) space. Note while optimizing runtime we added a bit of space cost.
//
// Bonus
// What if we wanted the movie lengths to sum to something close to the flight length (say, within 20 minutes)?
// What if we wanted to fill the flight length as nicely as possible with any number of movies (not just 2)?
// What if we knew that movieLengths was sorted? Could we save some space and/or time?
// What We Learned
// The trick was to use a set to access our movies by length, in O(1)O(1) time.
//
// Using hash-based data structures, like objects or sets, is so common in coding challenge solutions, it should always be your first thought. Always ask yourself, right from the start: "Can I save time by using an object?"





// Initial solution
function perfectTwoMovieLengths(flightTime, movieLengths) {
  let movieTimeTracker = {};
  for (let i = 0; i < movieLengths.length; i++) {
    let movieLength = movieLengths[i];
    if (movieTimeTracker[flightTime - movieLength]) {
      return true;
    } else {
      movieTimeTracker[movieLength] = true;
    }
  }

  return false;
}

// console.log(perfectTwoMovieLengths(100,[0,5,7,8])); //false
// console.log(perfectTwoMovieLengths(100,[100,5,7,8])); //false
// console.log(perfectTwoMovieLengths(100,[23,50,7,43])); //false
// console.log(perfectTwoMovieLengths(100,[90,5,7,8, 10])); //true
// console.log(perfectTwoMovieLengths(100,[10,50,50,8])); //true
// console.log(perfectTwoMovieLengths(100,[23,57,7,43])); //true
console.log(canTwoMoviesFillFlight([0,5,7,8], 100)); //false
console.log(canTwoMoviesFillFlight([100,5,7,8], 100)); //false
console.log(canTwoMoviesFillFlight([23,50,7,43], 100)); //false
console.log(canTwoMoviesFillFlight([90,5,7,8, 10], 100)); //true
console.log(canTwoMoviesFillFlight([10,50,50,8], 100)); //true
console.log(canTwoMoviesFillFlight([23,57,7,43], 100)); //true
