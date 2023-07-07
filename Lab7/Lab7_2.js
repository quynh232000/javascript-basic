// function repeat(func, times) {
//   func();
//   times && --times && repeat(func, times);
// }
// playEl.onclick = () => {
//   resultEl.textContent = "0";
//   timeCount = 0;
//   let a = setInterval(() => {
//     let randomX = Math.floor(Math.random() * 900);
//     let randomY = Math.floor(Math.random() * 400);
//     itemEl.style.marginLeft = randomX + "px";
//     itemEl.style.marginTop = randomY + "px";
//   }, 50);
//   const newPromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//       clearInterval(a);
//       let timeNow = Date.now();
//       document.addEventListener("click", (e) => {
//         let timeLater = Date.now();
//         let x = itemEl.offsetTop;
//         let y = itemEl.offsetLeft;
//         let mouseX = e.pageY;
//         let mouseY = e.pageX;
//         if (
//           mouseX >= x &&
//           mouseX <= x + 40 &&
//           mouseY >= y &&
//           mouseY <= y + 40
//         ) {
//           resolve(timeLater - timeNow);
//         }
//       });
//     }, 2000);
//   });
//   newPromise.then((resolve) => {
//     let timeCount = (resolve / 1000).toFixed(2);
//     resultEl.textContent = String(timeCount);
//     console.log("kq:", timeCount);
//   });
// };
// document.addEventListener("click", (e) => {
//   let timeLater = Date.now();
//   let x = itemEl.offsetTop;
//   let y = itemEl.offsetLeft;
//   let mouseX = e.pageY;
//   let mouseY = e.pageX;
//   if (
//     mouseX >= x &&
//     mouseX <= x + 40 &&
//     mouseY >= y &&
//     mouseY <= y + 40
//   ) {
//     resolve(timeLater - timeNow);
//   }
// });
const wrapperEl = document.querySelector(".wrapper");
const imgEl = document.querySelector(".img");
const app = () => {
  document.addEventListener("click", (e) => {
    console.log("click");
    let x = imgEl.offsetTop;
    let y = imgEl.offsetLeft;
    let width = wrapperEl.offsetWidth;
    let height = wrapperEl.offsetHeight;
    let mouseX = e.pageX - wrapperEl.offsetLeft;
    let mouseY = e.pageY - wrapperEl.offsetTop;

    // console.log("x-y", width, height);
    // console.log("mouse x-y", mouseX, mouseY);

    if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
      // cach 1
      imgEl.src = "../img/sup3.svg";
      imgEl.style.transform = "rotate(90deg)";
      document.documentElement.style.setProperty("--top-start", x + "px");
      document.documentElement.style.setProperty("--left-start", y + "px");
      document.documentElement.style.setProperty("--top", mouseX + "px");
      document.documentElement.style.setProperty("--left", mouseY + "px");
      imgEl.style.left = mouseX + "px";
      imgEl.style.top = mouseY + "px";
      setTimeout(() => {
        imgEl.src = "../img/sup1.svg";
        imgEl.style.transform = "rotate(0)";
      }, 1000);

      // cach 2
      // let xRun = 0;
      // let yRun = 0;
      // setInterval(() => {
      //   if (xRun === mouseX - 20 && yRun === mouseY - 20) {
      //     imgEl.src = "../img/sup3.svg";
      //     clearInterval();
      //   } else {
      //     imgEl.src = "../img/sup3.svg";
      //     imgEl.style.transform = "rotate(90deg)";
      //     if (xRun <= mouseX - 20) {
      //       xRun++;
      //       imgEl.style.left = xRun + "px";
      //     }
      //     if (yRun <= mouseY - 20) {
      //       yRun++;
      //       imgEl.style.top = yRun + "px";
      //     }
      //   }
      // }, 2);
    }
  });
};
app();
