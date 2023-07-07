const btnEl = document.querySelector(".btn");
const inputEl = document.querySelector(".input");
const timeEl = document.querySelectorAll(".item");
let timeStart = true;
let idInterval;

const selectDate = () => {
  inputEl.oninput = () => {
    clearInterval(idInterval);
  };
  btnEl.onclick = () => {
    if (inputEl.value) {
      localStorage.setItem("SETTIME", Date.parse(inputEl.value));
      localStorage.setItem("DATE", inputEl.value);
      app();
    }
  };
};
const calculateTime = (total) => {
  let seconds = Math.floor((total / 1000) % 60);
  let minutes = Math.floor((total / 1000 / 60) % 60);
  let hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  let days = Math.floor(total / (1000 * 60 * 60 * 24));
  return {
    seconds,
    minutes,
    hours,
    days,
  };
};
const app = () => {
  selectDate();
  const getTime = localStorage.getItem("SETTIME") || false;

  if (getTime) {
    const getDate = localStorage.getItem("DATE") || false;
    if (getDate) {
      inputEl.value = getDate;
    }

    idInterval = setInterval(() => {
      const timeNow = Date.parse(new Date());
      const totalTime = +getTime - timeNow;
      const values = calculateTime(totalTime);
      for (let item in values) {
        document.querySelector("." + item).textContent =
          values[item] < 10 ? "0" + values[item] : values[item];
      }
    }, 1000);
  }
};
app();
