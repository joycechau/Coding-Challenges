// 1. Breakdown into 2 cases - how do we know whether it should be merged?
// 		-Is first one's end time >= second one's start time?  If so, merge with first one's
//       start time and the larger of first and second's end time. If not, push second one
//       into array and continue comparing.
// 2. Sort array
// 3. Iterative over sorted array, comparing adjacent meetings
// 4. Return merged meeting times.


function myFunction(arg) {
    const sortedMeetingTimes = arg.slice().sort(function(a, b) {
    	return a.startTime - b.startTime;
    });
  	const mergedTimes = [sortedMeetingTimes[0]];

    for (let i = 1; i < sortedMeetingTimes.length; i++) {
    	  let currentMeetingTime = sortedMeetingTimes[i];
        let lastMergedMeetingTimes = mergedTimes[mergedTimes.length - 1];
        if (lastMergedMeetingTimes.endTime >= currentMeetingTime.startTime) {
        	lastMergedMeetingTimes.endTime = Math.max(lastMergedMeetingTimes.endTime, currentMeetingTime.endTime);
        } else {
          mergedTimes.push(currentMeetingTime);
       	// 	mergedTimes[mergedTimes.length] = currentMeetingTime;
        }

    }

    return mergedTimes;
}

// run your function through some test cases here
// remember: debugging is half the battle!

const input =   [
    {startTime: 0,  endTime: 1},
    {startTime: 3,  endTime: 5},
    {startTime: 4,  endTime: 8},
    {startTime: 10, endTime: 12},
    {startTime: 9,  endTime: 10}
]
console.log(myFunction(input));
//   [
//    {startTime: 0, endTime: 1},
//    {startTime: 3, endTime: 8},
//    {startTime: 9, endTime: 12}
//]
