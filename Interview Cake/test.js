// "use strict";
// function varTest() {
//
//
//   x = 5;
// }
// console.log(x);
// varTest();
//
// function letTest() {
//   let x = 1;
//   if (true) {
//     let y = 2;  // different variable
//     console.log(y);  // 2
//     console.log(corgi);
//   }
//   console.log(y);  // 1
// }

// corgi("Joyce");

function firstNFibs(n) {
  let fibs = [0,1];
  if (n < 2) {
    return fibs;
  } else {
    let previousFibs = firstNFibs(n - 1);
    previousFibs.push(previousFibs[previousFibs.length -1] + previousFibs[previousFibs.length - 2]);
    return previousFibs;
  }

}
// setInterval(function() {console.log('hi')},2000);
// console.log(firstNFibs(0));
// console.log(firstNFibs(1));
// console.log(firstNFibs(2));
// console.log(firstNFibs(3));
// console.log(firstNFibs(5));
// console.log(firstNFibs(10));

function includesString(str1,str2) {
  // let currentString = "";
  // let str2CurrentIndex = 0;
  // let currentStr1Letter, currentStr2Letter;
  // for (let i = 0; i < str1.length; i++) {
  //   currentStr1Letter = str1[i];
  //   currentStr2Letter = str2[str2CurrentIndex];
  //   if (currentStr1Letter === currentStr2Letter) {
  //     currentString += currentStr1Letter;
  //     str2CurrentIndex++;
  //     if (currentString === str2) {
  //       return true;
  //     }
  //   } else {
  //     currentString = "";
  //     str2CurrentIndex = 0;
  //   }
  // }
  for (let i = 0; i < str1.length - str2.length + 1; i++) {
    let indexOfLastLetter = i + str2.length;
    if (str1.slice(i, indexOfLastLetter) === str2) {
      return true;
    }
  }

  return false;
}

// console.log(includesString("corgi","c")); //true
// console.log(includesString("corgi","gi")); //true
// console.log(includesString("corgi","i")); //true
// console.log(includesString("corgi","org")); //true
// console.log(includesString("corgi","corgi")); //true
// console.log(includesString("corgi","corg")); //true
// console.log(includesString("corgi","orgi")); //true
// console.log(includesString("corgi","co")); //true
// console.log(includesString("corgi","corl")); //false
// console.log(includesString("corgi","e")); //false
