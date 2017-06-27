// Solution
// We divide the problem into two halves:
//
// The intersection along the x-axis
// The intersection along the y-axis
// Both problems are basically the same as finding the intersection of two "ranges" on a 1-dimensional number line.
//
// So we write a helper function findRangeOverlap() that can be used to find both the x overlap and the y overlap, and we use it to build the rectangular overlap:

  function findRangeOverlap(point1, length1, point2, length2) {

    // find the highest start point and lowest end point.
    // the highest ("rightmost" or "upmost") start point is
    // the start point of the overlap.
    // the lowest end point is the end point of the overlap.
    var highestStartPoint = Math.max(point1, point2);
    var lowestEndPoint = Math.min(point1 + length1, point2 + length2);

    // return null overlap if there is no overlap
    if (highestStartPoint >= lowestEndPoint) {
        return {startPoint: null, overlapLength: null};
    }

    // compute the overlap length
    var overlapLength = lowestEndPoint - highestStartPoint;

    return {startPoint: highestStartPoint, overlapLength: overlapLength};
}

function findRectangularOverlap(rect1, rect2) {

    // get the x and y overlap points and lengths
    var xOverlap = findRangeOverlap(rect1.leftX, rect1.width, rect2.leftX, rect2.width);
    var yOverlap = findRangeOverlap(rect1.bottomY, rect1.height, rect2.bottomY, rect2.height);

    // return null rectangle if there is no overlap
    if (!xOverlap.overlapLength || !yOverlap.overlapLength) {
        return {
            leftX: null,
            bottomY: null,
            width: null,
            height: null,
        };
    }

    return {
        leftX: xOverlap.startPoint,
        bottomY: yOverlap.startPoint,
        width: xOverlap.overlapLength,
        height: yOverlap.overlapLength,
    };
}

// Complexity
// O(1)O(1) time and O(1)O(1) space.
//
// Bonus
// What if we had an array of rectangles and wanted to find all the rectangular overlaps between all possible pairs of two rectangles within the array? Note that we'd be returning an array of rectangles.
//
// What if we had an array of rectangles and wanted to find the overlap between all of them, if there was one? Note that we'd be returning a single rectangle.
//
// What We Learned
// This is an interesting one because the hard part isn't the time or space optimization—it's getting something that works and is readable.
//
// For problems like this, I often see candidates who can describe the strategy at a high level but trip over themselves when they get into the details.
//
// Don't let it happen to you. To keep your thoughts clear and avoid bugs, take time to:
//
// Think up and draw out all the possible cases. Like we did with the ways ranges can overlap.
// Use very specific and descriptive variable names.

let rectangle1 = {

  // coordinates of bottom-left corner
  leftX: 1,
  bottomY: 5,

  // width and height
  width: 10,
  height: 4,

};

let rectangle2 = {

  // coordinates of bottom-left corner
  leftX: 6,
  bottomY: 4,

  // width and height
  width: 3,
  height: 7,

};

console.log(findRectangularOverlap(rectangle1, rectangle2));
// {leftX: 6, bottomY: 5, width: 3, height: 4}
