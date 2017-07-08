// Brute force - Loop through entire array until you reach a point where the next word is smaller than the previous word.  Uses O(n)

// Solution
// This is a modified version of binary search ↴ . At each iteration, we go right if the item we're looking at is greater than the first item and we go left if the item we're looking at is less than the first item.
//
// We keep track of the lower and upper bounds on the rotation point, calling them floorIndex and ceilingIndex (initially we called them "floor" and "ceiling," but because we didn't imply the type in the name we got confused and created bugs). When floorIndex and ceilingIndex are directly next to each other, we know the floor is the last item we added before starting from the beginning of the dictionary, and the ceiling is the first item we added after.

  function findRotationPoint(words) {
    const firstWord = words[0];

    var floorIndex = 0;
    var ceilingIndex = words.length - 1;

    while (floorIndex < ceilingIndex) {

        // guess a point halfway between floor and ceiling
        var guessIndex = Math.floor(floorIndex + ((ceilingIndex - floorIndex) / 2));

        // if guess comes after first word or is the first word
        if (words[guessIndex] >= firstWord) {
            // go right
            floorIndex = guessIndex;
        } else {
            // go left
            ceilingIndex = guessIndex;
        }

        // if floor and ceiling have converged
        if (floorIndex + 1 === ceilingIndex) {

            // between floor and ceiling is where we flipped to the beginning
            // so ceiling is alphabetically first
            break;
        }
    }

    return ceilingIndex;
}

// Complexity
// Each time we go through the while loop, we cut our range of indices in half, just like binary search. So we have O(\lg{n})O(lgn) loop iterations.
//
// In each loop iteration, we do some arithmetic and a string comparison. The arithmetic is constant time, but the string comparison requires looking at characters in both words—every character in the worst case. Here, we'll assume our word lengths are bounded by some constant so we'll say the string comparison takes constant time.
//
// The longest word in English is pneumonoultramicroscopicsilicovolcanoconiosis, a medical term. It's 45 letters long.
//
// Putting everything together, we do O(\lg{n})O(lgn) iterations, and each iteration is O(1)O(1) time. So our time complexity is O(\lg{n})O(lgn).
//
// Some languages—like German, Russian, and Dutch—can have arbitrarily long words, so we might want to factor the length of the words into our runtime. We could say the length of the words is \ellℓ, each string comparison takes O(\ell)O(ℓ) time, and the whole algorithm takes O(\ell*\lg{n})O(ℓ∗lgn) time.
//
// We use O(1)O(1) space to store the first word and the floor and ceiling indices.
//
// Bonus
// This function assumes that the array is rotated. If it isn't, what index will it return? How can we fix our function to return 0 for an unrotated array?
//
// What We Learned
// The answer was a modified version of binary search.
//
// This is a great example of the difference between "knowing" something and knowing something. You might have seen binary search before, but that doesn't help you much unless you've learned the lessons of binary search.
//
// Binary search teaches us that when an array is sorted or mostly sorted:
//
// The value at a given index tells us a lot about what's to the left and what's to the right.
// We don't have to look at every item in the array. By inspecting the middle item, we can "rule out" half of the array.
// We can use this approach over and over, cutting the problem in half until we have the answer. This is sometimes called "divide and conquer."
// So whenever you know an array is sorted or almost sorted, think about these lessons from binary search and see if they apply.
let words1 = [
  'ptolemaic',
  'retrograde',
  'supplant',
  'undulate',
  'xenoepist',
  'asymptote', // <-- rotates here!
  'babka',
  'banoffee',
  'engender',
  'karpatka',
  'othellolagkage',
];
let words2 = [ 'k','v','a','b','c','d','e','g','i' ];


console.log(findRotationPoint(words1)); // 5
console.log(findRotationPoint(words2)); // 2
