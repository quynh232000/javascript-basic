const groupEl = document.querySelectorAll(".info");
let contentEl = document.querySelectorAll(".item");
const inputEl = document.querySelector(".input");
const btnEl = document.querySelector(".btn");

const app = () => {
  contentEl.forEach((element) => {
    element.addEventListener("dragstart", (e) => {
      if (e.target.dataset.id) {
        e.dataTransfer.setData("Text", e.target.dataset.id);
      }
    });
  });

  groupEl.forEach((element) => {
    element.ondragover = (e) => {
      e.preventDefault();
    };
    element.ondrop = (e) => {
      e.preventDefault();
      const data = e.dataTransfer.getData("Text");

      e.target.appendChild(contentEl[data - 1]);
      console.log("okok", data);
    };
  });
};
app();
btnEl.onclick = () => {
  if (inputEl.value) {
    let createDiv = document.createElement("div");
    createDiv.classList.add("item");
    createDiv.textContent = inputEl.value;
    createDiv.draggable = true;
    createDiv.dataset.id = contentEl.length + 1;
    groupEl[0].appendChild(createDiv);
    contentEl = document.querySelectorAll(".item");
    inputEl.value = "";
    inputEl.focus();
  }
  app();
};
