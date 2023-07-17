var viewEl = document.querySelector(".left");
var viewResultEl = document.querySelector(".right");
var btnEl = document.querySelector(".container");
var removeEl = document.querySelector(".remove");
var resultEl = document.querySelector(".result");

var viewValue = [];
var total = 0;

// nhan gia tri vao mang
btnEl.onclick = function (e) {
  var itemValue = e.target.closest(".item:not(.not-show")?.textContent;
  if (itemValue) {
    if (!isNaN(viewValue[viewValue.length - 1]) && !isNaN(itemValue)) {
      viewEl.innerHTML = viewValue.join("") + itemValue;
      viewValue[viewValue.length - 1] =
        viewValue[viewValue.length - 1] + itemValue;
    } else {
      viewEl.innerHTML = viewValue.join("") + itemValue;
      viewValue.push(itemValue);
    }
  }
};
// clear
removeEl.onclick = () => {
  total = 0;
  viewValue = [];
  viewEl.innerHTML = "0";
  viewResultEl.innerHTML = "0";
};
// solve
resultEl.onclick = () => {
  var currentCal = "+";
  let newArr = [];

  // if(viewValue.includes("*")||viewValue.includes("/")) {
  viewValue.forEach((item, index) => {
    if (item === "*") {
      // newArr.push(+viewValue[index - 1] * +viewValue[index + 1]);
      let a = +viewValue[index - 1] * +viewValue[index + 1];
      console.log(a);
    } else if (item === "/") {
      newArr.push(+viewValue[index - 1] / +viewValue[index + 1]);
    } else {
    }
  });
  console.log(newArr);

  newArr.map((item) => {
    switch (item) {
      case "+":
        currentCal = "+";
        break;
      case "-":
        currentCal = "-";
        break;
      case "*":
        currentCal = "*";
        break;
      case "/":
        currentCal = "/";
        break;
      case ".":
        currentCal = ".";
        break;
      default:
        // is number
        item = Number(item);
        switch (currentCal) {
          case "+":
            total += item;
            break;
          case "-":
            total -= item;
            break;
          case "*":
            total *= item;
            break;
          case "/":
            total /= item;
            break;
          case ".":
            total += item * 0.1;
            break;
        }
    }
    viewResultEl.innerHTML = total;
  });
};
