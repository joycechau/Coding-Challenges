//Brute force - We could compare every meeting to every other meeting in this way, merging them or leaving them separate. Comparing all pairs of meetings would take O(n^2) time.

//Brute force solution:
// function myFunction(arg) {
//   let mergedTimes = arg.slice();
//   for (let i = 0; i < mergedTimes.length; i++) {
//     for (let j = i + 1; j < mergedTimes.length; j++) {
//       let firstTime = mergedTimes[i];
//       let secondTime = mergedTimes[j];
//       if (firstTime.startTime <= secondTime.startTime && firstTime.endTime >= secondTime.startTime) {
//         firstTime.endTime = Math.max(firstTime.endTime, secondTime.endTime);
//         mergedTimes.splice(j, 1);
//       }
//       if (secondTime.startTime <= firstTime.startTime && secondTime.endTime >= firstTime.startTime) {
//         secondTime.endTime = Math.max(firstTime.endTime, secondTime.endTime);
//         mergedTimes.splice(i, 1);
//       }
//     }
//   }
//
//   return mergedTimes;
// }

// Solution
// First, we sort our input array of meetings by start time so any meetings that might need to be merged are now next to each other.
//
// Then we walk through our sorted meetings from left to right. At each step, either:
//
// We can merge the current meeting with the previous one, so we do.
// We can't merge the current meeting with the previous one, so we know the previous meeting can't be merged with any future meetings and we throw the current meeting into mergedMeetings.

  function mergeRanges(meetings) {

    // sort by start times
    var sortedMeetings = meetings.slice().sort(function(a, b) {
        return a.startTime > b.startTime ? 1 : -1;
    });

    // initialize mergedMeetings with the earliest meeting
    var mergedMeetings = [sortedMeetings[0]];

    for (var i = 1; i < sortedMeetings.length; i++) {

        var currentMeeting    = sortedMeetings[i];
        var lastMergedMeeting = mergedMeetings[mergedMeetings.length - 1];

        // if the current and last meetings overlap, use the latest end time
        if (currentMeeting.startTime <= lastMergedMeeting.endTime) {
            lastMergedMeeting.endTime = Math.max(lastMergedMeeting.endTime, currentMeeting.endTime);

        // add the current meeting since it doesn't overlap
        } else {
            mergedMeetings.push(currentMeeting);
        }
    }

    return mergedMeetings;
}

// Complexity
// O(nlog(n)) time and O(n) space.
//
// Even though we only walk through our array of meetings once to merge them, we sort all the meetings first, giving us a runtime of O(n\lg{n})O(nlgn). It's worth noting that if our input were sorted, we could skip the sort and do this in O(n)O(n) time!
//
// We create a new array of merged meeting times. In the worst case, none of the meetings overlap, giving us an array identical to the input array. Thus we have a worst-case space cost of O(n)O(n).
//
// Bonus
// What if we did have an upper bound on the input values? Could we improve our runtime? Would it cost us memory?
// Could we do this "in-place" on the input array and save some space? What are the pros and cons of doing this in-place?
// What We Learned
// This one arguably uses a greedy ↴ approach as well, except this time we had to sort the array first.
//
// How did we figure that out?
//
// We started off trying to solve the problem in one pass, and we noticed that it wouldn't work. We then noticed the reason it wouldn't work: to see if a given meeting can be merged, we have to look at all the other meetings! That's because the order of the meetings is random.
//
// That's what got us thinking: what if the array were sorted? We saw that then a greedy approach would work. We had to spend O(n\lg{n})O(nlgn) time on sorting the array, but it was better than our initial brute force approach, which cost us O(n^2)O(n
// ​2
// ​​ ) time!

const input =   [
    {startTime: 0,  endTime: 1},
    {startTime: 3,  endTime: 5},
    {startTime: 4,  endTime: 8},
    {startTime: 10, endTime: 12},
    {startTime: 9,  endTime: 10}
]
console.log(myFunction(input));
console.log(mergeRanges(input));
//   [
//    {startTime: 0, endTime: 1},
//    {startTime: 3, endTime: 8},
//    {startTime: 9, endTime: 12}
//]
