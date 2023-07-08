import { dataCategory, dataProducts } from "./data.js";

const categoryEl = document.getElementById("category");

const app = () => {
  // render category
  const htmlCategory = dataCategory.map((item) => {
    return `
        <a href="./src/page/group.html?group=${item.key}" class="caterogy_item">
                <img src=${item.img} alt=${item.title} class="caterogy-img" />
                <p class="caterogy-name">${item.title}</p>
              </a>
        `;
  });
  categoryEl.innerHTML = htmlCategory.join("");
};
app();
