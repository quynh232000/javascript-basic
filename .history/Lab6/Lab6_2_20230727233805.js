// render
const wrapperEl = document.querySelector(".wrapper");
const render = () => {
  let html = [];
  for (let i = 1; i < 136; i++) {
    html.push(`<div class="item" data-index=${i}></div>`);
  }
  wrapperEl.innerHTML = html.join("");
};
render();

// logic
let luotChoi = true;
const buttonEl = document.querySelectorAll(".item");
const showResultEl = document.querySelectorAll(".result");
const playBtnEl = document.querySelector(".btn-play");
let person1 = [];
let person2 = [];

// main
const run = () => {
  buttonEl.forEach((element) => {
    chon(element);
  });
};

// chon
const chon = (element) => {
  element.addEventListener("click", (e) => {
    if (!element.classList.contains("disabled")) {
      if (luotChoi) {
        element.textContent = "X";
        element.classList.add("red");
        luotChoi = !luotChoi;
        person1.push(+element.dataset.index);
        console.log(person1);
        if (checkWin(person1)) {
          showResultEl.forEach((e) => {
            e.textContent = "'X' Win";
          });
        }
      } else {
        element.textContent = "O";
        element.classList.add("blue");
        luotChoi = !luotChoi;
        person2.push(+element.dataset.index);
        if (checkWin(person2)) {
          showResultEl.forEach((e) => {
            e.textContent = "'O' Win";
          });
        }
      }
      element.classList.add("disabled");
    }
  });
};
// check
const checkHang = (person) => {
  let count = 0;
  let listIndex = [];
  for (let i = 0; i < person.length - 1; i++) {
    if (person[i] + 1 === person[i + 1]) {
      console.log("yess");
      listIndex.push(person[i]);
      count++;
    } else {
      count = 0;
    }
    if (count === 4) {
      break;
    }
  }
  if (count === 4) {
    console.log(123, listIndex);
    return true;
  } else {
    return false;
  }
};
const checkCot = (person) => {
  let count = 0;
  for (let i = 0; i < person.length + 1; i++) {
    if (person.includes(person[i] + 15)) {
      count++;
    }
    if (count === 4) {
      break;
    }
  }
  if (count === 4) {
    return true;
  } else {
    return false;
  }
};
const checkCheo = (person) => {
  let count = 0;
  for (let i = 0; i < person.length + 1; i++) {
    if (person.includes(person[i] + 16)) {
      count++;
    }
    if (count === 4) {
      break;
    }
  }
  if (count === 4) {
    return true;
  } else {
    return false;
  }
};
const checkWin = (person) => {
  if (checkHang(person)) {
    return true;
  } else if (checkCot(person)) {
    return true;
  } else if (checkCheo(person)) {
    return true;
  } else {
    return false;
  }
};
// run
run();
playBtnEl.onclick = () => {
  window.location.reload();
};
