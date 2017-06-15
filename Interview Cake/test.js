// function varTest() {
//   // var x = 1;
//   if (true) {
//     var x = 2;  // same variable!
//     console.log(x);  // 2
//   }
//   console.log(x);  // 2
// }
// var corgi = "blah"
// function letTest() {
//   let x = 1;
//   if (true) {
//     let y = 2;  // different variable
//     console.log(y);  // 2
//     console.log(corgi);
//   }
//   console.log(y);  // 1
// }
//
// // varTest();
// letTest();

function includesString(str1,str2) {
  let currentString = "";
  let str2CurrentIndex = 0;
  for (let i = 0; i < str1.length; i++) {
    let currentStr1Letter = str1[i];
    let currentStr2Letter = str2[str2CurrentIndex];
    if (currentStr1Letter === currentStr2Letter) {
      currentString = currentString + currentStr1Letter;
      str2CurrentIndex++;
      if (currentString === str2) {
        return true;
      }
    } else {
      currentString = "";
      str2CurrentIndex = 0;
    }
  }

  return false;
}

console.log(includesString("corgi","c")); //true
console.log(includesString("corgi","gi")); //true
console.log(includesString("corgi","i")); //true
console.log(includesString("corgi","org")); //true
console.log(includesString("corgi","corgi")); //true
console.log(includesString("corgi","corg")); //true
console.log(includesString("corgi","orgi")); //true
console.log(includesString("corgi","co")); //true
console.log(includesString("corgi","corl")); //false
console.log(includesString("corgi","e")); //false
