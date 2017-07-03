let fs = require("fs");
fs.readFile('weblog.txt', function (err, data) {
   if (err) {
      return console.error(err);
   }
   let webLog = data.toString();
   console.log(topTenRequestedObjects(webLog));
});

function topTenRequestedObjects(log) {
  let logs = log.split("\n");
  let parsedLog = [];
  let logTracker = {};
  let sortedLogTrackerList = [];
  let topTen = [];

  parseLogs(parsedLog, logs);
  updateTracker(logTracker, parsedLog);
  convertTrackerToSortedList(logTracker, sortedLogTrackerList);
  updateTopTen(topTen, sortedLogTrackerList);

  return topTen;
}

function parseLogs(array, logs) {
  for (let i = 0; i < logs.length; i++) {
    array.push(logs[i].split(" "));
  }
}

function updateTracker(tracker, listOfLogs) {
  for (let i = 0; i < listOfLogs.length; i++) {
    let fileName = listOfLogs[i][3];
    let request = listOfLogs[i][2];
    let httpStatus = listOfLogs[i][5];
    let size = parseInt(listOfLogs[i][6]);

    if (request === '"GET' && httpStatus[0] === "2") {
      if (tracker[fileName]) {
        tracker[fileName] += size;
      } else {
        tracker[fileName] = size;
      }
    }
  }
}

function convertTrackerToSortedList(tracker, list) {
  for (let i in tracker) {
    list.push([i, tracker[i]]);
  }

  list.sort((a, b) => b[1] - a[1]);
}

function updateTopTen(array, list) {
  for (let i = 0; i < list.length; i++) {
    if (array.length >= 10) {
      break;
    } else {
      array.push(list[i]);
    }
  }
}
