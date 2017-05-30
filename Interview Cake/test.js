function varTest() {
  var x = 1;
  if (true) {
    var x = 2;  // same variable!
    console.log(x);  // 2
  }
  console.log(x);  // 2
}

function letTest() {
  let x = 1;
  if (true) {
    let y = 2;  // different variable
    console.log(x);  // 2
  }
  console.log(y);  // 1
}

letTest()
